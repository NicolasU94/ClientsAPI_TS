import mongoose, { Document, Types } from 'mongoose';
interface ProductOrder {
    product: Types.ObjectId;
    amount: number;
}
interface Order extends Document {
    client: Types.ObjectId;
    order: ProductOrder[];
    total: number;
}
declare const _default: mongoose.Model<Order, {}, {}, {}, mongoose.Document<unknown, {}, Order> & Omit<Order & {
    _id: Types.ObjectId;
}, never>, any>;
export default _default;
//# sourceMappingURL=Orders.d.ts.map