import { useState } from "react";
import { CATEGORIES } from "../utils/const";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";


export const Navbar = () => {
  const location = useLocation()
  const [open, setOpen] = useState(false);

  return (
    <nav className="w-full border-b border-border bg-background sticky top-0 z-50">
      <div className="max-w-6xl mx-auto flex items-center justify-between px-4 py-4">

        {/* Logo */}
        <a href="/">
          <div className="text-xl font-bold text-gradient-primary cursor-pointer hover:glow-primary transition-brand">
            TechNews
          </div>
        </a>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          {CATEGORIES.map((cat) => (
            <Link
              to={cat.url}
              key={cat.name}
              className={`relative text-foreground hover:text-primary transition-brand hover-pulse ${cat.url === `${location.pathname}` ? 'text-primary' : 'text-foreground'}`}
            >
              {cat.name}

              {/* Animated underline */}
              <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
            </Link>
          ))}
        </div>

        {/* Mobile Button */}
        <button
          className="md:hidden text-foreground"
          onClick={() => setOpen(!open)}
        >
          {open ? (
            <span className="text-2xl">&times;</span>
          ) : (
            <span className="text-2xl">&#9776;</span>
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="bg-background px-4 pb-4 md:hidden animate-slide-in">
          {CATEGORIES.map((cat) => (
            <Link
              to={cat.url}
              key={cat.name}
              className={`block py-2 text-foreground text-lg hover:text-primary transition-brand ${cat.url === `${location.pathname}` ? 'text-primary' : 'text-foreground'}`}
            >
              {cat.name}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}
