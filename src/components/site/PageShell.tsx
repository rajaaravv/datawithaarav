import type { ReactNode } from "react";

export function PageShell({
  eyebrow,
  title,
  description,
  children,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  children?: ReactNode;
}) {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-20 md:pt-24 pb-10 text-center animate-fade-up">
      {eyebrow && (
        <div className="inline-flex items-center px-3 py-1 mb-4 md:mb-6 rounded-full border border-hairline bg-surface-1/60 text-[11px] font-medium tracking-[0.14em] uppercase text-muted-foreground">
          {eyebrow}
        </div>
      )}
      <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-[-0.04em] leading-[1.05] text-balance mx-auto max-w-4xl text-gradient-brand">
        {title}
      </h1>
      {description && (
        <p className="mt-4 md:mt-6 text-base sm:text-lg md:text-xl text-muted-foreground text-pretty mx-auto max-w-2xl leading-relaxed">
          {description}
        </p>
      )}
      {children}
    </div>
  );
}