import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import httpModule from "../../helpers/http.module";
import { useJwt } from "../../context/Jwt.context";

const Logout = () => {
  const redirect = useNavigate();
  const jwt = useJwt()
  useEffect(() => {
    
    
    let jwtToken = jwt.user.jwtToken;
    jwt.logout();
    httpModule
      .get("SignInSignOut/Logout", {
        headers: { "Authorization": "Bearer " + jwtToken },
      })
      .then(() => {redirect("/signIn")})
      .catch((error) => console.log(error));
  }, []);
  return <div></div>;
};

export default Logout;
