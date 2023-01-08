import express from "express"
import session from "express-session"
import dotenv from "dotenv"

dotenv.config()
const app = express()

app.use(express.json)
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
        secure: 'auto' //* kalo http ? false : true
    }
}))

app.listen(process.env.APP_PORT, () => {
    console.log('Server up and running ...');
})