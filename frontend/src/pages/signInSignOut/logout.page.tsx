import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useJwt } from "../../context/Jwt.context";

const Logout = () => {
  const redirect = useNavigate();
  const jwt = useJwt();
  useEffect(() => {
    jwt.logout();
    redirect("/signIn");
  }, []);
  return <div></div>;
};

export default Logout;
