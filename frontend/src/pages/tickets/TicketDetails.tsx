import { TextField } from "@mui/material";
import { useState } from "react";
import { ITicket } from "../../types/global.typing";
import "./tickets.scss";

type TicketDetailsProps={
    ticket: ITicket
}

const TicketDetails = ({ticket}: TicketDetailsProps) => {

  return (
    <div className="ticket-details">
      <div className="heading">
        <h1>Ticket Details</h1>
      </div>
      <TextField
        label="Title"
        variant="outlined"
        value={ticket.title}
        disabled
        fullWidth
      />

      <TextField
        label="Description"
        variant="outlined"
        value={ticket.description}
        multiline
        disabled
        fullWidth
      />

      <TextField
        label="Type"
        variant="outlined"
        value={ticket.type}
        disabled
        fullWidth
      />

      <TextField
        label="Assigned Developer"
        variant="outlined"
        value={ticket.assignedDeveloperName}
        disabled
        fullWidth
      />

      <TextField
        label="Status"
        variant="outlined"
        value={ticket.status}
        disabled
        fullWidth
      />

      <TextField
        label="Priority"
        variant="outlined"
        value={ticket.priority}
        disabled
        fullWidth
      />

      <TextField
        label="Project"
        variant="outlined"
        value={ticket.projectName}
        disabled
        fullWidth
      />

      <TextField
        label="Creator"
        variant="outlined"
        value={ticket.creatorName}
        disabled
        fullWidth
      />
    </div>
  );
};

export default TicketDetails;
