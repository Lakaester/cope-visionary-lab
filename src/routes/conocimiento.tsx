import { useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { PageHeader, ScrollContainer, Badge, EmptyState } from "@/components/cope/primitives";
import { FilterBar, SearchInput, SelectFilter } from "@/components/cope/controls";

export const Route = createFileRoute("/conocimiento")({
  head: () => ({
    meta: [
      { title: "Conocimiento · COPE" },
      { name: "description", content: "Guías, protocolos y respuestas oficiales del equipo de Soporte Especializado." },
      { property: "og:title", content: "Conocimiento · COPE" },
      { property: "og:description", content: "Guías, protocolos y respuestas oficiales del equipo de Soporte Especializado." },
    ],
  }),
  component: Conocimiento,
});

const articulos = [
  { titulo: "Duplicidad de pedidos en delivery", categoria: "Integraciones", estado: "Vigente", actualizado: "12 ago 2026", usos: 214 },
  { titulo: "Validación de conector POS", categoria: "Integraciones", estado: "Vigente", actualizado: "04 ago 2026", usos: 168 },
  { titulo: "Emisión de comprobantes rechazados", categoria: "Facturación", estado: "En revisión", actualizado: "29 jul 2026", usos: 141 },
  { titulo: "Protocolo de escalamiento nivel 2", categoria: "Operación", estado: "Vigente", actualizado: "21 jul 2026", usos: 133 },
  { titulo: "Gestión de quejas por cobro duplicado", categoria: "Quejas", estado: "Vigente", actualizado: "18 jul 2026", usos: 97 },
  { titulo: "Reset de accesos al panel administrador", categoria: "Cuenta", estado: "Desactualizado", actualizado: "02 may 2026", usos: 64 },
];

function Conocimiento() {
  const [query, setQuery] = useState("");
  const lista = useMemo(
    () => articulos.filter((a) => a.titulo.toLowerCase().includes(query.trim().toLowerCase())),
    [query],
  );

  return (
    <>
      <PageHeader
        title="Conocimiento"
        description="Guías y protocolos oficiales usados durante la atención"
        breadcrumb={["COPE", "Conocimiento"]}
      />
      <FilterBar>
        <SearchInput value={query} onChange={setQuery} placeholder="Buscar guía…" className="w-64" />
        <SelectFilter label="Categoría" value="Todas" onChange={() => {}} options={["Todas", "Integraciones", "Facturación", "Operación", "Quejas", "Cuenta"]} />
        <SelectFilter label="Estado" value="Todos" onChange={() => {}} options={["Todos", "Vigente", "En revisión", "Desactualizado"]} />
      </FilterBar>

      <ScrollContainer className="px-5 py-4">
        {lista.length === 0 ? (
          <EmptyState description="No encontramos guías con ese criterio." />
        ) : (
          <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
            {lista.map((a) => (
              <article key={a.titulo} className="rounded-md border border-border bg-surface p-3">
                <div className="flex items-start justify-between gap-2">
                  <h2 className="text-[13px] font-semibold leading-snug">{a.titulo}</h2>
                  <Badge tone={a.estado === "Vigente" ? "success" : a.estado === "En revisión" ? "warning" : "danger"}>
                    {a.estado}
                  </Badge>
                </div>
                <p className="mt-1 text-[12px] text-muted-foreground">{a.categoria}</p>
                <div className="mt-3 flex items-center justify-between border-t border-border pt-2 text-[11.5px] text-muted-foreground">
                  <span>Actualizado {a.actualizado}</span>
                  <span className="num">{a.usos} usos</span>
                </div>
              </article>
            ))}
          </div>
        )}
      </ScrollContainer>
    </>
  );
}
