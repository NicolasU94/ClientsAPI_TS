import mongoose, { Document } from 'mongoose';
interface Client extends Document {
    name: string;
    lastName: string;
    company: string;
    email: string;
    phone: string;
}
declare const _default: mongoose.Model<Client, {}, {}, {}, mongoose.Document<unknown, {}, Client> & Omit<Client & {
    _id: mongoose.Types.ObjectId;
}, never>, any>;
export default _default;
//# sourceMappingURL=Clients.d.ts.map