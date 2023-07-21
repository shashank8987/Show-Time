import { Button, FormLabel, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { Fragment, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getMovieDetails, newBooking } from "../../api-helpers/api-helpers";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Booking = () => {
  const toastOptions = {
    position: "bottom-left",
    autoClose: 3000,
    pauseOnHover: false,
    draggable: true,
    theme: "dark",
  };
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
        toast.success('Seat Booked Successfully!',toastOptions);
        
        console.log(res); 
      })
      .catch((err) => console.log(err));
  };
  return (
    <div className="container">
    <div>
      {movie && (
        <Fragment>
          <Typography
            padding={3}
            fontFamily="fantasy"
            variant="h4"
            textAlign={"center"}
          >
             {movie.title}
          </Typography>
          <Box display={"flex"} justifyContent={"center"}>
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
            >
              <img
                width="100%"
                height="45%"
                src={movie.posterUrl}
                alt={movie.title}
                borderRadius={"5%"}
                marginTop={"0%"}
              />
              <Box width={"80%"} marginTop={0} paddingTop={2} paddingLeft={12} marginLeft={2} marginBottom={1.5}>
                <Typography paddingTop={2}>{movie.description}</Typography>
                <Typography fontWeight={"bold"} marginTop={1} marginBottom={1}>
                  Starrer:
                  {movie.actors.map((actor) => " " + actor + " ")}
                </Typography>
                <Typography fontWeight={"bold"} marginTop={1} marginBottom={1}>
                  Release Date: {new Date(movie.releaseDate).toDateString()}
                </Typography>
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
                  <FormLabel>Seat Number</FormLabel>
                  <TextField
                    name="seatNumber"
                    value={inputs.seatNumber}
                    onChange={handleChange}
                    type={"number"}
                    margin="normal"
                    variant="standard"
                  />
                  <FormLabel>Booking Date</FormLabel>
                  <TextField
                    name="date"
                    type={"date"}
                    margin="normal"
                    variant="standard"
                    value={inputs.date}
                    onChange={handleChange}
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
