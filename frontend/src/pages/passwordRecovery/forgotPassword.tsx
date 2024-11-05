import { Button, TextField } from "@mui/material";
import { useState } from "react";
import "./forgotPassword.scss"

const ForgotPassword = () => {
  const href = window.location;
  const [forgotPassword, setForgotPassword] = useState({
    email: "",
    clientUrl: href.origin + "/resetPassword",
  });

  function handleBtnSubmit() {
    
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
