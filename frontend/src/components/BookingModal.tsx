import React, { useState } from "react";
import type { Gig } from "../models/gig.ts";
import type { Booking } from "../models/booking.ts";
import { createBooking } from "../services/api.ts";
import { Modal } from "./Modal";

interface BookingModalProps {
  gig: Gig;
  onClose: () => void;
  // called once the API has created the booking
  onBooked: (booking: Booking) => void;
}

// the "create a booking" screen overlay
// createBooking() only needs the gig id, so this is a confirm step, not a long form
export const BookingModal: React.FC<BookingModalProps> = ({
  gig,
  onClose,
  onBooked,
}) => {
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  // the freelancer may come back as just an id, or as { _id, username }
  const seller =
    typeof gig.freelancer === "object" ? gig.freelancer.username : undefined;

  // create the booking when the client confirms
  const handleSubmit = async (e: React.FormEvent) => {
    // stop the browser from reloading the page
    e.preventDefault();

    // a gig needs an id before it can be booked
    if (!gig._id) {
      setError("This gig has no ID, so it cannot be booked.");
      return;
    }

    try {
      setSubmitting(true);
      setError("");
      const booking = await createBooking(gig._id);
      // the page that opened this overlay closes it and shows the success message
      onBooked(booking);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Could not create the booking.",
      );
      setSubmitting(false);
    }
  };

  return (
    <Modal eyebrow='Create a booking' title={gig.title} onClose={onClose}>
      <form onSubmit={handleSubmit}>
        <div className='modal-body'>
          <p className='card-desc'>{gig.description}</p>

          {/* the order summary */}
          <div className='summary'>
            {seller && (
              <div className='summary-row'>
                <span>Freelancer</span>
                <strong>{seller}</strong>
              </div>
            )}
            <div className='summary-row'>
              <span>Category</span>
              <strong>{gig.category}</strong>
            </div>
            <div className='summary-row'>
              <span>Delivery</span>
              <strong>{gig.deliveryDays} days</strong>
            </div>
            <div className='summary-row total'>
              <span>Total</span>
              <strong>R{gig.price.toFixed(2)}</strong>
            </div>
          </div>

          <p className='modal-note'>
            You can view or cancel this booking any time from the Bookings page.
          </p>

          {error && <div className='alert'>{error}</div>}
        </div>

        <div className='modal-actions'>
          <button type='button' className='btn btn-outline' onClick={onClose}>
            Cancel
          </button>
          <button type='submit' className='btn btn-teal' disabled={submitting}>
            {submitting
              ? "Booking..."
              : `Confirm booking · R${gig.price.toFixed(2)}`}
          </button>
        </div>
      </form>
    </Modal>
  );
};