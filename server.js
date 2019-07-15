require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const MOVIES = require("./movies.json");
const cors = require("cors");
const helmet = require("helmet");

const app = express();

app.use(morgan("dev"));
app.use(helmet());
app.use(cors());

app.use(function validateBearerToken(req, res, next) {
  const apiToken = process.env.API_TOKEN; 
  const authToken = req.headers.authorization;
  
  console.log("Validate bearer token middleware");
  debugger

  if (!authToken || authToken.split(" ")[1] !== apiToken) {
    return res.status(401).json({ error: "Unauthorized request" });
  }

  next();
});

app.get("/movie", function handleGetMovie(req, res) {
  let response = MOVIES;

  if (req.query.genre) {
    response = response.filter(movie =>
      movie.genre.toLowerCase().includes(req.query.genre.toLowerCase())
    );
  }

  if (req.query.country) {
    response = response.filter(movie =>
      movie.country.toLowerCase().includes(req.query.country.toLowerCase())
    );
  }

  if (req.query.avg_vote) {
    response = response.filter(
      movie => Number(movie.avg_vote) >= Number(req.query.avg_vote)
    );
  }
  res.json(response)
});

app.listen(9000, ()=> {
    console.log(`Sever listening at http://localhost:9000`)
})