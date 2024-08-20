import {
  Button,
  CircularProgress,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { IEmployee, IProject } from "../../types/global.typing";
import { useJwt } from "../../context/Jwt.context";
import httpModule from "../../helpers/http.module";
import "./projects.scss";

const DetailProjectEdit = () => {
  const location = useLocation();
  const { project } = location.state;
  const [updatedProject, setUpdatedProject] = useState(() => {
    return {
      id: project.id,
      name: project.name,
      description: project.description,
      dateCreated: project.dateCreated,
      managerId: "",
    };
  });
  const [users, setUsers] = useState<IEmployee[]>([]);
  const jwt = useJwt();
  const redirect = useNavigate();
  const [loading, setLoading] = useState<boolean>();

  useEffect(() => {
    setLoading(true);
    if (!jwt.isLoggedIn()) {
      redirect("/signIn", { replace: true });
      return;
    }

    httpModule
      .get<IEmployee[]>("Employee/GetEmployees", {
        headers: { Authorization: "Bearer " + jwt.user.jwtToken },
      })
      .then((response) => {
        setUsers(response.data);
        users.map((user) => {
          if (user.name === project.managerName) {
            updatedProject.managerId = user.id;
            console.log(updatedProject);
          }
        });
        setLoading(false);
      })
      .catch((error) => {
        alert(error);
        console.log(error);
        setLoading(false);
      });
  }, []);

  function handleClickSaveBtn() {}

  return (
    <div className="content">
      {loading ? (
        <CircularProgress size={100} />
      ) : (
        <div className="editProject">
          <TextField
            variant="outlined"
            label="Project Id"
            value={updatedProject.id}
            InputProps={{
              readOnly: true,
            }}
            disabled
            fullWidth
          />

          <TextField
            variant="outlined"
            label="Name"
            value={updatedProject.name}
            onChange={(e) =>
              setUpdatedProject({ ...updatedProject, name: e.target.value })
            }
            fullWidth
          />

          <TextField
            variant="outlined"
            label="Description"
            value={updatedProject.description}
            onChange={(e) =>
              setUpdatedProject({
                ...updatedProject,
                description: e.target.value,
              })
            }
            multiline
            fullWidth
          />

          <TextField
            variant="outlined"
            label="Creation Time"
            value={updatedProject.dateCreated}
            InputProps={{
              readOnly: true,
            }}
            disabled
            fullWidth
          />

          <FormControl fullWidth>
            <InputLabel>Manager</InputLabel>
            <Select
              value={updatedProject.managerId}
              variant="outlined"
              label="Manager"
              onChange={(e) =>
                setUpdatedProject({
                  ...updatedProject,
                  managerId: e.target.value,
                })
              }
            >
              {users.map((user) => (
                <MenuItem key={user.id} value={user.id}>
                  {user.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <div className="btns">
            <Link to="/projects/details" state={{ project }}>
              <Button variant="outlined" color="primary">
                Back
              </Button>
            </Link>
            <Button
              variant="outlined"
              color="primary"
              onClick={handleClickSaveBtn}
            >
              Save
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DetailProjectEdit;
