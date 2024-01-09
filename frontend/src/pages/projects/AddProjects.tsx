import { useState, useEffect } from "react";
import "./projects.scss";
import {
  ICreateProjectDto,
  IEmployee,
} from "../../types/global.typing";
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

const AddProjects = () => {
  const [employees, setEmployees] = useState<IEmployee[]>([]);
  const [project, setProject] = useState<ICreateProjectDto>({
    name: "",
    description: "",
    managerId: "",
  });
  const redirect = useNavigate();

  useEffect(() => {
    httpModule
      .get<IEmployee[]>("/Employee/Get")
      .then((response) => {
        setEmployees(response.data);
      })
      .catch((error) => {
        alert("Error");
        console.log(error);
      });
  }, []);

  const handleClickSaveBtn = () => {
    if (project.name === "") {
      alert("Fill  all fields");
      return;
    }
    httpModule
      .post("Project/Create", project)
      .then((response) => redirect("/projects"))
      .catch((error) => console.log(error));
  };
  const handleClickBackBtn = () => {
    redirect("/projects");
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
        />
        <TextField
          autoComplete="off"
          label="Description"
          variant="outlined"
          value={project.description}
          onChange={(e) =>
            setProject({ ...project, description: e.target.value })
          }
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
