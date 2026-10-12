// @vitest-environment jsdom
//Vitest, 2026
//Testing Library, 2026
//Rudman, 2026
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen, cleanup, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom/vitest";
import { MemoryRouter } from "react-router-dom";
import type { Gig } from "../models/gig.ts";
import type { Booking } from "../models/booking.ts";
import type { Transaction, IncomeSummary } from "../models/transaction.ts";

import { LoginPage } from "../pages/LoginPage";
import { FreelancerPage } from "../pages/FreelancerPage";
import { TransactionsPage } from "../pages/TransactionsPage";
import { BookingModal } from "../components/BookingModal";
import { GigFormModal } from "../components/GigFormModal";
import { useAuth } from "../context/useAuth";
import {
  createBooking,
  createGig,
  getMyGigs,
  deleteGig,
  getTransactions,
  getMyIncome,
} from "../services/api.ts";

// fake the api so no real requests are sent to the backend (Vitest, 2026)
vi.mock("../services/api.ts", () => ({
  createBooking: vi.fn(),
  createGig: vi.fn(),
  updateGig: vi.fn(),
  getMyGigs: vi.fn(),
  deleteGig: vi.fn(),
  getTransactions: vi.fn(),
  getMyIncome: vi.fn(),
}));

// fake the logged-in user (Vitest, 2026)
vi.mock("../context/useAuth", () => ({
  useAuth: vi.fn(),
}));

// helper to set who is logged in for a test
const mockAuth = (overrides = {}) => {
  vi.mocked(useAuth).mockReturnValue({
    user: null,
    isAuthenticated: false,
    isLoading: false,
    login: vi.fn(),
    register: vi.fn(),
    ...overrides,
  } as unknown as ReturnType<typeof useAuth>);
};

const gig = {
  _id: "g1",
  title: "Logo Design",
  description: "I will design your logo",
  category: "Design",
  price: 150,
  deliveryDays: 3,
  freelancer: { _id: "f1", username: "jess" },
  isActive: true,
} as Gig;

const inactiveGig = {
  _id: "g2",
  title: "Website",
  description: "I will build your website",
  category: "Development",
  price: 900,
  deliveryDays: 7,
  freelancer: "f1",
  isActive: false,
} as Gig;

beforeEach(() => {
  vi.resetAllMocks();
});

// remove the rendered components after each test (Testing Library, 2026)
afterEach(() => {
  cleanup();
});

describe("Component rendering", () => {
  // checks the login page starts in login mode with only email and password (Rudman, 2026)
  it("shows the login form by default", () => {
    mockAuth();
    render(
      <MemoryRouter>
        <LoginPage />
      </MemoryRouter>,
    );

    expect(
      screen.getByRole("heading", { name: "Welcome Back!" }),
    ).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Email")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Password")).toBeInTheDocument();
    expect(screen.queryByPlaceholderText("Username")).not.toBeInTheDocument();
  });

  // checks the booking modal shows the gig details in the order summary (Rudman, 2026)
  it("shows the gig details in the booking modal", () => {
    render(<BookingModal gig={gig} onClose={vi.fn()} onBooked={vi.fn()} />);

    expect(screen.getByText("Logo Design")).toBeInTheDocument();
    expect(screen.getByText("I will design your logo")).toBeInTheDocument();
    expect(screen.getByText("jess")).toBeInTheDocument();
    expect(screen.getByText("3 days")).toBeInTheDocument();
    expect(screen.getByText("R150.00")).toBeInTheDocument();
  });

  // checks the edit gig form is filled in with the gig's current values (Rudman, 2026)
  it("fills the gig form when editing a gig", () => {
    mockAuth({ user: { _id: "f1", role: "freelancer" } });
    render(<GigFormModal gig={gig} onClose={vi.fn()} onSaved={vi.fn()} />);

    expect(screen.getByLabelText("Title")).toHaveValue("Logo Design");
    expect(screen.getByLabelText("Price")).toHaveValue(150);
    expect(screen.getByLabelText("Delivery (days)")).toHaveValue(3);
    expect(
      screen.getByRole("button", { name: "Save changes" }),
    ).toBeInTheDocument();
  });

  // checks the freelancer page lists their gigs with active / inactive badges (Rudman, 2026)
  it("lists the freelancer's gigs with their status", async () => {
    vi.mocked(getMyGigs).mockResolvedValue([gig, inactiveGig]);
    render(<FreelancerPage />);

    // findBy waits for the gigs to load from the fake api (Testing Library, 2026)
    expect(await screen.findByText("Logo Design")).toBeInTheDocument();
    expect(screen.getByText("Website")).toBeInTheDocument();
    expect(screen.getByText("R150.00")).toBeInTheDocument();
    expect(screen.getByText("active")).toBeInTheDocument();
    expect(screen.getByText("inactive")).toBeInTheDocument();
  });

  // checks a freelancer sees their total income and income per gig (Rudman, 2026)
  it("shows the income summary for a freelancer", async () => {
    mockAuth({ user: { _id: "f1", role: "freelancer" } });
    vi.mocked(getTransactions).mockResolvedValue([
      {
        _id: "t1",
        reference: "REF001",
        gigTitle: "Logo Design",
        amount: 1000,
        currency: "ZAR",
        status: "Paid",
        client: { _id: "c1", username: "sam" },
        freelancer: "f1",
      } as Transaction,
    ]);
    vi.mocked(getMyIncome).mockResolvedValue({
      totalIncome: 1500,
      totalTransactions: 3,
      currency: "ZAR",
      byGig: [
        { gigId: "g1", gigTitle: "Logo Design", bookings: 2, income: 1000 },
        { gigId: "g2", gigTitle: "Website", bookings: 1, income: 500 },
      ],
    } as IncomeSummary);

    render(<TransactionsPage />);

    expect(await screen.findByText("Total income")).toBeInTheDocument();
    expect(screen.getByText("ZAR 1500.00")).toBeInTheDocument();
    expect(screen.getByText("Income by gig")).toBeInTheDocument();
    expect(screen.getByText("Website")).toBeInTheDocument();
    expect(screen.getByText(/REF001/)).toBeInTheDocument();
  });
});

describe("User interaction", () => {
  // checks typing an email and password then submitting calls login with them (Testing Library, 2026)
  it("logs in with the typed email and password", async () => {
    // userEvent acts like a real person typing and clicking (Testing Library, 2026)
    const user = userEvent.setup();
    const login = vi.fn().mockResolvedValue(undefined);
    mockAuth({ login });

    render(
      <MemoryRouter>
        <LoginPage />
      </MemoryRouter>,
    );

    await user.type(screen.getByPlaceholderText("Email"), "sam@test.com");
    await user.type(screen.getByPlaceholderText("Password"), "secret123{enter}");

    await waitFor(() => {
      expect(login).toHaveBeenCalledWith({
        email: "sam@test.com",
        password: "secret123",
      });
    });
  });

  // checks clicking Sign Up swaps the form to the registration fields (Rudman, 2026)
  it("shows the registration fields after clicking Sign Up", async () => {
    const user = userEvent.setup();
    mockAuth();

    render(
      <MemoryRouter>
        <LoginPage />
      </MemoryRouter>,
    );

    await user.click(screen.getByRole("button", { name: "Sign Up" }));

    expect(screen.getByPlaceholderText("Username")).toBeInTheDocument();
    expect(screen.getByRole("combobox")).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "Create Account" }),
    ).toBeInTheDocument();
  });

  // checks confirming the booking sends the gig id to the api and tells the page (Rudman, 2026)
  it("creates a booking when the client confirms", async () => {
    const user = userEvent.setup();
    const booking = { _id: "b1", status: "pending" } as Booking;
    vi.mocked(createBooking).mockResolvedValue(booking);
    const onBooked = vi.fn();

    render(<BookingModal gig={gig} onClose={vi.fn()} onBooked={onBooked} />);

    await user.click(screen.getByRole("button", { name: /confirm booking/i }));

    await waitFor(() => {
      expect(createBooking).toHaveBeenCalledWith("g1");
      expect(onBooked).toHaveBeenCalledWith(booking);
    });
  });

  // checks filling in the gig form and pressing create sends the right data to the api (Rudman, 2026)
  it("creates a new gig from the form", async () => {
    const user = userEvent.setup();
    mockAuth({ user: { _id: "f1", role: "freelancer" } });
    vi.mocked(createGig).mockResolvedValue({ message: "created", gig });
    const onSaved = vi.fn();

    render(<GigFormModal gig={null} onClose={vi.fn()} onSaved={onSaved} />);

    await user.type(screen.getByLabelText("Title"), "Logo Design");
    await user.type(screen.getByLabelText("Description"), "I will design your logo");
    await user.type(screen.getByLabelText("Category"), "Design");
    await user.type(screen.getByLabelText("Price"), "200");
    await user.type(screen.getByLabelText("Delivery (days)"), "3");
    await user.click(screen.getByRole("button", { name: "Create gig" }));

    await waitFor(() => {
      expect(createGig).toHaveBeenCalledWith({
        title: "Logo Design",
        description: "I will design your logo",
        category: "Design",
        price: 200,
        deliveryDays: 3,
        freelancer: "f1",
      });
      expect(onSaved).toHaveBeenCalled();
    });
  });

  // checks pressing Deactivate calls the api for that gig and shows the message (Rudman, 2026)
  it("deactivates a gig from the freelancer page", async () => {
    const user = userEvent.setup();
    vi.mocked(getMyGigs).mockResolvedValue([gig]);
    vi.mocked(deleteGig).mockResolvedValue({ message: "ok" });

    render(<FreelancerPage />);

    await user.click(await screen.findByRole("button", { name: "Deactivate" }));

    expect(deleteGig).toHaveBeenCalledWith("g1");
    expect(await screen.findByText("Gig deactivated.")).toBeInTheDocument();
  });
});

/*References

Rudman. G., 2026. insy7314-library.(Version 1.0) [Source Code] Available at: < https://github.com/rudderz243/insy7314-library > [Accessed 12 October 2026].

Vitest. 2026. Mocking.(Version 1.0) [Source Code] Available at: < https://vitest.dev/guide/mocking > [Accessed 12 October 2026].

Vitest. 2026. Test Environment.(Version 1.0) [Source Code] Available at: < https://vitest.dev/guide/environment > [Accessed 12 October 2026].

Testing Library. 2026. React Testing Library Introduction.(Version 1.0) [Source Code] Available at: < https://testing-library.com/docs/react-testing-library/intro/ > [Accessed 12 October 2026].

Testing Library. 2026. user-event Introduction.(Version 1.0) [Source Code] Available at: < https://testing-library.com/docs/user-event/intro > [Accessed 12 October 2026].
*/