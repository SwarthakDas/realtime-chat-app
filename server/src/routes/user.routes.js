import { Router } from "express";
import { checkUsername, createUser, fetchChat } from "../controllers/user.controllers";


export const router=Router()

router.route("/create").post(createUser)
router.route("/check-username").post(checkUsername)
router.route("/fetch-room").post(fetchChat)