import { Button, CircularProgress, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import {
  ICreateTicketAttachmentDto,
  ITicketAttachment,
} from "../../types/global.typing";
import httpModule from "../../helpers/http.module";
import { useJwt } from "../../context/Jwt.context";
import TicketAttachmentsGrid from "../../components/tickets/TicketAttachmentsGrid.component";

interface ITicketAttachmentProps {
  ticketId: string;
}
const TicketAttachment = ({ ticketId }: ITicketAttachmentProps) => {
  const [ticketAttachment, setTicketAttachment] =
    useState<ICreateTicketAttachmentDto>({} as ICreateTicketAttachmentDto);

  const [ticketAttachments, setTicketAttachments] = useState<
    ITicketAttachment[]
  >([]);
  const [loadingTicketAttachment, setLoadingTicketAttachment] =
    useState<boolean>(false);

  const jwt = useJwt();
  const [pdfFile, setPdfFile] = useState<File | null>();

  useEffect(() => {
    setLoadingTicketAttachment(true);
    getTickets();
  }, []);

  function getTickets() {
    httpModule
      .get<ITicketAttachment[]>(`TicketAttachment/Get/${ticketId}`, {
        headers: { Authorization: "Bearer " + jwt.user.jwtToken },
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
  }
  function handleClickAddBtn() {
    if (ticketAttachment.notes === "" || !pdfFile) {
      alert("Fill ticket attachment description field and/or choose a file");
      return;
    }
    setLoadingTicketAttachment(true);

    const newAttachmentFormData = new FormData();
    newAttachmentFormData.append("Notes", ticketAttachment.notes);
    newAttachmentFormData.append("TicketId", ticketId);
    newAttachmentFormData.append("UploaderId", jwt.user.id);
    newAttachmentFormData.append("pdfFile", pdfFile);

    httpModule
      .post("TicketAttachment/Create", newAttachmentFormData, {
        headers: { Authorization: "Bearer " + jwt.user.jwtToken },
      })
      .then(() => {
        setTicketAttachment({ ...ticketAttachment, notes: "" });
        getTickets();
      })
      .catch((error) => {
        alert("Error, check console");
        console.log(error.response);
        setLoadingTicketAttachment(false);
      });
  }
  return (
    <>
      {loadingTicketAttachment ? (
        <CircularProgress size={100} />
      ) : (
        <>
          <div>
            <p>Add an Attachment?</p>
            <input
              type="file"
              onChange={(event) =>
                setPdfFile(event.target.files ? event.target.files[0] : null)
              }
            />
            <TextField
              value={ticketAttachment.notes}
              variant="outlined"
              fullWidth
              label="Description"
              onChange={(e) => {
                setTicketAttachment({
                  ...ticketAttachment,
                  notes: e.target.value,
                });
              }}
              margin="normal"
            />
            <Button variant="outlined" onClick={handleClickAddBtn} fullWidth>
              Add
            </Button>
          </div>
          <TicketAttachmentsGrid data={ticketAttachments} />
        </>
      )}
    </>
  );
};

export default TicketAttachment;
