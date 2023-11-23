// const mongoose = require("mongoose");
import mongoose, {Schema, Document} from "mongoose";


interface Product extends Document{
  nombre: string;
  precio: number;
  imagen: string;
}

const productosSchema = new Schema({
  nombre: {
    type: String,
    trim: true,
  },
  precio: {
    type: Number,
  },
  imagen: {
    type: String,
  },
});

export default mongoose.model<Product>('Productos', productosSchema);