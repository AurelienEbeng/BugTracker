import { useState, useEffect } from "react";
import "./tickets.scss";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  TextField,
  Select,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import httpModule from "../../helpers/http.module";
import {
  ICreateTicketAttachmentDto,
  IEmployee,
  ITicket,
} from "../../types/global.typing";

const AddTicketAttachment = () => {
  const [ticketAttachment, setTicketAttachment] =
    useState<ICreateTicketAttachmentDto>({
      notes: "",
      ticketId: "",
      uploaderId: "",
    });
  const [tickets, setTickets] = useState<ITicket[]>([]);
  const [employees, setEmployees] = useState<IEmployee[]>([]);
  const [pdfFile, setPdfFile] = useState<File | null>();

  const redirect = useNavigate();

  useEffect(() => {
    let username = sessionStorage.getItem("username");
    if (username === "" || username === null) {
      redirect("/signIn");
    }
    let jwtToken = sessionStorage.getItem("jwtToken");
    httpModule
      .get<ITicket[]>("/Ticket/Get", {
        headers: { Authorization: "Bearer " + jwtToken },
      })
      .then((response) => {
        setTickets(response.data);
      })
      .catch((error) => {
        alert("Error");
        console.log(error);
      });

    httpModule
      .get<IEmployee[]>("/Employee/Get", {
        headers: { Authorization: "Bearer " + jwtToken },
      })
      .then((response) => {
        setEmployees(response.data);
      })
      .catch((error) => {
        alert("Error");
        console.log(error);
      });
  }, []);

  const handleClickSaveBtn = () => {
    if (
      ticketAttachment.notes === "" ||
      ticketAttachment.ticketId === "" ||
      ticketAttachment.uploaderId === "" ||
      !pdfFile
    ) {
      alert("Fill  all fields");
      return;
    }

    const newAttachmentFormData = new FormData();
    newAttachmentFormData.append("Notes", ticketAttachment.notes);
    newAttachmentFormData.append("TicketId", ticketAttachment.ticketId);
    newAttachmentFormData.append("UploaderId", ticketAttachment.uploaderId);
    newAttachmentFormData.append("pdfFile", pdfFile);
    let jwtToken = sessionStorage.getItem("jwtToken");

    httpModule
      .post("TicketAttachment/Create", newAttachmentFormData, {
        headers: { Authorization: "Bearer " + jwtToken },
      })
      .then((response) => redirect("/projects"))
      .catch((error) => console.log(error));
  };
  const handleClickBackBtn = () => {
    redirect("/projects");
  };

  return (
    <div className="content">
      <div className="add-ticket">
        <h2>Add New Ticket Attachment</h2>
        <TextField
          autoComplete="off"
          label="Notes"
          variant="outlined"
          value={ticketAttachment.notes}
          onChange={(e) =>
            setTicketAttachment({ ...ticketAttachment, notes: e.target.value })
          }
        />

        <FormControl fullWidth>
          <InputLabel>Ticket</InputLabel>
          <Select
            value={ticketAttachment.ticketId}
            label="Ticket"
            onChange={(e) =>
              setTicketAttachment({
                ...ticketAttachment,
                ticketId: e.target.value,
              })
            }
          >
            {tickets.map((item) => (
              <MenuItem key={item.id} value={item.id}>
                {item.title}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl fullWidth>
          <InputLabel>Uploader</InputLabel>
          <Select
            value={ticketAttachment.uploaderId}
            label="uploader"
            onChange={(e) =>
              setTicketAttachment({
                ...ticketAttachment,
                uploaderId: e.target.value,
              })
            }
          >
            {employees.map((item) => (
              <MenuItem key={item.id} value={item.id}>
                {item.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <input
          type="file"
          onChange={(event) =>
            setPdfFile(event.target.files ? event.target.files[0] : null)
          }
        />

        <div className="btns">
          <Button
            variant="outlined"
            color="primary"
            onClick={handleClickSaveBtn}
          >
            Save
          </Button>
          <Button
            variant="outlined"
            color="secondary"
            onClick={handleClickBackBtn}
          >
            Back
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AddTicketAttachment;
