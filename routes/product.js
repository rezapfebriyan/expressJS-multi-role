import express from "express"
import {
    getProducts,
    showProduct,
    createProduct,
    updateProduct,
    deleteProduct
} from "../controllers/ProductController"

const router = express.Router()

router.get('/products', getProducts)
router.get('/products/:id', showProduct)
router.post('/products', createProduct)
router.patch('/products/:id', updateProduct)
router.delete('/products/:id', deleteProduct)

export default router