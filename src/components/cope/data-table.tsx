import { useMemo, useState, type ReactNode } from "react";
import { ChevronDown, ChevronUp, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { EmptyState, LoadingState, SkeletonRows } from "./primitives";

export interface Column<T> {
  key: string;
  header: string;
  align?: "left" | "right" | undefined;
  width?: string | undefined;
  /** Devuelve el valor por el que se ordena la columna. Si falta, la columna no ordena. */
  sortValue?: ((row: T) => string | number) | undefined;
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
  loading = false,
  pageSize,
}: {
  columns: Column<T>[];
  rows: T[];
  getRowId: (row: T) => string;
  selectedId?: string | null | undefined;
  onSelect?: (row: T) => void;
  maxHeight?: string | undefined;
  emptyMessage?: string | undefined;
  loading?: boolean | undefined;
  pageSize?: number | undefined;
}) {
  const [sort, setSort] = useState<{ key: string; dir: "asc" | "desc" } | null>(null);
  const [page, setPage] = useState(0);

  const sorted = useMemo(() => {
    if (!sort) return rows;
    const col = columns.find((c) => c.key === sort.key);
    if (!col?.sortValue) return rows;
    const get = col.sortValue;
    return [...rows].sort((a, b) => {
      const va = get(a);
      const vb = get(b);
      const cmp =
        typeof va === "number" && typeof vb === "number"
          ? va - vb
          : String(va).localeCompare(String(vb), "es", { numeric: true });
      return sort.dir === "asc" ? cmp : -cmp;
    });
  }, [rows, sort, columns]);

  const pages = pageSize ? Math.max(1, Math.ceil(sorted.length / pageSize)) : 1;
  const current = Math.min(page, pages - 1);
  const visible = pageSize ? sorted.slice(current * pageSize, current * pageSize + pageSize) : sorted;

  const toggleSort = (key: string) =>
    setSort((s) => (s?.key === key ? (s.dir === "asc" ? { key, dir: "desc" } : null) : { key, dir: "asc" }));

  if (loading) {
    return (
      <div>
        <SkeletonRows />
        <LoadingState />
      </div>
    );
  }

  if (rows.length === 0) {
    return <EmptyState description={emptyMessage ?? "No hay registros para los filtros aplicados."} />;
  }
  return (
    <>
    <div className="scroll-y" style={{ maxHeight }}>
      <table className="w-full border-collapse text-[12.5px]">
        <thead className="sticky top-0 z-10 bg-surface-2">
          <tr className="border-b border-border">
            {columns.map((c) => {
              const active = sort?.key === c.key;
              return (
              <th
                key={c.key}
                scope="col"
                style={{ width: c.width }}
                aria-sort={active ? (sort!.dir === "asc" ? "ascending" : "descending") : undefined}
                className={cn(
                  "whitespace-nowrap px-3 py-2 text-[11px] font-semibold uppercase tracking-wide text-muted-foreground",
                  active && "text-foreground",
                  c.align === "right" ? "text-right" : "text-left",
                )}
              >
                {c.sortValue ? (
                  <button
                    type="button"
                    onClick={() => toggleSort(c.key)}
                    className={cn(
                      "inline-flex items-center gap-1 uppercase tracking-wide outline-none hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring/50",
                      c.align === "right" && "flex-row-reverse",
                    )}
                  >
                    {c.header}
                    {active ? (
                      sort!.dir === "asc" ? (
                        <ChevronUp className="size-3" aria-hidden />
                      ) : (
                        <ChevronDown className="size-3" aria-hidden />
                      )
                    ) : (
                      <ChevronsUpDown className="size-3 opacity-40" aria-hidden />
                    )}
                  </button>
                ) : (
                  c.header
                )}
              </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {visible.map((row) => {
            const id = getRowId(row);
            const selected = selectedId === id;
            return (
              <tr
                key={id}
                onClick={onSelect ? () => onSelect(row) : undefined}
                onKeyDown={
                  onSelect
                    ? (e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          e.preventDefault();
                          onSelect(row);
                        }
                      }
                    : undefined
                }
                tabIndex={onSelect ? 0 : undefined}
                aria-selected={selected}
                className={cn(
                  "border-b border-border/70 transition-colors",
                  onSelect && "cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring/50",
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
    {pageSize && pages > 1 && (
      <div className="flex items-center justify-between gap-2 border-t border-border px-3 py-2 text-[11.5px] text-muted-foreground">
        <span className="num">
          {current * pageSize + 1}–{Math.min((current + 1) * pageSize, sorted.length)} de {sorted.length}
        </span>
        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={() => setPage(Math.max(0, current - 1))}
            disabled={current === 0}
            className="rounded border border-border px-2 py-1 font-medium text-foreground disabled:opacity-40 enabled:hover:bg-muted"
          >
            Anterior
          </button>
          <span className="num">
            {current + 1} / {pages}
          </span>
          <button
            type="button"
            onClick={() => setPage(Math.min(pages - 1, current + 1))}
            disabled={current >= pages - 1}
            className="rounded border border-border px-2 py-1 font-medium text-foreground disabled:opacity-40 enabled:hover:bg-muted"
          >
            Siguiente
          </button>
        </div>
      </div>
    )}
    </>
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