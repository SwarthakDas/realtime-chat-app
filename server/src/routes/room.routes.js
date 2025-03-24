import { Router } from "express";
import { addUser, checkRoom, createRoom, fetchMessages, fetchRooms, removeUser } from "../controllers/room.controllers";

export const router=Router()

router.route("/create").post(createRoom)
router.route("/check-id-available").post(checkRoom)
router.route("/add-user").post(addUser)
router.route("/remove-user").post(removeUser)
router.route("/fetch-messages").post(fetchMessages)
router.route("/fetch-rooms").get(fetchRooms)