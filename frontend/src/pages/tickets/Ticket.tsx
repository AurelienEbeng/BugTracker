import { useEffect, useState } from "react";
import "./tickets.scss";
import httpModule from "../../helpers/http.module";
import { ITicketHistory } from "../../types/global.typing";
import { CircularProgress } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import TicketHistoriesGrid from "../../components/tickets/TicketHistoryGrid.component";
import { useJwt } from "../../context/Jwt.context";
import TicketDetails from "./TicketDetails";
import TicketComment from "./TicketComment";
import TicketAttachment from "./TicketAttachment";

const Ticket = () => {
  

  const [ticketHistories, setTicketHistories] = useState<ITicketHistory[]>([]);
  
  const location = useLocation();
  const { ticketId } = location.state;
  const redirect = useNavigate();
  const jwt = useJwt();

  const [loadingTicketHistory, setLoadingTicketHistory] =
    useState<boolean>(false);

  useEffect(() => {
    
    setLoadingTicketHistory(true);
    if (!jwt.isLoggedIn()) {
      redirect("/signin", { replace: true });
      return;
    }
    let jwtToken = jwt.user.jwtToken;
    
    httpModule
      .get<ITicketHistory[]>(`TicketHistory/Get/${ticketId}`, {
        headers: { Authorization: "Bearer " + jwtToken },
      })
      .then((response) => {
        setTicketHistories(response.data);
        setLoadingTicketHistory(false);
      })
      .catch((error) => {
        alert("Error");
        console.log(error);
        setLoadingTicketHistory(false);
      });
  }, []);
  return (
    <div className="content">
      {loadingTicketHistory ? (
        <CircularProgress size={100} />
      ) : (
        <div className="tickets">
          <div className="tickets-details">
            <TicketDetails ticketId={ticketId} />
          </div>

          <div className="tickets-attachments">
            <div className="heading">
              <h1>Ticket Attachment</h1>
            </div>
            <TicketAttachment ticketId={ticketId} />
          </div>

          <div className="tickets-comments">
            <div className="heading">
              <h1>Ticket Comments</h1>
            </div>
            <TicketComment ticketId={ticketId} />
          </div>

          <div className="tickets-history">
            <div className="heading">
              <h1>Ticket History</h1>
            </div>
            <TicketHistoriesGrid data={ticketHistories} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Ticket;
