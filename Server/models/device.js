import mongoose from "mongoose";

const schema = mongoose.Schema({
    deviceName:{
        type:String,
        default:"",
    },
    deviceId:{
        type:String,
        required:[true, "This is not a true device"],
        unique:[true, "This device already exists"],
    },
    owner:{
        type:mongoose.Types.ObjectId,
        ref:"User"
    },
    connectedTo:{
        type:[String]
    },
    sensor:{
        type:Boolean,
        default:false
    }
})


const deviceModel = mongoose.model("device",schema)

export default deviceModel