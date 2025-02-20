import PersonIcon from "@mui/icons-material/Person";
import "./demoUser.scss";
import { Link, useNavigate } from "react-router-dom";
import { ThemeContext } from "../../context/theme.context";
import { useContext } from "react";
import { useJwt } from "../../context/Jwt.context";
import { Button } from "@mui/material";

const DemoUserLogin = () => {
  const { darkMode } = useContext(ThemeContext);
  const demoUserclass = darkMode ? "demoUsers dark" : "demoUsers";
  const jwt = useJwt();
  const navigate = useNavigate();
  async function handleClick(username: string) {
    await jwt.loginDemoUser(username);
    navigate("/projects/myProjects");
  }
  return (
    <div className="content">
      <div className={demoUserclass}>
        <h1>Demo Users Login</h1>
        <div className="row">
          <div className="demoUser">
            <Button
              onClick={() => {
                handleClick("demoadmin1@gmail.com");
              }}
            >
              <PersonIcon color="secondary" style={{ fontSize: "100px" }} />
            </Button>
            <p>Demo Admin</p>
          </div>
          <div className="demoUser">
            <Button
              onClick={() => {
                handleClick("demoprojectmanager@gmail.com");
              }}
            >
              <PersonIcon color="warning" style={{ fontSize: "100px" }} />
            </Button>
            <p>Demo Project Manager</p>
          </div>
        </div>
        <div className="row">
          <div className="demoUser">
            <Button
              onClick={() => {
                handleClick("demodeveloper1@gmail.com");
              }}
            >
              <PersonIcon color="success" style={{ fontSize: "100px" }} />
            </Button>
            <p>Demo Developer 1</p>
          </div>
          <div className="demoUser">
            <Button
              onClick={() => {
                handleClick("demodeveloper2@gmail.com");
              }}
            >
              <PersonIcon color="primary" style={{ fontSize: "100px" }} />
            </Button>
            <p>Demo Developer 2</p>
          </div>
        </div>
        <div className="extra">
          <p>
            Have an account? <Link to="/signIn">Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default DemoUserLogin;
