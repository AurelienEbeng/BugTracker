import { TextField } from "@mui/material"
import { useState } from "react"

type User = {
    name:string,
    email:string,
    password:string,
    confirmPassword:string
}

const SignUp = () => {
    const [user,setUser] = useState<User>({} as User);
  return (
    <div>
        <TextField
        fullWidth
        variant="outlined"
        label="Name"
        onChange={e=> setUser({...user,name:e.target.value})}
        />
        <TextField
        fullWidth
        variant="outlined"
        label="Email"
        onChange={e=> setUser({...user,email:e.target.value})}
        />
        <TextField
        fullWidth
        variant="outlined"
        label="Password"
        onChange={e=> setUser({...user,password:e.target.value})}
        type="password"
        />
        <TextField
        fullWidth
        variant="outlined"
        label="Confirm Password"
        onChange={e=> setUser({...user,confirmPassword:e.target.value})}
        type="password"
        />
    </div>
  )
}

export default SignUp