import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt"
import crypto from "crypto"

const schema = mongoose.Schema({
    name:{
        type:String,
        required:[true, "Please enter a name"],
        validate:[validator.isAlpha, "Please enter a valid name"]
    },
    email:{
        type:String,
        required:[true, "Please enter an email"],
        unique:[true, "This email is already"],
        lowercase:true,
        validate:[validator.isEmail,"Please enter a valid email"]
    },
    password:String,
    phoneNumber:{
        type:String
    },
    confirmed:{
        type:Boolean,
        default:true
    },
    confirmationToken:{
        type:String,
    }
},{timestamps:true})



schema.pre("save",async function (next){
    this.password = await bcrypt.hash(this.password, 12)
    this.confirmationToken = crypto.randomUUID()
    next()
})

const userModel = mongoose.model("User",schema)

export default userModel

