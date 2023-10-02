import express from "express";
import { PORT } from "./config.js";
import mongoose from "mongoose";
import { Book } from "./models/bookModel.js";
import { config } from "dotenv";
import booksRoutes from "./routes/bookRoutes.js";
import cors from "cors";
config();
const app = express();
// cross origin middleware
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
//middleware
app.use(express.json());
app.get("/", (req, res) => {
  res.send("Hello World!");
});
app.use("/books", booksRoutes);
mongoose
  .connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(PORT, () => {
      console.log(`Server listening at http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error.message);
  });
