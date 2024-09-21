import { useEffect, useState } from "react";
import { useJwt } from "../../context/Jwt.context";
import { useNavigate } from "react-router-dom";
import { CircularProgress, TextField } from "@mui/material";

type User = {
  name: string;
  email: string;
  id: string;
  dateJoined: string;
};
const UserProfile = () => {
  const jwt = useJwt();
  const navigate = useNavigate();
  const [user, setUser] = useState({} as User);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (!jwt.isLoggedIn()) {
      navigate("/signIn", { replace: true });
    }
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
          </div>
        </>
      )}
    </div>
  );
};

export default UserProfile;
