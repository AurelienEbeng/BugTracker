import { Button, TextField } from "@mui/material";
import { useState } from "react";
import "./forgotPassword.scss";
import httpModule from "../../helpers/http.module";

const ForgotPassword = () => {
  const href = window.location;
  const [forgotPassword, setForgotPassword] = useState({
    email: "",
    clientUrl: href.origin + "/resetPassword",
  });

  function handleBtnSubmit() {
    if (forgotPassword.email == "") {
      alert("Fill all fields");
      return;
    }

    const emailPattern = /^[a-z0-9]+@[a-z]+.[a-z]+$/;
    if (!emailPattern.test(forgotPassword.email)) {
      alert("Verify your email");
      return;
    }

    httpModule
      .put("Employee/ForgotPassword", forgotPassword)
      .then(() => {
        alert("You have been sent an email with recovery procedure");
        setForgotPassword({ ...forgotPassword, email: "" });
      })
      .catch((error) => {
        alert("Error, check console");
        console.log(error.response);
      });
  }

  return (
    <div className="content">
      <div className="forgotPassword">
        <h2>Forgot Password</h2>

        <TextField
          autoComplete="off"
          label="Email"
          variant="outlined"
          value={forgotPassword.email}
          onChange={(e) =>
            setForgotPassword({ ...forgotPassword, email: e.target.value })
          }
          fullWidth
        />

        <Button
          variant="outlined"
          color="primary"
          onClick={handleBtnSubmit}
          fullWidth
        >
          Submit
        </Button>
      </div>
    </div>
  );
};

export default ForgotPassword;
