"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const mongoose_1 = __importDefault(require("mongoose"));
const product_routes_1 = __importDefault(require("./routes/product.routes"));
dotenv_1.default.config();
// Create server
const app = (0, express_1.default)();
// Middleware
app.use(express_1.default.json());
// Routes
app.use('/product', product_routes_1.default);
// Fallback
app.use((req, res) => {
    res.status(404).send("Invalid route!");
});
// Start server
const PORT = process.env.PORT || 3000;
const MONGODB_URL = process.env.MONGODB_URL;
mongoose_1.default
    .connect(MONGODB_URL, { dbName: 'store' })
    .then(() => {
    console.log(`Connected to MongoDB`);
    app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
    });
})
    .catch(err => {
    console.error(err);
    throw err;
});
