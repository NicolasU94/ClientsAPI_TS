
import mongoose, {Schema, Document} from "mongoose";
// const mongoose = require("mongoose");

interface User extends Document{
  email: string;
  nombre: string;
  password: string;
}

const usuariosSchema = new Schema({
  email: {
    type: String,
    unique: true,
    lowercase: true,
    trim: true,
  },
  nombre: {
    type: String,
    required: "Agrega tu nombre",
  },
  password: {
    type: String,
    required: true,
  },
});

export default mongoose.model<User>('Usuarios', usuariosSchema);
