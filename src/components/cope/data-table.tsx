import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { EmptyState } from "./primitives";

export interface Column<T> {
  key: string;
  header: string;
  align?: "left" | "right" | undefined;
  width?: string | undefined;
  cell: (row: T) => ReactNode;
}

export function DataTable<T>({
  columns,
  rows,
  getRowId,
  selectedId,
  onSelect,
  maxHeight = "auto",
  emptyMessage,
}: {
  columns: Column<T>[];
  rows: T[];
  getRowId: (row: T) => string;
  selectedId?: string | null | undefined;
  onSelect?: (row: T) => void;
  maxHeight?: string | undefined;
  emptyMessage?: string | undefined;
}) {
  if (rows.length === 0) {
    return <EmptyState description={emptyMessage ?? "No hay registros para los filtros aplicados."} />;
  }
  return (
    <div className="scroll-y" style={{ maxHeight }}>
      <table className="w-full border-collapse text-[12.5px]">
        <thead className="sticky top-0 z-10 bg-surface-2">
          <tr className="border-b border-border">
            {columns.map((c) => (
              <th
                key={c.key}
                scope="col"
                style={{ width: c.width }}
                className={cn(
                  "whitespace-nowrap px-3 py-2 text-[11px] font-semibold uppercase tracking-wide text-muted-foreground",
                  c.align === "right" ? "text-right" : "text-left",
                )}
              >
                {c.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => {
            const id = getRowId(row);
            const selected = selectedId === id;
            return (
              <tr
                key={id}
                onClick={onSelect ? () => onSelect(row) : undefined}
                aria-selected={selected}
                className={cn(
                  "border-b border-border/70 transition-colors",
                  onSelect && "cursor-pointer",
                  selected ? "bg-info-soft" : "hover:bg-surface-2",
                )}
              >
                {columns.map((c) => (
                  <td
                    key={c.key}
                    className={cn(
                      "px-3 py-[7px] align-middle",
                      c.align === "right" ? "num text-right" : "text-left",
                    )}
                  >
                    {c.cell(row)}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export function MiniBar({ value, tone = "info" }: { value: number; tone?: "info" | "success" | "warning" | "danger" | undefined }) {
  const bg = {
    info: "bg-info",
    success: "bg-success",
    warning: "bg-warning",
    danger: "bg-danger",
  }[tone];
  return (
    <div className="flex items-center justify-end gap-2">
      <div className="h-1.5 w-16 overflow-hidden rounded-full bg-neutral-soft">
        <div className={cn("h-full rounded-full", bg)} style={{ width: `${Math.min(value, 100)}%` }} />
      </div>
      <span className="num w-9 text-right text-[12px]">{value}%</span>
    </div>
  );
}