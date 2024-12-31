import {Router} from "express";
import { errorHandler } from "../error-handler";
import authMiddleware from "../middleware/auth";
import { cancelOrder, changeStatus, createOrder, getOrderById, listAllOrders, listOrders, listUserOrder } from "../controllers/order";
import adminMiddleware from "../middleware/admin";

const orderRouter:Router = Router();
orderRouter.use(authMiddleware)

orderRouter.post('/create', errorHandler(createOrder))
orderRouter.get('/get-orders', errorHandler(listOrders))
orderRouter.put('/:id', errorHandler(cancelOrder))
orderRouter.get('/get-order/:id', errorHandler(getOrderById))
orderRouter.get('/index',[adminMiddleware],errorHandler(listAllOrders))
orderRouter.put('/status',[adminMiddleware],errorHandler(changeStatus))
orderRouter.get('/user/:id',[adminMiddleware],errorHandler(listUserOrder))







export default orderRouter;