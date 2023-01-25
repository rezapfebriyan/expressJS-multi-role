import { Sequelize } from "sequelize"
import db from "../config/database.js"
import Users from "./User.js"

const { DataTypes } = Sequelize

//* nm_tabel, column, optional
const Products = db.define('products', {
    uuid: {
        type: DataTypes.STRING,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false, //! tidak boleh kosong
        validate: {
            notEmpty: true //! tidak boleh null atau " "
        }
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false, //! tidak boleh kosong
        validate: {
            notEmpty: true,
            len: [4, 50] //! min, max
        }
    },
    price: {
        type: DataTypes.INTEGER,
        allowNull: false, //! tidak boleh kosong
        validate: {
            notEmpty: true
        }
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false, //! tidak boleh kosong
        validate: {
            notEmpty: true
        }
    },
    role: {
        type: DataTypes.STRING,
        allowNull: false, //! tidak boleh kosong
        validate: {
            notEmpty: true
        }
    }
}, {
    freezeTableName: true
})

//*     :::   Relation One to Many   :::
Users.hasMany(Products)
Products.belongsTo(Users, {
    foreignKey: 'user_id'
})

export default Products