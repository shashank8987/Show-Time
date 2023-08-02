import { Box } from "@mui/system";
import React, { Fragment, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  deleteBooking,
  getUserBooking,
  getUserDetails,
} from "../api-helpers/api-helpers";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import {
  IconButton,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const UserProfile = () => {
  const toastOptions = {
    position: "bottom-left",
    autoClose: 2500,
    pauseOnHover: false,
    draggable: true,
    theme: "dark",
  };
  const navigate=useNavigate();
  const [bookings, setBookings] = useState();
  const [user, setUser] = useState();
  useEffect(() => {
    getUserBooking()
      .then((res) => setBookings(res.bookings))
      .catch((err) => console.log(err));

    getUserDetails()
      .then((res) => setUser(res.user))
      .catch((err) => console.log(err));
  }, []);
  const handleDelete = (id,title) => {
    
    deleteBooking(id)
      .then((res) =>{
        console.log(res)
        toast.error(`Booking for '${title}' has been cancelled` ,toastOptions);
        setTimeout(() => {
          navigate('/');
        }, 3700); 
      } )
      .catch((err) => console.log(err));
  };
  return (
    <Box width={"100%"} display="flex">
      <Fragment>
        {" "}
        {user && (
          <Box
            flexDirection={"column"}
            justifyContent="center"
            alignItems={"center"}
            width={"30%"}
            padding={3}
            boxShadow={"0 0 25px grey"}
            backgroundColor={"rgba(73, 77, 75, 0.349)"}
          >
            <AccountCircleIcon
              sx={{ fontSize: "10rem", textAlign: "center", ml: 18, color:"whitesmoke" }}
            />
            <Typography
              mt={1}
              padding={1}
              width={"auto"}
              textAlign={"center"}
              border={"1px solid #ccc"}
              borderRadius={6}
              fontFamily={"Georgia, 'Times New Roman', Times, serif"}
              color={"white"}
            >
              Name: {user.name}
            </Typography>
            <Typography
              mt={1}
              padding={1}
              width={"auto"}
              textAlign={"center"}
              border={"1px solid #ccc"}
              borderRadius={6}
              fontFamily={"Georgia, 'Times New Roman', Times, serif"}
              color={"white"}
            >
              Email: {user.email}
            </Typography>
          </Box>
        )}
        {bookings && (
          <Box width={"70%"} display="flex" flexDirection={"column"}>
            <Typography
              variant="h3"
              fontFamily={"Georgia, 'Times New Roman', Times, serif"}
              textAlign="center"
              padding={2}
              color={"white"}
            >
              Bookings
            </Typography>
            <Box
              margin={"auto"}
              display="flex"
              flexDirection={"column"}
              width="80%"
            >
              <List>
                {bookings.map((booking, index) => (
                  <ListItem
                    sx={{
                      bgcolor: "#1d1d20ad",
                      color: "white",
                      textAlign: "center",
                      margin: 1,
                      fontFamily: "Verdana, Geneva, Tahoma, sans-serif",
                      boxShadow:"0 0 16px grey",
                      backgroundColor:"rgba(61, 66, 64, 0.518)"
                    }}
                  >
                    <ListItemText
                      sx={{ margin: 1, width: "25%", textAlign: "left" }}
                    >
                      Movie: {booking.movie.title}
                    </ListItemText>
                    <ListItemText
                      sx={{ margin: "auto", width: "19%", textAlign: "left" }}
                    >
                      Seat: {booking.seatNumber}
                    </ListItemText>
                    <ListItemText
                      sx={{ margin: 1, width: "30%", textAlign: "left" }}
                    >
                      Date: {new Date(booking.date).toDateString()}
                    </ListItemText>
                    <IconButton
                      onClick={() => handleDelete(booking._id,booking.movie.title)}
                      color="error"
                    >
                      <DeleteForeverIcon />
                      <ToastContainer/>
                    </IconButton>
                  </ListItem>
                ))}
              </List>
            </Box>
          </Box>
        )}
      </Fragment>
    </Box>
  );
};

export default UserProfile;
