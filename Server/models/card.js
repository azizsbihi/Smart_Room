import mongoose from "mongoose";

const schema = mongoose.Schema({
    cardId:{
        type:String,
        required:[true, "Please enter a valid card"],
        unique:[true, "This card already exists in the system"],
    },
    cardName:{
        type:String,
        require:true
    },
    paymentDate : {
        type:Date,
        required:true
    },
    beverages : {
        type:Number,
        required:true,
        default:60
    },
    isValid:{
        type:Boolean,
        default:false
    },
    owner:{
        type:mongoose.Types.ObjectId,
        ref:"User"
    }
})

const cardModel = mongoose.model("card",schema)


export default cardModel