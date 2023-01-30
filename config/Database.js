import { Sequelize } from "sequelize"

const db = new Sequelize('express-role', 'root', '', {
    host: "localhost",
    dialect: "mysql"
})

export default db