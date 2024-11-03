import { TextField } from "@mui/material"
import { useState } from "react"

type User = {
    name:string,
    email:string,
    password:string,
    confirmPassword:string
}
/*

[Required]
public string? Name { get; set; }
[Required]
[DataType(DataType.EmailAddress)]
public string? Email { get; set; }
[Required]
[DataType(DataType.Password)]
public string? Password { get; set; }
[Compare("Password", ErrorMessage = "Passwords don't match.")]
public string? ConfirmPassword { get; set; }

*/
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
    </div>
  )
}

export default SignUp