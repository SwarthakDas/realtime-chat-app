import { Router } from "express";
import { checkRoom, createRoom, fetchMessages, fetchRooms, sendMessage } from "../controllers/room.controllers";

export const router=Router()

router.route("/create").post(createRoom)
router.route("/check-id-available").post(checkRoom)
router.route("/send-message").post(sendMessage)
router.route("/fetch-messages").post(fetchMessages)
router.route("/fetch-rooms").get(fetchRooms)