// const mongoose = require("mongoose");
import mongoose, { Schema, Document, Types } from 'mongoose';

interface ProductOrder {
  product: Types.ObjectId;
  amount: number;
}

interface Order extends Document{
  client: Types.ObjectId;
  order: ProductOrder[];
  total: number;
}

const ordersSchema = new Schema({
  client: {
    type: Schema.Types.ObjectId,
    ref: "Clients",
  },
  order: [
    {
      product: {
        type: Schema.Types.ObjectId,
        ref: "Products",
      },
      amount: Number,
    },
  ],
  total: {
    type: Number,
  },
});


export default mongoose.model<Order>('Orders', ordersSchema);
