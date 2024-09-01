import { useEffect, useState } from "react";
import "./projects.scss";
import httpModule from "../../helpers/http.module";
import { ITicket } from "../../types/global.typing";
import { Button, CircularProgress } from "@mui/material";
import { Link, useLocation, useNavigate } from "react-router-dom";
import ProjectTicketsGrid from "../../components/projects/ProjectTicketsGrid.component";
import { useJwt } from "../../context/Jwt.context";

const DetailProjects = () => {
  const [tickets, setTickets] = useState<ITicket[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const location = useLocation();
  const { project } = location.state;
  const redirect = useNavigate();
  const jwt = useJwt();

  useEffect(() => {
    setLoading(true);
    if (!jwt.isLoggedIn()) {
      redirect("/signin", { replace: true });
      return;
    }

    let jwtToken = jwt.user.jwtToken;
    httpModule
      .get<ITicket[]>(`Ticket/Get/project/${project.id}`, {
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
        <h1>{project.name}'s Tickets</h1>
        <Link to="/projects/details/edit" state={{ project }}>
          <Button variant="outlined" color="primary">
            Edit Project
          </Button>
        </Link>
        <Link to="/projects/details/addTicket" state={{ project }}>
          <Button variant="outlined" color="primary">
            Add Ticket
          </Button>
        </Link>
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
