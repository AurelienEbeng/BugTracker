import { Button, CircularProgress } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useJwt } from "../../context/Jwt.context";
import httpModule from "../../helpers/http.module";
import ManageUserRolesGrid from "../../components/manageUserRoles/ManageUserRolesGrid";
import { Add } from "@mui/icons-material";
import "./manageUserRoles.scss";

type UserRole = {
  email: string;
  username: string;
  roleName: string;
  name:string;
};

const ManageUserRoles = () => {
  const [userRoles, setUserRoles] = useState<UserRole[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
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
      .get<UserRole[]>("/Employee/GetManageUserRolesData", {
        headers: { Authorization: "Bearer " + jwtToken },
      })
      .then((response) => {
        setUserRoles(response.data);
        setLoading(false);
      })
      .catch((error) => {
        alert("Error");
        console.log(error);
        setLoading(false);
      });
  }, []);

  return (
    <div className="content manageUserRoles">
      <div className="heading">
        <h2>Your Personnel</h2>
        <Button variant="outlined" onClick={() => redirect("/manageUserRoles/add")}>
          <Add />
        </Button>
      </div>
      {loading ? (
        <CircularProgress size={100} />
      ) : userRoles.length === 0 ? (
        <h1>No User Roles</h1>
      ) : (
        <ManageUserRolesGrid data={userRoles} />
      )}
    </div>
  );
};

export default ManageUserRoles;
