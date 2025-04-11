import { Router } from "express";
import productController from "../controllers/product.controller";

const productRouter = Router()

productRouter.get('/', productController.getAllProduct)
productRouter.get('/:id', productController.getProductById)
productRouter.post('/', productController.addProduct)
productRouter.put('/:id', productController.editProductById)
productRouter.delete('/:id', productController.deleteProductById)


export default productRouter