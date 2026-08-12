import { useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { ChevronRight } from "lucide-react";
import { PageHeader, KpiCard, EmptyState } from "@/components/cope/primitives";
import { FilterBar, SearchInput, SelectFilter } from "@/components/cope/controls";
import { DataTable, MiniBar, type Column } from "@/components/cope/data-table";
import { clientes } from "@/lib/cope-data";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/clientes")({
  head: () => ({
    meta: [
      { title: "Clientes · COPE" },
      { name: "description", content: "Explorador jerárquico cliente → categoría → subcategoría con detalle de volumen y SLA." },
      { property: "og:title", content: "Clientes · COPE" },
      { property: "og:description", content: "Explorador jerárquico cliente → categoría → subcategoría con detalle de volumen y SLA." },
    ],
  }),
  component: Clientes,
});

type Sub = { nombre: string; atenciones: number; share: number; trm: number; sla: number };

const cols: Column<Sub>[] = [
  { key: "n", header: "Subcategoría", cell: (r) => <span className="font-medium">{r.nombre}</span> },
  { key: "a", header: "Atenciones", align: "right", width: "110px", cell: (r) => r.atenciones },
  { key: "s", header: "Participación", align: "right", width: "116px", cell: (r) => `${r.share}%` },
  { key: "t", header: "TRM", align: "right", width: "90px", cell: (r) => `${r.trm} min` },
  { key: "sla", header: "SLA", align: "right", width: "150px", cell: (r) => <MiniBar value={r.sla} tone={r.sla >= 90 ? "success" : r.sla >= 80 ? "warning" : "danger"} /> },
];

function Clientes() {
  const [query, setQuery] = useState("");
  const [clienteSel, setClienteSel] = useState(clientes[0]!.cliente);
  const [catSel, setCatSel] = useState(clientes[0]!.categorias[0]!.nombre);

  const lista = useMemo(
    () => clientes.filter((c) => c.cliente.toLowerCase().includes(query.trim().toLowerCase())),
    [query],
  );
  const cliente = clientes.find((c) => c.cliente === clienteSel) ?? clientes[0]!;
  const categoria = cliente.categorias.find((c) => c.nombre === catSel) ?? cliente.categorias[0]!;

  return (
    <>
      <PageHeader
        title="Clientes"
        description="Explorador jerárquico: cliente → categoría → subcategoría"
        breadcrumb={["COPE", "Clientes"]}
      />
      <FilterBar>
        <SelectFilter label="País" value="Todos" onChange={() => {}} options={["Todos", "Perú", "Chile", "Colombia"]} />
        <SelectFilter label="Periodo" value="30 días" onChange={() => {}} options={["7 días", "30 días", "Trimestre"]} />
        <SelectFilter label="Plan" value="Todos" onChange={() => {}} options={["Todos", "Restaurant Pro", "Restaurant Básico"]} />
      </FilterBar>

      <div className="flex min-h-0 flex-1">
        <ExplorerColumn title="Cliente" width="w-[248px]">
          <div className="border-b border-border p-2">
            <SearchInput value={query} onChange={setQuery} placeholder="Buscar cliente…" />
          </div>
          <ul className="min-h-0 flex-1 scroll-y">
            {lista.length === 0 && <EmptyState description="Ningún cliente coincide con la búsqueda." />}
            {lista.map((c) => (
              <ExplorerItem
                key={c.cliente}
                label={c.cliente}
                meta={`${c.atenciones} atenciones`}
                active={c.cliente === clienteSel}
                onClick={() => {
                  setClienteSel(c.cliente);
                  setCatSel(c.categorias[0]!.nombre);
                }}
              />
            ))}
          </ul>
        </ExplorerColumn>

        <ExplorerColumn title="Categoría" width="w-[236px]">
          <ul className="min-h-0 flex-1 scroll-y">
            {cliente.categorias.map((c) => (
              <ExplorerItem
                key={c.nombre}
                label={c.nombre}
                meta={`${c.atenciones} · ${c.share}%`}
                active={c.nombre === categoria.nombre}
                onClick={() => setCatSel(c.nombre)}
              />
            ))}
          </ul>
        </ExplorerColumn>

        <section className="flex min-w-0 flex-1 flex-col bg-background">
          <div className="border-b border-border bg-surface px-4 py-2">
            <p className="text-[11.5px] uppercase tracking-wide text-muted-foreground">
              {cliente.cliente} / {categoria.nombre}
            </p>
            <h2 className="text-[14px] font-semibold">Detalle de la categoría</h2>
          </div>
          <div className="min-h-0 flex-1 scroll-y p-4">
            <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
              <KpiCard label="Volumen" value={categoria.atenciones} hint="Atenciones del periodo" accent="info" />
              <KpiCard label="Participación" value={`${categoria.share}`} unit="%" hint="Del total del cliente" accent="neutral" />
              <KpiCard label="TRM" value={categoria.trm} unit="min" hint="Primera respuesta" accent="warning" />
              <KpiCard
                label="SLA"
                value={`${categoria.sla}`}
                unit="%"
                hint={categoria.sla >= 90 ? "Dentro de meta" : "Bajo la meta de 90%"}
                accent={categoria.sla >= 90 ? "success" : "danger"}
              />
            </div>
            <section className="mt-3 rounded-md border border-border bg-surface">
              <div className="border-b border-border px-3 py-2 text-[12px] font-semibold uppercase tracking-wide">
                Subcategorías
              </div>
              <DataTable columns={cols} rows={categoria.subcategorias} getRowId={(r) => r.nombre} />
            </section>
          </div>
        </section>
      </div>
    </>
  );
}

function ExplorerColumn({ title, width, children }: { title: string; width: string; children: React.ReactNode }) {
  return (
    <section className={cn("flex shrink-0 flex-col border-r border-border bg-surface", width)}>
      <div className="border-b border-border px-3 py-2 text-[11.5px] font-semibold uppercase tracking-wide text-muted-foreground">
        {title}
      </div>
      {children}
    </section>
  );
}

function ExplorerItem({
  label,
  meta,
  active,
  onClick,
}: {
  label: string;
  meta: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <li>
      <button
        type="button"
        onClick={onClick}
        className={cn(
          "flex w-full items-center gap-2 border-b border-l-2 border-border py-2 pl-[10px] pr-2 text-left text-[12.5px] transition-colors",
          active ? "border-l-primary bg-info-soft font-medium" : "border-l-transparent hover:bg-surface-2",
        )}
      >
        <span className="min-w-0 flex-1 truncate">{label}</span>
        <span className="num shrink-0 text-[11.5px] text-muted-foreground">{meta}</span>
        <ChevronRight className={cn("size-3.5 shrink-0", active ? "text-primary" : "text-muted-foreground/60")} />
      </button>
    </li>
  );
}
