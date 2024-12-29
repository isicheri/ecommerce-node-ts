import { Router } from "express";
import authRoute from "./auth";
import productRoutes from "./product";

const rootRouter:Router = Router();

rootRouter.use('/auth',authRoute)
rootRouter.use('/products',productRoutes)

export default rootRouter