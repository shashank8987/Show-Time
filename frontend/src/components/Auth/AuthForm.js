import {
    Box,
    Button,
    Dialog,
    FormLabel,
    IconButton,
    TextField,
    Typography,
  } from "@mui/material";
  import React, { useState } from "react";
  import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
  import { Link } from "react-router-dom";
  const labelStyle = { mt: 1, mb: 1, color:"#555c5e" };
  const AuthForm = ({ onSubmit, isAdmin }) => {
    const [inputs, setInputs] = useState({
      name: "",
      email: "",
      password: "",
    });
    const [isSignup, setIsSignup] = useState(false);
    const handleChange = (e) => {
      setInputs((prevState) => ({
        ...prevState,
        [e.target.name]: e.target.value,
      }));
    };
    const handleSubmit = (e) => {
      e.preventDefault();
      onSubmit({ inputs, signup: isAdmin ? false : isSignup });
    };
    return (
      <Dialog PaperProps={{ style: { borderRadius: 12, backgroundColor: "rgba(73, 77, 75, 0.349)", boxShadow: "0 0 8px grey inset,0 0 20px #313334a9" } }} open={true} >
        <Box sx={{ ml: "auto", padding: 1 }}>
          <IconButton LinkComponent={Link} to="/" style={{color:"gray"}}>
            <CloseRoundedIcon />
          </IconButton>
        </Box>
        <Typography variant="h4" textAlign={"center"} fontFamily={"'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"}
        color={"#555c5e"}>
          {isSignup ? "Signup" : "Login"}
        </Typography>
        <form onSubmit={handleSubmit}>
          <Box
            padding={6}
            display={"flex"}
            justifyContent={"center"}
            flexDirection="column"
            width={300}
            margin="auto"
            alignContent={"center"}
            // backgroundColor= {"rgba(73, 77, 75, 0.349)"}
            // boxShadow= {"0 0 20px grey"}
          >
            {!isAdmin && isSignup && (
              <>
                {" "}
                <FormLabel sx={labelStyle}>Name</FormLabel>
                <TextField
                  value={inputs.name}
                  onChange={handleChange}
                  margin="normal"
                  variant="standard"
                  type={"text"}
                  name="name"
                  sx={{ input: { color: 'rgba(154, 154, 154, 0.861)' } }}
                />
              </>
            )}
            <FormLabel sx={labelStyle}>Email</FormLabel>
            <TextField
              value={inputs.email}
              onChange={handleChange}
              margin="normal"
              variant="standard"
              type={"email"}
              name="email"
              sx={{ input: { color: 'rgba(154, 154, 154, 0.861)' } }}
            />
            <FormLabel sx={labelStyle}>Password</FormLabel>
            <TextField
              value={inputs.password}
              onChange={handleChange}
              margin="normal"
              variant="standard"
              type={"password"}
              name="password"
              sx={{ input: { color: 'rgba(154, 154, 154, 0.861)' } }}
            />
            <Button
              sx={{ mt: 2, borderRadius: 10, bgcolor: "#2b2d42" }}
              type="submit"
              fullWidth
              variant="contained"
            >
              {isSignup ? "Signup" : "Login"}
            </Button>
            {!isAdmin && (
              <Button
                onClick={() => setIsSignup(!isSignup)}
                sx={{ mt: 2, borderRadius: 10, fontWeight: "500" }}
                fullWidth
              >
                Switch To {isSignup ? "Login" : "Signup"}
              </Button>
            )}
          </Box>
        </form>
      </Dialog>
    );
  };
  
  export default AuthForm;
  