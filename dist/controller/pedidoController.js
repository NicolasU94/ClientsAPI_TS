"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Pedidos_1 = __importDefault(require("../models/Pedidos"));
const pedidoController = {
    newPedido: async (req, res, next) => {
        const pedido = new Pedidos_1.default(req.body);
        try {
            await pedido.save();
            res.status(201).json({ mensaje: "A new order has been registered" });
        }
        catch (error) {
            res.status(500).send(error);
        }
    },
    getPedidos: async (req, res, next) => {
        try {
            const pedidos = await Pedidos_1.default.find({}).populate("cliente").populate({
                path: "pedido.producto",
                model: "Productos",
            });
            res.json(pedidos);
        }
        catch (error) {
            res.status(500).send(error);
        }
    },
    getPedidoById: async (req, res, next) => {
        try {
            const pedido = await Pedidos_1.default.findById(req.params.id)
                .populate("cliente")
                .populate({
                path: "pedido.producto",
                model: "Productos",
            });
            if (!pedido) {
                res.status(404).json({ mensaje: "Order not found" });
                return next();
            }
            res.json(pedido);
        }
        catch (error) {
            res.status(500).send(error);
        }
    },
    updatePedidoById: async (req, res, next) => {
        try {
            let newOrder = req.body;
            const pedido = await Pedidos_1.default.findOneAndUpdate({ _id: req.params.id }, newOrder, { new: true })
                .populate("cliente")
                .populate({
                path: "pedido.producto",
                model: "Productos",
            });
            res.json(pedido);
        }
        catch (error) {
            res.status(500).send(error);
            next();
        }
    },
    deletePedidoById: async (req, res, next) => {
        try {
            await Pedidos_1.default.findOneAndDelete({ _id: req.params.id });
            res.json({ message: "Order Deleted Successfully" });
        }
        catch (error) {
            res.status(500).send(error);
            next();
        }
    },
};
exports.default = pedidoController;
//# sourceMappingURL=pedidoController.js.map