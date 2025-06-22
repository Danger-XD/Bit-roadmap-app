import { Router } from "express";
const router = Router();
import * as userController from "../controllers/user.controller.js";
import { verifyToken } from "../middlewares/auth.middleware.js";

router.route("/signup").post(userController.signup);
router.route("/login").post(userController.login)
router.route("/logout").post(verifyToken,userController.logout)
export default router;
