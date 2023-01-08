import { Sequelize } from "sequelize"
import db from "../config/database.js"

const { DataTypes } = Sequelize

//* nm_tabel, column, optional
const Users = db.define('users', {
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
    email: {
        type: DataTypes.STRING,
        allowNull: false, //! tidak boleh kosong
        validate: {
            notEmpty: true,
            isEmail: true
        }
    },
    password: {
        type: DataTypes.STRING,
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

export default Users