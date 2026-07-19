import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { Menu, X } from "lucide-react";

const links = [
  { to: "/", label: "Home" },
  { to: "/roadmaps", label: "Roadmaps" },
  { to: "/practice", label: "Practice" },
  { to: "/resources", label: "Resources" },
  { to: "/interview-questions", label: "Interview Questions" },
  { to: "/projects", label: "Projects" },
  { to: "/about", label: "About" },
] as const;

export function Nav() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 border-b border-white/5 bg-background/70 backdrop-blur-xl">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-14 md:h-12 flex items-center justify-between gap-4">
        <div className="flex items-center gap-8 min-w-0">
          <Link to="/" className="flex items-center gap-2 shrink-0">
            <span className="size-6 md:size-5 rounded-full bg-white flex items-center justify-center text-black font-bold text-xs">A</span>
            <span className="text-base md:text-[15px] font-semibold tracking-tight text-foreground">DataWithAarav</span>
          </Link>
          <div className="hidden lg:flex items-center gap-5">
            {links.slice(1).map((l) => (
              <Link
                key={l.to}
                to={l.to}
                activeOptions={{ exact: l.to === "/" }}
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors data-[status=active]:text-foreground"
              >
                {l.label}
              </Link>
            ))}
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open main menu"}
            className="lg:hidden size-11 md:size-9 rounded-md flex items-center justify-center border border-hairline min-h-[44px] min-w-[44px]"
          >
            {open ? <X className="size-5 md:size-4" /> : <Menu className="size-5 md:size-4" />}
          </button>
        </div>
      </div>
      {open && (
        <div id="mobile-menu" className="lg:hidden border-t border-hairline bg-background/95 backdrop-blur">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 grid gap-1">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                onClick={() => setOpen(false)}
                className="text-base py-3 px-2 text-muted-foreground hover:text-foreground hover:bg-white/5 rounded-lg transition-colors data-[status=active]:text-foreground min-h-[44px] flex items-center"
              >
                {l.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}