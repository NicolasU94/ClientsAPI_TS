import express, { Router } from "express";
import clientController from "../controller/clientController";
import productController from "../controller/productController";
import orderController from "../controller/orderController";
import userController from "../controller/userController";

const router: Router = express.Router();

// Middleware for Route Protection
import auth from '../middleware/auth';

export default function (): Router {
  // Define Client Routes
  router.post("/clients", auth, clientController.newClient);
  router.get("/clients", auth, clientController.getClients);
  router.get("/clients/:id", auth, clientController.getClientById);
  router.put("/clients/:id", auth, clientController.updateClientById);
  router.delete("/clients/:id", auth, clientController.deleteClientById);

  // Define Product Routes
  router.post(
    "/products",
    auth,
    productController.uploadFile,
    productController.newProduct
  );
  router.get("/products", auth, productController.getProducts);
  router.get("/products/:id", auth, productController.getProductById);
  router.post(
    "/products/search/:query",
    auth,
    productController.searchProducts
  );
  router.put(
    "/products/:id",
    auth,
    productController.uploadFile,
    productController.updateProductById
  );
  router.delete("/products/:id", auth, productController.deleteProductById);

  // Define Orders
  router.post("/orders", auth, orderController.newOrder);
  router.get("/orders", auth, orderController.getOrders);
  router.get("/orders/:id", auth, orderController.getOrderById);
  router.put("/orders/:id", auth, orderController.updateOrderById);
  router.delete("/orders/:id", auth, orderController.deleteOrderById);

  router.post("/register", userController.registerUser);
  router.post("/login", userController.authenticateUser);
  return router;
}
