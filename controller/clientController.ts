import { Request, Response, NextFunction } from "express";
import Clients from "../models/Clients";

const clientController = {
newClient: async (req: Request, res: Response) => {
  const client = new Clients(req.body);

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
    const clients = await Clients.find({});
    console.log(clients);
    res.json(clients);
  } catch (error) {
    res.status(500).send(error);
  }
  },
getClientById: async (req: Request, res: Response, next: NextFunction) => {
  const client = await Clients.findById(req.params.id);

  if (!client) {
    res.status(404).json({ message: "Client Not Found" });
    return next();
  }
  res.json(client);
  },
  updateClientById: async (req: Request, res: Response) => {
    try {
      const client = await Clients.findOneAndUpdate(
      { _id: req.params.id },
      req.body,
      { new: true }
    );
      if (!client) {
        res.status(404).json({ message: "Client Not found" })
      } else {
        res.json(client);    
      }
  } catch (error) {
    res.status(500).send(error);
    console.log(error);
  }
  },
  deleteClientById: async (req: Request, res: Response) => {
  try {
    const result: null | string = await Clients.findOneAndDelete({ _id: req.params.id });
    if (!result) {
      res.status(404).json({ message: "Client Not found" });
    } else {
      res.json({ message: "Client Deleted Successfully" });  
    }
  } catch (error) {
    res.status(500).send(error);
  }
}
}

export default clientController;