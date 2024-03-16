import { useState } from "react";
import "./signIn.scss"
import { ISignIn } from "../../types/global.typing";
import { Button, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import httpModule from "../../helpers/http.module";

const SignIn = () => {
    const [signIn, setSignIn] = useState<ISignIn>({username:"",password: "",rememberMe: false}); 
    const redirect = useNavigate();

    const handleClickSignInBtn = () => {
        if (signIn.username === "" || signIn.password==="") {
          alert("Fill  all fields");
          return;
        }
        console.log(signIn);
        httpModule
          .post("SignInSignOut/Login", signIn)
          .then((response) => redirect("/projects"))
          .catch((error) => console.log(error));
      };

    return (
        <div className="content">
          <div className="signIn">
            <h2>Sign In</h2>
            <TextField
              autoComplete="off"
              label="Username"
              variant="outlined"
              value={signIn.username}
              onChange={(e) => setSignIn({ ...signIn, username: e.target.value })}
            />
            <TextField
              autoComplete="off"
              label="Password"
              variant="outlined"
              value={signIn.password}
              onChange={(e) => setSignIn({ ...signIn, password: e.target.value })}
            />
            <div className="btns">
              <Button
                variant="outlined"
                color="primary"
                onClick={handleClickSignInBtn}
              >
                Sign In
              </Button>
            </div>
          </div>
        </div>
      );
};

export default SignIn