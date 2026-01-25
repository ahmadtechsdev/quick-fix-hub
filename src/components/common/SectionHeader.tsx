interface SectionHeaderProps {
  label?: string;
  title: string;
  description?: string;
  centered?: boolean;
}

const SectionHeader = ({ label, title, description, centered = true }: SectionHeaderProps) => {
  return (
    <div className={`space-y-3 ${centered ? 'text-center' : ''}`}>
      {label && (
        <span className="text-primary font-semibold text-sm uppercase tracking-wider">
          {label}
        </span>
      )}
      <h2 className="font-display font-bold text-3xl md:text-4xl text-foreground">
        {title}
      </h2>
      {description && (
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          {description}
        </p>
      )}
    </div>
  );
};

export default SectionHeader;
