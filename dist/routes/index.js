"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const clientController_1 = __importDefault(require("../controller/clientController"));
const productController_1 = __importDefault(require("../controller/productController"));
const orderController_1 = __importDefault(require("../controller/orderController"));
const userController_1 = __importDefault(require("../controller/userController"));
const router = express_1.default.Router();
const auth_1 = __importDefault(require("../middleware/auth"));
function default_1() {
    router.post("/clients", auth_1.default, clientController_1.default.newClient);
    router.get("/clients", auth_1.default, clientController_1.default.getClients);
    router.get("/clients/:id", auth_1.default, clientController_1.default.getClientById);
    router.put("/clients/:id", auth_1.default, clientController_1.default.updateClientById);
    router.delete("/clients/:id", auth_1.default, clientController_1.default.deleteClientById);
    router.post("/products", auth_1.default, productController_1.default.uploadFile, productController_1.default.newProduct);
    router.get("/products", auth_1.default, productController_1.default.getProducts);
    router.get("/products/:id", auth_1.default, productController_1.default.getProductById);
    router.post("/products/search/:query", auth_1.default, productController_1.default.searchProducts);
    router.put("/products/:id", auth_1.default, productController_1.default.uploadFile, productController_1.default.updateProductById);
    router.delete("/products/:id", auth_1.default, productController_1.default.deleteProductById);
    router.post("/orders", auth_1.default, orderController_1.default.newOrder);
    router.get("/orders", auth_1.default, orderController_1.default.getOrders);
    router.get("/orders/:id", auth_1.default, orderController_1.default.getOrderById);
    router.put("/orders/:id", auth_1.default, orderController_1.default.updateOrderById);
    router.delete("/orders/:id", auth_1.default, orderController_1.default.deleteOrderById);
    router.post("/register", userController_1.default.registerUser);
    router.post("/login", userController_1.default.authenticateUser);
    return router;
}
exports.default = default_1;
//# sourceMappingURL=index.js.map