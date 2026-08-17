import { createFileRoute } from "@tanstack/react-router";
import { KpiRow, TablePanel } from "@/components/cope/report";
import { ChartCard, ChannelStack, SlaTrend, DistributionPie } from "@/components/cope/charts";
import { DataTable, MiniBar, type Column } from "@/components/cope/data-table";
import { categoriasVol, serieDiaria, serieSla } from "@/lib/cope-data";

export const Route = createFileRoute("/reportes/")({ component: Resumen });

type Cat = (typeof categoriasVol)[number];
const cols: Column<Cat>[] = [
  { key: "c", header: "Categoría", sortValue: (r) => r.categoria, cell: (r) => <span className="font-medium">{r.categoria}</span> },
  { key: "a", header: "Atenciones", align: "right", width: "110px", sortValue: (r) => r.atenciones, cell: (r) => r.atenciones },
  { key: "s", header: "Participación", align: "right", width: "110px", sortValue: (r) => r.share, cell: (r) => `${r.share}%` },
  { key: "t", header: "TRM", align: "right", width: "90px", sortValue: (r) => r.trm, cell: (r) => `${r.trm} min` },
  { key: "sla", header: "SLA", align: "right", width: "150px", sortValue: (r) => r.sla, cell: (r) => <MiniBar value={r.sla} tone={r.sla >= 90 ? "success" : r.sla >= 80 ? "warning" : "danger"} /> },
];

function Resumen() {
  return (
    <div className="grid gap-3">
      <KpiRow
        items={[
          { label: "Atenciones", value: "1 529", delta: "+6,2%", deltaTone: "info", accent: "info" },
          { label: "SLA cumplido", value: "91,4", unit: "%", delta: "-1,8 pp", deltaTone: "danger", accent: "success", hint: "Meta 93%" },
          { label: "TRM", value: "14", unit: "min", delta: "+2 min", deltaTone: "warning", accent: "warning" },
          { label: "Reaperturas", value: "52", delta: "3,4% del total", deltaTone: "neutral", accent: "neutral" },
        ]}
      />
      <div className="grid gap-3 xl:grid-cols-3">
        <ChartCard title="Volumen por canal" hint="Últimos 7 días" className="xl:col-span-2">
          <ChannelStack data={serieDiaria} />
        </ChartCard>
        <ChartCard title="Distribución por categoría">
          <DistributionPie
            data={categoriasVol}
            nameKey="categoria"
            valueKey="atenciones"
            colors={["var(--chart-1)", "var(--chart-2)", "var(--chart-3)", "var(--chart-4)", "var(--chart-5)", "var(--muted-foreground)"]}
          />
        </ChartCard>
      </div>
      <ChartCard title="SLA y tiempo de respuesta" hint="Comparación diaria" height={200}>
        <SlaTrend data={serieSla} />
      </ChartCard>
      <TablePanel title="Detalle por categoría" hint="Drill-down disponible">
        <DataTable columns={cols} rows={categoriasVol} getRowId={(r) => r.categoria} maxHeight="320px" />
      </TablePanel>
    </div>
  );
}
