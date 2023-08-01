import {
    Box,
    Button,
    Checkbox,
    FormLabel,
    TextField,
    Typography,
  } from "@mui/material";
  import "./movie.css";
  import React, { useState } from "react";
  import { addMovie } from "../../api-helpers/api-helpers";
  import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
  const labelProps = {
    mt: 1,
    mb: 1,
    color: "whitesmoke"
  };
  const AddMovie = () => {
    const toastOptions = {
      position: "bottom-left",
      autoClose: 3000,
      pauseOnHover: false,
      draggable: true,
      theme: "dark",
    };
    const [inputs, setInputs] = useState({
      title: "",
      description: "",
      posterUrl: "",
      ticketPrice:"",
      trailerLink:"",
      releaseDate: "",
      featured: false,
    });
    const [actors, setActors] = useState([]);
    const [actor, setActor] = useState("");
    const handleChange = (e) => {
      setInputs((prevState) => ({
        ...prevState,
        [e.target.name]: e.target.value,
      }));
    };
    const handleSubmit = (e) => {
      e.preventDefault();
      console.log(inputs, actors);
      addMovie({ ...inputs, actors })
        .then((res) =>{
          toast.success(`'${inputs.title}' Added Successfully!`,toastOptions);

          console.log(res)
        } )
        .catch((err) => console.log(err));
    };
    return (
      <div>
        <form onSubmit={handleSubmit}>
          <Box
            width={"40%"}
            height={"40%"}
            padding={10}
            marginTop="4%"
            marginBottom="4%"
            marginLeft={"auto"}
            marginRight={"auto"}
            display={"flex"}
            flexDirection="column"
            boxShadow={"0 0 15px grey inset,0 0 2px grey"}
            backgroundColor={"rgba(73, 77, 75, 0.349)"}
            
            borderRadius={"4%"}
          >
            <Typography textAlign={"center"} variant="h5" fontFamily={"Georgia, 'Times New Roman', Times, serif"} fontWeight={"bolder"} color={"white"}>
              ADD NEW MOVIE
            </Typography>
            <FormLabel sx={labelProps}>Title</FormLabel>
            <TextField
              value={inputs.title}
              onChange={handleChange}
              name="title"
              variant="standard"
              margin="normal"
              sx={{ input: { color: 'rgba(154, 154, 154, 0.861)' } }}
            />
            <FormLabel sx={labelProps}>Description</FormLabel>
            <TextField
              value={inputs.description}
              onChange={handleChange}
              name="description"
              variant="standard"
              margin="normal"
              sx={{ input: { color: 'rgba(154, 154, 154, 0.861)' } }}
            />
            <FormLabel sx={labelProps}>Poster URL</FormLabel>
            <TextField
              value={inputs.posterUrl}
              onChange={handleChange}
              name="posterUrl"
              variant="standard"
              margin="normal"
              sx={{ input: { color: 'rgba(154, 154, 154, 0.861)' } }}
              borderColor="white"
            />
            <FormLabel sx={labelProps}>Ticket Price</FormLabel>
            <TextField
              value={inputs.ticketPrice}
              onChange={handleChange}
              name="ticketPrice"
              variant="standard"
              margin="normal"
              sx={{ input: { color: 'rgba(154, 154, 154, 0.861)' } }}
            />
            <FormLabel sx={labelProps}>Trailer Link</FormLabel>
            <TextField
              value={inputs.trailerLink}
              onChange={handleChange}
              name="trailerLink"
              variant="standard"
              margin="normal"
              sx={{ input: { color: 'rgba(154, 154, 154, 0.861)' } }}
            />
            <FormLabel sx={labelProps}>Release Date</FormLabel>
            <TextField
              type={"date"}
              value={inputs.releaseDate}
              onChange={handleChange}
              name="releaseDate"
              variant="standard"
              margin="normal"
              sx={{ input: { color: 'rgba(154, 154, 154, 0.861)' } }}
            />
            <FormLabel sx={labelProps}>Casts</FormLabel>
            <Box display={"flex"}>
              <TextField
                value={actor}
                name="actor"
                onChange={(e) => setActor(e.target.value)}
                variant="standard"
                margin="normal"
                sx={{ input: { color: 'rgba(154, 154, 154, 0.861)' } }}
              />
              <Button
                onClick={() => {
                  setActors([...actors, actor]);
                  setActor("");
                }}
              >
                Add
              </Button>
            </Box>
            <FormLabel sx={labelProps}>Featured</FormLabel>
            <Checkbox
              name="fetaured"
              checked={inputs.featured}
              onClick={(e) =>
                setInputs((prevSate) => ({
                  ...prevSate,
                  featured: e.target.checked,
                }))
              }
              sx={{ mr: "auto" }}
            />
            <Button
              type="submit"
              variant="contained"
              sx={{
                width: "30%",
                margin: "auto",
                bgcolor: "rgb(16, 16, 16)",
                ":hover": {
                  bgcolor: "black",
                },
              }}
            >
              Add New Movie
            </Button>
            <ToastContainer />
          </Box>
        </form>
      </div>
    );
  };
  
  export default AddMovie;
  