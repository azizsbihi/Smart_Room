import userModel from "../models/user.js"
import bcypt from "bcrypt"

export const signup = (req,res) => {
    new userModel(req.body).save(err => {
        if(err.code == 11000) return res.status(402).json({message:"User already exists",buttonText:"Continue"})
        if(err) return res.status(402).json({message:err.message,buttonText:"Continue"})
    })/* then((newUser,err)=>{
        console.log(err)
        if(err) return res.status(402).json({message:err,buttonText:"Continue"})
        return res.status(200).json(newUser)
    }).catch((err)=>{
        console.log(err)
        //if(err) return res.status(402).json({message:err,buttonText:"Continue"})
    }) */
}

export const login = async (req, res) => {
    userModel.findOne({email:req.body.email}).then((user,err)=>{
        if(err) return res.status(402).json({message:err,buttonText:"Continue"})
        if(!user) return res.status(404).json({message:"User not found", buttonText:"Continue"})
        bcypt.compare(req.body.password,user.password,(err,testRes)=>{
            if(err) return res.status(402).json({message:"An error occured", buttonText:"Retry later"})
            if(testRes) return res.status(200).json(user)
            return res.status(403).json({message:"Wrong password", buttonText:"Continue"})
        })  
    }).catch((err)=>{
        if(err) res.status(402).json({message:err,buttonText:"Continue"})
    })
}

export const verify = async (req, res) => {
    const user = await userModel.findOneAndUpdate({confirmationToken:req.params.verifToken},{new:true})
    if(!user) return res.status(404).json({message:"User not found", buttonText:"Continue"})
    return res.status(200).json(user)
}