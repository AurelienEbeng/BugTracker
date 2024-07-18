import { useEffect, useState } from "react";
import "./roles.scss";
import httpModule from "../../helpers/http.module";
import { IRole } from "../../types/global.typing";
import { error } from "console";
import { Button, CircularProgress } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Add } from "@mui/icons-material";
import RolesGrid from "../../components/roles/RolesGrid.component";
import { useJwt } from "../../context/Jwt.context";

const Roles = () => {
  const [roles, setRoles] = useState<IRole[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const redirect = useNavigate();
  const jwt = useJwt();

  useEffect(() => {
    setLoading(true);
    if (Object.keys(jwt.user).length === 0 && jwt.user.constructor === Object) {
      redirect("/signin", { replace: true });
      return;
    }

    let jwtToken = jwt.user.jwtToken;
    httpModule
      .get<IRole[]>("/Role/GetRoles", {
        headers: { Authorization: "Bearer " + jwtToken },
      })
      .then((response) => {
        setRoles(response.data);
        setLoading(false);
      })
      .catch((error) => {
        alert("Error");
        console.log(error);
        setLoading(false);
      });
  }, []);

  return (
    <div className="content roles">
      <div className="heading">
        <h2>Roles</h2>
        <Button variant="outlined" onClick={() => redirect("/roles/add")}>
          <Add />
        </Button>
      </div>

      {loading ? (
        <CircularProgress size={100} />
      ) : roles.length === 0 ? (
        <h1>No Roles</h1>
      ) : (
        <RolesGrid data={roles} />
      )}
    </div>
  );
};

export default Roles;
