import http from "http";
import express from "express";
import cors from "cors";
import morgan from "morgan";
import config from "./config.json";
import bodyParser from "body-parser";
import api from "./controller";
const { Pool } = require("pg");
import tracer from "./middleware/tracer";
import envVariables from "./envVariables";
import { OpenApiValidator } from "express-openapi-validator";
var swaggerUi = require("swagger-ui-express"),
  swaggerDocument = require("./swagger.json");

var ssl = envVariables.DB_SSL;
if(typeof ssl =="string")
  ssl = (ssl.toLowerCase() == "true");

const sslConfig = ssl ? { rejectUnauthorized: false } : false;

const pool = new Pool({
  user: envVariables.DB_USERNAME,
  host: envVariables.DB_HOST,
  database: envVariables.DB_NAME,
  password: envVariables.DB_PASSWORD,
  ssl: sslConfig,
  port: envVariables.DB_PORT,
  max: envVariables.DB_MAX_POOL_SIZE,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000
});

const options = {
  controllers: "./src/api",
  useStubs: true // Conditionally turn on stubs (mock mode)
};

let app = express();
app.server = http.createServer(app);
app.use(bodyParser.json());
// logger
app.use(morgan("dev"));

// 3rd party middleware
app.use(
  cors({
    exposedHeaders: config.corsHeaders
  })
);

app.use(tracer());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Add OpenAPI validation middleware
new OpenApiValidator({
  apiSpec: swaggerDocument,
  validateRequests: true, // (default)
  validateResponses: false, // Enable if you want response validation
}).install(app)
  .then(() => {
    // Define your routes
    app.use("/", api(pool));

    // Error handler middleware
    app.use((err, req, res, next) => {
      console.error(err);
      if (err.status) {
        res.status(err.status).json({
          message: err.message,
          errors: err.errors,
        });
      } else {
        res.status(500).send("Oops, something went wrong.");
      }
    });

    // Start server
    const serverPort = envVariables.SERVER_PORT;
    app.server.listen(serverPort, () => {
      console.log("Server listening on port", serverPort);
    });
  })
  .catch((e) => {
    console.error("Failed to start server:", e);
  });
  
app.use("/", api(pool));

//error handler middleware
app.use((err, req, res, next) => {
  console.log(err);
  if (!err.errorType) {
    res.status(err.status).json(err.data);
  } else if (err.errorType == "custom") {
    res.status(400).json(err.errorReponse);
  } else {
    res.status(500);
    res.send("Oops, something went wrong.");
  }
});

export default app;
