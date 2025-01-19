import express from "express";
import { signup, login, getUser } from "../controller/user.controller.js";
const router = express.Router();

router.get("/", getUser);
router.post("/signup", signup);
router.post("/login", login);

export default router;