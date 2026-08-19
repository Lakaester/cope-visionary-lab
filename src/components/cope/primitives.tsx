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
    <header className="px-5 pt-4 md:px-6">
      {breadcrumb && breadcrumb.length > 0 && (
        <nav className="mb-1 text-[10px] uppercase tracking-wide text-black-25">
          {breadcrumb.join(" / ")}
        </nav>
      )}
      <div className="flex flex-wrap items-start justify-between gap-3 pb-3">
        <div className="min-w-0">
          <h1 className="text-base font-semibold leading-tight text-black-85">{title}</h1>
          {description && (
            <p className="mt-0.5 text-[10px] text-black-25">{description}</p>
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
    <div className="flex items-center justify-between gap-3 border-b border-black-5 bg-light px-3 py-2">
      <div className="flex min-w-0 items-baseline gap-2">
        <h2 className="text-[12px] font-semibold text-black-85">
          {title}
        </h2>
        {hint && <span className="truncate text-[10px] text-black-45">{hint}</span>}
      </div>
      {actions && <div className="flex shrink-0 items-center gap-1.5">{actions}</div>}
    </div>
  );
}

export function Panel({ className, children }: { className?: string | undefined; children: ReactNode }) {
  return (
    <section className={cn("overflow-hidden rounded-lg border border-black-5 bg-white", className)}>
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
  neutral: "bg-black-5 text-black-45",
  info: "bg-primary-5 text-primary",
  success: "bg-success-5 text-success",
  warning: "bg-warning-5 text-warning",
  danger: "bg-danger-5 text-danger",
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
        "inline-flex items-center gap-1 rounded px-2 py-0.5 text-[10px] font-medium leading-none",
        toneClasses[tone],
        className,
      )}
    >
      <span className="text-[7px] leading-none" aria-hidden>
        ●
      </span>
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
    neutral: "bg-black-25",
    info: "bg-primary",
    success: "bg-success",
    warning: "bg-warning",
    danger: "bg-danger",
  };
  return (
    <span className={cn("inline-flex items-center gap-1.5 text-xs text-black-85", className)}>
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
    neutral: "bg-black-10",
    info: "bg-primary",
    success: "bg-success",
    warning: "bg-warning",
    danger: "bg-danger",
  };
  const deltaText: Record<Tone, string> = {
    neutral: "text-black-45",
    info: "text-primary",
    success: "text-success",
    warning: "text-warning",
    danger: "text-danger",
  };
  return (
    <div className="relative overflow-hidden rounded-lg border border-black-5 bg-white p-4">
      <span className={cn("absolute inset-y-0 left-0 w-0.5", bar[accent])} aria-hidden />
      <p className="text-[10px] font-medium text-black-45">{label}</p>
      <div className="mt-1 flex items-baseline gap-1.5">
        <span className="num text-xl font-semibold leading-none text-black-85">{value}</span>
        {unit && <span className="text-xs text-black-45">{unit}</span>}
        {delta && (
          <span className={cn("num ml-auto text-xs font-medium", deltaText[deltaTone])}>
            {delta}
          </span>
        )}
      </div>
      {hint && <p className="mt-1 text-[10px] text-black-25">{hint}</p>}
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
      <Inbox className="size-5 text-black-25" aria-hidden />
      <p className="text-sm font-medium text-black-85">{title}</p>
      <p className="max-w-sm text-xs text-black-45">{description}</p>
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
      <p className="text-sm font-medium text-black-85">{title}</p>
      <p className="max-w-sm text-xs text-black-45">{description}</p>
      <button
        type="button"
        onClick={onRetry}
        className="mt-1 inline-flex h-10 items-center gap-2 rounded border border-primary bg-primary-5 px-3 text-xs font-medium text-primary hover:bg-primary-10"
      >
        <RefreshCw className="size-4" aria-hidden /> Reintentar
      </button>
    </div>
  );
}

export function LoadingState({ label = "Cargando datos…" }: { label?: string | undefined }) {
  return (
    <div className="flex items-center justify-center gap-2 px-6 py-12 text-xs text-black-45">
      <Loader2 className="size-4 animate-spin" aria-hidden />
      {label}
    </div>
  );
}

export function SkeletonRows({ rows = 6 }: { rows?: number | undefined }) {
  return (
    <div className="divide-y divide-black-5">
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="flex items-center gap-3 px-3 py-2.5">
          <div className="h-3 w-24 animate-pulse rounded bg-light" />
          <div className="h-3 flex-1 animate-pulse rounded bg-light" />
          <div className="h-3 w-16 animate-pulse rounded bg-light" />
        </div>
      ))}
    </div>
  );
}