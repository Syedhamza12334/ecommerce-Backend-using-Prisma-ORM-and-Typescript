import { Router } from "express";
import { createProduct, deleteProduct, getProductById, listProduct, updateProduct } from "../controllers/products";
import { errorHandler } from "../errorHandler";
import authmiddelware from "../middleware/auth";
import adminmiddelware from "../middleware/admin";

const productRoutes:Router = Router()

productRoutes.post("/",authmiddelware,adminmiddelware, errorHandler(createProduct))

productRoutes.post("/",authmiddelware,adminmiddelware, errorHandler(createProduct))
productRoutes.put("/:id",authmiddelware,adminmiddelware, errorHandler(updateProduct))
productRoutes.delete("/:id",authmiddelware,adminmiddelware, errorHandler(deleteProduct))
productRoutes.get("/",authmiddelware,adminmiddelware, errorHandler(listProduct))
productRoutes.get("/:id",authmiddelware,adminmiddelware, errorHandler(getProductById))






export default productRoutes