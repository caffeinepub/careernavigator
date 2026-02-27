import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";
import { ArrowRight, TrendingUp } from "lucide-react";
import type { Career } from "../backend.d";
import { CategoryBadge } from "./CategoryBadge";

interface CareerCardProps {
  career: Career;
  trending?: boolean;
}

/** Per-category accent config: left strip + background wash */
const CATEGORY_ACCENT: Record<
  string,
  { strip: string; wash: string; glow: string }
> = {
  Technical: {
    strip: "oklch(0.46 0.21 264)",
    wash: "oklch(0.46 0.21 264 / 0.04)",
    glow: "oklch(0.46 0.21 264 / 0.12)",
  },
  Medical: {
    strip: "oklch(0.55 0.17 155)",
    wash: "oklch(0.55 0.17 155 / 0.04)",
    glow: "oklch(0.55 0.17 155 / 0.12)",
  },
  Creative: {
    strip: "oklch(0.52 0.22 290)",
    wash: "oklch(0.52 0.22 290 / 0.04)",
    glow: "oklch(0.52 0.22 290 / 0.12)",
  },
  Business: {
    strip: "oklch(0.68 0.19 55)",
    wash: "oklch(0.68 0.19 55 / 0.04)",
    glow: "oklch(0.68 0.19 55 / 0.12)",
  },
  Government: {
    strip: "oklch(0.62 0.2 35)",
    wash: "oklch(0.62 0.2 35 / 0.04)",
    glow: "oklch(0.62 0.2 35 / 0.12)",
  },
  Research: {
    strip: "oklch(0.52 0.18 195)",
    wash: "oklch(0.52 0.18 195 / 0.04)",
    glow: "oklch(0.52 0.18 195 / 0.12)",
  },
};

const DEFAULT_ACCENT = {
  strip: "oklch(0.5 0.1 258)",
  wash: "oklch(0.5 0.1 258 / 0.04)",
  glow: "oklch(0.5 0.1 258 / 0.12)",
};

export function CareerCard({ career, trending }: CareerCardProps) {
  const accent = CATEGORY_ACCENT[career.category] ?? DEFAULT_ACCENT;

  return (
    <div
      className="group relative rounded-xl overflow-hidden border border-border bg-card
                 transition-all duration-300
                 hover:-translate-y-1"
      style={{
        backgroundColor: accent.wash,
        boxShadow:
          "0 2px 8px oklch(0 0 0 / 0.06), 0 0 0 1px oklch(var(--border))",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.boxShadow =
          `0 8px 28px ${accent.glow}, 0 0 0 1px oklch(var(--border))`;
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.boxShadow =
          "0 2px 8px oklch(0 0 0 / 0.06), 0 0 0 1px oklch(var(--border))";
      }}
    >
      {/* Category color left accent strip */}
      <div
        className="absolute left-0 top-0 bottom-0 w-1 rounded-l-xl transition-all duration-300 group-hover:w-1.5"
        style={{ backgroundColor: accent.strip }}
      />

      {/* Trending badge */}
      {trending && (
        <div className="absolute top-3 right-3 flex items-center gap-1 text-[10px] text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-900/25 px-2 py-1 rounded-full font-ui font-bold border border-amber-200 dark:border-amber-800/40">
          <TrendingUp className="w-3 h-3" />
          Trending
        </div>
      )}

      <div className="pl-5 pr-4 pt-5 pb-4">
        {/* Header */}
        <div className="mb-3">
          <CategoryBadge category={career.category} className="mb-2.5" />
          <h3
            className="font-display font-bold text-[15px] leading-snug pr-14 transition-colors duration-200"
            style={{ color: "oklch(var(--foreground))" }}
          >
            <span className="group-hover:text-primary transition-colors duration-200">
              {career.title}
            </span>
          </h3>
        </div>

        {/* Description */}
        <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed mb-4">
          {career.description}
        </p>

        {/* Footer */}
        <div className="flex items-end justify-between">
          <div>
            <p className="text-[10px] text-muted-foreground font-ui uppercase tracking-wide mb-0.5">
              Entry Salary
            </p>
            <p className="text-sm font-ui font-bold text-foreground">
              {career.salaryEntry}
            </p>
          </div>
          <Button
            asChild
            variant="ghost"
            size="sm"
            className="h-8 px-3 text-xs font-ui font-semibold text-primary hover:text-primary hover:bg-primary/10 group/btn"
          >
            <Link to="/careers/$id" params={{ id: career.id.toString() }}>
              Details
              <ArrowRight className="w-3 h-3 ml-1 group-hover/btn:translate-x-0.5 transition-transform" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
