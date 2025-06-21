import { Router } from "express";
import * as UsersController from "./controllers/users-controller";

const router = Router()

//endpoints users
router.get("/users/:id", UsersController.getUserById)
router.post("/users", UsersController.postUser)
router.patch("/users/:id", UsersController.updateUser)
router.delete("/users/:id", UsersController.deleteUser)

// endpoints admin
router.get("/admin/users", UsersController.getUser)

export default router