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
import TicketAttachmentsGrid from "../../components/tickets/TicketAttachmentsGrid.component";
import TicketHistoriesGrid from "../../components/tickets/TicketHistoryGrid.component";
import { Add } from "@mui/icons-material";
import { useJwt } from "../../context/Jwt.context";
import TicketDetails from "./TicketDetails";
import TicketComment from "./TicketComment";

const Ticket = () => {
  const [ticket, setTicket] = useState<ITicket>({} as ITicket);
  const [ticketAttachments, setTicketAttachments] = useState<
    ITicketAttachment[]
  >([]);
  const [ticketHistories, setTicketHistories] = useState<ITicketHistory[]>([]);
  const [loadingTicket, setLoadingTicket] = useState<boolean>(false);
  const location = useLocation();
  const { ticketId } = location.state;
  const redirect = useNavigate();
  const jwt = useJwt();
  const [loadingTicketAttachment, setLoadingTicketAttachment] =
    useState<boolean>(false);
  const [loadingTicketHistory, setLoadingTicketHistory] =
    useState<boolean>(false);

  useEffect(() => {
    setLoadingTicket(true);
    setLoadingTicketAttachment(true);
    setLoadingTicketHistory(true);
    if (!jwt.isLoggedIn()) {
      redirect("/signin", { replace: true });
      return;
    }
    let jwtToken = jwt.user.jwtToken;
    httpModule
      .get<ITicket>(`Ticket/Get/${ticketId}`, {
        headers: { Authorization: "Bearer " + jwtToken },
      })
      .then((response) => {
        setTicket(response.data);
        setLoadingTicket(false);
      })
      .catch((error) => {
        alert("Error");
        console.log(error);
        setLoadingTicket(false);
      });

    httpModule
      .get<ITicketAttachment[]>(`TicketAttachment/Get/${ticketId}`, {
        headers: { Authorization: "Bearer " + jwtToken },
      })
      .then((response) => {
        setTicketAttachments(response.data);
        setLoadingTicketAttachment(false);
      })
      .catch((error) => {
        alert("Error");
        console.log(error);
        setLoadingTicketAttachment(false);
      });

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
      {loadingTicket ||
      loadingTicketAttachment ||
      loadingTicketHistory ? (
        <CircularProgress size={100} />
      ) : (
        <div className="tickets">
          <div className="row">
            <div className="tickets-details">
              <TicketDetails data={ticket} />
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
                <h1>Ticket Comments</h1>
              </div>
              <TicketComment ticketId={ticketId} />
            </div>
            <div className="tickets-history">
              <div className="heading">
                <div>Ticket History</div>
              </div>
              <TicketHistoriesGrid data={ticketHistories} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Ticket;
