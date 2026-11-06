
import { useState } from "react";
import { NavLink, Link } from "react-router-dom";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => setMenuOpen(false);

  const linkStyle = ({ isActive }) =>
    `rounded-full px-4 py-2.5 text-sm font-medium transition-colors duration-200 ${
      isActive
        ? "bg-red-50 text-[#b3202e]"
        : "text-gray-600 hover:bg-gray-50 hover:text-[#b3202e]"
    }`;

  const ctaStyle =
    "inline-flex items-center justify-center gap-2 rounded-full bg-[#b3202e] px-6 py-3 text-sm font-semibold text-white shadow-md shadow-red-900/15 transition-all duration-200 hover:bg-[#941a26] hover:shadow-lg active:scale-[0.98]";

  return (
    <header className="sticky top-0 z-50 border-b border-gray-100 bg-white/95 backdrop-blur-md">
      <div className="relative mx-auto flex h-16 max-w-7xl items-center justify-between px-5 sm:px-8 md:h-20">

        {/* Brand */}
        <Link
          to="/"
          onClick={closeMenu}
          className="flex items-center gap-2 text-xl font-bold tracking-tight text-gray-900 md:text-2xl"
        >
          <svg
            viewBox="0 0 24 24"
            width="26"
            height="26"
            className="text-[#b3202e]"
            aria-hidden="true"
          >
            <path
              d="M12 21s-7.5-4.6-9.6-9.2C.9 8.4 3 5 6.4 5c2 0 3.6 1 5.6 3.2C14 6 15.6 5 17.6 5 21 5 23.1 8.4 21.6 11.8 19.5 16.4 12 21 12 21z"
              fill="currentColor"
            />
          </svg>
          PulseCheck
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-3 md:flex">
          <NavLink to="/" end className={linkStyle}>
            Home
          </NavLink>

          <NavLink to="/predict" className={ctaStyle}>
            Check your risk
            <span aria-hidden="true">→</span>
          </NavLink>
        </nav>

        {/* Mobile Menu Button */}
        <button
          type="button"
          onClick={() => setMenuOpen((prev) => !prev)}
          className="flex h-10 w-10 items-center justify-center rounded-xl border border-gray-200 text-gray-700 transition hover:bg-gray-50 md:hidden"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
        >
          {menuOpen ? (
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 6 6 18M6 6l12 12" />
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M4 7h16M4 12h16M4 17h16" />
            </svg>
          )}
        </button>

        {/* Mobile Dropdown */}
        {menuOpen && (
          <nav className="absolute left-4 right-4 top-full mt-3 flex flex-col gap-2 rounded-2xl border border-gray-100 bg-white p-4 shadow-xl md:hidden">
            <NavLink
              to="/"
              end
              onClick={closeMenu}
              className={linkStyle}
            >
              Home
            </NavLink>

            <NavLink
              to="/predict"
              onClick={closeMenu}
              className={ctaStyle}
            >
              Check your risk →
            </NavLink>
          </nav>
        )}
      </div>
    </header>
  );
}
