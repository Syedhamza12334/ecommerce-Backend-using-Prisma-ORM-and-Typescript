import { Router } from "express";
import authRoutes from "./auth";
import productRoutes from "./product";
import userRoutes from "./user";
import cartRoutes from "./cart";
import orderRoutes from "./order"



const rootRouter:Router = Router()


rootRouter.use('/auth',authRoutes)

rootRouter.use('/product',productRoutes)
rootRouter.use('/user',userRoutes)
rootRouter.use('/cart',cartRoutes)
rootRouter.use('/order',orderRoutes)








export default rootRouter

