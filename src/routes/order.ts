import { Router } from "express";
import { errorHandler } from "../errorHandler";
import authmiddelware from "../middleware/auth";
import { cancelOrder, changeStatus, createOrder, getOrderById, listAllOrders, listOrder, listUserOrders } from "../controllers/order";
;

const orderRoutes:Router = Router()

orderRoutes.post("/",authmiddelware, errorHandler(createOrder))
orderRoutes.get("/",authmiddelware, errorHandler(listOrder))
orderRoutes.put("/:id/cancel",authmiddelware, errorHandler(cancelOrder))


orderRoutes.get("/index",authmiddelware, errorHandler(listAllOrders))
orderRoutes.get("/users/:id",authmiddelware, errorHandler(listUserOrders))
orderRoutes.put("/:id/status",authmiddelware, errorHandler(changeStatus))



orderRoutes.get("/:id",authmiddelware, errorHandler(getOrderById))


export default orderRoutes