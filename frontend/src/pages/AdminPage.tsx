import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import type { Gig } from "../models/gig.ts";
import type { Booking } from "../models/booking.ts";
import type { Transaction } from "../models/transaction.ts";
import {
  getGigs,
  getBookings,
  getTransactions,
  deleteGig,
} from "../services/api.ts";

// the admin's home page: a platform overview + gig moderation
export const AdminPage: React.FC = () => {
  // create arrays to hold everything the overview counts
  const [gigs, setGigs] = useState<Gig[]>([]);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  // create a helper function to load all three lists at the same time
  // each one has its own catch, so one failing endpoint does not blank the page
  const loadOverview = async () => {
    const [g, b, t] = await Promise.all([
      getGigs().catch(() => [] as Gig[]),
      getBookings().catch(() => [] as Booking[]),
      getTransactions().catch(() => [] as Transaction[]),
    ]);
    setGigs(g);
    setBookings(b);
    setTransactions(t);
    setLoading(false);
  };

  // useEffect runs when the page loads
  useEffect(() => {
    loadOverview();
  }, []);

  // deactivate a gig so clients can no longer book it
  const handleDeactivate = async (id: string) => {
    try {
      await deleteGig(id);
      setMessage("Gig deactivated.");
      setError("");
      loadOverview();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not deactivate the gig.");
    }
  };

  // refunded money does not count towards the volume
  const currency = transactions[0]?.currency ?? "";
  const volume = transactions
    .filter((t) => t.status !== "Refunded")
    .reduce((sum, t) => sum + t.amount, 0);

  // only the five newest bookings are listed on this page
  const recentBookings = bookings.slice(0, 5);

  return (
    <div className='page'>
      <div className='page-inner'>
        <div className='page-head'>
          <div>
            <div className='section-label'>Admin</div>
            <h1 className='page-title'>
              Platform <em>overview</em>
            </h1>
            <p className='page-sub'>
              A summary of the marketplace, and the tools to keep it tidy.
            </p>
          </div>
          <button className='btn btn-outline' onClick={loadOverview}>
            Refresh
          </button>
        </div>

        {/* stats */}
        <div className='stat-grid'>
          <div className='stat-card'>
            <div className='stat-num'>{gigs.length}</div>
            <div className='stat-label'>Active gigs</div>
          </div>
          <div className='stat-card'>
            <div className='stat-num'>{bookings.length}</div>
            <div className='stat-label'>Bookings</div>
          </div>
          <div className='stat-card'>
            <div className='stat-num'>{transactions.length}</div>
            <div className='stat-label'>Transactions</div>
          </div>
          <div className='stat-card'>
            <div className='stat-num'>
              {currency} {volume.toFixed(2)}
            </div>
            <div className='stat-label'>Volume</div>
          </div>
        </div>

        {message && <div className='notice'>{message}</div>}
        {error && <div className='alert'>{error}</div>}

        {/* gig moderation */}
        <div className='panel' style={{ marginBottom: 24 }}>
          <h2 className='panel-title'>Gigs</h2>
          {loading && <p className='empty'>Loading...</p>}
          {!loading && gigs.length === 0 && (
            <p className='empty'>There are no active gigs.</p>
          )}
          {gigs.map((gig) => (
            <div key={gig._id ?? gig.title} className='row-item'>
              <div className='row-main'>
                <div className='row-title'>{gig.title}</div>
                <div className='row-meta'>
                  {gig.category}
                  {typeof gig.freelancer === "object" &&
                    ` · by ${gig.freelancer.username}`}
                </div>
              </div>
              <div className='row-side'>
                <span className='row-amount'>R{gig.price.toFixed(2)}</span>
                {gig._id && (
                  <button
                    className='btn btn-danger btn-sm'
                    onClick={() => handleDeactivate(gig._id!)}
                  >
                    Deactivate
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* newest bookings */}
        <div className='panel'>
          <h2 className='panel-title'>
            Recent bookings{" "}
            <Link to='/bookings' className='panel-link'>
              View all
            </Link>
          </h2>
          {!loading && recentBookings.length === 0 && (
            <p className='empty'>No bookings yet.</p>
          )}
          {recentBookings.map((booking, i) => (
            <div key={booking._id ?? i} className='row-item'>
              <div className='row-main'>
                <div className='row-title'>
                  {typeof booking.gig === "object"
                    ? booking.gig.title
                    : `Gig ${booking.gig.slice(-6).toUpperCase()}`}
                </div>
                <div className='row-meta'>
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
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};