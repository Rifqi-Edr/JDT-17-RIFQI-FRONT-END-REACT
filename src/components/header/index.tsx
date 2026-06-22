import { useToken } from "../../hooks/useToken";
import { Link, useLocation } from "react-router";

const navLinks = [
  { to: "/", label: "Home" },
  { to: "/movie-page", label: "Movies" },
  { to: "/cv-page", label: "CV" },
  { to: "/todo", label: "Todo" },
];

const Header = () => {
  const { logout } = useToken();
  const location = useLocation();

  return (
    <header className="sticky top-0 z-50 bg-white/40 backdrop-blur-xl border-b border-white/30">
      <div className="max-w-6xl mx-auto px-8 h-16 flex items-center justify-between">
        <Link
          to="/"
          className="text-lg text-slate-700 tracking-[0.12em] hover:text-slate-900 transition-colors uppercase"
        >
          JDT
        </Link>

        <nav className="flex items-center gap-0.5">
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

        <button
          onClick={logout}
          className="text-sm text-slate-500 hover:text-slate-700 transition-colors px-4 py-2 rounded-full hover:bg-white/30 tracking-wide"
        >
          Logout
        </button>
      </div>
    </header>
  );
};

export default Header;
