import { useEffect, useState } from "react";
import "./projects.scss";
import httpModule from "../../helpers/http.module";
import { ITicket } from "../../types/global.typing";
import { CircularProgress } from "@mui/material";
import { useLocation } from "react-router-dom";
import ProjectTicketsGrid from "../../components/projects/ProjectTicketsGrid.component";

const DetailProjects = () => {
  const [tickets, setTickets] = useState<ITicket[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const location = useLocation();
  const { projectId, projectDescription, projectName } = location.state;

  useEffect(() => {
    setLoading(true);
    httpModule
      .get<ITicket[]>(`Ticket/Get/project/${projectId}`)
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