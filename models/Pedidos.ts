// const mongoose = require("mongoose");
import mongoose, { Schema, Document, Types } from 'mongoose';

interface ProductOrder {
  producto: Types.ObjectId;
  cantidad: number;
}

interface Order extends Document{
  cliente: Types.ObjectId;
  pedido: ProductOrder[];
  total: number;
}

const pedidosSchema = new Schema({
  cliente: {
    type: Schema.Types.ObjectId,
    ref: "Clientes",
  },
  pedido: [
    {
      producto: {
        type: Schema.Types.ObjectId,
        ref: "Productos",
      },
      cantidad: Number,
    },
  ],
  total: {
    type: Number,
  },
});


export default mongoose.model<Order>('Pedidos', pedidosSchema);
