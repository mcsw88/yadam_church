type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  level?: 1 | 2;
  className?: string;
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  level = 2,
  className,
}: SectionHeadingProps) {
  const alignClass = align === "center" ? "text-center" : "text-left";
  const Heading: "h1" | "h2" = level === 1 ? "h1" : "h2";

  const root = ["space-y-4", alignClass, className].filter(Boolean).join(" ");

  return (
    <header className={root}>
      {eyebrow ? (
        <p className="font-sans text-xs uppercase tracking-[0.2em] text-dado-accent">
          {eyebrow}
        </p>
      ) : null}
      <Heading className="whitespace-pre-line font-serif text-3xl tracking-wide text-dado-dark md:text-4xl">
        {title}
      </Heading>
      {description ? (
        <p
          className={`font-sans max-w-2xl text-base leading-relaxed text-dado-dark/80 md:text-lg ${align === "center" ? "mx-auto" : ""}`}
        >
          {description}
        </p>
      ) : null}
    </header>
  );
}
