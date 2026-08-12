import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Download } from "lucide-react";
import { PageHeader, KpiCard, ScrollContainer, Badge } from "@/components/cope/primitives";
import { FilterBar, SegmentedControl, SelectFilter, ToolbarButton } from "@/components/cope/controls";
import { ChartCard, ChannelStack, SlaTrend, HorizontalBars } from "@/components/cope/charts";
import { DataTable, MiniBar, type Column } from "@/components/cope/data-table";
import {
  asesoresPerf,
  canalLabel,
  categoriasVol,
  serieDiaria,
  serieSla,
  tickets,
  type Ticket,
} from "@/lib/cope-data";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Dashboard operativo · COPE" },
      {
        name: "description",
        content: "Visión diaria de atenciones, SLA y desempeño del equipo de Soporte Especializado.",
      },
      { property: "og:title", content: "Dashboard operativo · COPE" },
      {
        property: "og:description",
        content: "Visión diaria de atenciones, SLA y desempeño del equipo de Soporte Especializado.",
      },
    ],
  }),
  component: Dashboard,
});

const riesgo = tickets.filter((t) => t.sla !== "cumplido" && t.estado !== "resuelto").slice(0, 8);

const columnasRiesgo: Column<Ticket>[] = [
  { key: "id", header: "Ticket", width: "92px", cell: (r) => <span className="num">{r.id}</span> },
  {
    key: "cliente",
    header: "Cliente",
    cell: (r) => (
      <div className="min-w-0">
        <p className="truncate font-medium">{r.cliente}</p>
        <p className="truncate text-[11.5px] text-muted-foreground">{r.asunto}</p>
      </div>
    ),
  },
  {
    key: "canal",
    header: "Canal",
    width: "104px",
    cell: (r) => (
      <Badge tone={r.canal === "whatsapp" ? "success" : r.canal === "correo" ? "warning" : "info"}>
        {canalLabel[r.canal]}
      </Badge>
    ),
  },
  { key: "asesor", header: "Asesor", width: "116px", cell: (r) => r.asesor },
  {
    key: "sla",
    header: "SLA",
    width: "104px",
    cell: (r) => (
      <Badge tone={r.sla === "incumplido" ? "danger" : "warning"}>
        {r.sla === "incumplido" ? "Incumplido" : "En riesgo"}
      </Badge>
    ),
  },
  {
    key: "min",
    header: "Tiempo",
    align: "right",
    width: "84px",
    cell: (r) => `${r.minutos} min`,
  },
];

function Dashboard() {
  const [rango, setRango] = useState<"Hoy" | "7 días" | "30 días">("Hoy");
  const [pais, setPais] = useState("Todos");

  return (
    <>
      <PageHeader
        title="Dashboard operativo"
        description="Estado del día para el equipo de Soporte Especializado"
        breadcrumb={["COPE", "Dashboard"]}
        actions={
          <>
            <ToolbarButton>
              <Download className="size-3.5" aria-hidden /> Exportar
            </ToolbarButton>
            <Link
              to="/atenciones"
              className="inline-flex h-7 items-center rounded bg-primary px-2.5 text-[12px] font-medium text-primary-foreground hover:bg-primary/90"
            >
              Ir a la bandeja
            </Link>
          </>
        }
      />

      <FilterBar
        right={<span className="text-[11.5px] text-muted-foreground">Actualizado 15:32</span>}
      >
        <SegmentedControl
          options={["Hoy", "7 días", "30 días"] as const}
          value={rango}
          onChange={setRango}
        />
        <SelectFilter
          label="País"
          value={pais}
          onChange={setPais}
          options={["Todos", "Perú", "Chile", "Colombia", "México", "Ecuador"]}
        />
        <SelectFilter label="Canal" value="Todos" onChange={() => {}} options={["Todos", "WhatsApp", "Correo", "Zendesk", "Teléfono"]} />
        <SelectFilter label="Cola" value="Todas" onChange={() => {}} options={["Todas", "Integraciones", "Facturación", "Quejas"]} />
      </FilterBar>

      <ScrollContainer className="px-5 py-4">
        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-5">
          <KpiCard label="Atenciones" value="1 529" delta="+6,2%" deltaTone="info" accent="info" hint="vs. periodo anterior" />
          <KpiCard label="SLA cumplido" value="91,4" unit="%" delta="-1,8 pp" deltaTone="danger" accent="success" hint="Meta 93%" />
          <KpiCard label="TRM" value="14" unit="min" delta="+2 min" deltaTone="warning" accent="warning" hint="Tiempo de 1ª respuesta" />
          <KpiCard label="En cola" value="24" delta="8 en riesgo" deltaTone="danger" accent="danger" hint="Sin asignar: 6" />
          <KpiCard label="CSAT" value="4,5" unit="/5" delta="+0,1" deltaTone="success" accent="neutral" hint="412 respuestas" />
        </div>

        <div className="mt-3 grid gap-3 xl:grid-cols-3">
          <ChartCard title="Volumen por canal" hint="Últimos 7 días" className="xl:col-span-2">
            <ChannelStack data={serieDiaria} />
          </ChartCard>
          <ChartCard title="SLA y tiempo de respuesta" hint="Últimos 7 días">
            <SlaTrend data={serieSla} />
          </ChartCard>
        </div>

        <div className="mt-3 grid gap-3 xl:grid-cols-3">
          <section className="rounded-md border border-border bg-surface xl:col-span-2">
            <div className="flex items-center justify-between border-b border-border px-3 py-2">
              <h2 className="text-[12px] font-semibold uppercase tracking-wide">
                Atenciones en riesgo de SLA
              </h2>
              <Link to="/atenciones" className="text-[12px] font-medium text-primary hover:underline">
                Ver todas
              </Link>
            </div>
            <DataTable columns={columnasRiesgo} rows={riesgo} getRowId={(r) => r.id} maxHeight="288px" />
          </section>

          <div className="grid gap-3">
            <ChartCard title="Categorías con mayor volumen" height={196}>
              <HorizontalBars data={categoriasVol} categoryKey="categoria" valueKey="atenciones" name="Atenciones" />
            </ChartCard>
            <section className="rounded-md border border-border bg-surface">
              <div className="border-b border-border px-3 py-2 text-[12px] font-semibold uppercase tracking-wide">
                Asesores conectados
              </div>
              <ul className="divide-y divide-border">
                {asesoresPerf.slice(0, 4).map((a) => (
                  <li key={a.asesor} className="flex items-center gap-3 px-3 py-2 text-[12.5px]">
                    <span className="min-w-0 flex-1 truncate font-medium">{a.asesor}</span>
                    <span className="num text-muted-foreground">{a.atenciones}</span>
                    <MiniBar value={a.sla} tone={a.sla >= 90 ? "success" : "warning"} />
                  </li>
                ))}
              </ul>
            </section>
          </div>
        </div>
      </ScrollContainer>
    </>
  );
}
