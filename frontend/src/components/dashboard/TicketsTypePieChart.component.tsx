import { useState } from "react";
import { ITicket } from "../../types/global.typing";
import { PieChart } from "@mui/x-charts";

type ChartData = {
  type: string;
  value: number;
};

function fillChartData(data: ITicket[]) {
  let obj = [
    { type: "BUGS", value: 0, label: "Bugs" },
    { type: "FEATURES_REQUEST", value: 0, label: "Feature Request" },
    { type: "OTHER_COMMENTS", value: 0, label: "Other Comments" },
    {
      type: "DOCUMENTS_REQUEST",
      value: 0,
      label: "Document Requests",
    },
  ];

  data.map((ticket) => {
    if (ticket.type === "BUGS") {
      obj[0].value = obj[0].value + 1;
    } else if (ticket.type === "FEATURES_REQUEST") {
      obj[1].value = obj[1].value + 1;
    } else if (ticket.type === "OTHER_COMMENTS") {
      obj[2].value = obj[2].value + 1;
    } else if (ticket.type=== "DOCUMENTS_REQUEST") {
      obj[3].value = obj[3].value + 1;
    }
  });
  return obj;
}

interface ITicketsTypePieChartProps {
  data: ITicket[];
}

export default function TicketsTypePieChart({
  data,
}: ITicketsTypePieChartProps) {
  const [chartData] = useState<ChartData[]>(() => fillChartData(data));

  return (
    <PieChart
      series={[
        {
          data: chartData,
          highlightScope: { faded: "global", highlighted: "item" },
          faded: { innerRadius: 30, additionalRadius: -30, color: "gray" },
        },
      ]}
      height={300}
      width={300}
      slotProps={{
        legend: { hidden: true },
      }}
    />
  );
}
