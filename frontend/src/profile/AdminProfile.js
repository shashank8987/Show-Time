import { Box } from "@mui/system";
import React, { Fragment, useEffect, useState } from "react";
import { getAdminById } from "../api-helpers/api-helpers";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { IconButton, List, ListItem, ListItemText, Typography } from "@mui/material";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
const AdminProfile = () => {
  const [admin, setAdmin] = useState();
  useEffect(() => {
    getAdminById()
      .then((res) => setAdmin(res.admin))
      .catch((err) => console.log(err));
  }, []);
  return (
    <Box width={"100%"} display="flex">
      <Fragment>
        {" "}
        {admin && (
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
              sx={{ fontSize: "10rem", textAlign: "center", ml: 18 }}
            />

            <Typography
              mt={1}
              padding={1}
              width={"auto"}
              textAlign={"center"}
              border={"1px solid #ccc"}
              borderRadius={6}
              fontFamily={"Georgia, 'Times New Roman', Times, serif"}
            >
              Email: {admin.email}
            </Typography>
          </Box>
        )}
        {admin && admin.addedMovies.length > 0 && (
          <Box width={"70%"} display="flex" flexDirection={"column"}>
            <Typography
              variant="h3"
              textAlign="center"
              padding={2}
              fontFamily={"Georgia, 'Times New Roman', Times, serif"}
              fontWeight={"500"}
              marginLeft={6}
            >
              ADDED MOVIES
            </Typography>
            <Box
              margin={"auto"}
              display="flex"
              flexDirection={"column"}
              width="80%"
            >
              <List>
                {admin.addedMovies.map((movie, index) => (
                  <ListItem
                    sx={{
                      bgcolor: "#1d1d20ad",
                      color: "white",
                      textAlign: "center",
                      margin: 1,
                      boxShadow:"0 0 16px grey",
                      backgroundColor:"rgba(61, 66, 64, 0.518)"
                    }}
                  >
                    <ListItemText
                      sx={{ margin: 1, width: "auto", textAlign: "left", fontFamily: "Verdana, Geneva, Tahoma, sans-serif"}}
                    >
                      Movie: {movie.title}
                    </ListItemText>
                    <IconButton
                      // onClick={() => handleDelete(booking._id)}
                      color="error"
                    >
                      <DeleteForeverIcon />
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

export default AdminProfile;
