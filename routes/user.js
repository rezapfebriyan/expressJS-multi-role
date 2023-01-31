import express from "express"
import {
    getUsers,
    showUser,
    createUser,
    updateUser,
    deleteUser
} from "../controllers/UserController.js"
import { verifyUser } from "../middlewares/AuthUser.js"

const router = express.Router()

router.get('/users', verifyUser, getUsers)
router.get('/user/:id', verifyUser, showUser)
router.post('/user', verifyUser, createUser)
router.patch('/user/:id', verifyUser, updateUser)
router.delete('/user/:id', verifyUser, deleteUser)

export default router