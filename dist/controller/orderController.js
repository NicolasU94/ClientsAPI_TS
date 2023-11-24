"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Orders_1 = __importDefault(require("../models/Orders"));
const orderController = {
    newOrder: async (req, res, next) => {
        const order = new Orders_1.default(req.body);
        try {
            await order.save();
            res.status(201).json({ message: "A new order has been registered" });
        }
        catch (error) {
            res.status(500).send(error);
        }
    },
    getOrders: async (req, res, next) => {
        try {
            const orders = await Orders_1.default.find({}).populate("client").populate({
                path: "order.product",
                model: "Products",
            });
            res.json(orders);
        }
        catch (error) {
            res.status(500).send(error);
        }
    },
    getOrderById: async (req, res, next) => {
        try {
            const order = await Orders_1.default.findById(req.params.id)
                .populate("client")
                .populate({
                path: "order.product",
                model: "Products",
            });
            if (!order) {
                res.status(404).json({ message: "Order not found" });
                return next();
            }
            res.json(order);
        }
        catch (error) {
            res.status(500).send(error);
        }
    },
    updateOrderById: async (req, res, next) => {
        try {
            let newOrder = req.body;
            const order = await Orders_1.default.findOneAndUpdate({ _id: req.params.id }, newOrder, { new: true })
                .populate("client")
                .populate({
                path: "order.product",
                model: "Products",
            });
            if (!order) {
                res.status(404).json({ message: "Order Not found" });
            }
            else {
                res.json(order);
            }
        }
        catch (error) {
            res.status(500).send(error);
            next();
        }
    },
    deleteOrderById: async (req, res, next) => {
        try {
            const result = await Orders_1.default.findOneAndDelete({ _id: req.params.id });
            if (!result) {
                res.status(404).json({ message: "Order Not found" });
            }
            else {
                res.json({ message: "Order Deleted Successfully" });
            }
        }
        catch (error) {
            res.status(500).send(error);
            next();
        }
    },
};
exports.default = orderController;
//# sourceMappingURL=orderController.js.map