import { useEffect, useState } from "react";
import "./tickets.scss";
import httpModule from "../../helpers/http.module";
import {
  ITicket,
  ITicketAttachment,
  ITicketComment,
  ITicketHistory,
} from "../../types/global.typing";
import { Button, CircularProgress } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import TicketsGrid from "../../components/tickets/TicketsGrid.component";
import TicketAttachmentsGrid from "../../components/tickets/TicketAttachmentsGrid.component";
import TicketCommentsGrid from "../../components/tickets/TicketCommentsGrid.component";
import TicketHistoriesGrid from "../../components/tickets/TicketHistoryGrid.component";
import { Add } from "@mui/icons-material";
import { useJwt } from "../../context/Jwt.context";
import TicketDetails from "./TicketDetails";

const Ticket = () => {
  const [ticket, setTicket] = useState<ITicket>({} as ITicket);
  const [tickets, setTickets] = useState<ITicket[]>([]);
  const [ticketAttachments, setTicketAttachments] = useState<
    ITicketAttachment[]
  >([]);
  const [ticketComments, setTicketComments] = useState<ITicketComment[]>([]);
  const [ticketHistories, setTicketHistories] = useState<ITicketHistory[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const location = useLocation();
  const { ticketId } = location.state;
  const redirect = useNavigate();
  const jwt = useJwt();
  /*
  useEffect(() => {
    setLoading(true);
    if (Object.keys(jwt.user).length === 0 && jwt.user.constructor === Object) {
      redirect("/signin", { replace: true });
      return;
    }
    let jwtToken = jwt.user.jwtToken;
    httpModule
      .get<ITicket[]>(`Ticket/Get/${ticketId}`, {
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

    httpModule
      .get<ITicketAttachment[]>(`TicketAttachment/Get/${ticketId}`, {
        headers: { Authorization: "Bearer " + jwtToken },
      })
      .then((response) => {
        setTicketAttachments(response.data);
        setLoading(false);
      })
      .catch((error) => {
        alert("Error");
        console.log(error);
        setLoading(false);
      });

    httpModule
      .get<ITicketComment[]>(`TicketComment/Get/${ticketId}`, {
        headers: { Authorization: "Bearer " + jwtToken },
      })
      .then((response) => {
        setTicketComments(response.data);
        setLoading(false);
      })
      .catch((error) => {
        alert("Error");
        console.log(error);
        setLoading(false);
      });

    httpModule
      .get<ITicketHistory[]>(`TicketHistory/Get/${ticketId}`, {
        headers: { Authorization: "Bearer " + jwtToken },
      })
      .then((response) => {
        setTicketHistories(response.data);
        setLoading(false);
      })
      .catch((error) => {
        alert("Error");
        console.log(error);
        setLoading(false);
      });
  }, []); */
  return (
    <div className="content tickets">
      <div className="row">
        <div className="tickets-details">
          <TicketDetails ticket={ticket} />
        </div>
        <div className="tickets-attachments">
          <div className="heading">
            <div>Ticket Attachment</div>
          </div>
          <Button
            variant="outlined"
            onClick={() => redirect("/projects/addAttachment")}
          >
            <Add />
          </Button>
          <TicketAttachmentsGrid data={ticketAttachments} />
        </div>
      </div>
      <div className="row">
        <div className="tickets-comments">
          <div className="heading">
            <div>Ticket Comments</div>
          </div>
          <TicketCommentsGrid data={ticketComments} />
        </div>
        <div className="tickets-history">
          <div className="heading">
            <div>Ticket History</div>
          </div>
          <TicketHistoriesGrid data={ticketHistories} />
        </div>
      </div>
    </div>
  );
};

export default Ticket;
