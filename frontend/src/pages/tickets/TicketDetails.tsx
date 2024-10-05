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
  );
};

export default TicketDetails;
