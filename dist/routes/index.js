"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const clienteController_1 = __importDefault(require("../controller/clienteController"));
const productoController_1 = __importDefault(require("../controller/productoController"));
const pedidoController_1 = __importDefault(require("../controller/pedidoController"));
const usuarioController_1 = __importDefault(require("../controller/usuarioController"));
const router = express_1.default.Router();
const auth_1 = __importDefault(require("../middleware/auth"));
function default_1() {
    router.post("/clientes", auth_1.default, clienteController_1.default.newClient);
    router.get("/clientes", auth_1.default, clienteController_1.default.getClients);
    router.get("/clientes/:id", auth_1.default, clienteController_1.default.getClientById);
    router.put("/clientes/:id", auth_1.default, clienteController_1.default.updateClientById);
    router.delete("/clientes/:id", auth_1.default, clienteController_1.default.deleteClientById);
    router.post("/productos", auth_1.default, productoController_1.default.subirArchivo, productoController_1.default.newProduct);
    router.get("/productos", auth_1.default, productoController_1.default.getProducts);
    router.get("/productos/:id", auth_1.default, productoController_1.default.getProductById);
    router.post("/productos/busqueda/:query", auth_1.default, productoController_1.default.searchProducts);
    router.put("/productos/:id", auth_1.default, productoController_1.default.subirArchivo, productoController_1.default.updateProductById);
    router.delete("/productos/:id", auth_1.default, productoController_1.default.deleteProductById);
    router.post("/pedidos", auth_1.default, pedidoController_1.default.newPedido);
    router.get("/pedidos", auth_1.default, pedidoController_1.default.getPedidos);
    router.get("/pedidos/:id", auth_1.default, pedidoController_1.default.getPedidoById);
    router.put("/pedidos/:id", auth_1.default, pedidoController_1.default.updatePedidoById);
    router.delete("/pedidos/:id", auth_1.default, pedidoController_1.default.deletePedidoById);
    router.post("/register", usuarioController_1.default.registerUser);
    router.post("/login", usuarioController_1.default.authenticateUser);
    return router;
}
exports.default = default_1;
//# sourceMappingURL=index.js.map