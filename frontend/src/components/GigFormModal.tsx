import React, { useState } from "react";
import type { Gig } from "../models/gig.ts";
import { createGig, updateGig } from "../services/api.ts";
import { useAuth } from "../context/useAuth.ts";
import { Modal } from "./Modal.tsx";

interface GigFormModalProps {
  // null = create a new gig, a gig = edit that gig
  gig: Gig | null;
  onClose: () => void;
  onSaved: () => void;
}

// the freelancer's create / edit gig screen overlay
export const GigFormModal: React.FC<GigFormModalProps> = ({
  gig,
  onClose,
  onSaved,
}) => {
  const { user } = useAuth();

  // local variables to store information from the textboxes
  // they start with the gig's values when editing, or empty when creating
  const [title, setTitle] = useState(gig?.title ?? "");
  const [description, setDescription] = useState(gig?.description ?? "");
  const [category, setCategory] = useState(gig?.category ?? "");
  const [price, setPrice] = useState(gig ? String(gig.price) : "");
  const [deliveryDays, setDeliveryDays] = useState(
    gig ? String(gig.deliveryDays) : "",
  );
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  // create a method to handle the form submission (create or update)
  const handleSubmit = async (e: React.FormEvent) => {
    // stop the browser from reloading the page
    e.preventDefault();
    if (!user) return;

    const fields = {
      title,
      description,
      category,
      price: Number(price),
      deliveryDays: Number(deliveryDays),
    };

    try {
      setSubmitting(true);
      setError("");

      if (gig?._id) {
        // a gig is being edited, so we update it
        await updateGig(gig._id, fields);
      } else {
        // otherwise, we create a new gig owned by the logged-in freelancer
        await createGig({ ...fields, freelancer: user._id });
      }
      onSaved();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not save the gig.");
      setSubmitting(false);
    }
  };

  return (
    <Modal
      eyebrow={gig ? "Edit gig" : "New gig"}
      title={gig ? gig.title : "Create a gig"}
      onClose={onClose}
    >
      <form onSubmit={handleSubmit}>
        <div className='modal-body'>
          <div className='form-group'>
            <label htmlFor='gig-title'>Title</label>
            <input
              id='gig-title'
              type='text'
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div className='form-group'>
            <label htmlFor='gig-description'>Description</label>
            <textarea
              id='gig-description'
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>
          <div className='form-group'>
            <label htmlFor='gig-category'>Category</label>
            {/* type your own, or pick one of the suggestions */}
            <input
              id='gig-category'
              type='text'
              list='gig-category-options'
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
            />
            <datalist id='gig-category-options'>
              <option value='Design' />
              <option value='Development' />
              <option value='Writing' />
              <option value='Video' />
            </datalist>
          </div>
          <div className='form-row'>
            <div className='form-group'>
              <label htmlFor='gig-price'>Price</label>
              <input
                id='gig-price'
                type='number'
                min='1'
                step='0.01'
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                required
              />
            </div>
            <div className='form-group'>
              <label htmlFor='gig-days'>Delivery (days)</label>
              <input
                id='gig-days'
                type='number'
                min='1'
                value={deliveryDays}
                onChange={(e) => setDeliveryDays(e.target.value)}
                required
              />
            </div>
          </div>

          {error && <div className='alert'>{error}</div>}
        </div>

        <div className='modal-actions'>
          <button type='button' className='btn btn-outline' onClick={onClose}>
            Cancel
          </button>
          <button type='submit' className='btn btn-teal' disabled={submitting}>
            {submitting ? "Saving..." : gig ? "Save changes" : "Create gig"}
          </button>
        </div>
      </form>
    </Modal>
  );
};