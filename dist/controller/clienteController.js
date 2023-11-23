"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Clients_1 = __importDefault(require("../models/Clients"));
const clienteController = {
    newClient: async (req, res) => {
        const client = new Clients_1.default(req.body);
        try {
            await client.save();
            res.status(201).json({ message: "New Client added successfully" });
        }
        catch (error) {
            console.log(error);
            res.status(500).send(error);
        }
    },
    getClients: async (req, res) => {
        try {
            const clients = await Clients_1.default.find({});
            console.log(clients);
            res.json(clients);
        }
        catch (error) {
            res.status(500).send(error);
        }
    },
    getClientById: async (req, res, next) => {
        const client = await Clients_1.default.findById(req.params.id);
        if (!client) {
            res.status(404).json({ message: "Client Not Found" });
            return next();
        }
        res.json(client);
    },
    updateClientById: async (req, res) => {
        try {
            const client = await Clients_1.default.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true });
            res.json(client);
        }
        catch (error) {
            res.status(500).send(error);
            console.log(error);
        }
    },
    deleteClientById: async (req, res) => {
        try {
            await Clients_1.default.findOneAndDelete({ _id: req.params.id });
            res.json({ message: "Client Deleted Successfully" });
        }
        catch (error) {
            res.status(500).send(error);
        }
    }
};
exports.default = clienteController;
//# sourceMappingURL=clienteController.js.map