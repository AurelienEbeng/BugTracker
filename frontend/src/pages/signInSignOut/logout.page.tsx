import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import httpModule from "../../helpers/http.module";

const Logout = () => {
  const redirect = useNavigate();
  useEffect(() => {
    let username = sessionStorage.getItem("username");
    if (username === "" || username === null) {
      redirect("/signIn");
    }

    let jwtToken = sessionStorage.getItem("jwtToken");
    httpModule
      .get("SignInSignOut/Logout", {
        headers: { "Authorization": "Bearer " + jwtToken },
      })
      .then(() => redirect("/signIn"))
      .catch((error) => console.log(error));
  }, []);
  return <div>Logout</div>;
};

export default Logout;
