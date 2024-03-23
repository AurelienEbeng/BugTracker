import { useEffect, useState } from "react";
import "./roles.scss";
import { ICreateRoleDto } from "../../types/global.typing";
import { Button, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import httpModule from "../../helpers/http.module";

const AddRoles = () => {
  const [role, setRole] = useState<ICreateRoleDto>({ name: "" });
  const redirect = useNavigate();

  useEffect(() => {
    let username = sessionStorage.getItem("username");
    if (username === "" || username === null) {
      redirect("/signIn");
    }
  }, []);
  const handleClickSaveBtn = () => {
    if (role.name === "") {
      alert("Fill  all fields");
      return;
    }
    let jwtToken = sessionStorage.getItem("jwtToken");
    httpModule
      .post("Role/Create", role, {
        headers: { "Authorization": "Bearer " + jwtToken },
      })
      .then((response) => redirect("/roles"))
      .catch((error) => console.log(error));
  };
  const handleClickBackBtn = () => {
    redirect("/roles");
  };

  return (
    <div className="content">
      <div className="add-role">
        <h2>Add New Role</h2>
        <TextField
          autoComplete="off"
          label="Role Name"
          variant="outlined"
          value={role.name}
          onChange={(e) => setRole({ ...role, name: e.target.value })}
        />
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

export default AddRoles;
