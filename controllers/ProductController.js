import Product from "../models/Product.js"
import User from "../models/User.js"
import {Op} from "sequelize"

export const getProducts = async (req, res) => {
    try {
        let response

        //* if auth user admin
        if (req.role === "Admin") {
            response = await Product.findAll({
                attributes:['uuid', 'name', 'price'],
                include:[{ 
                    model: User,
                    attributes:['uuid', 'name']
                 }] //? ada relasi Product ke User
            })
        } else {
            response = await Product.findAll({
                attributes:['uuid', 'name', 'price'],
                where: {
                    userId: req.userId //? req from data middleware
                },
                include:[{ 
                    model: User,
                    attributes:['uuid', 'name']
                }] //? ada relasi Product ke User
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

export const showProduct = async (req, res) => {
    try {
        const product = await Product.findOne({
            where: {uuid: req.params.id}
        })
        if (!product) return res.status(404).json({
            "Status code" : 404,
            message: "Product not found" 
        })

        let response

        //* if auth user admin
        if (req.role === "Admin") {
            response = await Product.findOne({
                attributes:['uuid', 'name', 'price'],
                where: {id: product.id},
                include:[{ 
                    model: User,
                    attributes:['uuid', 'name']
                 }] //? ada relasi Product ke User
            })
        } else {
            response = await Product.findOne({
                attributes:['uuid', 'name', 'price'],
                where: {
                    [Op.and]: [
                        {id: product.id}, {userId: req.userId}
                    ]
                },
                include:[{ 
                    model: User,
                    attributes:['uuid', 'name']
                }]
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

export const createProduct = async (req, res) => {
    const {name, price} = req.body
    try {
        await Product.create({
            name,
            price,
            userId: req.userId
        })
        res.status(201)
        .json({ "Status code" : 201,
            message: "Product has been created" })
    } catch (error) {
        
    }
}

export const updateProduct = async (req, res) => {
    try {
        const product = await Product.findOne({
            where: {uuid: req.params.id}
        })
        if (!product) return res.status(404).json({
            "Status code" : 404,
            message: "Product not found" 
        })

        const {name, price} = req.body

        //* if auth user admin
        if (req.role === "Admin") {
            await Product.update({name, price},
                {where: {
                    id: product.id
                }   
            })
        } else {
            if (req.userId !== product.userId) return res.status(404).json({
                "Status code" : 403,
                message: "Forbidden Update" 
            })
            await Product.update({name, price},
                {where: {
                    [Op.and]: [
                        {id: product.id}, {userId: req.userId}
                    ]
                },
            })
        }

        res.status(200)
            .json({ "Status code" : 200,
            message: "Product has been updated" })

    } catch (error) {
        res.status(500)
            .json({ "Status code" : 500,
            message: error.message })
    }
}

export const deleteProduct = (req, res) => {
    //
}