"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const index_1 = __importDefault(require("./routes/index"));
const mongoose_1 = __importDefault(require("mongoose"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
dotenv_1.default.config({ path: ".env" });
mongoose_1.default.Promise = global.Promise;
mongoose_1.default.connect(process.env.DB_CONNECTION, {
    useNewUrlParser: true,
});
const app = (0, express_1.default)();
const PORT = parseInt(process.env.PORT) || 3000;
const HOST = '0.0.0.0';
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use((0, cors_1.default)());
app.use("/", (0, index_1.default)());
const dirPath = path_1.default.join(__dirname, 'uploads');
console.log(dirPath);
app.use(express_1.default.static(path_1.default.join(__dirname, 'uploads')));
app.listen(PORT, HOST, () => {
    console.log(`Server is running on port ${PORT}`);
});
//# sourceMappingURL=index.js.map