import {Response, Request, NextFunction} from 'express'
import Orders from '../models/Orders';

const orderController = {
newOrder: async (req: Request, res: Response, next: NextFunction) => {
  const order = new Orders(req.body);
  try {
    await order.save();
    res.status(201).json({ message: "A new order has been registered" });
  } catch (error) {
    res.status(500).send(error);
  }
},

getOrders: async (req: Request, res: Response, next: NextFunction) => {
  try {
    const orders = await Orders.find({}).populate("client").populate({
      path: "order.product",
      model: "Products",
    });
    res.json(orders);
  } catch (error) {
    res.status(500).send(error);
  }
},

getOrderById: async (req: Request, res: Response, next: NextFunction) => {
  try {
    const order = await Orders.findById(req.params.id)
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
  } catch (error) {
    res.status(500).send(error);
  }
},

updateOrderById: async (req: Request, res: Response, next: NextFunction) => {
  try {
    // Building a new Product Object
    let newOrder = req.body;
    //Updating the Product Object
    const order = await Orders.findOneAndUpdate(
      { _id: req.params.id },
      newOrder,
      { new: true }
    )
      .populate("client")
      .populate({
        path: "order.product",
        model: "Products",
      });
    if (!order) {
      res.status(404).json({ message: "Order Not found" });
    } else {
      res.json(order);
    }
  } catch (error) {
    res.status(500).send(error);
    next();
  }
},

deleteOrderById: async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result: null | string = await Orders.findOneAndDelete({ _id: req.params.id });
    if (!result) {
      res.status(404).json({ message: "Order Not found" });
    } else {
      res.json({ message: "Order Deleted Successfully" });  
    }
  } catch (error) {
    res.status(500).send(error);
    next();
  }
},
}


export default orderController;


