import { Router } from "express";

import { errorHandler } from "../errorHandler";
import authmiddelware from "../middleware/auth";
import adminmiddelware from "../middleware/admin";
import { addAddress, deleteAddress, listAddress, updateUser } from "../controllers/user";

const userRoutes:Router = Router()

userRoutes.post("/address",authmiddelware, errorHandler(addAddress))
userRoutes.delete("/address",authmiddelware, errorHandler(deleteAddress))
userRoutes.get("/listaddress",authmiddelware,adminmiddelware, errorHandler(listAddress))
userRoutes.put("/address",authmiddelware, errorHandler(updateUser))


export default userRoutes