import { useState, useEffect } from "react";
import "./employees.scss";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  TextField,
  Select,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import httpModule from "../../helpers/http.module";
import { ICreateEmployeeDto, IRole } from "../../types/global.typing";
import { useJwt } from "../../context/Jwt.context";

const AddEmployee = () => {
  const [employee, setEmployee] = useState<ICreateEmployeeDto>({
    name: "",
    email: "",
    roleId: "",
  });
  const [roles, setRoles] = useState<IRole[]>([]);

  const redirect = useNavigate();
  const jwt = useJwt();

  useEffect(() => {
    if (Object.keys(jwt.user).length === 0 && jwt.user.constructor === Object) {
      redirect("/signin", { replace: true });
      return;
    }
    let jwtToken = jwt.user.jwtToken;
    httpModule
      .get<IRole[]>("/Role/Get", {
        headers: { Authorization: "Bearer " + jwtToken },
      })
      .then((response) => {
        setRoles(response.data);
      })
      .catch((error) => {
        alert("Error");
        console.log(error);
      });
  }, []);

  const handleClickSaveBtn = () => {
    if (employee.name === "") {
      alert("Fill  all fields");
      return;
    }
    let jwtToken = jwt.user.jwtToken;
    httpModule
      .post("Employee/Create", employee, {
        headers: { Authorization: "Bearer " + jwtToken },
      })
      .then((response) => redirect("/employees"))
      .catch((error) => console.log(error));
  };
  const handleClickBackBtn = () => {
    redirect("/employees");
  };

  return (
    <div className="content">
      <div className="add-employee">
        <h2>Add New Employee</h2>
        <TextField
          autoComplete="off"
          label="Employee Name"
          variant="outlined"
          value={employee.name}
          onChange={(e) => setEmployee({ ...employee, name: e.target.value })}
        />
        <TextField
          autoComplete="off"
          label="Email"
          variant="outlined"
          value={employee.email}
          onChange={(e) => setEmployee({ ...employee, email: e.target.value })}
        />
        <FormControl fullWidth>
          <InputLabel>Role</InputLabel>
          <Select
            value={employee.roleId}
            label="Role"
            onChange={(e) =>
              setEmployee({ ...employee, roleId: e.target.value })
            }
          >
            {roles.map((item) => (
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

export default AddEmployee;
