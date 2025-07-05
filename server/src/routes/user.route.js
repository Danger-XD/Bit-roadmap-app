import { Router } from "express";
const router = Router();
import * as userController from "../controllers/user.controller.js";
import { verifyToken } from "../middlewares/auth.middleware.js";

// BASE API -> /api/v1/users

// POST -> Username, email and password
router.route("/signup").post(userController.signup);

// POST -> Email and password
router.route("/login").post(userController.login);

// GET -> username and email for simple auth check
router.route("/personal/info").get(verifyToken,userController.getPersonalInfo)

// POST -> Logout
router.route("/logout").post(verifyToken, userController.logout);
export default router;
