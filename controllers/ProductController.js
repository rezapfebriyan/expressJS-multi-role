import Product from "../models/Product.js"
import User from "../models/User.js"
import path from "path"
import {Op} from "sequelize"

export const getProducts = async (req, res) => {
    try {
        let response

        //* if auth user admin
        if (req.role === "Admin") {
            response = await Product.findAll({
                attributes:['uuid', 'name', 'price', 'image'],
                include:[{ 
                    model: User,
                    attributes:['uuid', 'name']
                 }] // ada relasi Product ke User
            })
        } else {
            response = await Product.findAll({
                attributes:['uuid', 'name', 'price', 'image'],
                where: {
                    userId: req.userId // req from data middleware
                },
                include:[{ 
                    model: User,
                    attributes:['uuid', 'name']
                }] // ada relasi Product ke User
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
                attributes:['uuid', 'name', 'price', 'image'],
                where: {id: product.id},
                include:[{ 
                    model: User,
                    attributes:['uuid', 'name']
                 }] // ada relasi Product ke User
            })
        } else {
            response = await Product.findOne({
                attributes:['uuid', 'name', 'price', 'image'],
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
    if (!req.files) return res.status(400).json({
        "Status code" : 400,
        message: "You must upload file !" 
    })

    const {name, price} = req.body
    const file = req.files.file
    const fileSize = file.data.length
    const ext = path.extname(file.name) // get extention file
    const fileName = file.md5 + ext // convert file name to MD5
    const url = `${req.protocol}://${req.get("host")}/images/${fileName}` // http://localhost
    const allowedType = [".png", ".jpg", ".jpeg"]
    
    if (!allowedType.includes(ext.toLowerCase())) return res.status(422).json({
        "Status code" : 422,
        message: "Invalid image !" 
    })

    // validation for file size
    if (fileSize > 3000000) return res.status(422).json({
        "Status code" : 422,
        message: "Your image must be less than 5 MB !" 
    })

    // save image to storage
    file.mv(`./public/images/${fileName}`, async (error) => {
        if (error) return res.status(500).json({
            "Status code" : 422,
            message: error.message 
        })  
    })
    
    try {
        await Product.create({
            name,
            price,
            image: fileName,
            url,
            userId: req.userId // req from data middleware
        })
        res.status(201)
        .json({ "Status code" : 201,
            message: "Product has been created" })
    } catch (error) {
        res.status(500)
            .json({ "Status code" : 500,
            message: error.message })
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
            if (req.userId !== product.userId) return res.status(403).json({
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

export const deleteProduct = async (req, res) => {
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
            await Product.destroy(
                {where: {
                    id: product.id
                }   
            })
        } else {
            if (req.userId !== product.userId) return res.status(403).json({
                "Status code" : 403,
                message: "Forbidden delete" 
            })
            await Product.destroy(
                {where: {
                    [Op.and]: [
                        {id: product.id}, {userId: req.userId}
                    ]
                },
            })
        }

        res.status(200)
            .json({ "Status code" : 200,
            message: "Product has been deleted" })

    } catch (error) {
        res.status(500)
            .json({ "Status code" : 500,
            message: error.message })
    }
}