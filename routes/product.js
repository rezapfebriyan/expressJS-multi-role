import express from "express"
import {
    getProducts,
    showProduct,
    createProduct,
    updateProduct,
    deleteProduct
} from "../controllers/ProductController.js"
import { verifyUser } from "../middlewares/AuthUser.js"

const router = express.Router()

router.get('/products', verifyUser, getProducts)
router.get('/products/:id', verifyUser, showProduct)
router.post('/products', verifyUser, createProduct)
router.patch('/products/:id', verifyUser, updateProduct)
router.delete('/products/:id', verifyUser, deleteProduct)

export default router