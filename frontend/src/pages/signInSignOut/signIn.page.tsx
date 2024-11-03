import { useContext,  useState } from "react";
import "./signIn.scss";
import { ISignIn } from "../../types/global.typing";
import { Button, IconButton, InputAdornment, TextField } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { ThemeContext } from "../../context/theme.context";
import { useJwt } from "../../context/Jwt.context";


const SignIn = () => {
  const [signIn, setSignIn] = useState<ISignIn>({
    username: "",
    password: "",
    rememberMe: false,
  });
  const [showPassword, setShowPassword] = useState<boolean>(false);
  
  const { darkMode } = useContext(ThemeContext);

  const signInBackground = darkMode ? "signIn dark" : "signIn";
  const jwt = useJwt()
  const redirect = useNavigate()

  const handleClickSignInBtn = async () => {
    if (signIn.username === "" || signIn.password === "") {
      alert("Fill  all fields");
      return;
    }
    await jwt.login(signIn.username,signIn.password); 
    redirect("/projects/myProjects")
  };

  

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
      <div className={signInBackground}>
        <h2>Sign In</h2>
        <div className="container">
          <TextField
            autoComplete="off"
            label="Username"
            variant="outlined"
            value={signIn.username}
            onChange={(e) => setSignIn({ ...signIn, username: e.target.value })}
            fullWidth
          />
        </div>
        <div className="container">
          <TextField
            autoComplete="off"
            label="Password"
            variant="outlined"
            value={signIn.password}
            type={showPassword ? "text" : "password"}
            onChange={(e) => setSignIn({ ...signIn, password: e.target.value })}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                  >
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            fullWidth
          />
        </div>

        <div className="btns">
          <Button
            variant="outlined"
            color="primary"
            onClick={handleClickSignInBtn}
            fullWidth
          >
            Sign In
          </Button>
        </div>
        <div className="extra">
          <p>
            Forgot your <Link to="/">password?</Link>
          </p>
          <p>
            Create an account? <Link to="/signUp">Sign Up</Link>
          </p>
          <p>
            Sign In as <Link to="/demoUsersLogin">Demo User</Link>
          </p>
        </div>
      </div>
    </div>
  );
}; 
export default SignIn;