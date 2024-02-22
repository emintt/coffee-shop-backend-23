import express from "express";
import path from "path";
import cors from "cors";
import { fileURLToPath } from "url";
import {
  errorHandler,
  logger,
  notFoundHandler,
} from "./middlewares/middleware.mjs";
import { dishRouter } from "./routes/dish-router.mjs";
import { authRouter } from "./routes/auth-router.mjs";

const hostname = "127.0.0.1";
const app = express();
const port = 3000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(cors());
app.set("view engine", "pug");
app.set("views", "src/views");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/docs", express.static(path.join(__dirname, "../docs")));
// serve uploaded mediafiles url: /media/{file}
app.use("/media", express.static(path.join(__dirname, "../uploads")));
app.use("/", express.static(path.join(__dirname, "../frontend")));

// Reduce Fingerprinting (security)
app.disable('x-powered-by');

//simple custom middleware for logging/debugging all requests
if (!process.env.NODE_ENV !== 'production') {
  app.use(logger);
}



// endpoints
app.use("/api/dish", dishRouter);
// auth endpoints
app.use("/api/auth", authRouter);
app.use("/api/dish", dishRouter);

// error handlers
// all other routes => 404
app.use(notFoundHandler);
// default error handler
app.use(errorHandler);

app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
