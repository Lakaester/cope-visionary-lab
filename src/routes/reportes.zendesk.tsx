import { createFileRoute } from "@tanstack/react-router";
import { KpiRow, TablePanel } from "@/components/cope/report";
import { ChartCard, VolumeArea, HorizontalBars } from "@/components/cope/charts";
import { DataTable, MiniBar, type Column } from "@/components/cope/data-table";
import { serieDiaria } from "@/lib/cope-data";

export const Route = createFileRoute("/reportes/zendesk")({ component: Zendesk });

const colas = [
  { cola: "Nivel 1", tickets: 412, pendientes: 38, sla: 93, trm: 16 },
  { cola: "Nivel 2", tickets: 214, pendientes: 41, sla: 87, trm: 34 },
  { cola: "Facturación", tickets: 168, pendientes: 12, sla: 95, trm: 14 },
  { cola: "Integraciones", tickets: 146, pendientes: 27, sla: 84, trm: 41 },
];

type Row = (typeof colas)[number];
const cols: Column<Row>[] = [
  { key: "c", header: "Cola", cell: (r) => <span className="font-medium">{r.cola}</span> },
  { key: "t", header: "Tickets", align: "right", width: "100px", cell: (r) => r.tickets },
  { key: "p", header: "Pendientes", align: "right", width: "110px", cell: (r) => r.pendientes },
  { key: "trm", header: "TRM", align: "right", width: "90px", cell: (r) => `${r.trm} min` },
  { key: "sla", header: "SLA", align: "right", width: "150px", cell: (r) => <MiniBar value={r.sla} tone={r.sla >= 90 ? "success" : "warning"} /> },
];

function Zendesk() {
  return (
    <div className="grid gap-3">
      <KpiRow
        items={[
          { label: "Tickets", value: "940", accent: "info" },
          { label: "Pendientes", value: "118", accent: "warning", hint: "31 vencidos" },
          { label: "Reaperturas", value: "34", accent: "danger", delta: "3,6%", deltaTone: "danger" },
          { label: "SLA cumplido", value: "90", unit: "%", accent: "success" },
        ]}
      />
      <div className="grid gap-3 xl:grid-cols-2">
        <ChartCard title="Volumen Zendesk">
          <VolumeArea data={serieDiaria} dataKey="zendesk" name="Zendesk" color="var(--ch-zendesk)" />
        </ChartCard>
        <ChartCard title="Tickets por cola">
          <HorizontalBars data={colas} categoryKey="cola" valueKey="tickets" name="Tickets" color="var(--ch-zendesk)" />
        </ChartCard>
      </div>
      <TablePanel title="Detalle por cola">
        <DataTable columns={cols} rows={colas} getRowId={(r) => r.cola} />
      </TablePanel>
    </div>
  );
}
