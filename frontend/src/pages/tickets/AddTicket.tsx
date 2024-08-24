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
import { ICreateTicketDto } from "../../types/global.typing";
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
const AddTicket = () => {
  const [ticket, setTicket] = useState<ICreateTicketDto>(
    {} as ICreateTicketDto
  );
  const location = useLocation();
  const { project } = location.state;
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

  useEffect(() => {
    setLoading(true);
    if (!jwt.isLoggedIn()) {
      redirect("/signIn", { replace: true });
      return;
    }
    setTicket({
      ...ticket,
      projectId: project.id,
      creatorId: jwt.user.id,
      status: "NEW",
      priority: "HIGH",
    });

    let params = new URLSearchParams();
    params.append("projectId", project.id);
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

  function handleClickSaveBtn() {
    if (
      ticket.title === "" ||
      ticket.description === "" ||
      ticket.type === "" ||
      ticket.assignedDeveloperId === ""
    ) {
      alert("Fill all fields");
      return;
    }

    setLoading(true);

    httpModule
      .post("/Ticket/Create", ticket, {
        headers: { Authorization: "Bearer " + jwt.user.jwtToken },
      })
      .then(() => {
        setLoading(false);
        redirect("/projects/details", { state: { project } });
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
            <h1> Add New Ticket</h1>
          </div>
          <TextField
            label="Title"
            variant="outlined"
            value={ticket.title}
            onChange={(e) => setTicket({ ...ticket, title: e.target.value })}
            fullWidth
          />

          <TextField
            label="Description"
            variant="outlined"
            value={ticket.description}
            onChange={(e) =>
              setTicket({ ...ticket, description: e.target.value })
            }
            multiline
            fullWidth
          />

          <FormControl fullWidth>
            <InputLabel>Type</InputLabel>
            <Select
              value={ticket.type}
              variant="outlined"
              onChange={(e) => setTicket({ ...ticket, type: e.target.value })}
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
              value={ticket.assignedDeveloperId}
              variant="outlined"
              onChange={(e) =>
                setTicket({ ...ticket, assignedDeveloperId: e.target.value })
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
            value={project.name}
            disabled
            fullWidth
          />

          <TextField
            label="Creator"
            variant="outlined"
            value={jwt.user.username}
            disabled
            fullWidth
          />
          <div className="btns">
            <Link to="/projects/details" state={{ project }}>
              <Button variant="outlined">Back</Button>
            </Link>
            <Button variant="outlined" onClick={handleClickSaveBtn}>
              Save
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddTicket;
