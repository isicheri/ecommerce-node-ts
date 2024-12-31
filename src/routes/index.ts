import { Router } from "express";
import authRoute from "./auth";
import productRoutes from "./product";
import userRoutes from "./user";
import cartRouter from "./cart";
import orderRouter from "./order";

const rootRouter:Router = Router();

rootRouter.use('/auth',authRoute)
rootRouter.use('/products',productRoutes)
rootRouter.use('/user',userRoutes)
rootRouter.use('/cart',cartRouter)
rootRouter.use('/order',orderRouter)

export default rootRouter