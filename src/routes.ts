import { Router } from "express";
import * as UsersController from "./controllers/users-controller";

const router = Router()

router.get("/users", UsersController.getUser)
router.get("/users/:id", UsersController.getUserById)

export default router