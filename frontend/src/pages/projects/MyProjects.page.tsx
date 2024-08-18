import { useEffect, useState } from "react";
import { useJwt } from "../../context/Jwt.context";
import { useNavigate } from "react-router-dom";
import httpModule from "../../helpers/http.module";
import { IProject } from "../../types/global.typing";
import { Button, CircularProgress } from "@mui/material";
import ProjectsGrid from "../../components/projects/ProjectsGrid.component";
import { Add } from "@mui/icons-material";

const MyProjects = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [projects, setProjects] = useState<IProject[]>([]);
  const jwt = useJwt();
  const redirect = useNavigate();

  useEffect(() => {
    setLoading(true);
    if (!jwt.isLoggedIn()) {
      redirect("/signIn", { replace: true });
      return;
    }

    let params = new URLSearchParams();
    params.append("userId", jwt.user.id);
    httpModule
      .get<IProject[]>("/Project/GetMyProjects?" + params, {
        headers: { Authorization: "Bearer " + jwt.user.jwtToken },
      })
      .then((response) => {
        setProjects(response.data);
        setLoading(false);
      })
      .catch((error) => {
        alert("Error, check console");
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
        <h1>"No Projects"</h1>
      ) : (
        <ProjectsGrid data={projects} />
      )}
    </div>
  );
};

export default MyProjects;
