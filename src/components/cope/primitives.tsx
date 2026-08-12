import type { ReactNode } from "react";
import { AlertTriangle, Inbox, Loader2, RefreshCw } from "lucide-react";
import { cn } from "@/lib/utils";

/* ---------------------------------- Page --------------------------------- */

export function PageHeader({
  title,
  description,
  breadcrumb,
  actions,
  children,
}: {
  title: string;
  description?: string | undefined;
  breadcrumb?: string[] | undefined;
  actions?: ReactNode | undefined;
  children?: ReactNode | undefined;
}) {
  return (
    <header className="border-b border-border bg-surface px-5 pt-4">
      {breadcrumb && breadcrumb.length > 0 && (
        <nav className="mb-1 text-[11px] uppercase tracking-wide text-muted-foreground">
          {breadcrumb.join(" / ")}
        </nav>
      )}
      <div className="flex flex-wrap items-start justify-between gap-3 pb-3">
        <div className="min-w-0">
          <h1 className="text-[17px] font-semibold leading-tight text-foreground">{title}</h1>
          {description && (
            <p className="mt-0.5 text-[12.5px] text-muted-foreground">{description}</p>
          )}
        </div>
        {actions && <div className="flex shrink-0 items-center gap-2">{actions}</div>}
      </div>
      {children}
    </header>
  );
}

export function SectionHeader({
  title,
  hint,
  actions,
}: {
  title: string;
  hint?: string | undefined;
  actions?: ReactNode | undefined;
}) {
  return (
    <div className="flex items-center justify-between gap-3 border-b border-border px-3 py-2">
      <div className="flex min-w-0 items-baseline gap-2">
        <h2 className="text-[12px] font-semibold uppercase tracking-wide text-foreground">
          {title}
        </h2>
        {hint && <span className="truncate text-[11.5px] text-muted-foreground">{hint}</span>}
      </div>
      {actions && <div className="flex shrink-0 items-center gap-1.5">{actions}</div>}
    </div>
  );
}

export function Panel({ className, children }: { className?: string | undefined; children: ReactNode }) {
  return (
    <section className={cn("rounded-md border border-border bg-surface", className)}>
      {children}
    </section>
  );
}

export function ScrollContainer({
  className,
  children,
}: {
  className?: string | undefined;
  children: ReactNode;
}) {
  return <div className={cn("min-h-0 flex-1 scroll-y", className)}>{children}</div>;
}

/* --------------------------------- Status -------------------------------- */

export type Tone = "neutral" | "info" | "success" | "warning" | "danger";

const toneClasses: Record<Tone, string> = {
  neutral: "bg-neutral-soft text-muted-foreground border-border",
  info: "bg-info-soft text-info border-info/20",
  success: "bg-success-soft text-success border-success/20",
  warning: "bg-warning-soft text-warning border-warning/25",
  danger: "bg-danger-soft text-danger border-danger/20",
};

export function Badge({
  tone = "neutral",
  children,
  className,
}: {
  tone?: Tone | undefined;
  children: ReactNode;
  className?: string | undefined;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded border px-1.5 py-0.5 text-[11px] font-medium leading-none",
        toneClasses[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}

export function StatusIndicator({
  tone = "neutral",
  label,
  className,
}: {
  tone?: Tone | undefined;
  label: string;
  className?: string | undefined;
}) {
  const dot: Record<Tone, string> = {
    neutral: "bg-muted-foreground",
    info: "bg-info",
    success: "bg-success",
    warning: "bg-warning",
    danger: "bg-danger",
  };
  return (
    <span className={cn("inline-flex items-center gap-1.5 text-[12px]", className)}>
      <span className={cn("size-1.5 rounded-full", dot[tone])} aria-hidden />
      {label}
    </span>
  );
}

/* ---------------------------------- KPI ---------------------------------- */

export function KpiCard({
  label,
  value,
  unit,
  delta,
  deltaTone = "neutral",
  hint,
  accent = "neutral",
}: {
  label: string;
  value: string | number;
  unit?: string | undefined;
  delta?: string | undefined;
  deltaTone?: Tone | undefined;
  hint?: string | undefined;
  accent?: Tone | undefined;
}) {
  const bar: Record<Tone, string> = {
    neutral: "bg-border",
    info: "bg-info",
    success: "bg-success",
    warning: "bg-warning",
    danger: "bg-danger",
  };
  const deltaText: Record<Tone, string> = {
    neutral: "text-muted-foreground",
    info: "text-info",
    success: "text-success",
    warning: "text-warning",
    danger: "text-danger",
  };
  return (
    <div className="relative overflow-hidden rounded-md border border-border bg-surface px-3 py-2.5">
      <span className={cn("absolute inset-y-0 left-0 w-0.5", bar[accent])} aria-hidden />
      <p className="text-[11.5px] font-medium uppercase tracking-wide text-muted-foreground">
        {label}
      </p>
      <div className="mt-1 flex items-baseline gap-1.5">
        <span className="num text-[22px] font-semibold leading-none text-foreground">{value}</span>
        {unit && <span className="text-[12px] text-muted-foreground">{unit}</span>}
        {delta && (
          <span className={cn("num ml-auto text-[12px] font-medium", deltaText[deltaTone])}>
            {delta}
          </span>
        )}
      </div>
      {hint && <p className="mt-1 text-[11.5px] text-muted-foreground">{hint}</p>}
    </div>
  );
}

/* --------------------------------- States -------------------------------- */

export function EmptyState({
  title = "Sin resultados",
  description = "Ajusta los filtros para ampliar la búsqueda.",
  action,
}: {
  title?: string | undefined;
  description?: string | undefined;
  action?: ReactNode | undefined;
}) {
  return (
    <div className="flex flex-col items-center justify-center gap-2 px-6 py-12 text-center">
      <Inbox className="size-5 text-muted-foreground" aria-hidden />
      <p className="text-[13px] font-medium text-foreground">{title}</p>
      <p className="max-w-sm text-[12.5px] text-muted-foreground">{description}</p>
      {action}
    </div>
  );
}

export function ErrorState({
  title = "No se pudo cargar la información",
  description = "Ocurrió un problema al consultar el servicio. Vuelve a intentarlo.",
  onRetry,
}: {
  title?: string | undefined;
  description?: string | undefined;
  onRetry?: () => void;
}) {
  return (
    <div className="flex flex-col items-center justify-center gap-2 px-6 py-12 text-center">
      <AlertTriangle className="size-5 text-danger" aria-hidden />
      <p className="text-[13px] font-medium text-foreground">{title}</p>
      <p className="max-w-sm text-[12.5px] text-muted-foreground">{description}</p>
      <button
        type="button"
        onClick={onRetry}
        className="mt-1 inline-flex items-center gap-1.5 rounded border border-border bg-surface px-2.5 py-1.5 text-[12px] font-medium text-foreground hover:bg-muted"
      >
        <RefreshCw className="size-3.5" aria-hidden /> Reintentar
      </button>
    </div>
  );
}

export function LoadingState({ label = "Cargando datos…" }: { label?: string | undefined }) {
  return (
    <div className="flex items-center justify-center gap-2 px-6 py-12 text-[12.5px] text-muted-foreground">
      <Loader2 className="size-4 animate-spin" aria-hidden />
      {label}
    </div>
  );
}

export function SkeletonRows({ rows = 6 }: { rows?: number | undefined }) {
  return (
    <div className="divide-y divide-border">
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="flex items-center gap-3 px-3 py-2.5">
          <div className="h-3 w-24 animate-pulse rounded bg-muted" />
          <div className="h-3 flex-1 animate-pulse rounded bg-muted" />
          <div className="h-3 w-16 animate-pulse rounded bg-muted" />
        </div>
      ))}
    </div>
  );
}