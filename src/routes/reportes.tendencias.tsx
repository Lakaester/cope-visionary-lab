import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { KpiRow, TablePanel } from "@/components/cope/report";
import { ChartCard, SlaTrend, ChannelStack, VolumeArea } from "@/components/cope/charts";
import { SegmentedControl } from "@/components/cope/controls";
import { DataTable, type Column } from "@/components/cope/data-table";
import { Badge } from "@/components/cope/primitives";
import { granularidades, serieDiaria, serieSla } from "@/lib/cope-data";

export const Route = createFileRoute("/reportes/tendencias")({ component: Tendencias });

const variaciones = [
  { indicador: "Atenciones", actual: "1 529", anterior: "1 440", var: 6.2 },
  { indicador: "SLA cumplido", actual: "91,4%", anterior: "93,2%", var: -1.8 },
  { indicador: "TRM", actual: "14 min", anterior: "12 min", var: 16.7 },
  { indicador: "Reaperturas", actual: "52", anterior: "61", var: -14.8 },
  { indicador: "CSAT", actual: "4,5", anterior: "4,4", var: 2.3 },
];

type Row = (typeof variaciones)[number];
const cols: Column<Row>[] = [
  { key: "i", header: "Indicador", cell: (r) => <span className="font-medium">{r.indicador}</span> },
  { key: "a", header: "Periodo actual", align: "right", width: "130px", cell: (r) => r.actual },
  { key: "p", header: "Periodo anterior", align: "right", width: "140px", cell: (r) => r.anterior },
  {
    key: "v",
    header: "Variación",
    align: "right",
    width: "120px",
    cell: (r) => {
      const positivo = r.indicador === "TRM" || r.indicador === "Reaperturas" ? r.var < 0 : r.var > 0;
      return <Badge tone={positivo ? "success" : "danger"}>{r.var > 0 ? "+" : ""}{r.var}%</Badge>;
    },
  },
];

function Tendencias() {
  const [gran, setGran] = useState<(typeof granularidades)[number]>("Día");
  return (
    <div className="grid gap-3">
      <KpiRow
        items={[
          { label: "Tendencia de volumen", value: "+6,2", unit: "%", accent: "info", deltaTone: "info" },
          { label: "Tendencia de SLA", value: "-1,8", unit: "pp", accent: "danger", deltaTone: "danger" },
          { label: "Pico de demanda", value: "Viernes", accent: "warning", hint: "432 atenciones" },
          { label: "Valle", value: "Domingo", accent: "neutral", hint: "186 atenciones" },
        ]}
      />
      <ChartCard
        title="Serie de atenciones"
        hint={`Granularidad: ${gran}`}
        actions={<SegmentedControl options={granularidades} value={gran} onChange={setGran} />}
      >
        <VolumeArea data={serieDiaria} dataKey="whatsapp" name="Atenciones" />
      </ChartCard>
      <div className="grid gap-3 xl:grid-cols-2">
        <ChartCard title="SLA vs. TRM">
          <SlaTrend data={serieSla} />
        </ChartCard>
        <ChartCard title="Mezcla de canales">
          <ChannelStack data={serieDiaria} />
        </ChartCard>
      </div>
      <TablePanel title="Comparación periodo a periodo">
        <DataTable columns={cols} rows={variaciones} getRowId={(r) => r.indicador} />
      </TablePanel>
    </div>
  );
}
