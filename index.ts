import dotenv from "dotenv";
import express, { Express } from "express";
import routes from "./routes/index";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import cors from "cors";

dotenv.config({ path: ".env" });

// Connecting to MongoDB
mongoose.Promise = global.Promise;
//const DB_CON: String = process.env.DB_CONNECTION; 

mongoose.connect("mongodb://localhost:27017/restapi", {
  useNewUrlParser: true,
} as any);

// Creating the Express app
const app: Express = express();

// Setting up the port
const port: number = parseInt(process.env.PORT, 10);

// Enabling bodyParser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Enabling CORS
app.use(cors());

app.use("/", routes());

// Public Folder Setup
app.use(express.static("uploads"));

// Setting the port to listen
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});