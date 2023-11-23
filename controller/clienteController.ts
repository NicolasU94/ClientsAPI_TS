// const Clients = require("../models/Clients");
import { Request, Response, NextFunction } from "express";
import Clientes from "../models/Clients";

const clienteController = {
newClient: async (req: Request, res: Response) => {
  const client = new Clientes(req.body);

  try {
    await client.save();
    res.status(201).json({ message: "New Client added successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
  },
  getClients: async (req: Request, res: Response) => {
  try {
    const clients = await Clientes.find({});
    console.log(clients);
    res.json(clients);
  } catch (error) {
    res.status(500).send(error);
  }
  },
getClientById: async (req: Request, res: Response, next: NextFunction) => {
  const client = await Clientes.findById(req.params.id);

  if (!client) {
    res.status(404).json({ message: "Client Not Found" });
    return next();
  }
  res.json(client);
  },
  updateClientById: async (req: Request, res: Response) => {
    try {
      const client = await Clientes.findOneAndUpdate(
      { _id: req.params.id },
      req.body,
      { new: true }
    );
    res.json(client);
  } catch (error) {
    res.status(500).send(error);
    console.log(error);
  }
  },
  deleteClientById: async (req: Request, res: Response) => {
  try {
    await Clientes.findOneAndDelete({ _id: req.params.id });
    res.json({ message: "Client Deleted Successfully" });
  } catch (error) {
    res.status(500).send(error);
  }
}
}

export default clienteController;