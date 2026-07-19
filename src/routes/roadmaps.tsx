import React from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Clock, Signal, ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import { roadmaps } from "@/lib/data";
import { PageShell } from "@/components/site/PageShell";

export const Route = createFileRoute("/roadmaps")({
  head: () => ({
    meta: [
      { title: "Roadmaps — DataWithAarav" },
      { name: "description", content: "Structured roadmaps for SQL, Python, Excel, Statistics, Power BI, and Tableau." },
      { property: "og:title", content: "Roadmaps — DataWithAarav" },
      { property: "og:description", content: "Pick your learning path. Each roadmap is curated and free." },
    ],
  }),
  component: RoadmapsPage,
});

// ---- monochrome palette ----------------------------------------------
// Every card is black / white / gray. Depth comes from tonal shifts and
// a subtle top sheen, not hue. Override per-roadmap with an optional
// `tone` field matching one of these keys.
const PALETTE = {
  slate: "from-neutral-900 via-neutral-950 to-black",
  charcoal: "from-zinc-900 via-black to-black",
  graphite: "from-neutral-800 via-neutral-950 to-black",
  ink: "from-neutral-950 via-black to-black",
} as const;
const PALETTE_KEYS = Object.keys(PALETTE) as (keyof typeof PALETTE)[];

function toneFor(roadmap: (typeof roadmaps)[number], index: number) {
  const key = (roadmap as any).tone as keyof typeof PALETTE | undefined;
  return PALETTE[key ?? PALETTE_KEYS[index % PALETTE_KEYS.length]];
}

// Big monogram, e.g. "DA", "PB", "XL" — derived from the title unless
// the roadmap already provides a `code`.
function codeFor(roadmap: (typeof roadmaps)[number]) {
  const explicit = (roadmap as any).code as string | undefined;
  if (explicit) return explicit.toUpperCase();
  const words = roadmap.title.trim().split(/\s+/).filter(Boolean);
  if (words.length === 1) return words[0].slice(0, 2).toUpperCase();
  return words.slice(0, 2).map((w) => w[0]).join("").toUpperCase();
}

// Map roadmap slugs to their route paths
const getRoutePath = (slug: string) => {
  const routeMap: Record<string, string> = {
    "data-analyst": "/dataanalyst",
    "excel": "/excel",
    "statistics": "/statistics",
    "python": "/python",
    "sql": "/sql",
    "visualization-tools": "/bi",
    "power-bi": "/bi",
    "tableau": "/tableau",
  };
  return routeMap[slug] || `/roadmaps/${slug}`;
};

// Get display title override for specific slugs
function getDisplayTitle(roadmap: (typeof roadmaps)[number]) {
  const titleOverrides: Record<string, string> = {
    "visualization-tools": "Visualization Tools",
    "power-bi": "Power BI",
  };
  return titleOverrides[roadmap.slug] || roadmap.title;
}

function RoadmapsPage() {
  const [activeIndex, setActiveIndex] = useState(0);
  const totalItems = roadmaps.length;
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1024);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [currentX, setCurrentX] = useState(0);

  // Fully manual — the only two ways the carousel moves.
  const goToPrevious = () => setActiveIndex((prev) => (prev === 0 ? totalItems - 1 : prev - 1));
  const goToNext = () => setActiveIndex((prev) => (prev === totalItems - 1 ? 0 : prev + 1));

  const prevIndex = (activeIndex - 1 + totalItems) % totalItems;
  const nextIndex = (activeIndex + 1) % totalItems;

  // Drag and swipe handlers
  const handleDragStart = (clientX: number) => {
    setIsDragging(true);
    setStartX(clientX);
    setCurrentX(clientX);
  };

  const handleDragMove = (clientX: number) => {
    if (!isDragging) return;
    setCurrentX(clientX);
  };

  const handleDragEnd = () => {
    if (!isDragging) return;
    const diff = startX - currentX;
    // Only trigger if the drag is more than 50px to prevent accidental swipes
    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        goToNext();
      } else {
        goToPrevious();
      }
    }
    setIsDragging(false);
    setStartX(0);
    setCurrentX(0);
  };

  // Mouse event handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    // Only start drag if it's the main mouse button and not clicking on a button/link
    if (e.button === 0 && !(e.target as HTMLElement).closest('button, a')) {
      e.preventDefault();
      handleDragStart(e.clientX);
    }
  };
  const handleMouseMove = (e: React.MouseEvent) => handleDragMove(e.clientX);
  const handleMouseUp = () => handleDragEnd();
  const handleMouseLeave = () => handleDragEnd();

  // Touch event handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    // Only start drag if not touching a button/link
    if (!(e.target as HTMLElement).closest('button, a')) {
      handleDragStart(e.touches[0].clientX);
    }
  };
  const handleTouchMove = (e: React.TouchEvent) => handleDragMove(e.touches[0].clientX);
  const handleTouchEnd = () => handleDragEnd();

  // Get responsive card dimensions
  const getResponsiveDimensions = (width: number) => {
    if (width < 640) { // Mobile (<640px)
      return { width: "300px", height: "480px", offset: "0px", scale: 0.85 };
    } else if (width < 1024) { // Tablet (640-1024px)
      return { width: "380px", height: "520px", offset: "250px", scale: 0.82 };
    } else { // Desktop (>1024px)
      return { width: "460px", height: "580px", offset: "300px", scale: 0.82 };
    }
  };

  const [dimensions, setDimensions] = useState(getResponsiveDimensions(windowWidth));

  // Update dimensions on window resize
  React.useEffect(() => {
    const handleResize = () => {
      const newWidth = window.innerWidth;
      setWindowWidth(newWidth);
      setDimensions(getResponsiveDimensions(newWidth));
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Log for debugging
  React.useEffect(() => {
    console.log('Drag state:', { isDragging, startX, currentX, diff: startX - currentX });
  }, [isDragging, startX, currentX]);

  return (
    <>
      <PageShell
        eyebrow="ROADMAPS"
        title="Pick your path."
        description="Each roadmap is a structured, curated sequence. Start with the Data Analyst roadmap or dive into a specific skill."
      />

      <section className="max-w-7xl mx-auto px-4 py-8">
        <div 
          className="relative flex items-center justify-center cursor-grab active:cursor-grabbing" 
          style={{ minHeight: windowWidth < 640 ? "540px" : windowWidth < 1024 ? "580px" : "640px" }}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseLeave}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {roadmaps.map((roadmap, index) => {
            const isActive = index === activeIndex;
            const isPrev = index === prevIndex;
            const isNext = index === nextIndex;

            // Only render cards close to active — everything else stays hidden.
            if (!isActive && !isPrev && !isNext) return null;

            // Every card shares the exact same box. Position/scale is the
            // only thing that changes, and only transform/opacity/filter
            // animate — no left/width/height — so the transition never
            // triggers layout reflow and stays smooth, and every card
            // lines up on the same center axis.
            let transform = "translate(-50%, -50%)";
            let opacity = 1;
            let filter = "blur(0px)";
            let zIndex = 30;

            // Add drag offset if currently dragging
            let dragOffset = 0;
            if (isDragging && isActive) {
              dragOffset = currentX - startX;
            }

            // On mobile, don't show side cards - only show active card
            if (parseInt(dimensions.offset) > 0) {
              if (isPrev) {
                transform = `translate(calc(-50% - ${dimensions.offset} + ${dragOffset}px), -50%) scale(${dimensions.scale})`;
                opacity = 0.5;
                filter = "blur(2px)";
                zIndex = 20;
              } else if (isNext) {
                transform = `translate(calc(-50% + ${dimensions.offset} + ${dragOffset}px), -50%) scale(${dimensions.scale})`;
                opacity = 0.5;
                filter = "blur(2px)";
                zIndex = 20;
              } else if (isActive) {
                transform = `translate(calc(-50% + ${dragOffset}px), -50%)`;
              }
            } else if (isActive) {
              // Mobile - only active card, add drag offset
              transform = `translate(calc(-50% + ${dragOffset}px), -50%)`;
            }

            const cardStyle: React.CSSProperties = {
              position: "absolute",
              left: "50%",
              top: "50%",
              width: dimensions.width,
              height: dimensions.height,
              transform,
              opacity,
              filter,
              zIndex,
              transition: isDragging ? "none" : "transform 0.6s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.6s ease, filter 0.6s ease",
              willChange: "transform, opacity, filter",
              pointerEvents: isActive ? "auto" : "none", // side cards are purely decorative
            };

            return (
              <div key={roadmap.slug} style={cardStyle} aria-hidden={!isActive}>
                <div
                  className={`relative rounded-3xl border overflow-hidden h-full flex flex-col bg-gradient-to-b ${toneFor(
                    roadmap,
                    index
                  )} ${isActive ? "border-white/20" : "border-white/10"}`}
                >
                  {/* top sheen */}
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/[0.06] via-transparent to-transparent" />

                  <div className={`relative h-full flex flex-col ${windowWidth < 640 ? "p-4" : windowWidth < 1024 ? "p-6" : "p-9"}`}>
                    {/* scrollable middle content — keeps footer/CTA pinned to the same spot on every card */}
                    <div className="flex-1 min-h-0 flex flex-col overflow-y-auto pr-1 [scrollbar-width:thin] [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-thumb]:bg-white/10 [&::-webkit-scrollbar-thumb]:rounded-full">
                      {/* monogram - responsive sizing based on screen width */}
                      <div className={`flex items-center justify-center ${isActive ? "mb-2" : "flex-1"}`}>
                        <span
                          className={`font-bold tracking-tight text-white/95 select-none leading-none ${
                            isActive 
                              ? windowWidth < 640 ? "text-[45px]" : windowWidth < 1024 ? "text-[75px]" : "text-[90px]"
                              : windowWidth < 640 ? "text-[50px]" : windowWidth < 1024 ? "text-[95px]" : "text-[110px]"
                          }`}
                        >
                          {codeFor(roadmap)}
                        </span>
                      </div>

                      {/* title - using getDisplayTitle for override */}
                      <h2 className={`font-semibold text-white mb-1 ${
                        isActive 
                          ? windowWidth < 640 ? "text-lg" : windowWidth < 1024 ? "text-xl" : "text-2xl"
                          : windowWidth < 640 ? "text-sm" : "text-base"
                      }`}>
                        {getDisplayTitle(roadmap)}
                      </h2>
                      <p className={`text-white/60 mb-4 ${windowWidth < 640 ? "text-xs" : "text-sm"}`}>{roadmap.tagline}</p>

                      {/* overview + skills + stages — active card only */}
                      {isActive && (
                        <>
                          <p className={`text-white/60 mb-4 leading-relaxed line-clamp-4 ${windowWidth < 640 ? "text-xs" : "text-sm"}`}>{roadmap.overview}</p>

                          <div className="flex flex-wrap gap-1.5 mb-4">
                            {roadmap.skills.slice(0, 5).map((skill) => (
                              <span
                                key={skill}
                                className={`font-mono px-2 py-0.5 rounded bg-white/5 border border-white/10 text-white/60 ${windowWidth < 640 ? "text-[9px]" : "text-[10px]"}`}
                              >
                                {skill}
                              </span>
                            ))}
                            {roadmap.skills.length > 5 && (
                              <span className={`font-mono px-2 py-0.5 rounded bg-white/5 border border-white/10 text-white/60 ${windowWidth < 640 ? "text-[9px]" : "text-[10px]"}`}>
                                +{roadmap.skills.length - 5}
                              </span>
                            )}
                          </div>
                        </>
                      )}
                    </div>

                    {/* stats footer — pinned to the bottom of every card */}
                    <div className={`flex flex-wrap items-center gap-4 text-white/60 pt-4 mt-4 border-t border-white/10 ${windowWidth < 640 ? "text-[10px]" : "text-xs"}`}>
                      <span className="inline-flex items-center gap-1.5 font-mono">
                        <Clock className={windowWidth < 640 ? "size-3" : "size-3.5"} /> {roadmap.estimatedTime}
                      </span>
                      <span className="inline-flex items-center gap-1.5 font-mono">
                        <Signal className={windowWidth < 640 ? "size-3" : "size-3.5"} /> {roadmap.difficulty}
                      </span>
                    </div>

                    {/* CTA — always the last element, same spot on every active card */}
                    {isActive && (
                      <Link
                        to={getRoutePath(roadmap.slug)}
                        className={`mt-4 w-full inline-flex items-center justify-center gap-2 rounded-lg bg-white text-black hover:bg-white/90 transition-colors font-medium ${
                          windowWidth < 640 ? "px-3 py-2 text-xs" : "px-4 py-2.5 text-sm"
                        }`}
                      >
                        Open Roadmap
                        <ArrowRight className="size-4" />
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            );
          })}

          {/* arrows — the only way to move the carousel besides the dots */}
          <button
            onClick={goToPrevious}
            className={`absolute top-1/2 -translate-y-1/2 z-40 rounded-full border border-hairline bg-black/60 backdrop-blur flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-white/50 transition-colors ${
              windowWidth < 640 ? "left-[15px] size-10" : "left-0 size-11"
            }`}
            aria-label="Previous roadmap"
          >
            <ChevronLeft className={windowWidth < 640 ? "size-5" : "size-5"} />
          </button>
          <button
            onClick={goToNext}
            className={`absolute top-1/2 -translate-y-1/2 z-40 rounded-full border border-hairline bg-black/60 backdrop-blur flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-white/50 transition-colors ${
              windowWidth < 640 ? "right-[15px] size-10" : "right-0 size-11"
            }`}
            aria-label="Next roadmap"
          >
            <ChevronRight className={windowWidth < 640 ? "size-5" : "size-5"} />
          </button>
        </div>

        {/* dot pagination */}
        <div className="flex justify-center gap-2 mt-8">
          {roadmaps.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveIndex(index)}
              className={`transition-all duration-300 rounded-full ${
                index === activeIndex ? "w-8 h-[3px] bg-white" : "w-4 h-[3px] bg-hairline hover:bg-muted-foreground"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </section>
    </>
  );
}