import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Button, InputAdornment, TextField } from "@mui/material";
import { useState } from "react";
import "./resetPassword.scss"

const ResetPassword = () => {
  const [resetPassword, setResetPassword] = useState({
    password: "",
    confirmPassword: "",
    email: "",
    token: "",
  });
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const handleClickShowPassword = () => {
    setShowPassword((prevState: boolean) => {
      return !prevState;
    });
  };

  const handleMouseDownPassword = (event: any) => {
    event.preventDefault();
  };
  function handleBtnSubmit(){}
  return (
    <div className="content">
      <div className="resetPassword">
        <h2>Reset Password</h2>

        <TextField
              fullWidth
              variant="outlined"
              label="Password"
              onChange={(e) => setResetPassword({ ...resetPassword, password: e.target.value })}
              type={showPassword ? "text" : "password"}
              value={resetPassword.password}
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
                setResetPassword({ ...resetPassword, confirmPassword: e.target.value })
              }
              type={showPassword ? "text" : "password"}
              value={resetPassword.confirmPassword}
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

export default ResetPassword;
