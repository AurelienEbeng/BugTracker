import PersonIcon from "@mui/icons-material/Person";
import "./demoUser.scss";
import { Link } from "react-router-dom";
import { ThemeContext } from "../../context/theme.context";
import { useContext } from "react";

const DemoUserLogin = () => {
  const { darkMode } = useContext(ThemeContext);
  const demoUserclass = darkMode ? "demoUsers dark" : "demoUsers";
  return (
    <div className="content">
      <div className={demoUserclass}>
        <h1>Demo Users Login</h1>
        <div className="row">
          <div className="demoUser">
            <Link to ="/"><PersonIcon color="secondary" style={{ fontSize: "100px"}} /></Link>
            <p>Admin</p>
          </div>
          <div className="demoUser">
          <Link to ="/"><PersonIcon color="warning" style={{ fontSize: "100px" }} /></Link>
            <p>Project Manager</p>
          </div>
        </div>
        <div className="row">
          <div className="demoUser">
          <Link to ="/"><PersonIcon color="success" style={{ fontSize: "100px" }} /></Link>
            <p>Developer</p>
          </div>
          <div className="demoUser">
          <Link to ="/"><PersonIcon color="primary" style={{ fontSize: "100px" }} /></Link>
            <p>Quality Assurance</p>
          </div>
        </div>
        <div className="extra">
          <p>
            Have an account?{" "}
            <Link to="/signIn"  >
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default DemoUserLogin;
