import { axisClasses } from "@mui/x-charts/ChartsAxis";
import { BarChart } from "@mui/x-charts/BarChart";
import { useContext, useState } from "react";
import { ITicket } from "../../types/global.typing";
import { ThemeContext } from "../../context/theme.context";

type ChartData = {
  status: string;
  numOfTickets: number;
};

const chartSetting = {
  width: 300,
  height: 300,
  sx: {},
};

const valueFormatter = (value: number | null) => `${value}`;

function fillChartData(data: ITicket[]) {
  let obj = [
    { status: "New", numOfTickets: 0 },
    { status: "Open", numOfTickets: 0 },
    { status: "In Progress", numOfTickets: 0 },
    { status: "Resolved", numOfTickets: 0 },
    { status: "Additional Info Required", numOfTickets: 0 },
  ];

  data.map((ticket) => {
    if (ticket.status.toLowerCase() === "new") {
      obj[0].numOfTickets = obj[0].numOfTickets + 1;
    } else if (ticket.status.toLowerCase() === "open") {
      obj[1].numOfTickets = obj[1].numOfTickets + 1;
    } else if (ticket.status.toLowerCase() === "in progress") {
      obj[2].numOfTickets = obj[2].numOfTickets + 1;
    } else if (ticket.status.toLowerCase() === "resolved") {
      obj[3].numOfTickets = obj[3].numOfTickets + 1;
    } else if (ticket.status.toLowerCase() === "additional info required") {
      obj[3].numOfTickets = obj[3].numOfTickets + 1;
    }
  });
  return obj;
}

interface ITicketsStatusBarChartProps {
  data: ITicket[];
}

export default function TicketsStatusBarChart({
  data,
}: ITicketsStatusBarChartProps) {
  const [chartData] = useState<ChartData[]>(() => fillChartData(data));
  const { darkMode } = useContext(ThemeContext);

  darkMode
    ? (chartSetting.sx = {
        [`.${axisClasses.root}`]: {
          [`.${axisClasses.tick}, .${axisClasses.line}`]: {
            stroke: "white",
            strokeWidth: 3,
          },
          [`.${axisClasses.tickLabel}`]: {
            fill: "white",
          },
        },
      })
    : (chartSetting.sx = {
        [`.${axisClasses.root}`]: {
          [`.${axisClasses.tick}, .${axisClasses.line}`]: {
            stroke: "black",
            strokeWidth: 3,
          },
          [`.${axisClasses.tickLabel}`]: {
            fill: "black",
          },
        },
      });

  return (
    <>
      <BarChart
        dataset={chartData}
        xAxis={[{ scaleType: "band", dataKey: "status" }]}
        series={[{ dataKey: "numOfTickets", valueFormatter }]}
        {...chartSetting}
      />
    </>
  );
}
