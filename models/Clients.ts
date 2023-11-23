// const mongoose = require("mongoose");
import mongoose, { Schema, Document } from 'mongoose';


interface Client extends Document {
  name: string;
  lastName: string;
  company: string;
  email: string;
  phone: string;
}


const clientsSchema = new Schema({
  name: {
    type: String,
    trim: true,
  },
  lastName: {
    type: String,
    trim: true,
  },
  company: {
    type: String,
    trim: true,
  },
  email: {
    type: String,
    unique: true,
    lowercase: true,
    trim: true,
  },
  phone: {
    type: String,
    trim: true,
  },
});




export default mongoose.model<Client>('Clientes', clientsSchema);
