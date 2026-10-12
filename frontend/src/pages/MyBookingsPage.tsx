//rudderz243, 2026
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import type { Booking } from "../models/booking.ts";
import type { Gig } from "../models/gig.ts";
import {
  getBookings,
  getGigs,
  getMyGigs,
  updateBooking,
  deleteBooking,
} from "../services/api.ts";
import { useAuth } from "../context/useAuth";

// the filter buttons above the list
type StatusFilter = "all" | Booking["status"];
const STATUS_FILTERS: { value: StatusFilter; label: string }[] = [
  { value: "all", label: "All" },
  { value: "pending", label: "Pending" },
  { value: "confirmed", label: "Confirmed" },
  { value: "completed", label: "Completed" },
  { value: "cancelled", label: "Cancelled" },
];

export const MyBookingsPage: React.FC = () => {
  const { user } = useAuth();

  // create a booking array to hold all the bookings
  const [bookings, setBookings] = useState<Booking[]>([]);
  // gigs by id, for bookings where the API only sends the gig's id
  const [gigsById, setGigsById] = useState<Record<string, Gig>>({});
  const [filter, setFilter] = useState<StatusFilter>("all");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  // the button that has been clicked once and now asks "sure?" (cancel / delete)
  const [armed, setArmed] = useState<{
    id: string;
    action: "cancel" | "delete";
  } | null>(null);

  const isClient = user?.role === "client";

  // create a helper function to use our API service and update the booking array
  const loadBookings = async () => {
    try {
      const data = await getBookings(filter === "all" ? undefined : filter);
      setBookings(data);
      setError("");
    } catch (err) {
      setBookings([]);
      setError(err instanceof Error ? err.message : "Could not load bookings.");
    } finally {
      setLoading(false);
    }
  };

  // look up the gigs once, so the list can show titles
  const loadGigTitles = async () => {
    try {
      const gigs =
        user?.role === "freelancer" ? await getMyGigs() : await getGigs();
      const map: Record<string, Gig> = {};
      gigs.forEach((g) => {
        if (g._id) map[g._id] = g;
      });
      setGigsById(map);
    } catch {
      // titles are a nice extra, the list still works without them
      setGigsById({});
    }
  };

  // useEffect runs when the page loads and again every time the filter changes
  useEffect(() => {
    loadBookings();
    setArmed(null);
  }, [filter]);

  useEffect(() => {
    loadGigTitles();
  }, []);

  // the freelancer moves a booking forward: pending -> confirmed -> completed
  const handleStatus = async (id: string, status: "confirmed" | "completed") => {
    try {
      await updateBooking(id, status);
      setMessage(status === "confirmed" ? "Booking confirmed." : "Booking marked as complete.");
      setError("");
      loadBookings();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not update the booking.");
    }
  };

  // cancel a booking (a client cancels, a freelancer declines)
  const handleCancel = async (id: string) => {
    // when clicked it asks if user is sure then second click it cancels  the booking
    if (armed?.id !== id || armed.action !== "cancel") {
      setArmed({ id, action: "cancel" });
      return;
    }
    try {
      await updateBooking(id, "cancelled");
      setMessage("Booking cancelled.");
      setArmed(null);
      loadBookings();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not cancel the booking.");
    }
  };

  // delete a booking for good
  const handleDelete = async (id: string) => {
    if (armed?.id !== id || armed.action !== "delete") {
      setArmed({ id, action: "delete" });
      return;
    }
    try {
      await deleteBooking(id);
      setMessage("Booking deleted.");
      setArmed(null);
      loadBookings();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not delete the booking.");
    }
  };

  return (
    <div className='page'>
      <div className='page-inner'>
        <div className='page-head'>
          <div>
            <div className='section-label'>Bookings</div>
            <h1 className='page-title'>
              {isClient ? "My " : "Client "}
              <em>bookings</em>
            </h1>
            <p className='page-sub'>
              {isClient
                ? "Every gig you have booked, with its current status."
                : "Confirm new bookings, then mark them complete once the work is delivered."}
            </p>
          </div>
          <button className='btn btn-outline' onClick={loadBookings}>
            Refresh
          </button>
        </div>

        {/* STATUS FILTER */}
        <div className='cat-filter page-filter'>
          {STATUS_FILTERS.map((s) => (
            <button
              key={s.value}
              className={`cat-btn ${filter === s.value ? "active" : ""}`}
              onClick={() => setFilter(s.value)}
            >
              {s.label}
            </button>
          ))}
        </div>

        {message && <div className='notice'>{message}</div>}

        {/* list of all bookings */}
        <div className='panel'>
          {loading && <p className='empty'>Loading bookings...</p>}
          {error && <div className='alert'>{error}</div>}

          {/* we show a message if there are no bookings */}
          {!loading && !error && bookings.length === 0 && (
            <p className='empty'>
              No bookings here yet.{" "}
              {isClient && <Link to='/gigs'>Browse gigs</Link>}
            </p>
          )}

          {bookings.map((booking, i) => {
            // the gig comes back either as an id or as { _id, title, price }
            const gigId =
              typeof booking.gig === "string" ? booking.gig : booking.gig._id;
            const title =
              typeof booking.gig === "object"
                ? booking.gig.title
                : (gigsById[gigId]?.title ?? `Gig ${gigId.slice(-6).toUpperCase()}`);
            const canCancel =
              booking.status === "pending" || booking.status === "confirmed";
            const id = booking._id;

            return (
              <div key={id ?? i} className='row-item'>
                <div className='row-main'>
                  <div className='row-title'>{title}</div>
                  <div className='row-meta'>
                    {id && `Booking #${id.slice(-6).toUpperCase()} · `}
                    {booking.createdAt
                      ? new Date(booking.createdAt).toLocaleDateString()
                      : "-"}
                  </div>
                </div>
        
                <div className='row-side'>
                  <span className='row-amount'>R{booking.price.toFixed(2)}</span>
                  <span className={`badge badge-${booking.status}`}>
                    {booking.status}
                  </span>
                  {/* only the freelancer moves the work forward */}
                  {id && !isClient && booking.status === "pending" && (
                    <button
                      className='btn btn-teal btn-sm'
                      onClick={() => handleStatus(id, "confirmed")}
                    >
                      Confirm
                    </button>
                  )}
                  {id && !isClient && booking.status === "confirmed" && (
                    <button
                      className='btn btn-teal btn-sm'
                      onClick={() => handleStatus(id, "completed")}
                    >
                      Mark complete
                    </button>
                  )}
                  {id && canCancel && (
                    <button
                      className='btn btn-danger btn-sm'
                      onClick={() => handleCancel(id)}
                    >
                      {armed?.id === id && armed.action === "cancel"
                        ? "Sure? Click again"
                        : isClient
                          ? "Cancel"
                          : "Decline"}
                    </button>
                  )}
                  {id && isClient && booking.status === "cancelled" && (
                    <button
                      className='btn btn-outline btn-sm'
                      onClick={() => handleDelete(id)}
                    >
                      {armed?.id === id && armed.action === "delete"
                        ? "Sure? Click again"
                        : "Delete"}
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

/*
References
Codepen.io. 2018. The shore shack — Beach sandwich bar menu #CodepenChallenge. (Version 1.0) [Source Code] Available at:< https://codepen.io/jerora98/details/KwNNyjg > [Accessed 12 October 2026].
rudderz243. 2026. insy7314-library.(Version 1.0) [Source Code] Available at: <https://github.com/rudderz243/insy7314-library/blob/master/backend/routes/authRoutes.js> [Accessed 2 September 2026]. 
*/