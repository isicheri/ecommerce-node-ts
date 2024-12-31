import { Router } from "express";
import { errorHandler } from "../error-handler";
import authMiddleware from "../middleware/auth";
import { addItemToCart, changeQuantity, deleteItemFromCart, getCart } from "../controllers/cart";


const cartRouter:Router = Router();
cartRouter.post('/',[authMiddleware],errorHandler(addItemToCart))
cartRouter.delete('/:id',[authMiddleware],errorHandler(deleteItemFromCart))
cartRouter.put("/:id",[authMiddleware],errorHandler(changeQuantity))
cartRouter.get("/",[authMiddleware],errorHandler(getCart))


export default cartRouter