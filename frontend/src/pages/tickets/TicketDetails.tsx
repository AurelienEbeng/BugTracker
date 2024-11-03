import { Button, CircularProgress, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { ITicket } from "../../types/global.typing";
import "./tickets.scss";
import { Link, useNavigate } from "react-router-dom";
import httpModule from "../../helpers/http.module";
import { useJwt } from "../../context/Jwt.context";

type TicketId = {
  ticketId: string;
};

const TicketDetails = ({ ticketId }: TicketId) => {
  const [ticket, setTicket] = useState<ITicket>({} as ITicket);
  const [loadingTicket, setLoadingTicket] = useState<boolean>(false);
  const navigate = useNavigate();
  const jwt = useJwt();
  let jwtToken = jwt.user.jwtToken;
  const redirect = useNavigate();

  useEffect(() => {
    if (!jwt.isLoggedIn()) {
      redirect("/signin", { replace: true });
      return;
    }
    setLoadingTicket(true);
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
  }, []);

  function handleListOfTicketsBtn() {
    let project = {
      id: ticket.projectId,
      name: ticket.projectName,
    };
    navigate("/projects/details", { state: { project } });
  }
  return (
    <>
      {loadingTicket ? (
        <CircularProgress size={100} />
      ) : (
        <>
          <div className="heading">
            <h1>Ticket Details</h1>
            <Link to="/projects/details/editTicket" state={{ ticket }}>
              <Button variant="outlined">Edit Ticket</Button>
            </Link>
            <Button variant="outlined" onClick={handleListOfTicketsBtn}>
              List of Tickets
            </Button>
          </div>
          <TextField
            label="Title"
            variant="outlined"
            value={ticket.title}
            fullWidth
            margin="normal"
            inputProps={{ readOnly: true }}
          />

          <TextField
            label="Description"
            variant="outlined"
            value={ticket.description}
            multiline
            fullWidth
            margin="normal"
            inputProps={{ readOnly: true }}
          />

          <TextField
            label="Type"
            variant="outlined"
            value={ticket.type}
            fullWidth
            margin="normal"
            inputProps={{ readOnly: true }}
          />

          <TextField
            label="Assigned Developer"
            variant="outlined"
            value={ticket.assignedDeveloperName}
            fullWidth
            margin="normal"
            inputProps={{ readOnly: true }}
          />

          <TextField
            label="Status"
            variant="outlined"
            value={ticket.status}
            fullWidth
            margin="normal"
            inputProps={{ readOnly: true }}
          />

          <TextField
            label="Priority"
            variant="outlined"
            value={ticket.priority}
            fullWidth
            margin="normal"
            inputProps={{ readOnly: true }}
          />

          <TextField
            label="Project"
            variant="outlined"
            value={ticket.projectName}
            fullWidth
            margin="normal"
            inputProps={{ readOnly: true }}
          />

          <TextField
            label="Creator"
            variant="outlined"
            value={ticket.creatorName}
            fullWidth
            margin="normal"
            inputProps={{ readOnly: true }}
          />
        </>
      )}
    </>
  );
};

export default TicketDetails;
