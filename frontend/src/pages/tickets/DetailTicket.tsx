import { useEffect, useState } from "react";
import "./tickets.scss";
import httpModule from "../../helpers/http.module";
import { ITicket } from "../../types/global.typing";
import { CircularProgress } from "@mui/material";
import { useLocation } from "react-router-dom";
import ProjectTicketsGrid from "../../components/projects/ProjectTicketsGrid.component";
import TicketsGrid from "../../components/tickets/TicketsGrid.component";

const DetailTicket = () => {
  const [tickets, setTickets] = useState<ITicket[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const location = useLocation();
  const { ticketId } = location.state;

  useEffect(() => {
    setLoading(true);
    httpModule
      .get<ITicket[]>(`Ticket/Get/${ticketId}`)
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
    <div className="content tickets">
      <div className="heading">
        <div>Ticket id: {ticketId}</div>
      </div>

      {loading ? (
        <CircularProgress size={100} />
      ) : tickets.length === 0 ? (
        <h1>No Tickets</h1>
      ) : (
        <TicketsGrid data={tickets} />
      )}
    </div>
  );
};

export default DetailTicket;
