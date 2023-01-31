import User from "../models/User.js"
import argon2 from "argon2"

export const getUsers = async (req, res) => {
    try {
        const user = await User.findAll({
            attributes:['uuid', 'name', 'email', 'role']
        })
        res.status(200)
            .json({ "Status code" : 200,
                "Data" : user })
    } catch (error) {
        res.status(500)
            .json({  message : error.message })
    }
}

export const showUser = async (req, res) => {
    try {
        const user = await User.findOne({
            attributes:['uuid', 'name', 'email', 'role'],
            where: {uuid: req.params.id}
        })
        res.status(200)
            .json({ "Status code" : 200,
                "Data" : user })
    } catch (error) {
        res.status(500)
            .json({ message : error.message })
    }
}

export const createUser = async (req, res) => {
    const {name, email, password, confirm_pass, role} = req.body
    if (password !== confirm_pass) return res.status(400).json({message: "password and confirm_pass doesn't match"})

    //* Hashing password if match
    const hash_password = await argon2.hash(password)

    try {
        await User.create({
            name : name,
            email : email,
            password : hash_password,
            role : role
        })
        res.status(201)
            .json({ "Status code" : 201,
                message: "Registration successful" })
    } catch (error) {
        res.status(400)
            .json({ message: error.message })
    }
}

export const updateUser = async (req, res) => {
    const user = await User.findOne({
        where: {uuid: req.params.id}
    })

    if (!user) return res.status(404).json({
        "Status code" : 404,
        message: "User not found" 
    })

    const {name, email, password, confirm_pass, role} = req.body

    let hash_password
    if (password === '' || password === null) {
        hash_password = user.password
    } else {
        hash_password = await argon2.hash(password)
    }

    if (password !== confirm_pass) return res.status(400).json({message: "password and confirm_pass doesn't match"})

    try {
        await User.update({ 
            name : name,
            email : email,
            password : hash_password,
            role : role
        },
        {
            where: {
                id: user.id
            }
        })
        res.status(200)
            .json({ "Status code" : 200,
                message: "User has been updated" })
    } catch (error) {
        res.status(400)
            .json({ message: error.message })
    }
}

export const deleteUser = async (req, res) => {
    const user = await User.findOne({
        where: {uuid: req.params.id}
    })

    if (!user) return res.status(404).json({
        "Status code" : 404,
        message: "User not found" 
    })

    try {
        await User.destroy({
            where: {
                id: user.id
            }
        })
        res.status(200)
            .json({ "Status code" : 200,
                message: "User has been deleted" })
    } catch (error) {
        res.status(400)
            .json({ message: error.message })
    }
}