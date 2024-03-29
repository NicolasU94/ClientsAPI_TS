import dotenv from "dotenv";
import express, { Express } from "express";
import path from 'path';
import routes from "./routes/index";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import cors from "cors";

dotenv.config({ path: ".env" });


// Connecting to MongoDB
mongoose.Promise = global.Promise;

mongoose.connect(process.env.DB_CONNECTION, {
  useNewUrlParser: true,
} as any);

// Creating the Express app
const app: Express = express();

// Setting up the port
const PORT: number = parseInt(process.env.PORT) || 3000;
const HOST: string = '0.0.0.0';

// Enabling bodyParser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

/*
const whitelist: [string] = [process.env.FRONTEND_URL];
const corsOptions: {} = {
  origin: (origin : string, callback: Function) => {
    const exists: boolean = whitelist.some((domain) => domain === origin);
    if (exists) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS')); 
    }
  },
}*/

// Enabling CORS
app.use(cors());

//Defining the Whitelist


app.use("/", routes());

// Public Folder Setup
//app.use(express.static("uploads"));
const dirPath = path.join(__dirname, 'uploads');
console.log(dirPath);
app.use(express.static(path.join(__dirname, 'uploads')));

// Setting the port to listen
app.listen(PORT, HOST, () => {
  console.log(`Server is running on port ${PORT}`);
});