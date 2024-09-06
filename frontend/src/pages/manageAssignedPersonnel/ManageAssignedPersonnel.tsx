import { useEffect, useState } from "react";
import AssignedPersonnelGrid from "../../components/manageAssignedPersonnel/AssignedPersonnelGrid";
import { useJwt } from "../../context/Jwt.context";
import { useLocation, useNavigate } from "react-router-dom";
import httpModule from "../../helpers/http.module";
import { CircularProgress } from "@mui/material";

const ManageAssignedPersonnel = () => {
  const [assignedPersonnel, setAssignedPersonnel] = useState([]);
  const [loading, setLoading] = useState<boolean>(false);
  const jwt = useJwt();
  const navigate = useNavigate();
  const location = useLocation();
  const { project } = location.state;

  useEffect(() => {
    if (!jwt.isLoggedIn()) {
      navigate("/signIn", { replace: true });
      return;
    }
    setLoading(true);

    let params = new URLSearchParams()
    params.append("projectId",project.id)
    httpModule
      .get("/ProjectMember/GetAssignedPersonnel?" + params, {
        headers: { Authorization: "Bearer " + jwt.user.jwtToken },
      })
      .then((response) => {
        setAssignedPersonnel(response.data);
        setLoading(false);
      })
      .catch((error) => {
        alert("Error, check the console");
        console.log(error.response);
        setLoading(false);
      });
  }, []);
  return (
    <div>
      {loading ? (
        <CircularProgress size={100} />
      ) : (
        <>
        <div className="heading">{project.name}'s Personnel</div>
          <AssignedPersonnelGrid data={assignedPersonnel} />
        </>
      )}
    </div>
  );
};

export default ManageAssignedPersonnel;
