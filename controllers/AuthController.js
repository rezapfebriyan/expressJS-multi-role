import User from "../models/User.js"
import argon2 from "argon2"

export const Login = async (req, res) => {
    const user = await User.findOne({
        where: {
            email: req.params.email
        }
    })

    if (!user) return res.status(404).json({
        "Status code" : 404,
        message: "User not found" 
    })

    const match = await argon2.verify(user.password, req.body.password)

    //* if password doesn't match
    if (!match) return res.status(404).json({
        "Status code" : 404,
        message: "Password doestn't match with our record" 
    })

    //* set session
    req.session.userId = user.uuid

    const uuid = user.uuid
    const name = user.name
    const email = user.email
    const role = user.role
    res.status(200).json({
            "Data" : { uuid, name, email, role }
        })
}

export const Logout = (req, res) => {
    //* delete session
    req.session.destroy((error) => {
        if (error) return res.status(400).json({ message: "Logout failed" })
        res.status(200).json({ message: "Lougout success" })
    })
}