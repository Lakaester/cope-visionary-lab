import { createFileRoute } from "@tanstack/react-router";
import { KpiRow, TablePanel } from "@/components/cope/report";
import { ChartCard, HorizontalBars, DistributionPie } from "@/components/cope/charts";
import { DataTable, MiniBar, type Column } from "@/components/cope/data-table";
import { quejas } from "@/lib/cope-data";

export const Route = createFileRoute("/reportes/quejas")({ component: Quejas });

type Row = (typeof quejas)[number];
const cols: Column<Row>[] = [
  { key: "m", header: "Motivo", cell: (r) => <span className="font-medium">{r.motivo}</span> },
  { key: "c", header: "Casos", align: "right", width: "90px", cell: (r) => r.casos },
  { key: "r", header: "Resueltos", align: "right", width: "100px", cell: (r) => r.resueltas },
  { key: "mo", header: "Monto devuelto", align: "right", width: "140px", cell: (r) => `S/ ${r.monto.toLocaleString("es-PE")}` },
  { key: "d", header: "Días promedio", align: "right", width: "126px", cell: (r) => r.dias.toFixed(1) },
  { key: "sla", header: "SLA", align: "right", width: "150px", cell: (r) => <MiniBar value={r.sla} tone={r.sla >= 85 ? "success" : r.sla >= 70 ? "warning" : "danger"} /> },
];

function Quejas() {
  return (
    <div className="grid gap-3">
      <KpiRow
        items={[
          { label: "Quejas registradas", value: "130", accent: "danger", delta: "+9 casos", deltaTone: "danger" },
          { label: "Devoluciones", value: "S/ 7 520", accent: "warning" },
          { label: "Resueltas en plazo", value: "82", unit: "%", accent: "warning", hint: "Meta 90%" },
          { label: "Tiempo de cierre", value: "2,1", unit: "días", accent: "neutral" },
        ]}
      />
      <div className="grid gap-3 xl:grid-cols-2">
        <ChartCard title="Casos por motivo">
          <HorizontalBars data={quejas} categoryKey="motivo" valueKey="casos" name="Casos" color="var(--danger)" />
        </ChartCard>
        <ChartCard title="Distribución de casos">
          <DistributionPie data={quejas} nameKey="motivo" valueKey="casos" colors={["var(--danger)", "var(--warning)", "var(--chart-1)", "var(--chart-4)", "var(--chart-5)"]} />
        </ChartCard>
      </div>
      <TablePanel title="Detalle de quejas y devoluciones">
        <DataTable columns={cols} rows={quejas} getRowId={(r) => r.motivo} />
      </TablePanel>
    </div>
  );
}
