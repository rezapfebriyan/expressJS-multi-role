import express from "express"
import session from "express-session"
import fileUpload from "express-fileupload"
import dotenv from "dotenv"
import SequelizeStore from "connect-session-sequelize"
import ProductRoute from "./routes/product.js"
import UserRoute from "./routes/user.js"
import AuthRoute from "./routes/auth.js"
import db from "./config/database.js"

dotenv.config()
const app = express();

const sessionStore = SequelizeStore(session.Store)
const store = new sessionStore({
    db: db
})

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    store: store,
    cookie: {
        secure: 'auto' //* kalo http ? false : true
    }
}))

app.use(express.json())
app.use(fileUpload())
app.use(express.static("public"))
app.use(ProductRoute)
app.use(UserRoute)
app.use(AuthRoute)

// store.sync()

app.listen(process.env.APP_PORT, () => {
    console.log('Server up and running ...');
})