import { Button, TextField } from "@mui/material";
import { useState } from "react";
import { ITicket } from "../../types/global.typing";
import "./tickets.scss";
import { Link, useNavigate } from "react-router-dom";

type TicketDetailsProps = {
  data: ITicket;
};

const TicketDetails = ({ data }: TicketDetailsProps) => {
  const [ticket] = useState<ITicket>(data);
  const navigate = useNavigate()
  function handleListOfTicketsBtn(){
    let project ={
      id: ticket.projectId,
      name: ticket.projectName
    }
    navigate("/projects/details",{state:{project}} );
  }
  return (
    <>
      <div className="heading">
        <h1>Ticket Details</h1>
        <Link to="/projects/details/editTicket" state={{ ticket }}>
          <Button variant="outlined">Edit Ticket</Button>
        </Link>
        <Button variant="outlined" onClick={handleListOfTicketsBtn} >List of Tickets</Button>
      </div>
      <TextField
        label="Title"
        variant="outlined"
        value={ticket.title}
        disabled
        fullWidth
        margin="normal"
      />

      <TextField
        label="Description"
        variant="outlined"
        value={ticket.description}
        multiline
        disabled
        fullWidth
        margin="normal"
      />

      <TextField
        label="Type"
        variant="outlined"
        value={ticket.type}
        disabled
        fullWidth
        margin="normal"
      />

      <TextField
        label="Assigned Developer"
        variant="outlined"
        value={ticket.assignedDeveloperName}
        disabled
        fullWidth
        margin="normal"
      />

      <TextField
        label="Status"
        variant="outlined"
        value={ticket.status}
        disabled
        fullWidth
        margin="normal"
      />

      <TextField
        label="Priority"
        variant="outlined"
        value={ticket.priority}
        disabled
        fullWidth
        margin="normal"
      />

      <TextField
        label="Project"
        variant="outlined"
        value={ticket.projectName}
        disabled
        fullWidth
        margin="normal"
      />

      <TextField
        label="Creator"
        variant="outlined"
        value={ticket.creatorName}
        disabled
        fullWidth
        margin="normal"
      />
    </>
  );
};

export default TicketDetails;
