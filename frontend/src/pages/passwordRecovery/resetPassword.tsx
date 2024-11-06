import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Button, InputAdornment, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import "./resetPassword.scss";
import { useNavigate, useSearchParams } from "react-router-dom";
import httpModule from "../../helpers/http.module";

const ResetPassword = () => {
  const [searchParams, setSearchParmams] = useSearchParams();
  const [resetPassword, setResetPassword] = useState({
    password: "",
    confirmPassword: "",
    email: searchParams.get("email"),
    token: searchParams.get("token"),
  });
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (resetPassword.email == null || resetPassword.token == null) {
      navigate("/signIn", { replace: true });
      return;
    }
  }, []);

  const handleClickShowPassword = () => {
    setShowPassword((prevState: boolean) => {
      return !prevState;
    });
  };

  const handleMouseDownPassword = (event: any) => {
    event.preventDefault();
  };
  function handleBtnSubmit() {
    if (resetPassword.password == "" || resetPassword.confirmPassword == "") {
      alert("Fill all fields");
      return;
    }
    if (resetPassword.password != resetPassword.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    httpModule
      .put("Employee/ResetPassword", resetPassword)
      .then(() => navigate("/signIn"))
      .catch((error) => {
        alert("Error, check console");
        console.log(error.response);
      });
  }
  return (
    <div className="content">
      <div className="resetPassword">
        <h2>Reset Password</h2>

        <TextField
          fullWidth
          variant="outlined"
          label="Password"
          onChange={(e) =>
            setResetPassword({ ...resetPassword, password: e.target.value })
          }
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
            setResetPassword({
              ...resetPassword,
              confirmPassword: e.target.value,
            })
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
