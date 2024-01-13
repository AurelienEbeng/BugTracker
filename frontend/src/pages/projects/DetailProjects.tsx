import { useEffect, useState } from "react";
import "./projects.scss";
import httpModule from "../../helpers/http.module";
import { ITicket } from "../../types/global.typing";
import { Button, CircularProgress } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import { Add } from "@mui/icons-material";
import TicketsGrid from "../../components/tickets/TicketsGrid.component";

const DetailProjects = () => {
  const [tickets, setTickets] = useState<ITicket[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const redirect = useNavigate();
  const location = useLocation();
  const { projectId } = location.state;

  useEffect(() => {
    setLoading(true);
    httpModule
    .get<ITicket[]>(`Ticket/Get/${projectId}`)
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
        <h2>Tickets</h2>
        <Button variant="outlined" onClick={() => redirect("/tickets/add")}>
          <Add />
        </Button>
      </div>

      {loading ? (
        <CircularProgress size={100} />
      ) : tickets.length === 0 ? (
        <h1>No Tickets</h1>
      ) : (
        <TicketsGrid data={tickets}  />
      )}
    </div>
  );
};

export default DetailProjects;
