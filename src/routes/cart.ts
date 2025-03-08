import { Router } from "express";
import { errorHandler } from "../errorHandler";
import authmiddelware from "../middleware/auth";
import adminmiddelware from "../middleware/admin";
import { addItemToCart, changeQuantity, deleteItemToCart, getCart } from "../controllers/cart";

const cartRoutes:Router = Router()

cartRoutes.post("/",authmiddelware, errorHandler(addItemToCart))
cartRoutes.get("/",authmiddelware, errorHandler(getCart))
cartRoutes.delete("/:id",authmiddelware, errorHandler(deleteItemToCart))
cartRoutes.put("/:id",authmiddelware, errorHandler(changeQuantity))






export default cartRoutes