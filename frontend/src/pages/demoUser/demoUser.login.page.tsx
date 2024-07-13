import PersonIcon from "@mui/icons-material/Person";
import "./demoUser.scss";
import { Link } from "react-router-dom";

const DemoUserLogin = () => {
  return (
    <div className="content">
      <div className="demoUsers">
        <h1>Demo Users Login</h1>
        <div className="row">
          <div className="demoUser">
            <Link to ="/"><PersonIcon style={{ fontSize: "100px", color:"black" }} /></Link>
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
