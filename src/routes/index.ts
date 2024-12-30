import { Router } from "express";
import authRoute from "./auth";
import productRoutes from "./product";
import userRoutes from "./user";

const rootRouter:Router = Router();

rootRouter.use('/auth',authRoute)
rootRouter.use('/products',productRoutes)
rootRouter.use('/user',userRoutes)

export default rootRouter