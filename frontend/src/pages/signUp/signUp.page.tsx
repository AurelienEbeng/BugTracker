import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Button, InputAdornment, TextField } from "@mui/material";
import { useState } from "react";
import { Link } from "react-router-dom";

type User = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

const SignUp = () => {
  const [user, setUser] = useState<User>({} as User);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  function handleCreateBtn() {}
  const handleClickShowPassword = () => {
    setShowPassword((prevState: boolean) => {
      return !prevState;
    });
  };

  const handleMouseDownPassword = (event: any) => {
    event.preventDefault();
  };
  return (
    <div>
      <TextField
        fullWidth
        variant="outlined"
        label="Name"
        onChange={(e) => setUser({ ...user, name: e.target.value })}
        value={user.name}
        autoComplete="off"
      />
      <TextField
        fullWidth
        variant="outlined"
        label="Email"
        onChange={(e) => setUser({ ...user, email: e.target.value })}
        value={user.email}
        autoComplete="off"
      />
      <TextField
        fullWidth
        variant="outlined"
        label="Password"
        onChange={(e) => setUser({ ...user, password: e.target.value })}
        type={showPassword ? "text" : "password"}
        value={user.password}
        autoComplete="off"
        InputProps={{
            endAdornment: (
              <InputAdornment position="end"
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
        onChange={(e) => setUser({ ...user, confirmPassword: e.target.value })}
        type={showPassword ? "text" : "password"}
        value={user.confirmPassword}
        autoComplete="off"
        InputProps={{
            endAdornment: (
              <InputAdornment position="end"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                >
                  {showPassword ? <Visibility /> : <VisibilityOff />}
                
              </InputAdornment>
            ),
          }}
      />
      <div className="btns">
        <Button variant="outlined">
          <Link to="/signIn">Sign in</Link>
        </Button>
        <Button variant="outlined" onClick={handleCreateBtn}>
          Create
        </Button>
      </div>
    </div>
  );
};

export default SignUp;
