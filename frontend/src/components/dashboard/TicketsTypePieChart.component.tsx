import { useState } from "react";
import { ITicket } from "../../types/global.typing";
import { PieChart } from "@mui/x-charts";

type ChartData = {
  type: string;
  value: number;
};

function fillChartData(data: ITicket[]) {
  let obj = [
    { type: "Bugs/Errors", value: 0, label: "Bugs/Errors" },
    { type: "Feature Request", value: 0, label: "Feature Request" },
    { type: "Other Comments", value: 0, label: "Other Comments" },
    {
      type: "Training/Document Requests",
      value: 0,
      label: "Training/Document Requests",
    },
  ];

  data.map((ticket) => {
    if (ticket.type.toLowerCase() === "bugs/errors") {
      obj[0].value = obj[0].value + 1;
    } else if (ticket.type.toLowerCase() === "feature request") {
      obj[1].value = obj[1].value + 1;
    } else if (ticket.type.toLowerCase() === "other comments") {
      obj[2].value = obj[2].value + 1;
    } else if (ticket.type.toLowerCase() === "training/document requests") {
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
