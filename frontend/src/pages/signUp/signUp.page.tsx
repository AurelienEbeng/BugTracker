import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Button,
  CircularProgress,
  InputAdornment,
  TextField,
} from "@mui/material";
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./signUp.scss";
import { ThemeContext } from "../../context/theme.context";
import httpModule from "../../helpers/http.module";

type User = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

const SignUp = () => {
  const [user, setUser] = useState<User>({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const { darkMode } = useContext(ThemeContext);
  const signUpBackground = darkMode ? "signUp dark" : "signUp";
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);

  function handleCreateBtn() {
    if (
      user.name === "" ||
      user.email === "" ||
      user.password === "" ||
      user.confirmPassword === ""
    ) {
      alert("Fill all fields");
      return;
    }
    const emailRegex = /[a-z0-9]+@[a-z]+.[a-z]+/;
    if (!emailRegex.test(user.email)) {
      alert("Verify your email");
      return;
    }
    if (user.password !== user.confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    setLoading(true);

    httpModule
      .post("Employee/Create", user)
      .then(() => navigate("/signIn"))
      .catch((error) => {
        alert("Error, check console");
        console.log(error.response);
      });
  }
  const handleClickShowPassword = () => {
    setShowPassword((prevState: boolean) => {
      return !prevState;
    });
  };

  const handleMouseDownPassword = (event: any) => {
    event.preventDefault();
  };
  return (
    <div className="content">
      {loading ? (
        <CircularProgress size={100} />
      ) : (
        <div className={signUpBackground}>
          <div className="heading">
            <h2>Sign Up</h2>
          </div>
          <div className="formFields">
            <TextField
              fullWidth
              variant="outlined"
              label="Name"
              onChange={(e) => setUser({ ...user, name: e.target.value })}
              value={user.name}
              autoComplete="off"
            />
            <TextField
              fullWidth
              variant="outlined"
              label="Email"
              onChange={(e) => setUser({ ...user, email: e.target.value })}
              value={user.email}
              autoComplete="off"
            />
            <TextField
              fullWidth
              variant="outlined"
              label="Password"
              onChange={(e) => setUser({ ...user, password: e.target.value })}
              type={showPassword ? "text" : "password"}
              value={user.password}
              autoComplete="off"
              InputProps={{
                endAdornment: (
                  <InputAdornment
                    position="end"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                  >
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              fullWidth
              variant="outlined"
              label="Confirm Password"
              onChange={(e) =>
                setUser({ ...user, confirmPassword: e.target.value })
              }
              type={showPassword ? "text" : "password"}
              value={user.confirmPassword}
              autoComplete="off"
              InputProps={{
                endAdornment: (
                  <InputAdornment
                    position="end"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                  >
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                  </InputAdornment>
                ),
              }}
            />
          </div>
          <div className="btns">
            <Button variant="outlined">
              <Link to="/signIn">Sign in</Link>
            </Button>
            <Button variant="outlined" onClick={handleCreateBtn}>
              Create
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SignUp;
