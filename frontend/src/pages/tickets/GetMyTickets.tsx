import { useEffect, useState } from "react";
import TicketsGrid from "../../components/tickets/TicketsGrid.component";
import { ITicket } from "../../types/global.typing";
import { useJwt } from "../../context/Jwt.context";
import { useNavigate } from "react-router-dom";
import httpModule from "../../helpers/http.module";
import { CircularProgress } from "@mui/material";
import { PermCameraMicSharp } from "@mui/icons-material";

const GetMyTickets = () => {
  const [tickets, setTickets] = useState<ITicket[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const jwt = useJwt();
  const navigate = useNavigate();

  useEffect(() => {
    if (!jwt.isLoggedIn()) {
      navigate("/signIn", { replace: true });
      return;
    }

    setLoading(true);

    let params = new URLSearchParams()
    params.append("userId",jwt.user.id)
    httpModule
      .get("/Ticket/GetMyTickets?" + params, {
        headers: { Authorization: "Bearer " + jwt.user.jwtToken },
      })
      .then((response) => {
        setTickets(response.data);
        setLoading(false);
      })
      .catch((error) => {
        alert("Error, check console");
        console.log(error.response);
        setLoading(false);
      });
  }, []);

  return (
    <div className="content">
      {loading ? (
        <CircularProgress size={100} />
      ) : tickets.length === 0 ? (
        <div className="heading"><h1>No Tickets</h1></div>
      ) : (
        <>
          <div className="heading"><h1>My Tickets</h1></div>
          <TicketsGrid data={tickets} />
        </>
      )}
    </div>
  );
};

export default GetMyTickets;
