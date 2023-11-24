
import mongoose, {Schema, Document} from "mongoose";
// const mongoose = require("mongoose");

interface User extends Document{
  email: string;
  name: string;
  password: string;
}

const usersSchema = new Schema({
  email: {
    type: String,
    unique: true,
    lowercase: true,
    trim: true,
    required: true
  },
  name: {
    type: String,
    required: "Add your name",
  },
  password: {
    type: String,
    required: true,
  },
});

export default mongoose.model<User>('Users', usersSchema);
