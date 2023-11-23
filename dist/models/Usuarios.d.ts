import mongoose, { Document } from "mongoose";
interface User extends Document {
    email: string;
    nombre: string;
    password: string;
}
declare const _default: mongoose.Model<User, {}, {}, {}, mongoose.Document<unknown, {}, User> & Omit<User & {
    _id: mongoose.Types.ObjectId;
}, never>, any>;
export default _default;
//# sourceMappingURL=Usuarios.d.ts.map