import express from "express"
import session from "express-session"
import dotenv from "dotenv"
import ProductRoute from "./routes/product.js"
import UserRoute from "./routes/user.js"

dotenv.config()
const app = express();

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
        secure: 'auto' //* kalo http ? false : true
    }
}))

app.use(express.json)
app.use(ProductRoute)
app.use(UserRoute)

app.listen(process.env.APP_PORT, () => {
    console.log('Server up and running ...');
})