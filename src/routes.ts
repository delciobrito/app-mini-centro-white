import { Router } from "express";
import * as UsersController from "./controllers/users-controller";

const router = Router()

//endpoints users
router.get("/users", UsersController.getUser)
router.get("/users/:id", UsersController.getUserById)
router.post("/users", UsersController.postUser)

export default router