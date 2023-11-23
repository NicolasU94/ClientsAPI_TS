"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Productos_1 = __importDefault(require("../models/Productos"));
const multer_1 = __importStar(require("multer"));
const shortid_1 = __importDefault(require("shortid"));
const storage = (0, multer_1.diskStorage)({
    destination: (req, file, cb) => {
        cb(null, __dirname + "../../uploads/");
    },
    filename: (req, file, cb) => {
        const extension = file.mimetype.split("/")[1];
        cb(null, `${shortid_1.default.generate()}.${extension}`);
    },
});
const configuracionMulter = {
    storage,
    fileFilter(req, file, cb) {
        if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
            cb(null, true);
        }
        else {
            cb(new Error("Formato No válido"));
        }
    },
};
const upload = (0, multer_1.default)(configuracionMulter).single("imagen");
const productoController = {
    subirArchivo: (req, res, next) => {
        upload(req, res, function (err) {
            if (err) {
                res.status(500).json({ mensaje: err });
            }
            else {
                return next();
            }
        });
    },
    newProduct: async (req, res) => {
        const product = new Productos_1.default(req.body);
        try {
            if (req.file?.filename) {
                product.imagen = req.file.filename;
            }
            await product.save();
            res.status(201).json({ message: "New Product Created Successfully" });
        }
        catch (error) {
            res.status(500).send(error);
        }
    },
    getProducts: async (req, res, next) => {
        try {
            const products = await Productos_1.default.find({});
            res.json(products);
        }
        catch (error) {
            res.status(500).send(error);
        }
    },
    searchProducts: async (req, res, next) => {
        try {
            const query = req.params?.query;
            const product = await Productos_1.default.find({ nombre: new RegExp(query, "i") });
            res.json(product);
        }
        catch (error) {
            res.status(500).send(error);
        }
    },
    getProductById: async (req, res, next) => {
        try {
            const product = await Productos_1.default.findById(req.params.id);
            console.log(product);
            if (!product) {
                res.status(404).json({ mensaje: "Product Not Found" });
                return next();
            }
            res.json(product);
        }
        catch (error) {
            res.status(500).send(error);
        }
    },
    updateProductById: async (req, res) => {
        try {
            let prevProduct = await Productos_1.default.findById(req.params.id);
            let newProduct = req.body;
            if (req.file) {
                newProduct.imagen = req.file.filename;
            }
            else {
                newProduct.imagen = prevProduct?.imagen;
            }
            const product = await Productos_1.default.findOneAndUpdate({ _id: req.params.id }, newProduct, { new: true });
            res.json(product);
        }
        catch (error) {
            res.status(500).send(error);
        }
    },
    deleteProductById: async (req, res) => {
        try {
            await Productos_1.default.findOneAndDelete({ _id: req.params.id });
            res.json({ message: "Product Deleted Successfully" });
        }
        catch (error) {
            res.status(500).send(error);
        }
    },
};
exports.default = productoController;
//# sourceMappingURL=productoController.js.map