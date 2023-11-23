import {Response, Request, NextFunction} from 'express'
// const { response } = require("express");
// const Pedidos = require("../models/Pedidos .js");
import Pedidos from '../models/Pedidos';

const pedidoController = {
newPedido: async (req: Request, res: Response, next: NextFunction) => {
  const pedido = new Pedidos(req.body);
  try {
    await pedido.save();
    res.status(201).json({ mensaje: "A new order has been registered" });
  } catch (error) {
    res.status(500).send(error);
  }
},

getPedidos: async (req: Request, res: Response, next: NextFunction) => {
  try {
    const pedidos = await Pedidos.find({}).populate("cliente").populate({
      path: "pedido.producto",
      model: "Productos",
    });
    res.json(pedidos);
  } catch (error) {
    res.status(500).send(error);
  }
},

getPedidoById: async (req: Request, res: Response, next: NextFunction) => {
  try {
    const pedido = await Pedidos.findById(req.params.id)
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
  } catch (error) {
    res.status(500).send(error);
  }
},

updatePedidoById: async (req: Request, res: Response, next: NextFunction) => {
  try {
    // Building a new Product Object
    let newOrder = req.body;

    //Updating the Product Object
    const pedido = await Pedidos.findOneAndUpdate(
      { _id: req.params.id },
      newOrder,
      { new: true }
    )
      .populate("cliente")
      .populate({
        path: "pedido.producto",
        model: "Productos",
      });
    res.json(pedido);
  } catch (error) {
    res.status(500).send(error);
    next();
  }
},

deletePedidoById: async (req: Request, res: Response, next: NextFunction) => {
  try {
    await Pedidos.findOneAndDelete({ _id: req.params.id });
    res.json({ message: "Order Deleted Successfully" });
  } catch (error) {
    res.status(500).send(error);
    next();
  }
},
}


export default pedidoController;


