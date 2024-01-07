import { useEffect, useState } from "react";
import "./roles.scss";
import httpModule from "../../helpers/http.module";
import { IRole } from "../../types/global.typing";
import { error } from "console";
import { Button, CircularProgress } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Add } from "@mui/icons-material";
import RolesGrid from "../../components/roles/RolesGrid.component";

const Roles = () => {
  const [roles, setRoles] = useState<IRole[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const redirect = useNavigate();

  useEffect(() => {
    setLoading(true);
    httpModule
      .get<IRole[]>("/Role/Get")
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

  //console.log(roles);
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
