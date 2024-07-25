import { axisClasses } from "@mui/x-charts/ChartsAxis";
import { BarChart } from "@mui/x-charts/BarChart";
import { useContext, useState } from "react";
import { ITicket} from "../../types/global.typing";
import { ThemeContext } from "../../context/theme.context";


type ChartData = {
  priority: string;
  numOfTickets: number;
};

const chartSetting = {
  width: 600,
  height: 300,
  sx: {},
  
};

const valueFormatter = (value: number | null) => `${value}`;

function fillChartData(data: ITicket[]) {
  let obj = [
    { priority: "None", numOfTickets: 0 },
    { priority: "Low", numOfTickets: 0 },
    { priority: "Medium", numOfTickets: 0 },
    { priority: "High", numOfTickets: 0 },
  ];

  data.map((ticket) => {
    if (ticket.priority.toLowerCase() === "none") {
      obj[0].numOfTickets = obj[0].numOfTickets + 1;
    } else if (ticket.priority.toLowerCase() === "low") {
      obj[1].numOfTickets = obj[1].numOfTickets + 1;
    } else if (ticket.priority.toLowerCase() === "medium") {
      obj[2].numOfTickets = obj[2].numOfTickets + 1;
    } else if (ticket.priority.toLowerCase() === "high") {
      obj[3].numOfTickets = obj[3].numOfTickets + 1;
    }
  });
  return obj;
}

interface ITicketsPriorityBarChartProps {
  data: ITicket[];
}

export default function TicketsPriorityBarChart({
  data,
}: ITicketsPriorityBarChartProps) {
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
        xAxis={[{ scaleType: "band", dataKey: "priority" }]}
        series={[{ dataKey: "numOfTickets", valueFormatter,  }]}
        {...chartSetting}
        className="ticket-priority-chart"
      />
    </>
  );
}
