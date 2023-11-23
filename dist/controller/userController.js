"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Users_1 = __importDefault(require("../models/Users"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const userController = {
    registerUser: async (req, res, next) => {
        const user = new Users_1.default(req.body);
        user.password = await bcrypt_1.default.hash(req.body.password, 10);
        try {
            await user.save();
            res.json({ message: "User Created Successfully" });
        }
        catch (error) {
            console.log(error);
            res.json({ message: "There was an error" });
        }
    },
    authenticateUser: async (req, res, next) => {
        const { email, password } = req.body;
        const user = await Users_1.default.findOne({ email });
        if (!user) {
            res.status(401).json({ message: "User does not exist" });
            next();
        }
        else {
            if (!bcrypt_1.default.compareSync(password, user.password)) {
                res.status(401).json({ message: "Incorrect Password" });
                next();
            }
            else {
                const token = jsonwebtoken_1.default.sign({
                    email: user.email,
                    user: user.name,
                    id: user._id,
                }, process.env.SECRET, {
                    expiresIn: "2h",
                });
                res.json({ token });
            }
        }
    }
};
exports.default = userController;
//# sourceMappingURL=userController.js.map