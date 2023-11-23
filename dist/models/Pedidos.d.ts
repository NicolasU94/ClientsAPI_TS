import mongoose, { Document, Types } from 'mongoose';
interface ProductOrder {
    producto: Types.ObjectId;
    cantidad: number;
}
interface Order extends Document {
    cliente: Types.ObjectId;
    pedido: ProductOrder[];
    total: number;
}
declare const _default: mongoose.Model<Order, {}, {}, {}, mongoose.Document<unknown, {}, Order> & Omit<Order & {
    _id: Types.ObjectId;
}, never>, any>;
export default _default;
//# sourceMappingURL=Pedidos.d.ts.map