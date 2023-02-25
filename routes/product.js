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
router.get('/product/:id', verifyUser, showProduct)
router.post('/product', verifyUser, createProduct)
router.patch('/product/:id', verifyUser, updateProduct)
router.delete('/product/:id', verifyUser, deleteProduct)

export default router