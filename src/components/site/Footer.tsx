import { Link } from "@tanstack/react-router";
import { Github, Twitter, Linkedin, Mail } from "lucide-react";

export function Footer() {
  return (
    <footer className="mt-16 md:mt-24 border-t border-hairline">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16 md:py-20 grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12">
        {/* Brand section - takes 6 columns on desktop */}
        <div className="md:col-span-6">
          <div className="flex items-center gap-2 mb-6">
            <span className="size-7 rounded-md bg-white flex items-center justify-center text-black font-bold text-sm">A</span>
            <span className="font-semibold text-lg text-foreground">DataWithAarav</span>
          </div>
          <p className="text-sm md:text-base text-muted-foreground leading-relaxed max-w-md">
            The free, open roadmap for aspiring data analysts. Curated learning paths, projects,
            interview questions, and practice — in one place.
          </p>
        </div>
        
        {/* Explore navigation section */}
        <nav aria-label="Explore" className="md:col-span-3">
          <div className="text-xs font-mono uppercase tracking-[0.14em] text-muted-foreground mb-5">
            Explore
          </div>
          <ul className="space-y-1 text-sm">
            <li>
              <Link 
                to="/roadmaps" 
                className="text-muted-foreground hover:text-foreground py-1.5 inline-block transition-colors"
              >
                Roadmaps
              </Link>
            </li>
            <li>
              <Link 
                to="/practice" 
                className="text-muted-foreground hover:text-foreground py-1.5 inline-block transition-colors"
              >
                Practice
              </Link>
            </li>
            <li>
              <Link 
                to="/resources" 
                className="text-muted-foreground hover:text-foreground py-1.5 inline-block transition-colors"
              >
                Resources
              </Link>
            </li>
            <li>
              <Link 
                to="/interview-questions" 
                className="text-muted-foreground hover:text-foreground py-1.5 inline-block transition-colors"
              >
                Interview Questions
              </Link>
            </li>
          </ul>
        </nav>

        {/* Community/social section */}
        <div className="md:col-span-3">
          <div className="text-xs font-mono uppercase tracking-[0.14em] text-muted-foreground mb-5">
            Community
          </div>
          <ul className="flex gap-4 list-none p-0 flex-wrap">
            <li>
              <a 
                href="https://github.com/rajaaravv" 
                className="size-11 rounded-md border border-hairline flex items-center justify-center hover:bg-accent transition-colors min-w-[44px] min-h-[44px]" 
                aria-label="Visit our GitHub profile"
              >
                <Github className="size-5" />
              </a>
            </li>
            <li>
              <a 
                href="https://twitter.com/rajaaravv" 
                className="size-11 rounded-md border border-hairline flex items-center justify-center hover:bg-accent transition-colors min-w-[44px] min-h-[44px]" 
                aria-label="Visit our Twitter profile"
              >
                <Twitter className="size-5" />
              </a>
            </li>
            <li>
              <a 
                href="https://linkedin.com/in/a9arav" 
                className="size-11 rounded-md border border-hairline flex items-center justify-center hover:bg-accent transition-colors min-w-[44px] min-h-[44px]" 
                aria-label="Visit our LinkedIn profile"
              >
                <Linkedin className="size-5" />
              </a>
            </li>
            <li>
              <a 
                href="mailto:rajaarav272@gmail.com" 
                className="size-11 rounded-md border border-hairline flex items-center justify-center hover:bg-accent transition-colors min-w-[44px] min-h-[44px]" 
                aria-label="Send us an email"
              >
                <Mail className="size-5" />
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Copyright bar */}
      <div className="border-t border-hairline">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 flex flex-col sm:flex-row justify-between items-center gap-3 text-center sm:text-left">
          <p className="text-xs text-muted-foreground">© 2026 Aarav Raj. Free forever.</p>
          <p className="text-xs text-muted-foreground">Crafted for aspiring data analysts.</p>
        </div>
      </div>
    </footer>
  );
}