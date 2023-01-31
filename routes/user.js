import express from "express"
import {
    getUsers,
    showUser,
    createUser,
    updateUser,
    deleteUser
} from "../controllers/UserController.js"
import { 
    verifyUser,
    isAdmin
 } from "../middlewares/AuthUser.js"

const router = express.Router()

router.get('/users', verifyUser, isAdmin, getUsers)
router.get('/user/:id', verifyUser, isAdmin, showUser)
router.post('/user', verifyUser, isAdmin, createUser)
router.patch('/user/:id', verifyUser, isAdmin, updateUser)
router.delete('/user/:id', verifyUser, isAdmin, deleteUser)

export default router