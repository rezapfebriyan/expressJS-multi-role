import Product from "../models/Product.js"
import User from "../models/User.js"

export const getProducts = async (req, res) => {
    try {
        let response

        //* if auth user admin
        if (req.role === "Admin") {
            response = await Product.findAll({
                include:[{ model: User }] //? ada relasi Product ke User
            })
        } else {
            response = await Product.findAll({
                where: {
                    userId: req.userId //? req from data middleware
                },
                include:[{ model: User }] //? ada relasi Product ke User
            })
        }

        res.status(200)
            .json({ "Status code" : 200,
                "Data": response })

    } catch (error) {
        res.status(500)
            .json({ "Status code" : 500,
            message: error.message })
    }
}

export const showProduct = (req, res) => {
    //
}

export const createProduct = (req, res) => {
    //
}

export const updateProduct = (req, res) => {
    //
}

export const deleteProduct = (req, res) => {
    //
}