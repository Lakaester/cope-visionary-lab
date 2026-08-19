import type { ReactNode } from "react";
import { Search, SlidersHorizontal, X } from "lucide-react";
import { cn } from "@/lib/utils";

export function ToolbarButton({
  children,
  active,
  onClick,
  className,
  title,
}: {
  children: ReactNode;
  active?: boolean | undefined;
  onClick?: () => void;
  className?: string | undefined;
  title?: string | undefined;
}) {
  return (
    <button
      type="button"
      title={title}
      onClick={onClick}
      className={cn(
        "inline-flex h-8 items-center gap-1.5 rounded border px-2.5 text-xs font-medium transition-colors",
        active
          ? "border-primary bg-primary-5 text-primary"
          : "border-black-10 bg-white text-black-85 hover:bg-light",
        className,
      )}
    >
      {children}
    </button>
  );
}

export function SearchInput({
  value,
  onChange,
  placeholder = "Buscar…",
  className,
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string | undefined;
  className?: string | undefined;
}) {
  return (
    <div className={cn("relative", className)}>
      <Search
        className="pointer-events-none absolute left-2.5 top-1/2 size-4 -translate-y-1/2 text-black-45"
        aria-hidden
      />
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="h-10 w-full rounded border border-black-10 bg-white pl-8 pr-8 text-xs text-black-85 outline-none placeholder:text-black-25 focus:border-primary"
      />
      {value && (
        <button
          type="button"
          aria-label="Limpiar búsqueda"
          onClick={() => onChange("")}
          className="absolute right-2 top-1/2 -translate-y-1/2 text-black-45 hover:text-black-85"
        >
          <X className="size-4" />
        </button>
      )}
    </div>
  );
}

export function SegmentedControl<T extends string>({
  options,
  value,
  onChange,
  className,
}: {
  options: readonly T[];
  value: T;
  onChange: (v: T) => void;
  className?: string | undefined;
}) {
  return (
    <div
      role="tablist"
      className={cn("inline-flex h-10 items-center rounded border border-black-10 bg-white p-0.5", className)}
    >
      {options.map((opt) => (
        <button
          key={opt}
          role="tab"
          aria-selected={value === opt}
          type="button"
          onClick={() => onChange(opt)}
          className={cn(
            "h-9 rounded-[3px] px-3 text-xs font-medium transition-colors",
            value === opt
              ? "bg-primary text-white"
              : "text-black-45 hover:bg-light hover:text-black-85",
          )}
        >
          {opt}
        </button>
      ))}
    </div>
  );
}

export function SelectFilter({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: string;
  options: string[];
  onChange: (v: string) => void;
}) {
  return (
    <label className="inline-flex h-10 items-center gap-1.5 rounded border border-black-10 bg-white pl-3 pr-2 text-xs focus-within:border-primary">
      <span className="text-black-45">{label}</span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="h-8 border-0 bg-transparent pr-1 text-xs font-medium text-black-85 outline-none"
      >
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
    </label>
  );
}

export function FilterBar({
  children,
  right,
  className,
}: {
  children: ReactNode;
  right?: ReactNode | undefined;
  className?: string | undefined;
}) {
  return (
    <div
      className={cn(
        "flex flex-wrap items-end gap-3 px-5 pb-3 md:px-6",
        className,
      )}
    >
      <SlidersHorizontal className="mb-3 size-4 text-black-25" aria-hidden />
      {children}
      {right && <div className="ml-auto flex items-center gap-2 pb-2">{right}</div>}
    </div>
  );
}