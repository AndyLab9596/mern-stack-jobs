import { Router } from "express";
import { register, login, updateUser } from "../controllers/authController";

const router = Router();

router.post("/register", register);
router.post("/login", login);
router.patch("/updateUser", updateUser);

export default router;
