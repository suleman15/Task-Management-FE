import express from "express";
import morgan from "morgan";
import cors from "cors";
import router from "./routes/index.js";
import { errorHandler } from "./middlewares/errorHandler.js";

const app = express();

console.clear();

app.use(morgan("dev"));
app.use(cors({ origin: "*" }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Welcome to express 🚀",
  });
});

app.use(router);

// app.use((req, res) => {
//   res.status(404).json({
//     success: false,
//     message: "Route Doesn't exist 🤨",
//   });
// });

app.use(errorHandler);

export { app };
