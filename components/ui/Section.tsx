import type { ReactNode } from "react";

type SectionTone = "light" | "muted" | "dark";

type SectionProps = {
  id?: string;
  eyebrow?: string;
  title?: string;
  description?: string;
  children: ReactNode;
  tone?: SectionTone;
  centered?: boolean;
  className?: string;
  contentClassName?: string;
};

const toneClasses: Record<SectionTone, string> = {
  light: "bg-white text-zinc-900",
  muted: "bg-zinc-50 text-zinc-900",
  dark: "bg-zinc-950 text-white",
};

const eyebrowClasses: Record<SectionTone, string> = {
  light: "text-zinc-400",
  muted: "text-zinc-400",
  dark: "text-zinc-500",
};

const descriptionClasses: Record<SectionTone, string> = {
  light: "text-zinc-500",
  muted: "text-zinc-500",
  dark: "text-zinc-300",
};

export default function Section({
  id,
  eyebrow,
  title,
  description,
  children,
  tone = "light",
  centered = false,
  className = "",
  contentClassName = "",
}: SectionProps) {
  const hasHeader = Boolean(
    eyebrow || title || description
  );

  return (
    <section
      id={id}
      className={`${toneClasses[tone]} ${className}`}
    >
      <div
        className={`mx-auto max-w-6xl px-6 py-24 sm:px-8 ${contentClassName}`}
      >
        {hasHeader && (
          <div
            className={
              centered
                ? "mx-auto max-w-3xl text-center"
                : "max-w-3xl"
            }
          >
            {eyebrow && (
              <p
                className={`text-sm font-medium uppercase tracking-[0.2em] ${eyebrowClasses[tone]}`}
              >
                {eyebrow}
              </p>
            )}

            {title && (
              <h2 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl">
                {title}
              </h2>
            )}

            {description && (
              <p
                className={`mt-5 text-lg leading-8 ${descriptionClasses[tone]}`}
              >
                {description}
              </p>
            )}
          </div>
        )}

        <div className={hasHeader ? "mt-10" : ""}>
          {children}
        </div>
      </div>
    </section>
  );
}