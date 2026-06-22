import { useState } from "react";
import { useToken } from "../../hooks/useToken";
import { Link, useLocation } from "react-router";
import { Menu, X } from "lucide-react";

const navLinks = [
  { to: "/", label: "Home" },
  { to: "/movie-page", label: "Movies" },
  { to: "/cv-page", label: "CV" },
  { to: "/todo", label: "Todo" },
];

const Header = () => {
  const { logout } = useToken();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white/40 backdrop-blur-xl border-b border-white/30">
      <div className="max-w-6xl mx-auto px-4 md:px-8 h-16 flex items-center justify-between">
        <Link
          to="/"
          className="text-lg text-slate-700 tracking-[0.12em] hover:text-slate-900 transition-colors uppercase shrink-0"
        >
          JDT
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-0.5">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.to;
            return (
              <Link
                key={link.to}
                to={link.to}
                className={`px-4 py-2 rounded-full text-sm tracking-wide transition-all duration-300 ${
                  isActive
                    ? "bg-white/60 text-slate-700 shadow-sm shadow-slate-200/30"
                    : "text-slate-500 hover:text-slate-700 hover:bg-white/30"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Desktop logout */}
        <button
          onClick={logout}
          className="hidden md:block text-sm text-slate-500 hover:text-slate-700 transition-colors px-4 py-2 rounded-full hover:bg-white/30 tracking-wide"
        >
          Logout
        </button>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden p-2 rounded-full hover:bg-white/30 transition-colors"
        >
          {menuOpen ? (
            <X className="w-5 h-5 text-slate-600" />
          ) : (
            <Menu className="w-5 h-5 text-slate-600" />
          )}
        </button>
      </div>

      {/* Mobile dropdown */}
      {menuOpen && (
        <div className="md:hidden px-4 pb-4 bg-white/60 backdrop-blur-xl border-b border-white/30">
          <nav className="flex flex-col gap-1 mb-3">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.to;
              return (
                <Link
                  key={link.to}
                  to={link.to}
                  onClick={() => setMenuOpen(false)}
                  className={`px-4 py-2 rounded-full text-sm tracking-wide transition-all ${
                    isActive
                      ? "bg-white/60 text-slate-700"
                      : "text-slate-500 hover:text-slate-700 hover:bg-white/30"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>
          <button
            onClick={() => {
              setMenuOpen(false);
              logout();
            }}
            className="w-full text-sm text-slate-500 hover:text-slate-700 transition-colors px-4 py-2 rounded-full hover:bg-white/30 tracking-wide text-left"
          >
            Logout
          </button>
        </div>
      )}
    </header>
  );
};

export default Header;
