"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Usuarios_1 = __importDefault(require("../models/Usuarios"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const usuarioController = {
    registerUser: async (req, res, next) => {
        const user = new Usuarios_1.default(req.body);
        user.password = await bcrypt_1.default.hash(req.body.password, 10);
        try {
            await user.save();
            res.json({ mensaje: "User Created Successfully" });
        }
        catch (error) {
            console.log(error);
            res.json({ mensaje: "There was an error" });
        }
    },
    authenticateUser: async (req, res, next) => {
        const { email, password } = req.body;
        const user = await Usuarios_1.default.findOne({ email });
        if (!user) {
            res.status(401).json({ mensaje: "User does not exist" });
            next();
        }
        else {
            if (!bcrypt_1.default.compareSync(password, user.password)) {
                res.status(401).json({ mensaje: "Incorrect Password" });
                next();
            }
            else {
                const token = jsonwebtoken_1.default.sign({
                    email: user.email,
                    usuario: user.nombre,
                    id: user._id,
                }, process.env.SECRET, {
                    expiresIn: "2h",
                });
                res.json({ token });
            }
        }
    }
};
exports.default = usuarioController;
//# sourceMappingURL=usuarioController.js.map