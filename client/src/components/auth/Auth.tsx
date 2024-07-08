import { Button, Stack, TextField } from "@mui/material";
import React, { useState } from "react";


type AuthProps = {
    submitButtonLabel:string;
    onSubmit:(credential:{email:string;password:string})=> Promise<void>;
    children:React.ReactNode;
}

const Auth = ({submitButtonLabel,onSubmit,children}:AuthProps) => {
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
  return (
    <Stack
      spacing={4}
      sx={{
        height: "100vh",
        maxWidth: { xs: "100%", sm: "50%" },
        margin: "0 auto",
        display: "flex",
        flexDirection: "column",
        // justifyContent: "center",
      }}
    >
      <TextField label="Email" type="email" variant="outlined" onChange={(e)=> setEmail(e.target.value)} value={email} />
      <TextField label="Password" type="password" variant="outlined" onChange={(e)=>setPassword(e.target.value)} value={password} />
      <Button variant="contained" onClick={()=> onSubmit({email,password})}>{submitButtonLabel}</Button>
      {children}
    </Stack>
  );
};

export default Auth;
