interface SectionHeaderProps {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: 'left' | 'center';
}

export default function SectionHeader({
  eyebrow,
  title,
  description,
  align = 'left',
}: SectionHeaderProps) {
  return (
    <header
      className={`mb-10 ${
        align === 'center' ? 'text-center mx-auto max-w-2xl' : 'max-w-2xl'
      }`}
    >
      {eyebrow && (
        <p className="text-xs uppercase tracking-[0.2em] text-orange-500 font-medium">
          {eyebrow}
        </p>
      )}
      <h2 className="mt-2 font-display text-3xl md:text-4xl text-ink-900 font-semibold tracking-tight text-balance">
        {title}
      </h2>
      {description && (
        <p className="mt-3 text-ink-600 leading-relaxed text-pretty">
          {description}
        </p>
      )}
    </header>
  );
}
