import { Router } from "express";
import authRoute from "./auth";
import productRoutes from "./product";
import userRoutes from "./user";
import cartRouter from "./cart";

const rootRouter:Router = Router();

rootRouter.use('/auth',authRoute)
rootRouter.use('/products',productRoutes)
rootRouter.use('/user',userRoutes)
rootRouter.use('/cart',cartRouter)

export default rootRouter