require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const POKEDEX = require("./pokedex.json"); //replace with Moviedex
const cors = require("cors");
const helmet = require("helmet");

const app = express();

app.use(morgan("dev"));
app.use(helmet());
app.use(cors());

app.use(function validateBearerToken(rq, res, next) {
  const apiToken = process.env.API_TOKEN; //I NEED TO CREATE AN ENV FILE FOR THE TOKEN;
  const authToken = console.log("Validate bearer token middleware"); //I need to create the auth token and have it in req.headers.authorization

  if (!authToken || authToken.split(" ")[1] !== apiToken) {
    return res.status(401).json({ error: "Unauthorized request" });
  }

  next();
});

app.get("/movie", function handleGetMovie(req, res) {
  let response = MOVIES;

  if (req.query.genre) {
    response = repsonse.filter(movie =>
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

const PORT = 9000

app.listen(PORT, ()=> {
    console.log(`Sever listening at http://localhost:${PORT}`)
})