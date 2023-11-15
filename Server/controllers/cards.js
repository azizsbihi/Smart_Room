import cardModel from "../models/card.js"
import userModel from "../models/user.js"


export const getCards = async (req, res) => {
    const cards = await cardModel.find({owner:req.params.userId})

    res.status(200).json(cards)
}

export const saveNewCard = async (req,res) => {
    const user = await userModel.findById(req.params.userId)
    if(!user) return res.status(404).json({message:"User not found",buttonText:"Retry"})

    const card = await cardModel.findOne({cardId:req.body.cardId})
    if(card) return res.status(403).json({message:"Card already in the system",buttonText:"Retry"})
    
    const newCard = await cardModel.create({...req.body,owner:req.params.userId, paymentDate:new Date()})
    
    return res.status(200).json(newCard)
}

export const editCard = async (req,res) => {
    const card = await cardModel.find({cardId:req.body._id})
    if(!card) return res.status(403).json({message:"Card not found",buttonText:"Retry"})

    const newCard = await cardModel.findByIdAndUpdate(req.body._id,{...req.body,beverages:60, paymentDate:new Date()},{new:true})

    return res.status(200).json(newCard)
}

export const oneDrink = async (req,res) => {
    const card = await cardModel.find({cardId:req.body._id})
    if(!card) return res.status(403).json({message:"Card not found",buttonText:"Retry"})


    const newCard = await cardModel.findByIdAndUpdate(req.body._id,{...req.body,beverages:req.body.beverages-1, paymentDate:new Date()},{new:true})

    return res.status(200).json(newCard)
}


export const deleteCard = async (req,res) => {
    const card = await cardModel.find({cardId:req.params.cardId})
    if(!card) return res.status(403).json({message:"Card not found",buttonText:"Retry"})
    
    const deleted = await cardModel.findByIdAndDelete(req.params.cardId)
    
    return res.status(200).json(deleted)
}