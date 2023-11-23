import express, { Router } from "express";
import clienteController from "../controller/clienteController";
import productoController from "../controller/productoController";
import pedidoController from "../controller/pedidoController";
import usuarioController from "../controller/usuarioController";

const router: Router = express.Router();

// Middleware for Route Protection
// const auth = require("../middleware/auth");

import auth from '../middleware/auth';

export default function (): Router {
  // Define Client Routes
  router.post("/clientes", auth, clienteController.newClient);
  router.get("/clientes", auth, clienteController.getClients);
  router.get("/clientes/:id", auth, clienteController.getClientById);
  router.put("/clientes/:id", auth, clienteController.updateClientById);
  router.delete("/clientes/:id", auth, clienteController.deleteClientById);

  // Define Product Routes
  router.post(
    "/productos",
    auth,
    productoController.subirArchivo,
    productoController.newProduct
  );
  router.get("/productos", auth, productoController.getProducts);
  router.get("/productos/:id", auth, productoController.getProductById);
  router.post(
    "/productos/busqueda/:query",
    auth,
    productoController.searchProducts
  );
  router.put(
    "/productos/:id",
    auth,
    productoController.subirArchivo,
    productoController.updateProductById
  );
  router.delete("/productos/:id", auth, productoController.deleteProductById);

  // Define Orders
  router.post("/pedidos", auth, pedidoController.newPedido);
  router.get("/pedidos", auth, pedidoController.getPedidos);
  router.get("/pedidos/:id", auth, pedidoController.getPedidoById);
  router.put("/pedidos/:id", auth, pedidoController.updatePedidoById);
  router.delete("/pedidos/:id", auth, pedidoController.deletePedidoById);

  router.post("/register", usuarioController.registerUser);
  router.post("/login", usuarioController.authenticateUser);
  return router;
}
