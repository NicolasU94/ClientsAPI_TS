// const mongoose = require("mongoose");
import mongoose, {Schema, Document} from "mongoose";


interface Product extends Document{
  name: string;
  price: number;
  imagen: string;
}

const productsSchema = new Schema({
  name: {
    type: String,
    trim: true,
  },
  price: {
    type: Number,
  },
  imagen: {
    type: String,
  },
});

export default mongoose.model<Product>('Products', productsSchema);