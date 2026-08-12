import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { KpiRow, TablePanel } from "@/components/cope/report";
import { ChartCard, ChannelStack, HorizontalBars, VolumeArea } from "@/components/cope/charts";
import { SegmentedControl } from "@/components/cope/controls";
import { DataTable, MiniBar, type Column } from "@/components/cope/data-table";
import { granularidades, paisesVol, serieDiaria } from "@/lib/cope-data";

export const Route = createFileRoute("/reportes/pais")({ component: Pais });

type Row = (typeof paisesVol)[number];
const cols: Column<Row>[] = [
  { key: "p", header: "País", cell: (r) => <span className="font-medium">{r.pais}</span> },
  { key: "a", header: "Atenciones", align: "right", width: "110px", cell: (r) => r.atenciones },
  { key: "s", header: "Participación", align: "right", width: "116px", cell: (r) => `${r.share}%` },
  { key: "t", header: "TRM", align: "right", width: "90px", cell: (r) => `${r.trm} min` },
  { key: "sla", header: "SLA", align: "right", width: "150px", cell: (r) => <MiniBar value={r.sla} tone={r.sla >= 90 ? "success" : "warning"} /> },
];

function Pais() {
  const [gran, setGran] = useState<(typeof granularidades)[number]>("Día");
  const selector = <SegmentedControl options={granularidades} value={gran} onChange={setGran} />;

  return (
    <div className="grid gap-3">
      <KpiRow
        items={[
          { label: "Países activos", value: "5", accent: "info" },
          { label: "Perú", value: "68", unit: "%", accent: "info", hint: "1 042 atenciones" },
          { label: "Mayor crecimiento", value: "Chile", accent: "success", delta: "+12,4%", deltaTone: "success" },
          { label: "Menor SLA", value: "México", accent: "danger", hint: "86% cumplimiento" },
        ]}
      />
      <div className="grid gap-3 xl:grid-cols-2">
        <ChartCard title="Evolución de volumen" hint={`Granularidad: ${gran}`} actions={selector}>
          <VolumeArea data={serieDiaria} dataKey="whatsapp" name="Atenciones" />
        </ChartCard>
        <ChartCard title="Canales por periodo" actions={selector}>
          <ChannelStack data={serieDiaria} />
        </ChartCard>
      </div>
      <ChartCard title="Volumen por país" height={200}>
        <HorizontalBars data={paisesVol} categoryKey="pais" valueKey="atenciones" name="Atenciones" />
      </ChartCard>
      <TablePanel title="Detalle por país">
        <DataTable columns={cols} rows={paisesVol} getRowId={(r) => r.pais} />
      </TablePanel>
    </div>
  );
}
