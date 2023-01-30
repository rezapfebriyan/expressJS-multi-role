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
    userId: {
        type: DataTypes.INTEGER,
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
    foreignKey: 'userId'
})

//* Syncron model for auto generate this table
// db.sync().then(() => {
//     console.log('Product table created successfully!');
// }).catch((error) => {
//     console.error('Unable to create table : ', error);
// });

export default Products