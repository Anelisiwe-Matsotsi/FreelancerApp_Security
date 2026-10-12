import React, { useEffect, useRef, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../context/useAuth";
import { homePathFor } from "../context/ProtectedRoute.tsx";
import type { User } from "../models/user.ts";

// your user model has no named role type, so take it from the user
type UserRole = User["role"];

// what each side sees in the navigation pill
const NAV_LINKS: Record<UserRole, { to: string; label: string }[]> = {
  client: [
    { to: "/gigs", label: "Gigs" },
    { to: "/bookings", label: "Bookings" },
    { to: "/transactions", label: "Transactions" },
  ],
  freelancer: [
    { to: "/freelancer", label: "My Gigs" },
    { to: "/bookings", label: "Bookings" },
    { to: "/transactions", label: "Income" },
  ],
  admin: [
    { to: "/admin", label: "Overview" },
    { to: "/gigs", label: "Gigs" },
    { to: "/bookings", label: "Bookings" },
    { to: "/transactions", label: "Transactions" },
  ],
};

// the fixed top bar + the full-screen mobile menu
export const NavBar: React.FC = () => {
  const { user, logout } = useAuth();
  const [scrolled, setScrolled] = useState(false);
  // the mobile menu needs two flags so it can fade out before it disappears
  const [menuShown, setMenuShown] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const hideTimer = useRef<number | undefined>(undefined);

  // adds the shadow once the page has scrolled a little
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const openMenu = () => {
    window.clearTimeout(hideTimer.current);
    setMenuShown(true);
    // wait one frame so the fade-in transition can run
    requestAnimationFrame(() => setMenuOpen(true));
    document.body.style.overflow = "hidden";
  };

  const closeMenu = () => {
    setMenuOpen(false);
    document.body.style.overflow = "";
    hideTimer.current = window.setTimeout(() => setMenuShown(false), 300);
  };

  const handleLogout = () => {
    closeMenu();
    logout();
  };

  // nobody is logged in (login page), so there is no navbar
  if (!user) return null;

  const links = NAV_LINKS[user.role];

  return (
    <>
      <nav id='main-nav' className={scrolled ? "scrolled" : ""}>
        <Link to={homePathFor(user.role)} className='nav-logo'>
          Hustle<span>Hub</span>
        </Link>

        {/* NavLink adds the "active" class your CSS styles automatically */}
        <ul className='nav-cats'>
          {links.map((link) => (
            <li key={link.to}>
              <NavLink
                to={link.to}
                className={({ isActive }) => (isActive ? "active" : "")}
              >
                {link.label}
              </NavLink>
            </li>
          ))}
        </ul>

        <div className='nav-right'>
          <span className='nav-user'>
            {user.username} · <b>{user.role}</b>
          </span>
          <button type='button' className='nav-cta' onClick={handleLogout}>
            Log out
          </button>
          <button
            type='button'
            className='hamburger'
            aria-label='Menu'
            aria-expanded={menuOpen}
            onClick={menuOpen ? closeMenu : openMenu}
          >
            <span
              style={{
                transform: menuOpen ? "rotate(45deg) translate(4px, 4px)" : "",
              }}
            />
            <span style={{ opacity: menuOpen ? 0 : "" }} />
            <span
              style={{
                transform: menuOpen ? "rotate(-45deg) translate(4px,-4px)" : "",
              }}
            />
          </button>
        </div>
      </nav>

      {/* mobile menu */}
      <div
        className={`mobile-nav ${menuOpen ? "open" : ""}`}
        style={{ display: menuShown ? "flex" : "none" }}
      >
        {links.map((link) => (
          <Link key={link.to} to={link.to} onClick={closeMenu}>
            {link.label}
          </Link>
        ))}
        <a
          href='#'
          className='mob-cta'
          onClick={(e) => {
            e.preventDefault();
            handleLogout();
          }}
        >
          Log out
        </a>
      </div>
    </>
  );
};