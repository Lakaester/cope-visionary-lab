import { createFileRoute } from "@tanstack/react-router";
import { KpiRow, TablePanel } from "@/components/cope/report";
import { ChartCard, HorizontalBars, DistributionPie } from "@/components/cope/charts";
import { DataTable, MiniBar, type Column } from "@/components/cope/data-table";
import { categoriasVol } from "@/lib/cope-data";

export const Route = createFileRoute("/reportes/categorias")({ component: Categorias });

type Row = (typeof categoriasVol)[number];
const cols: Column<Row>[] = [
  { key: "c", header: "Categoría", cell: (r) => <span className="font-medium">{r.categoria}</span> },
  { key: "a", header: "Atenciones", align: "right", width: "110px", cell: (r) => r.atenciones },
  { key: "s", header: "Participación", align: "right", width: "116px", cell: (r) => `${r.share}%` },
  { key: "t", header: "TRM", align: "right", width: "90px", cell: (r) => `${r.trm} min` },
  { key: "sla", header: "SLA", align: "right", width: "150px", cell: (r) => <MiniBar value={r.sla} tone={r.sla >= 90 ? "success" : r.sla >= 80 ? "warning" : "danger"} /> },
];

function Categorias() {
  return (
    <div className="grid gap-3">
      <KpiRow
        items={[
          { label: "Categorías activas", value: "6", accent: "info" },
          { label: "Mayor volumen", value: "Integraciones", accent: "info", hint: "27% del total" },
          { label: "Mayor TRM", value: "Quejas", accent: "warning", hint: "29 min promedio" },
          { label: "Menor SLA", value: "Quejas", accent: "danger", hint: "76% cumplimiento" },
        ]}
      />
      <div className="grid gap-3 xl:grid-cols-2">
        <ChartCard title="Volumen por categoría">
          <HorizontalBars data={categoriasVol} categoryKey="categoria" valueKey="atenciones" name="Atenciones" />
        </ChartCard>
        <ChartCard title="Participación">
          <DistributionPie data={categoriasVol} nameKey="categoria" valueKey="atenciones" colors={["var(--chart-1)", "var(--chart-2)", "var(--chart-3)", "var(--chart-4)", "var(--chart-5)", "var(--muted-foreground)"]} />
        </ChartCard>
      </div>
      <TablePanel title="Detalle por categoría">
        <DataTable columns={cols} rows={categoriasVol} getRowId={(r) => r.categoria} />
      </TablePanel>
    </div>
  );
}
