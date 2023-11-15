import express from "express"
import { login, signup, verify } from "../controllers/auth.js"

const route = express.Router()

route.post("/signup",signup)
route.post("/login",login)
route.put("/verify/:verifToken",verify)

export default route