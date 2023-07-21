import express from "express";
import {
  addMovie,
  getAllMovies,
  getMovieById,
  deleteMovie
} from "../controllers/movie-controller";
const movieRouter = express.Router();
movieRouter.get("/", getAllMovies);
movieRouter.get("/:id", getMovieById);
movieRouter.post("/", addMovie);
movieRouter.delete("/:id", deleteMovie);

export default movieRouter;
