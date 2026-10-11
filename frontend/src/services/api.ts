import type { Book } from "../models/book.ts";
import type { Booking } from "../models/booking.ts";
import type { Gig } from "../models/gig.ts";
import type { Transaction, IncomeSummary } from "../models/transaction.ts";
import type {
  AuthResponse,
  LoginCredentials,
  RegisterCredentials,
  User,
} from "../models/user.ts";

const API_URL = "https://localhost:3000/api";
const TOKEN_KEY = "auth_token";

// Get the authentication token
export function getAuthToken(): string | null {
  return localStorage.getItem(TOKEN_KEY);
}

// Save the authentication token
export function setAuthToken(token: string): void {
  localStorage.setItem(TOKEN_KEY, token);
}

// Remove the authentication token
export function removeAuthToken(): void {
  localStorage.removeItem(TOKEN_KEY);
}

// Set request headers
function getHeaders(
  customHeaders: Record<string, string> = {}
): HeadersInit {
  const token = getAuthToken();

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...customHeaders,
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  return headers;
}

// Handle API responses
async function handleResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    let errorMessage = `HTTP Error ${response.status}`;

    try {
      const data = await response.json();

      if (data && data.message) {
        errorMessage = data.message;
      }
    } catch {
      // Keep the default error message if the response is not JSON
    }

    throw new Error(errorMessage);
  }

  return response.json();
}


// Login
export async function loginUser(
  credentials: LoginCredentials
): Promise<AuthResponse> {
  const response = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(credentials),
  });

  return handleResponse<AuthResponse>(response);
}

// Register
export async function registerUser(
  credentials: RegisterCredentials
): Promise<AuthResponse> {
  const response = await fetch(`${API_URL}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(credentials),
  });

  return handleResponse<AuthResponse>(response);
}



// Get all books
export async function getBooks(): Promise<Book[]> {
  const response = await fetch(`${API_URL}/books`, {
    headers: getHeaders(),
  });

  return handleResponse<Book[]>(response);
}

// Get a book by ID
export async function getBook(id: string): Promise<Book> {
  const response = await fetch(`${API_URL}/books/${id}`, {
    headers: getHeaders(),
  });

  return handleResponse<Book>(response);
}

// Create a book
export async function createBook(book: Book): Promise<Book> {
  const response = await fetch(`${API_URL}/books`, {
    method: "POST",
    headers: getHeaders(),
    body: JSON.stringify(book),
  });

  return handleResponse<Book>(response);
}

// Update a book
export async function updateBook(
  book: Book,
  id: string
): Promise<Book> {
  const response = await fetch(`${API_URL}/books/${id}`, {
    method: "PATCH",
    headers: getHeaders(),
    body: JSON.stringify(book),
  });

  return handleResponse<Book>(response);
}

// Replace a book
export async function replaceBook(
  book: Book,
  id: string
): Promise<Book> {
  const response = await fetch(`${API_URL}/books/${id}`, {
    method: "PUT",
    headers: getHeaders(),
    body: JSON.stringify(book),
  });

  return handleResponse<Book>(response);
}

// Delete a book
export async function deleteBook(id: string): Promise<void> {
  const response = await fetch(`${API_URL}/books/${id}`, {
    method: "DELETE",
    headers: getHeaders(),
  });

  return handleResponse<void>(response);
}

// Get all active gigs
export async function getGigs(): Promise<Gig[]> {
  const response = await fetch(`${API_URL}/gigs`, {
    headers: getHeaders(),
  });

  return handleResponse<Gig[]>(response);
}

// Get a gig by ID
export async function getGigById(id: string): Promise<Gig> {
  const response = await fetch(`${API_URL}/gigs/${id}`, {
    headers: getHeaders(),
  });

  return handleResponse<Gig>(response);
}

// Get gigs belonging to the logged-in freelancer
export async function getMyGigs(): Promise<Gig[]> {
  const response = await fetch(`${API_URL}/gigs/mine`, {
    headers: getHeaders(),
  });

  return handleResponse<Gig[]>(response);
}

// Create a gig
export async function createGig(
  gig: Gig
): Promise<{ message: string; gig: Gig }> {
  const response = await fetch(`${API_URL}/gigs`, {
    method: "POST",
    headers: getHeaders(),
    body: JSON.stringify(gig),
  });

  return handleResponse<{ message: string; gig: Gig }>(response);
}

// Update a gig
export async function updateGig(
  id: string,
  gig: Partial<Gig>
): Promise<{ message: string; gig: Gig }> {
  const response = await fetch(`${API_URL}/gigs/${id}`, {
    method: "PUT",
    headers: getHeaders(),
    body: JSON.stringify(gig),
  });

  return handleResponse<{ message: string; gig: Gig }>(response);
}

// Deactivate a gig
export async function deleteGig(
  id: string
): Promise<{ message: string }> {
  const response = await fetch(`${API_URL}/gigs/${id}`, {
    method: "DELETE",
    headers: getHeaders(),
  });

  return handleResponse<{ message: string }>(response);
}

// Create a booking
export async function createBooking(
  gigId: string
): Promise<Booking> {
  const response = await fetch(`${API_URL}/bookings`, {
    method: "POST",
    headers: getHeaders(),
    body: JSON.stringify({ gigId }),
  });

  return handleResponse<Booking>(response);
}

// Get all bookings belonging to the logged-in user
export async function getBookings(
  status?: Booking["status"]
): Promise<Booking[]> {
  const query = status ? `?status=${status}` : "";

  const response = await fetch(`${API_URL}/bookings${query}`, {
    headers: getHeaders(),
  });

  return handleResponse<Booking[]>(response);
}

// Get one booking by ID
export async function getBooking(
  id: string
): Promise<Booking> {
  const response = await fetch(`${API_URL}/bookings/${id}`, {
    headers: getHeaders(),
  });

  return handleResponse<Booking>(response);
}

// Update a booking (cancel a booking)
export async function updateBooking(
  id: string,
  status: "cancelled"
): Promise<Booking> {
  const response = await fetch(`${API_URL}/bookings/${id}`, {
    method: "PATCH",
    headers: getHeaders(),
    body: JSON.stringify({ status }),
  });

  return handleResponse<Booking>(response);
}

// Delete a booking
export async function deleteBooking(
  id: string
): Promise<Booking> {
  const response = await fetch(`${API_URL}/bookings/${id}`, {
    method: "DELETE",
    headers: getHeaders(),
  });

  return handleResponse<Booking>(response);
}

// Get all transactions belonging to the logged-in user
export async function getTransactions(): Promise<Transaction[]> {
  const response = await fetch(`${API_URL}/transactions`, {
    headers: getHeaders(),
  });

  return handleResponse<Transaction[]>(response);
}

// Get one transaction by ID
export async function getTransaction(
  id: string
): Promise<Transaction> {
  const response = await fetch(`${API_URL}/transactions/${id}`, {
    headers: getHeaders(),
  });

  return handleResponse<Transaction>(response);
}

// Get the logged-in freelancer's income summary
export async function getMyIncome(): Promise<IncomeSummary> {
  const response = await fetch(`${API_URL}/transactions/income`, {
    headers: getHeaders(),
  });

  return handleResponse<IncomeSummary>(response);
}

// Get the currently logged-in user
export async function getCurrentUser(): Promise<User> {
  const response = await fetch(`${API_URL}/auth/me`, {
    method: "GET",
    headers: getHeaders(),
  });

  return handleResponse<User>(response);
}