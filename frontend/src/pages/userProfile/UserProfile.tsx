import { useEffect, useState } from "react";
import { useJwt } from "../../context/Jwt.context";
import { useNavigate } from "react-router-dom";
import { CircularProgress, TextField } from "@mui/material";
import httpModule from "../../helpers/http.module";
import moment from "moment";

type User = {
  name: string;
  email: string;
  id: string;
  dateJoined: string;
  role: string;
};
const UserProfile = () => {
  const jwt = useJwt();
  const navigate = useNavigate();
  const [user, setUser] = useState<User>({} as User);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (!jwt.isLoggedIn()) {
      navigate("/signIn", { replace: true });
      return;
    }

    setLoading(true);
    let params = new URLSearchParams();
    params.append("userId", jwt.user.id);
    httpModule
      .get("/Employee/GetUser?" + params, {
        headers: { Authorization: "Bearer " + jwt.user.jwtToken },
      })
      .then((response) => {
        setUser(response.data);
        setUser({...user, dateJoined:moment(user.dateJoined).format("YYYY-MM-DD")})
        setLoading(false);
      })
      .catch((error) => {
        alert("Error, check console");
        console.log(error.response);
        setLoading(false);
      });
  }, []);
  return (
    <div className="content">
      {loading ? (
        <CircularProgress size={100} />
      ) : (
        <>
          <div className="heading">
            <h1>Profile</h1>
          </div>
          <div className="userProfile">
            <TextField
              variant="outlined"
              value={user.name}
              label="Name"
              disabled
              fullWidth
              margin="normal"
            />
            <TextField
              variant="outlined"
              value={user.email}
              label="Email"
              disabled
              fullWidth
              margin="normal"
            />
            <TextField
              variant="outlined"
              value={user.dateJoined}
              label="Date Joined"
              disabled
              fullWidth
              margin="normal"
            />
            <TextField
              variant="outlined"
              value={user.role}
              label="Role"
              disabled
              fullWidth
              margin="normal"
            />
          </div>
        </>
      )}
    </div>
  );
};

export default UserProfile;
