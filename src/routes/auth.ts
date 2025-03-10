import { Router } from "express";
import { me, Signin, Signup } from "../controllers/auth";
import { errorHandler } from "../errorHandler";
import authmiddelware from "../middleware/auth";

const authRoutes:Router = Router()


authRoutes.post("/signup",errorHandler(Signup))

authRoutes.post("/signin",errorHandler(Signin))

authRoutes.get("/me",authmiddelware,errorHandler(me))





export default authRoutes