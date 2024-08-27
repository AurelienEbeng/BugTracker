import { useEffect, useState } from "react";
import "./projects.scss";
import httpModule from "../../helpers/http.module";
import { IProject } from "../../types/global.typing";
import { Button, CircularProgress } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Add } from "@mui/icons-material";
import ProjectsGrid from "../../components/projects/ProjectsGrid.component";
import { useJwt } from "../../context/Jwt.context";

const Projects = () => {
  const [projects, setProjects] = useState<IProject[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const redirect = useNavigate();
  const jwt = useJwt();

  useEffect(() => {
    setLoading(true);

    if (!jwt.isLoggedIn()) {
      redirect("/signin", { replace: true });
      return;
    }

    httpModule
      .get<IProject[]>("/Project/Get", {
        headers: { Authorization: "Bearer " + jwt.user.jwtToken },
      })
      .then((response) => {
        setProjects(response.data);
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
        <h2>Projects</h2>
        <Button variant="outlined" onClick={() => redirect("/projects/add")}>
          <Add />
        </Button>
      </div>

      {loading ? (
        <CircularProgress size={100} />
      ) : projects.length === 0 ? (
        <h1>No Projects</h1>
      ) : (
        <ProjectsGrid data={projects} />
      )}
    </div>
  );
};

export default Projects;
