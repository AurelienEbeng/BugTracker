import { useEffect, useState } from "react";
import "./projects.scss";
import httpModule from "../../helpers/http.module";
import { ITicket } from "../../types/global.typing";
import { CircularProgress } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import ProjectTicketsGrid from "../../components/projects/ProjectTicketsGrid.component";
import { useJwt } from "../../context/Jwt.context";

const DetailProjects = () => {
  const [tickets, setTickets] = useState<ITicket[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const location = useLocation();
  const { projectId, projectDescription, projectName } = location.state;
  const redirect = useNavigate();
  const jwt = useJwt();

  useEffect(() => {
    setLoading(true);
    if (Object.keys(jwt.user).length === 0 && jwt.user.constructor === Object) {
      redirect("/signin", { replace: true });
      return;
    }

    let jwtToken = jwt.user.jwtToken;
    httpModule
      .get<ITicket[]>(`Ticket/Get/project/${projectId}`, {
        headers: { Authorization: "Bearer " + jwtToken },
      })
      .then((response) => {
        setTickets(response.data);
        setLoading(false);
      })
      .catch((error) => {
        alert("Error");
        console.log(error);
        setLoading(false);
      });
  }, []);
  return (
    <div className="content projects">
      <div className="heading">
        <div>Project Name: {projectName}</div>
        <div>Description: {projectDescription}</div>
      </div>

      {loading ? (
        <CircularProgress size={100} />
      ) : tickets.length === 0 ? (
        <h1>No Tickets</h1>
      ) : (
        <ProjectTicketsGrid data={tickets} />
      )}
    </div>
  );
};

export default DetailProjects;
