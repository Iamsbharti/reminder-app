//imports
const express = require("express");
const cors = require("cors");
const path = require("path");
const dotenv = require("dotenv");
const Router = require("./router/router");
const logger = require("./library/logger");
const bodyParser = require("body-parser");
const {
  logIpMiddleware,
  pathNotFound,
  handleServerError,
} = require("./middlewares/errorHandler");
const { initdb } = require("./initdb");

// env vars intialisation
dotenv.config();

// used for calling app using http server
const app = express();

// init mongod db
initdb();

// middlewares
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json());
app.use(cors());
app.use(logIpMiddleware);
app.use(function (_req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,HEAD,POST,PUT");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, authToken, access-control-allow-origin"
  );
  next();
});

// set api router
let BASE_URL = process.env.API_VERSION;
app.use(BASE_URL, Router);

// heroku/ production fe-render
if (process.env.NODE_ENV === "production") {
  // api home
  app.get("/api", function (_request, response) {
    response.sendFile(path.resolve(__dirname, "public", "index.html"));
  });

  // Priority serve any static files.
  app.use(express.static(path.resolve(__dirname, "../client/build")));

  // All remaining requests return the React app, so that it can handle routing.
  app.get("*", function (_request, response) {
    response.sendFile(path.resolve(__dirname, "../client/build", "index.html"));
  });
}
// serve local /api
app.get("/api", function (_request, response) {
  response.sendFile(path.resolve(__dirname, "public", "index.html"));
});
app.get("/api-doc", function (_request, response) {
  response.sendFile(path.resolve(__dirname, "public", "index.html"));
});
// api error handlers
app.use(pathNotFound);
app.use(handleServerError);

// init http server
let PORT = process.env.PORT;
app.listen(PORT, () => logger.info(`reminder server-app running ${PORT}`));
