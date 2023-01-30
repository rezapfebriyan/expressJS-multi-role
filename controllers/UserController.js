import User from "../models/User.js"
import argon2 from "argon2"

export const getUsers = async (req, res) => {
    try {
        const user = await User.findAll()
        res.status(200)
            .json({
                "Data" : user
            })
    } catch (error) {
        res.status(500)
            .json({
                message : error.message
            })
    }
}

export const showUser = async (req, res) => {
    try {
        const user = await User.findOne({
            where: {uuid: req.params.id}
        })
        res.status(200)
            .json({
                "Data" : user
            })
    } catch (error) {
        res.status(500)
            .json({
                message : error.message
            })
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
            .json({
                message: "Registration successful"
            })
    } catch (error) {
        res.status(400)
            .json({
            message: error.message
        })
    }
}

export const updateUser = (req, res) => {
    //
}

export const deleteUser = (req, res) => {
    //
}