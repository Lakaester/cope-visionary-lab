import { createFileRoute } from "@tanstack/react-router";
import { KpiRow, TablePanel } from "@/components/cope/report";
import { ChartCard, HorizontalBars } from "@/components/cope/charts";
import { DataTable, MiniBar, type Column } from "@/components/cope/data-table";
import { asesoresPerf } from "@/lib/cope-data";

export const Route = createFileRoute("/reportes/asesores")({ component: Asesores });

type Row = (typeof asesoresPerf)[number];
const cols: Column<Row>[] = [
  { key: "a", header: "Asesor", cell: (r) => <span className="font-medium">{r.asesor}</span> },
  { key: "at", header: "Atenciones", align: "right", width: "110px", cell: (r) => r.atenciones },
  { key: "trm", header: "TRM", align: "right", width: "88px", cell: (r) => `${r.trm} min` },
  { key: "tro", header: "TMO", align: "right", width: "88px", cell: (r) => `${r.tro} h` },
  { key: "csat", header: "CSAT", align: "right", width: "80px", cell: (r) => r.csat.toFixed(1) },
  { key: "re", header: "Reaperturas", align: "right", width: "110px", cell: (r) => r.reaperturas },
  { key: "sla", header: "SLA", align: "right", width: "150px", cell: (r) => <MiniBar value={r.sla} tone={r.sla >= 90 ? "success" : r.sla >= 85 ? "warning" : "danger"} /> },
];

function Asesores() {
  return (
    <div className="grid gap-3">
      <KpiRow
        items={[
          { label: "Asesores activos", value: "6", accent: "info" },
          { label: "Atenciones / asesor", value: "181", accent: "neutral", hint: "Promedio del periodo" },
          { label: "SLA promedio", value: "91", unit: "%", accent: "success" },
          { label: "CSAT promedio", value: "4,4", unit: "/5", accent: "neutral", delta: "+0,1", deltaTone: "success" },
        ]}
      />
      <div className="grid gap-3 xl:grid-cols-2">
        <ChartCard title="Atenciones por asesor">
          <HorizontalBars data={asesoresPerf} categoryKey="asesor" valueKey="atenciones" name="Atenciones" />
        </ChartCard>
        <ChartCard title="TRM por asesor" hint="Minutos hasta la primera respuesta">
          <HorizontalBars data={asesoresPerf} categoryKey="asesor" valueKey="trm" name="TRM (min)" color="var(--warning)" />
        </ChartCard>
      </div>
      <TablePanel title="Desempeño individual">
        <DataTable columns={cols} rows={asesoresPerf} getRowId={(r) => r.asesor} />
      </TablePanel>
    </div>
  );
}
