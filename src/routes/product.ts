import { Router } from "express";
import { errorHandler } from "../error-handler";
import { createProduct, deleteProduct, getProductById, listProducts, searchProduct, updateProduct } from "../controllers/product";
import authMiddleware from "../middleware/auth";
import adminMiddleware from "../middleware/admin";

const productRoutes:Router = Router();
productRoutes.use(authMiddleware)
productRoutes.use(adminMiddleware)
productRoutes.post('/create',errorHandler(createProduct))
productRoutes.put('/:id/',errorHandler(updateProduct))
productRoutes.delete('/:id/',errorHandler(deleteProduct))
productRoutes.get('/',errorHandler(listProducts))
productRoutes.get('/:id/',errorHandler(getProductById))
productRoutes.get("/search",errorHandler(searchProduct))
export default productRoutes