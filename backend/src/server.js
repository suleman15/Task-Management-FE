import dotenv from "dotenv";
import { connectToDB } from "./database/connection.js";
import { app } from "./app.js";
import { PORT } from "./config/envManager.js";

connectToDB().then(() => {
  app.listen(PORT, (req, res) => {
    console.log(`Express app is listening to ${PORT} 🚀`);
  });
});
