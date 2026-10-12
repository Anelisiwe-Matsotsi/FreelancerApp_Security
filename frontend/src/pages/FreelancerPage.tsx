import React, { useState, useEffect } from "react";
import type { Gig } from "../models/gig.ts";
import { getMyGigs, deleteGig, updateGig } from "../services/api.ts";
import { GigFormModal } from "../components/GigFormModal";

// the freelancer's home page: manage my own gigs
export const FreelancerPage: React.FC = () => {
  // create a gig array to hold the freelancer's gigs
  const [gigs, setGigs] = useState<Gig[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  // is the create/edit overlay open, and which gig is it editing (null = a new gig)
  const [formOpen, setFormOpen] = useState(false);
  const [editingGig, setEditingGig] = useState<Gig | null>(null);

  // create a helper function to use our API service and update the gig array
  const loadGigs = async () => {
    try {
      setGigs(await getMyGigs());
      setError("");
    } catch (err) {
      setGigs([]);
      setError(err instanceof Error ? err.message : "Could not load your gigs.");
    } finally {
      setLoading(false);
    }
  };

  // useEffect runs when the page loads
  useEffect(() => {
    loadGigs();
  }, []);

  // open the overlay empty (new gig) or filled in (edit)
  const openForm = (gig: Gig | null) => {
    setEditingGig(gig);
    setFormOpen(true);
  };

  // called by the overlay after the gig was saved
  const handleSaved = () => {
    setFormOpen(false);
    setMessage(editingGig ? "Gig updated." : "Gig created.");
    setEditingGig(null);
    loadGigs();
  };

  // deactivate = hide the gig from clients (the API does not erase it)
  const handleDeactivate = async (id: string) => {
    try {
      await deleteGig(id);
      setMessage("Gig deactivated.");
      loadGigs();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not deactivate the gig.");
    }
  };

  // put a deactivated gig back on the marketplace
  const handleReactivate = async (id: string) => {
    try {
      await updateGig(id, { isActive: true });
      setMessage("Gig is live again.");
      loadGigs();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not reactivate the gig.");
    }
  };

  const activeCount = gigs.filter((g) => g.isActive !== false).length;

  return (
    <div className='page'>
      <div className='page-inner'>
        <div className='page-head'>
          <div>
            <div className='section-label'>Freelancer</div>
            <h1 className='page-title'>
              My <em>gigs</em>
            </h1>
            <p className='page-sub'>
              Create the gigs clients can book, and keep them up to date.
            </p>
          </div>
          <button className='btn btn-teal' onClick={() => openForm(null)}>
            New gig
          </button>
        </div>

        {/* stats */}
        <div className='stat-grid'>
          <div className='stat-card'>
            <div className='stat-num'>{activeCount}</div>
            <div className='stat-label'>Live gigs</div>
          </div>
          <div className='stat-card'>
            <div className='stat-num'>{gigs.length}</div>
            <div className='stat-label'>Total gigs</div>
          </div>
        </div>

        {message && <div className='notice'>{message}</div>}

        {/* list of all my gigs */}
        <div className='panel'>
          {loading && <p className='empty'>Loading your gigs...</p>}
          {error && <div className='alert'>{error}</div>}
          {!loading && !error && gigs.length === 0 && (
            <p className='empty'>
              You have no gigs yet. Press New gig to create your first one.
            </p>
          )}

          {gigs.map((gig) => {
            const active = gig.isActive !== false;
            return (
              <div key={gig._id ?? gig.title} className='row-item'>
                <div className='row-main'>
                  <div className='row-title'>{gig.title}</div>
                  <div className='row-meta'>
                    {gig.category} · {gig.deliveryDays}-day delivery
                  </div>
                </div>
                {/* these buttons will appear next to each item in the list */}
                <div className='row-side'>
                  <span className='row-amount'>R{gig.price.toFixed(2)}</span>
                  <span className={`badge ${active ? "badge-active" : "badge-inactive"}`}>
                    {active ? "active" : "inactive"}
                  </span>
                  <button
                    className='btn btn-outline btn-sm'
                    onClick={() => openForm(gig)}
                  >
                    Edit
                  </button>
                  {gig._id && active && (
                    <button
                      className='btn btn-danger btn-sm'
                      onClick={() => handleDeactivate(gig._id!)}
                    >
                      Deactivate
                    </button>
                  )}
                  {gig._id && !active && (
                    <button
                      className='btn btn-outline btn-sm'
                      onClick={() => handleReactivate(gig._id!)}
                    >
                      Reactivate
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ─── CREATE / EDIT OVERLAY ─── */}
      {formOpen && (
        <GigFormModal
          gig={editingGig}
          onClose={() => setFormOpen(false)}
          onSaved={handleSaved}
        />
      )}
    </div>
  );
};