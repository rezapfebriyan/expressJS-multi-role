import express from "express"
import {
    Login,
    userAuth,
    Logout
} from "../controllers/AuthController.js"

const router = express.Router()

router.get('/user-auth', userAuth)
router.post('/login', Login)
router.delete('/logout', Logout)

export default router