import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import type { Gig } from "../models/gig.ts";
import { getGigs } from "../services/api.ts";
import { useAuth } from "../context/useAuth";
import { BookingModal } from "../components/BookingModal";

// the words that scroll across the teal bar
const MARQUEE_ITEMS = [
  "Logo & Branding",
  "Web Development",
  "SEO Writing",
  "Video Editing",
  "Vetted Freelancers",
  
];

// the small tick used in the "how it works" lists
const Tick: React.FC = () => (
  <svg viewBox='0 0 24 24'>
    <polyline points='20 6 9 17 4 12' />
  </svg>
);

interface GigCardProps {
  gig: Gig;
  // picks one of 4 colours for the card's image block
  tone: number;
  // only clients get a Book button, so this is optional
  onBook?: (gig: Gig) => void;
}

// one card in the gig grid (uses your .menu-card markup)
const GigCard: React.FC<GigCardProps> = ({ gig, tone, onBook }) => {
  // the freelancer may come back as just an id, or as { _id, username }
  const seller =
    typeof gig.freelancer === "object" ? gig.freelancer.username : undefined;

  return (
    <div className='menu-card'>
      <div className='card-img-wrap'>
        {/* gigs have no photo, so show the first letter on a coloured block */}
        <div className='card-img-fallback' data-tone={tone}>
          {gig.title.charAt(0).toUpperCase()}
        </div>
        <span className='card-cat-badge'>{gig.category}</span>
      </div>

      <div className='card-body'>
        <div className='card-header'>
          <span className='card-name'>{gig.title}</span>
          <span className='card-price'>R{gig.price.toFixed(2)}</span>
        </div>
        <p className='card-desc'>{gig.description}</p>

        <div className='card-chips'>
          <span className='card-chip chip-gf'>
            {gig.deliveryDays}-day delivery
          </span>
          {seller && <span className='card-chip'>by {seller}</span>}
        </div>

        <div className='card-footer'>
          {/* hover (or keyboard focus) on this button shows the tooltip */}
          <div className='tooltip-wrap'>
            <button type='button' className='info-btn'>
              <svg viewBox='0 0 24 24'>
                <circle cx='12' cy='12' r='10' />
                <path d='M12 16v-4M12 8h.01' />
              </svg>
              What&apos;s included
            </button>
            <div className='tooltip' role='tooltip'>
              <div className='tt-title'>Package details</div>
              <div className='tt-ingredients'>{gig.description}</div>
              <div
                className='tt-nutrition'
                style={{ gridTemplateColumns: "repeat(3, 1fr)" }}
              >
                <div className='tt-nut-item teal'>
                  <div className='tt-nut-val'>{gig.deliveryDays}</div>
                  <div className='tt-nut-key'>days</div>
                </div>
                <div className='tt-nut-item amber'>
                  <div className='tt-nut-val'>R{gig.price}</div>
                  <div className='tt-nut-key'>price</div>
                </div>
                <div className='tt-nut-item'>
                  <div className='tt-nut-val'>
                    {gig.isActive === false ? "Off" : "Live"}
                  </div>
                  <div className='tt-nut-key'>status</div>
                </div>
              </div>
            </div>
          </div>

          {onBook && (
            <button
              type='button'
              className='add-btn'
              onClick={() => onBook(gig)}
            >
              <svg viewBox='0 0 24 24'>
                <line x1='12' y1='5' x2='12' y2='19' />
                <line x1='5' y1='12' x2='19' y2='12' />
              </svg>
              Book
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export const GigsPage: React.FC = () => {
  const { user } = useAuth();

  // create a gig array to hold all the gigs from the API
  const [gigs, setGigs] = useState<Gig[]>([]);
  // "all", or the category of the filter button that is selected
  const [filter, setFilter] = useState("all");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  // the gig the client clicked Book on (null = the overlay is closed)
  const [bookingGig, setBookingGig] = useState<Gig | null>(null);
  const heroBgRef = useRef<HTMLDivElement>(null);

  // only clients can book (admins just browse)
  const canBook = user?.role === "client";

  // create a helper function to use our API service and update the gig array
  const loadGigs = async () => {
    try {
      setGigs(await getGigs());
      setError("");
    } catch (err) {
      setGigs([]);
      setError(err instanceof Error ? err.message : "Could not load gigs.");
    } finally {
      setLoading(false);
    }
  };

  // useEffect runs when the page loads
  useEffect(() => {
    loadGigs();
  }, []);

  // fades in the headings as they scroll into view (your IntersectionObserver)
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, i) => {
          if (entry.isIntersecting) {
            setTimeout(() => entry.target.classList.add("visible"), i * 55);
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.07 },
    );
    document
      .querySelectorAll(".reveal,.reveal-left")
      .forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  // moves the hero background slightly with the mouse (the parallax from your script)
  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      const bg = heroBgRef.current;
      if (!bg) return;
      const x = (e.clientX / window.innerWidth - 0.5) * 14;
      const y = (e.clientY / window.innerHeight - 0.5) * 10;
      bg.style.transform = `translate(${x}px, ${y}px) scale(1.08)`;
    };
    document.addEventListener("mousemove", onMove);
    return () => document.removeEventListener("mousemove", onMove);
  }, []);

  // called by the booking overlay once the booking exists
  const handleBooked = () => {
    setBookingGig(null);
    setNotice("Booking created.");
  };

  // category is free text, so the filter buttons come from the gigs themselves
  const categories = Array.from(new Set(gigs.map((g) => g.category)));

  // the gigs that match the selected category button
  const visibleGigs =
    filter === "all" ? gigs : gigs.filter((g) => g.category === filter);

  // the featured gig is the newest one
  const featured = [...gigs].sort((a, b) =>
    (b.createdAt ?? "").localeCompare(a.createdAt ?? ""),
  )[0];
  const [featuredWhole, featuredCents] = featured
    ? featured.price.toFixed(2).split(".")
    : ["0", "00"];
  const featuredSeller =
    featured && typeof featured.freelancer === "object"
      ? featured.freelancer.username
      : undefined;

  return (
    <>
      {/* ─── HERO ─── */}
      <main className='hero'>
        <div className='hero-bg-img' ref={heroBgRef} />
        <div className='hero-content'>
          <div className='hero-badge'>
            <span className='hero-badge-dot' />
            Live now · {gigs.length} {gigs.length === 1 ? "gig" : "gigs"}{" "}
            available
          </div>
          <h1>
            Hire the talent,
            <br />
            <em>skip the hassle</em>
            <span className='sub-line'>Real people. Real work. Real fast.</span>
          </h1>
          <p className='hero-desc'>
            Logos, websites, articles and video edits from freelancers who
            deliver. Pick a gig, book it in one step and track it from your
            bookings.
          </p>
          <div className='hero-meta'>
            <div className='hero-meta-item'>
              <svg viewBox='0 0 24 24'>
                <circle cx='12' cy='12' r='10' />
                <polyline points='12 6 12 12 16 14' />
              </svg>
              Fast delivery
            </div>
            <span className='hero-meta-sep' />
            <div className='hero-meta-item'>
              <svg viewBox='0 0 24 24'>
                <path d='M22 11.08V12a10 10 0 11-5.93-9.14' />
                <polyline points='22 4 12 14.01 9 11.01' />
              </svg>
              Every payment tracked
            </div>
            <span className='hero-meta-sep' />
            <div className='hero-meta-item'>
              <svg viewBox='0 0 24 24'>
                <circle cx='12' cy='12' r='10' />
                <line x1='2' y1='12' x2='22' y2='12' />
                <path d='M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z' />
              </svg>
              Work with anyone, anywhere
            </div>
          </div>
        </div>
        <div className='hero-scroll'>
          <div className='hero-scroll-line' />
          Scroll
        </div>
      </main>

      {/* WAVE */}
      <div className='wave-divider' aria-hidden='true'>
        <svg
          viewBox='0 0 1440 80'
          xmlns='http://www.w3.org/2000/svg'
          preserveAspectRatio='none'
          style={{ height: 80, background: "#ca8e0c" }}
        >
          <path
            d='M0,80 L0,30 C180,70 360,0 540,30 C720,60 900,0 1080,30 C1260,60 1360,20 1440,40 L1440,80 Z'
            fill='#F0EAD8'
          />
        </svg>
      </div>

      {/* MARQUEE: the list is repeated twice so the loop has no gap */}
      <div className='marquee-wrap' aria-hidden='true'>
        <div className='marquee-inner'>
          {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((item, i) => (
            <React.Fragment key={i}>
              <span>{item}</span>
              <span className='dot'>◆</span>
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* ─── FEATURED GIG ─── */}
      {featured && (
        <section className='special-section' id='special'>
          <div className='special-ribbon'>Newest Gig</div>
          <div className='special-inner'>
            <div>
              <div className='special-label'>{featured.category} · Just in</div>
              <h2 className='special-title'>{featured.title}</h2>
              <p className='special-desc'>{featured.description}</p>
              <div className='special-price'>
                <span className='amt'>R{featuredWhole}</span>
                <span className='dec'>.{featuredCents}</span>
                <span className='label'>/ gig</span>
              </div>
              <div className='special-tags'>
                <span className='tag-chip gf'>
                  {featured.deliveryDays}-day delivery
                </span>
                {featuredSeller && (
                  <span className='tag-chip'>by {featuredSeller}</span>
                )}
              </div>
              {canBook && (
                <div style={{ marginTop: 28 }}>
                  <button
                    type='button'
                    className='btn btn-teal'
                    onClick={() => setBookingGig(featured)}
                  >
                    Book this gig · R{featured.price.toFixed(2)}
                  </button>
                </div>
              )}
            </div>
            <div className='special-img'>
              <div
                className='card-img-fallback'
                data-tone={Math.max(categories.indexOf(featured.category), 0) % 4}
              >
                {featured.title.charAt(0).toUpperCase()}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* WAVE 2 */}
      <div className='wave-divider' aria-hidden='true'>
        <svg
          viewBox='0 0 1440 60'
          xmlns='http://www.w3.org/2000/svg'
          preserveAspectRatio='none'
          style={{ height: 60, background: "#FFF3DC" }}
        >
          <path
            d='M0,0 C360,60 720,0 1080,40 C1260,60 1380,20 1440,30 L1440,60 L0,60 Z'
            fill='#FDFAF5'
          />
        </svg>
      </div>

      {/* ─── ALL GIGS ─── */}
      <section className='menu-section' id='menu'>
        <div className='container'>
          <div className='menu-header'>
            <div className='section-label reveal'>Browse Gigs</div>
            <h2 className='section-title reveal' style={{ transitionDelay: ".08s" }}>
              Every skill you need,
              <br />
              <em>one click</em> away.
            </h2>
          </div>

          {/* CATEGORY FILTER */}
          <div className='cat-filter reveal' style={{ transitionDelay: ".15s" }}>
            <button
              className={`cat-btn ${filter === "all" ? "active" : ""}`}
              onClick={() => setFilter("all")}
            >
              <svg viewBox='0 0 24 24'>
                <path d='M4 6h16M4 12h16M4 18h16' />
              </svg>
              All
            </button>
            {categories.map((category) => (
              <button
                key={category}
                className={`cat-btn ${filter === category ? "active" : ""}`}
                onClick={() => setFilter(category)}
              >
                <svg viewBox='0 0 24 24'>
                  <path d='M20.6 13.4l-7.2 7.2a2 2 0 01-2.8 0L3 13V3h10l7.6 7.6a2 2 0 010 2.8z' />
                  <circle cx='7.5' cy='7.5' r='1.5' />
                </svg>
                {category}
              </button>
            ))}
          </div>

          {/* shows after a booking was created */}
          {notice && (
            <div className='notice'>
              {notice} <Link to='/bookings'>View my bookings</Link>
            </div>
          )}

          {/* GIG GRID */}
          {loading && <p className='empty'>Loading gigs...</p>}
          {error && <div className='alert'>{error}</div>}
          {!loading && !error && visibleGigs.length === 0 && (
            <p className='empty'>No gigs in this category yet.</p>
          )}
          <div className='menu-grid'>
            {visibleGigs.map((gig) => (
              // the filter is part of the key so cards replay their entrance animation
              <GigCard
                key={`${filter}-${gig._id ?? gig.title}`}
                gig={gig}
                tone={Math.max(categories.indexOf(gig.category), 0) % 4}
                onBook={canBook ? setBookingGig : undefined}
              />
            ))}
          </div>
        </div>
      </section>

      {/* WAVE 3 */}
      <div className='wave-divider' aria-hidden='true'>
        <svg
          viewBox='0 0 1440 70'
          xmlns='http://www.w3.org/2000/svg'
          preserveAspectRatio='none'
          style={{ height: 70, background: "#FDFAF5" }}
        >
          <path
            d='M0,70 L0,30 C240,70 480,0 720,35 C960,70 1200,10 1440,40 L1440,70 Z'
            fill='#F5EFE0'
          />
        </svg>
      </div>

      {/* ─── HOW IT WORKS ─── */}
      <section className='info-section' id='info'>
        <div className='container'>
          <div className='info-grid'>
            <div>
              <div className='info-logo'>
                Hustle<span>Hub</span>
              </div>
              <p className='info-tagline'>
                A marketplace for people who get things done. Clients book a
                gig, freelancers deliver it, and every payment is tracked.
              </p>
            </div>
            <div>
              <div className='info-title'>For clients</div>
              <ul className='info-list'>
                <li>
                  <Tick />
                  Browse gigs by category
                </li>
                <li>
                  <Tick />
                  Book in one step from any gig card
                </li>
                <li>
                  <Tick />
                  Follow every booking and payment
                </li>
              </ul>
            </div>
            <div>
              <div className='info-title'>For freelancers</div>
              <ul className='info-list'>
                <li>
                  <Tick />
                  Publish gigs at your own price
                </li>
                <li>
                  <Tick />
                  See client bookings as they arrive
                </li>
                <li>
                  <Tick />
                  Watch your income grow
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ─── BOOKING OVERLAY ─── */}
      {bookingGig && (
        <BookingModal
          gig={bookingGig}
          onClose={() => setBookingGig(null)}
          onBooked={handleBooked}
        />
      )}
    </>
  );
};

/*
References
Codepen.io. 2018. The shore shack — Beach sandwich bar menu #CodepenChallenge. (Version 1.0) [Source Code] Available at:< https://codepen.io/jerora98/details/KwNNyjg > [Accessed 12 October 2026].
*/