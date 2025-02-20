import { useState, useEffect } from "react";
import "./projects.scss";
import { ICreateProjectDto, IEmployee } from "../../types/global.typing";
import {
  Button,
  TextField,
  Select,
  FormControl,
  MenuItem,
  InputLabel,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import httpModule from "../../helpers/http.module";
import { useJwt } from "../../context/Jwt.context";

const AddProjects = () => {
  const [employees, setEmployees] = useState<IEmployee[]>([]);
  const [project, setProject] = useState<ICreateProjectDto>({
    name: "",
    description: "",
    managerId: "",
  });
  const redirect = useNavigate();
  const jwt = useJwt();

  useEffect(() => {
    if (!jwt.isLoggedIn()) {
      redirect("/signin", { replace: true });
      return;
    }
    let jwtToken = jwt.user.jwtToken;

    httpModule
      .get<IEmployee[]>("/Employee/GetEmployees", {
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
    if (project.name === "" || project.description==="" || project.managerId==="") {
      alert("Fill  all fields");
      return;
    }
    let jwtToken = jwt.user.jwtToken;
    httpModule
      .post("Project/Create/"+jwt.user.id, project, {
        headers: { Authorization: "Bearer " + jwtToken },
      })
      .then((response) => redirect("/projects/myProjects"))
      .catch((error) => console.log(error));
  };
  const handleClickBackBtn = () => {
    redirect("/projects/myProjects");
  };

  return (
    <div className="content">
      <div className="add-project">
        <h2>Add New Project</h2>
        <TextField
          autoComplete="off"
          label="Project Name"
          variant="outlined"
          value={project.name}
          onChange={(e) => setProject({ ...project, name: e.target.value })}
          fullWidth
        />
        <TextField
          autoComplete="off"
          label="Description"
          variant="outlined"
          value={project.description}
          onChange={(e) =>
            setProject({ ...project, description: e.target.value })
          }
          multiline
          fullWidth
        />
        <FormControl fullWidth>
          <InputLabel>Manager</InputLabel>
          <Select
            value={project.managerId}
            label="Manager"
            onChange={(e) =>
              setProject({ ...project, managerId: e.target.value })
            }
          >
            {employees.map((item) => (
              <MenuItem key={item.id} value={item.id}>
                {item.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
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

export default AddProjects;
