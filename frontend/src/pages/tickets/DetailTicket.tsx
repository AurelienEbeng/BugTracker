import { useEffect, useState } from "react";
import "./tickets.scss";
import httpModule from "../../helpers/http.module";
import {
  ITicket,
  ITicketAttachment,
  ITicketComment,
  ITicketHistory,
} from "../../types/global.typing";
import { CircularProgress } from "@mui/material";
import { useLocation } from "react-router-dom";
import TicketsGrid from "../../components/tickets/TicketsGrid.component";
import TicketAttachmentsGrid from "../../components/tickets/TicketAttachmentsGrid.component";
import TicketCommentsGrid from "../../components/tickets/TicketCommentsGrid.component";
import TicketHistoriesGrid from "../../components/tickets/TicketHistoryGrid.component";

const DetailTicket = () => {
  const [tickets, setTickets] = useState<ITicket[]>([]);
  const [ticketAttachments, setTicketAttachments] = useState<
    ITicketAttachment[]
  >([]);
  const [ticketComments, setTicketComments] = useState<ITicketComment[]>([]);
  const [ticketHistories, setTicketHistories] = useState<ITicketHistory[]>([]);
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

    httpModule
      .get<ITicketAttachment[]>(`TicketAttachment/Get/${ticketId}`)
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
      .get<ITicketComment[]>(`TicketComment/Get/${ticketId}`)
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
      .get<ITicketHistory[]>(`TicketHistory/Get/${ticketId}`)
      .then((response) => {
        setTicketHistories(response.data);
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

      <div className="heading">
        <div>Ticket Attachment</div>
      </div>
      {loading ? (
        <CircularProgress size={100} />
      ) : tickets.length === 0 ? (
        <h1>No Tickets</h1>
      ) : (
        <TicketAttachmentsGrid data={ticketAttachments} />
      )}
      <div className="heading">
        <div>Ticket Comments</div>
      </div>
      {loading ? (
        <CircularProgress size={100} />
      ) : tickets.length === 0 ? (
        <h1>No Tickets</h1>
      ) : (
        <TicketCommentsGrid data={ticketComments} />
      )}
      <div className="heading">
        <div>Ticket History</div>
      </div>
      {loading ? (
        <CircularProgress size={100} />
      ) : tickets.length === 0 ? (
        <h1>No Tickets</h1>
      ) : (
        <TicketHistoriesGrid data={ticketHistories} />
      )}
    </div>
  );
};

export default DetailTicket;
