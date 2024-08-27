import {
  Button,
  CircularProgress,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { useEffect, useState } from "react";
import { ITicket } from "../../types/global.typing";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useJwt } from "../../context/Jwt.context";
import httpModule from "../../helpers/http.module";
import "./tickets.scss";

interface IProjectMember {
  projectId: string;
  memberId: string;
  dateAdded: string;
  username: string;
}
const TicketDetailsEdit = () => {
  const location = useLocation();
  const { ticket } = location.state;
  const [updatedTicket, setUpdatedTicket] = useState<ITicket>(ticket);
  const jwt = useJwt();
  const redirect = useNavigate();
  const types = [
    "BUGS",
    "FEATURES_REQUEST",
    "OTHER_COMMENTS",
    "DOCUMENTS_REQUEST",
  ];
  const [projectMembers, setProjectMembers] = useState<IProjectMember[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const priority = ["HIGH", "MEDIUM", "LOW", "NONE"];
  const status =["NEW", "OPEN", "IN_PROGRESS", "RESOLVED", "ADDITIONAL_INFO_REQUIRED"]

  useEffect(() => {
    setLoading(true);
    if (!jwt.isLoggedIn()) {
      redirect("/signIn", { replace: true });
      return;
    }

    let params = new URLSearchParams();
    params.append("projectId", updatedTicket.projectId);
    httpModule
      .get<IProjectMember[]>("ProjectMember/Get?" + params, {
        headers: { Authorization: "Bearer " + jwt.user.jwtToken },
      })
      .then((response) => {
        setProjectMembers(response.data);
        setLoading(false);
      })
      .catch((error) => {
        alert("Error. Check console");
        console.log(error);
        setLoading(false);
      });
  }, []);
  
    function handleClickUpdateBtn() {
      if (
        updatedTicket.title === "" ||
        updatedTicket.description === "" 
      ) {
        alert("Fill all fields");
        return;
      }
  
      setLoading(true);
  
      httpModule
        .put("/Ticket/Update", updatedTicket, {
          headers: { Authorization: "Bearer " + jwt.user.jwtToken },
        })
        .then(() => {
          setLoading(false);
          let ticketId = updatedTicket.id;
          redirect("/projects/ticket", { state: { ticketId } });
        })
        .catch((error) => {
          alert("Error, check console");
          console.log(error);
          setLoading(false);
        });
    } 
  return (
    <div className="content">
      {loading ? (
        <CircularProgress size={100} />
      ) : (
        <div className="add-ticket">
          <div className="heading">
            <h1> Edit Ticket</h1>
          </div>
          <TextField
            label="Title"
            variant="outlined"
            value={updatedTicket.title}
            onChange={(e) =>
              setUpdatedTicket({ ...updatedTicket, title: e.target.value })
            }
            fullWidth
          />

          <TextField
            label="Description"
            variant="outlined"
            value={updatedTicket.description}
            onChange={(e) =>
              setUpdatedTicket({ ...updatedTicket, description: e.target.value })
            }
            multiline
            fullWidth
          />

          <FormControl fullWidth>
            <InputLabel>Type</InputLabel>
            <Select
              value={updatedTicket.type}
              variant="outlined"
              onChange={(e) =>
                setUpdatedTicket({ ...updatedTicket, type: e.target.value })
              }
            >
              {types.map((type) => (
                <MenuItem key={type} value={type}>
                  {type}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl fullWidth>
            <InputLabel>Assigned Developer</InputLabel>
            <Select
              value={updatedTicket.assignedDeveloperId}
              variant="outlined"
              onChange={(e) =>
                setUpdatedTicket({
                  ...updatedTicket,
                  assignedDeveloperId: e.target.value,
                })
              }
            >
              {projectMembers.map((projectMember) => (
                <MenuItem
                  key={projectMember.memberId}
                  value={projectMember.memberId}
                >
                  {projectMember.username}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl fullWidth>
            <InputLabel>Status</InputLabel>
            <Select
              variant="outlined"
              value={updatedTicket.status}
              onChange={(e) =>
                setUpdatedTicket({ ...ticket, status: e.target.value })
              }
            >
              {status.map((s) => (
                <MenuItem key={s} value={s}>
                  {s}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl fullWidth>
            <InputLabel>Priority</InputLabel>
            <Select
              variant="outlined"
              value={updatedTicket.priority}
              onChange={(e) =>
                setUpdatedTicket({ ...ticket, priority: e.target.value })
              }
            >
              {priority.map((p) => (
                <MenuItem key={p} value={p}>
                  {p}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <div className="btns">
            <Button variant="outlined" onClick={handleClickUpdateBtn}>Update</Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TicketDetailsEdit;
