import { Button, FormLabel, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { Fragment, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getMovieDetails, newBooking } from "../../api-helpers/api-helpers";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Modal from "../modal/modal.js";

const Booking = () => {
  const toastOptions = {
    position: "bottom-left",
    autoClose: 5000,
    pauseOnHover: false,
    draggable: true,
    theme: "dark",
  };
  const [sizing, setSizing] = useState({
    w: 190,
    h: 0
  });
  useEffect(() => {
    setSizing({
      w: window.innerWidth/1.7,
      h: 0.4 * window.innerWidth
    });
  }, []);
  const [movie, setMovie] = useState();
  const [inputs, setInputs] = useState({ seatNumber: "", date: "" });
  const id = useParams().id;
  console.log(id);

  useEffect(() => {
    getMovieDetails(id)
      .then((res) => setMovie(res.movie))
      .catch((err) => console.log(err));
  }, [id]);
  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  const handleSubmit =  (e) => {
    
    e.preventDefault();
    console.log(inputs);
    newBooking({ ...inputs, movie: movie._id })
      .then((res) => {
        toast.success(`${inputs.seatNumber} Seats for '${movie.title}' booked successfully` ,toastOptions);
        
        console.log(res); 
      })
      .catch((err) => console.log(err));
  };

  // const url = `${movie.trailerLink}`
  return (
  
    <div className="container">
    <div>
      {movie && (
        <Fragment>
          <Typography
            padding={3}
            variant="h4"
            textAlign={"center"}
            color={"whitesmoke"}
            fontFamily={"Cambria, Cochin, Georgia, Times, 'Times New Roman', serif"}
            fontWeight={"bold"}
          >
             {movie.title}
          </Typography>
          <Box display={"flex"} justifyContent={"center"} backgroundColor={"black"}>
            <Box
              display={"flex"}
              justifyContent={"column"}
              flexDirection="column"
              paddingTop={0}
              width="45%"
              height="48%"
              marginRight={"5%"}
              marginLeft={"5%"}
              boxShadow={"0 0 20px grey"}
              backgroundColor={"rgba(73, 77, 75, 0.349)"}
              marginBottom={"2%"}
              marginTop={"1.6%"}
              color={"white"}
            >
              <img
                width="100%"
                height="45%"
                src={movie.posterUrl}
                alt={movie.title}
                borderRadius={"5%"}
                marginTop={"0%"}
              />
              <Box width={"80%"} marginTop={0} paddingTop={2} paddingLeft={8.5} marginLeft={2} marginBottom={1.5} >
                <Typography paddingTop={2} fontSize={"16.5px"} fontFamily={"Cambria, Cochin, Georgia, Times, 'Times New Roman', serif"}>{movie.description}</Typography>
                <Typography fontWeight={"bold"} marginTop={1} marginBottom={1} fontFamily={"Cambria, Cochin, Georgia, Times, 'Times New Roman', serif"}>
                  Starrer:
                  {movie.actors.map((actor) => " " + actor + " ")}
                </Typography>
                <Typography fontWeight={"bold"} marginTop={1} marginBottom={1} fontFamily={"Cambria, Cochin, Georgia, Times, 'Times New Roman', serif"}>
                  Release Date: {new Date(movie.releaseDate).toDateString()}
                </Typography>
                <Typography fontWeight={"bold"} marginTop={1} marginBottom={1} fontFamily={"Cambria, Cochin, Georgia, Times, 'Times New Roman', serif"}>
                  Ticket Price: ₹{movie.ticketPrice}.00
                </Typography>
                <div className="App">
              <Modal popTitle="Watch trailer here">
              <iframe width={sizing.w} height={sizing.h} style={{ maxWidth: sizing.w }} src={movie.trailerLink} title={movie.title} frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"></iframe>
             </Modal>
           </div>
              </Box>
            </Box>
            
            <Box width={"40%"} paddingTop={3} marginTop={19}>
              <form onSubmit={handleSubmit}>
                <Box
                  padding={5}
                  margin={"auto"}
                  display="flex"
                  flexDirection={"column"}
                  boxShadow={"0 0 20px grey"}
                  marginRight={"3%"}
                  backgroundColor={"rgba(73, 77, 75, 0.349)"}
                >
                  <FormLabel style={{color:"white"}}>Number of Seats</FormLabel>
                  <TextField
                    name="seatNumber"
                    value={inputs.seatNumber}
                    onChange={handleChange}
                    type={"number"}
                    margin="normal"
                    variant="standard"
                    sx={{ input: { color: 'rgba(154, 154, 154, 0.861)' } }}
                  />
                  <FormLabel style={{color:"white"}}>Amount to be Paid</FormLabel>
                  <TextField
                    name="price"
                    type={"string"}
                    margin="normal"
                    variant="standard"
                    value={"₹ "+(inputs.seatNumber*movie.ticketPrice)+".00"}
                    onChange={handleChange}
                    sx={{ input: { color: 'rgba(154, 154, 154, 0.861)' } }}
                  />
                  <FormLabel style={{color:"white"}}>Booking Date</FormLabel>
                  <TextField
                    name="date"
                    type={"date"}
                    margin="normal"
                    variant="standard"
                    value={inputs.date}
                    onChange={handleChange}
                    sx={{ input: { color: 'rgba(154, 154, 154, 0.861)' } }}
                  />
                  <Button type="submit" sx={{ mt: 3 }}>
                    Book Now
                  </Button>
                  <ToastContainer />
                </Box>
              </form>
            </Box>
          </Box>
        </Fragment>
      )}
    </div>
    </div>
  );
};

export default Booking;
