import { Button, CircularProgress, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import {
  ICreateTicketCommentDto,
  ITicketComment,
} from "../../types/global.typing";
import TicketCommentsGrid from "../../components/tickets/TicketCommentsGrid.component";
import httpModule from "../../helpers/http.module";
import { useJwt } from "../../context/Jwt.context";

interface ITicketCommentProps {
  ticketId: string;
}
const TicketComment = ({ ticketId }: ITicketCommentProps) => {
  const [ticketComment, setTicketComment] = useState<ICreateTicketCommentDto>(
    {} as ICreateTicketCommentDto
  );
  const [ticketComments, setTicketComments] = useState<ITicketComment[]>([]);
  const [loadingTicketComment, setLoadingTicketComment] =
    useState<boolean>(false);

  const jwt = useJwt();

  useEffect(() => {
    setLoadingTicketComment(true);
    getTickets();
  }, []);

  function getTickets(){
    httpModule
      .get<ITicketComment[]>(`TicketComment/Get/${ticketId}`, {
        headers: { Authorization: "Bearer " + jwt.user.jwtToken },
      })
      .then((response) => {
        setTicketComments(response.data);
        setLoadingTicketComment(false);
      })
      .catch((error) => {
        alert("Error");
        console.log(error);
        setLoadingTicketComment(false);
      });
  }
  function handleClickAddBtn() {
    if (ticketComment.message === "") {
      alert("Fill all fields");
      return;
    }
    setLoadingTicketComment(true);
    ticketComment.commenterId = jwt.user.id;
    ticketComment.ticketId = ticketId;

    httpModule
      .post("TicketComment/Create", ticketComment, {
        headers: { Authorization: "Bearer " + jwt.user.jwtToken },
      })
      .then(() => {
        setTicketComment({ ...ticketComment, message: "" });
        getTickets();
      })
      .catch((error) => {
        alert("Error, check console");
        console.log(error.response);
        setLoadingTicketComment(false);
      });
  }
  return (
    <>
      {loadingTicketComment ? (
        <CircularProgress size={100} />
      ) : (
        <>
          <div>
            <p>Add Comment?</p>
            <TextField
              value={ticketComment.message}
              variant="outlined"
              fullWidth
              onChange={(e) => {
                setTicketComment({ ...ticketComment, message: e.target.value });
              }}
              margin="normal"
            />
            <Button variant="outlined" onClick={handleClickAddBtn} fullWidth>
              Add
            </Button>
          </div>

          <TicketCommentsGrid data={ticketComments} />
        </>
      )}
    </>
  );
};

export default TicketComment;
