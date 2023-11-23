import mongoose, { Document } from "mongoose";
interface Product extends Document {
    name: string;
    price: number;
    imagen: string;
}
declare const _default: mongoose.Model<Product, {}, {}, {}, mongoose.Document<unknown, {}, Product> & Omit<Product & {
    _id: mongoose.Types.ObjectId;
}, never>, any>;
export default _default;
//# sourceMappingURL=Products.d.ts.map