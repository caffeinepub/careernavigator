import { cn } from "@/lib/utils";

interface CategoryBadgeProps {
  category: string;
  className?: string;
}

const categoryStyles: Record<string, string> = {
  Technical: "bg-cat-technical border-cat-technical cat-technical",
  Medical: "bg-cat-medical border-cat-medical cat-medical",
  Creative: "bg-cat-creative border-cat-creative cat-creative",
  Business: "bg-cat-business border-cat-business cat-business",
  Government: "bg-cat-government border-cat-government cat-government",
  Research: "bg-cat-research border-cat-research cat-research",
};

export function CategoryBadge({ category, className }: CategoryBadgeProps) {
  const style =
    categoryStyles[category] ?? "bg-muted text-muted-foreground border-border";
  return (
    <span
      className={cn(
        "inline-flex items-center px-2 py-0.5 rounded-full text-xs font-ui font-semibold border",
        style,
        className,
      )}
    >
      {category}
    </span>
  );
}
