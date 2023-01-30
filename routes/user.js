import express from "express"
import {
    getUsers,
    showUser,
    createUser,
    updateUser,
    deleteUser
} from "../controllers/UserController.js"

const router = express.Router()

router.get('/users', getUsers)
router.get('/user/:id', showUser)
router.post('/user', createUser)
router.patch('/user/:id', updateUser)
router.delete('/user/:id', deleteUser)

export default router