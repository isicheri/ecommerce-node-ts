import { Router } from "express";
import { errorHandler } from "../error-handler";
import authMiddleware from "../middleware/auth";
import { addItemToCart, changeQuantity, deleteItemFromCart, getCart } from "../controllers/cart";


const cartRouter:Router = Router();
cartRouter.use(authMiddleware)
cartRouter.post('/',errorHandler(addItemToCart))
cartRouter.delete('/:id',errorHandler(deleteItemFromCart))
cartRouter.put("/:id",errorHandler(changeQuantity))
cartRouter.get("/",errorHandler(getCart))


export default cartRouter