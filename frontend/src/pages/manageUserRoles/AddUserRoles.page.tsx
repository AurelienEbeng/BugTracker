import { useEffect, useState } from "react";
import { IEmployee, IRole } from "../../types/global.typing";
import { useJwt } from "../../context/Jwt.context";
import { useNavigate } from "react-router-dom";
import httpModule from "../../helpers/http.module";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import "./manageUserRoles.scss";

interface UserRole  {
  userId: string;
  roleName: string;
};
const AddUserRoles = () => {
  const [roles, setRoles] = useState<IRole[]>([]);
  const [employees, setEmployees] = useState<IEmployee[]>([]);
  const [userRole, setUserRole] = useState<UserRole>(() => {
    return { userId: "", roleName: "" };
  });
  const jwt = useJwt();
  const redirect = useNavigate();

  useEffect(() => {
    if (!jwt.isLoggedIn()) {
      redirect("/signIn", { replace: true });
      return;
    }
    httpModule
      .get<IEmployee[]>("/Employee/GetEmployees", {
        headers: { Authorization: "Bearer " + jwt.user.jwtToken },
      })
      .then((response) => {
        setEmployees(response.data);
      })
      .catch((error) => {
        console.log(error);
        alert("Error");
      });

    httpModule
      .get<IRole[]>("Role/GetRoles", {
        headers: { Authorization: "Bearer " + jwt.user.jwtToken },
      })
      .then((response) => {
        setRoles(response.data);
      })
      .catch((error) => {
        alert("Error");
        console.log(error);
      });
  }, []);

  function handleClickBackBtn() {
    redirect("/manageUserRoles");
  }

  function handleClickSaveBtn() {
    if (userRole.roleName === "" || userRole.userId === "") {
      alert("Fill all fields");
      return;
    }
    httpModule
      .post<UserRole>("Employee/AddRoleToEmployee", userRole,{
        headers: { Authorization: "Bearer " + jwt.user.jwtToken},
      })
      .then(() => redirect("/manageUserRoles"))
      .catch((error) => {
        alert("Error");
        console.log(error);
      });
  }

  return (
    <div className="content addUserRole">
      <h2>Add New User Role</h2>

      <FormControl fullWidth>
        <InputLabel>Role</InputLabel>
        <Select
          value={userRole.roleName}
          label="Role"
          onChange={(e) =>
            setUserRole({ ...userRole, roleName: e.target.value })
          }
        >
          {roles.map((role) => (
            <MenuItem key={role.id} value={role.name}>
              {role.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl fullWidth>
        <InputLabel>User</InputLabel>
        <Select
          value={userRole.userId}
          label="UserId"
          onChange={(e) => setUserRole({ ...userRole, userId: e.target.value })}
        >
          {employees.map((user) => (
            <MenuItem key={user.id} value={user.id}>
              {user.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <div className="btns">
        <Button variant="outlined" color="primary" onClick={handleClickSaveBtn}>
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
  );
};

export default AddUserRoles;
