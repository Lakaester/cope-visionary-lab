import { createFileRoute } from "@tanstack/react-router";
import { PageHeader, ScrollContainer, Badge, LoadingState, ErrorState, EmptyState } from "@/components/cope/primitives";
import { ToolbarButton } from "@/components/cope/controls";

export const Route = createFileRoute("/configuracion")({
  head: () => ({
    meta: [
      { title: "Configuración · COPE" },
      { name: "description", content: "Parámetros de colas, SLA, canales y referencia del sistema de diseño de COPE." },
      { property: "og:title", content: "Configuración · COPE" },
      { property: "og:description", content: "Parámetros de colas, SLA, canales y referencia del sistema de diseño de COPE." },
    ],
  }),
  component: Configuracion,
});

const tokens = [
  { nombre: "Azul institucional", uso: "Acción principal, selección, información", varName: "--primary" },
  { nombre: "Verde", uso: "SLA cumplido, WhatsApp, estados positivos", varName: "--success" },
  { nombre: "Naranja", uso: "Correo, advertencias, información secundaria", varName: "--warning" },
  { nombre: "Rojo", uso: "Errores, incumplimiento, situaciones críticas", varName: "--danger" },
  { nombre: "Gris", uso: "Neutro, texto secundario, bordes", varName: "--muted-foreground" },
];

function Configuracion() {
  return (
    <>
      <PageHeader
        title="Configuración"
        description="Parámetros operativos y referencia del sistema de diseño"
        breadcrumb={["COPE", "Configuración"]}
        actions={<ToolbarButton active>Guardar cambios</ToolbarButton>}
      />
      <ScrollContainer className="px-5 py-4">
        <div className="grid gap-3 xl:grid-cols-2">
          <section className="rounded-md border border-border bg-surface">
            <div className="border-b border-border px-3 py-2 text-[12px] font-semibold uppercase tracking-wide">
              Parámetros de SLA
            </div>
            <ul className="divide-y divide-border text-[12.5px]">
              {[
                ["Primera respuesta WhatsApp", "10 min"],
                ["Primera respuesta Correo", "60 min"],
                ["Primera respuesta Zendesk", "45 min"],
                ["Resolución nivel 1", "8 h"],
                ["Resolución nivel 2", "24 h"],
              ].map(([k, v]) => (
                <li key={k} className="flex items-center justify-between px-3 py-2">
                  <span>{k}</span>
                  <span className="num font-medium">{v}</span>
                </li>
              ))}
            </ul>
          </section>

          <section className="rounded-md border border-border bg-surface">
            <div className="border-b border-border px-3 py-2 text-[12px] font-semibold uppercase tracking-wide">
              Semántica de color
            </div>
            <ul className="divide-y divide-border">
              {tokens.map((t) => (
                <li key={t.nombre} className="flex items-center gap-3 px-3 py-2 text-[12.5px]">
                  <span className="size-4 rounded border border-border" style={{ background: `var(${t.varName})` }} />
                  <span className="w-36 shrink-0 font-medium">{t.nombre}</span>
                  <span className="min-w-0 flex-1 truncate text-muted-foreground">{t.uso}</span>
                </li>
              ))}
            </ul>
          </section>

          <section className="rounded-md border border-border bg-surface">
            <div className="border-b border-border px-3 py-2 text-[12px] font-semibold uppercase tracking-wide">
              Estados del sistema de diseño
            </div>
            <div className="divide-y divide-border">
              <LoadingState />
              <EmptyState />
              <ErrorState />
            </div>
          </section>

          <section className="rounded-md border border-border bg-surface">
            <div className="border-b border-border px-3 py-2 text-[12px] font-semibold uppercase tracking-wide">
              Indicadores y badges
            </div>
            <div className="flex flex-wrap gap-2 p-3">
              <Badge tone="info">Información</Badge>
              <Badge tone="success">SLA cumplido</Badge>
              <Badge tone="warning">En riesgo</Badge>
              <Badge tone="danger">Incumplido</Badge>
              <Badge tone="neutral">Neutro</Badge>
            </div>
          </section>
        </div>
      </ScrollContainer>
    </>
  );
}
