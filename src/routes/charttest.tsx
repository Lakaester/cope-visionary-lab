import { createFileRoute } from "@tanstack/react-router";
import { BarChart, Bar } from "recharts";

export const Route = createFileRoute("/charttest")({ component: T });

function T() {
  return (
    <BarChart width={400} height={200} data={[{ a: 1 }, { a: 3 }]}>
      <Bar dataKey="a" fill="#333" />
    </BarChart>
  );
}
