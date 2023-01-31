import User from "../models/User.js"

export const verifyUser = async (req, res, next) => {
    if (!req.session.userId) {
        return res.status(401).json({ message : "You must login" })
    }

    const user = await User.findOne({
        where: {
            uuid: req.session.userId
        }
    })

    if (!user) return res.status(404).json({
        "Status code" : 404,
        message: "User not found"
    })

    req.userId = user.id
    req.role = user.role
    next()
}