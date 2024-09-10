import { useEffect, useState } from "react";
import AssignedPersonnelGrid from "../../components/manageAssignedPersonnel/AssignedPersonnelGrid";
import { useJwt } from "../../context/Jwt.context";
import { useLocation, useNavigate } from "react-router-dom";
import httpModule from "../../helpers/http.module";
import { Button, CircularProgress, MenuItem, TextField } from "@mui/material";
import { IEmployee } from "../../types/global.typing";

type ProjectMember = {
  projectId: string;
  memberId: string;
};
const ManageAssignedPersonnel = () => {
  const [assignedPersonnel, setAssignedPersonnel] = useState([]);
  const [loading, setLoading] = useState<boolean>(false);
  const jwt = useJwt();
  const navigate = useNavigate();
  const location = useLocation();
  const { project } = location.state;
  const [projectMember, setProjectMember] = useState<ProjectMember>(
    {} as ProjectMember
  );
  const [unassignedPersonnel, setUnassignedPersonnel] = useState<IEmployee[]>(
    []
  );
  const [loadingUnassignedDeveloper, setLoadingUnassignedDeveloper] =
    useState<boolean>(false);

  useEffect(() => {
    if (!jwt.isLoggedIn()) {
      navigate("/signIn", { replace: true });
      return;
    }

    setProjectMember({ ...projectMember, projectId: project.id });

    getAssignedPersonnel();

    getUnassignedPersonnel();
  }, []);

  function handleClickAddBtn() {
    httpModule
      .post(
        "/ProjectMember/AssignEmployeesToProject/" + jwt.user.id,
        projectMember,
        { headers: { Authorization: "Bearer " + jwt.user.jwtToken } }
      )
      .then(() => {
        getAssignedPersonnel();
        getUnassignedPersonnel();
        setProjectMember({ ...projectMember, memberId: "" });
      })
      .catch((error) => {
        alert("Error, check console");
        console.log(error.response);
      });
  }

  function getAssignedPersonnel() {
    setLoading(true);
    let params = new URLSearchParams();
    params.append("projectId", project.id);
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
  }

  function getUnassignedPersonnel() {
    setLoadingUnassignedDeveloper(true);
    let params = new URLSearchParams();
    params.append("projectId", project.id);
    httpModule
      .get("/ProjectMember/GetUnassignedPersonnel?" + params, {
        headers: { Authorization: "Bearer " + jwt.user.jwtToken },
      })
      .then((response) => {
        setUnassignedPersonnel(response.data);
        setLoadingUnassignedDeveloper(false);
      })
      .catch((error) => {
        alert("Error, check the console");
        console.log(error.response);
        setLoadingUnassignedDeveloper(false);
      });
  }
  return (
    <div>
      {loading || loadingUnassignedDeveloper ? (
        <CircularProgress size={100} />
      ) : (
        <>
          <div className="heading">{project.name}'s Personnel</div>
          <div className="unassignedPersonnel">
            <TextField
              variant="outlined"
              fullWidth
              select
              label="Unassigned Developer"
              value={projectMember.memberId}
              onChange={(e) =>
                setProjectMember({ ...projectMember, memberId: e.target.value })
              }
            >
              {unassignedPersonnel.map((user) => (
                <MenuItem key={user.id} value={user.id}>
                  {user.name}
                </MenuItem>
              ))}
            </TextField>
            <Button variant="outlined" onClick={handleClickAddBtn}>
              Add
            </Button>
          </div>
          <AssignedPersonnelGrid data={assignedPersonnel} />
        </>
      )}
    </div>
  );
};

export default ManageAssignedPersonnel;
