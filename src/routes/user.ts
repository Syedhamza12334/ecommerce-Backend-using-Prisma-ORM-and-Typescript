import { Router } from "express";

import { errorHandler } from "../errorHandler";
import authmiddelware from "../middleware/auth";
import adminmiddelware from "../middleware/admin";
import { addAddress, changeUserRole, deleteAddress, getUserbyId, listAddress, listUsers, updateUser } from "../controllers/user";

const userRoutes:Router = Router()

userRoutes.post("/address",authmiddelware, errorHandler(addAddress))
userRoutes.delete("/address",authmiddelware, errorHandler(deleteAddress))
userRoutes.get("/listaddress",authmiddelware,adminmiddelware, errorHandler(listAddress))
userRoutes.put("/address",authmiddelware, errorHandler(updateUser))

userRoutes.put("/:id/role",authmiddelware, errorHandler(changeUserRole))
userRoutes.get("/",authmiddelware, errorHandler(listUsers))
userRoutes.get("/:id",authmiddelware, errorHandler(getUserbyId))





export default userRoutes