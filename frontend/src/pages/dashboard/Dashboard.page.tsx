import { useEffect, useState } from "react";
import { useJwt } from "../../context/Jwt.context";
import { useNavigate } from "react-router-dom";
import TicketsPriorityBarChart from "../../components/dashboard/TicketsPriorityBarChart.component";
import httpModule from "../../helpers/http.module";
import { ITicket } from "../../types/global.typing";
import { CircularProgress } from "@mui/material";

export default function Dashboard() {
  const redirect = useNavigate();
  const jwt = useJwt();
  const [loading, setLoading] = useState<boolean>(false);
  const [tickets, setTickets] = useState<ITicket[]>([]);

  useEffect(() => {
    setLoading(true);
    if (!jwt.isLoggedIn()) {
      redirect("/signin", { replace: true });
      return;
    }
    let jwtToken = jwt.user.jwtToken;
    httpModule
      .get<ITicket[]>(`Ticket/Get`, {
        headers: { Authorization: "Bearer " + jwtToken },
      })
      .then((response) => {
        setTickets(response.data);
        setLoading(false);
      })
      .catch((error) => {
        alert("Error");
        console.log(error);
        setLoading(false);
      });
  }, []);

  return (
    <div className="content home">
      {loading ? (
        <CircularProgress size={100} />
      ) : tickets.length === 0 ? (
        <h1>No Tickets</h1>
      ) : (
        <TicketsPriorityBarChart data={tickets} />
      )}
    </div>
  );
}
