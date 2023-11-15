import devicesModel from "../models/device.js"
import userModel from "../models/user.js"




export const getDevices = async (req, res) => {
    const devices = await devicesModel.find({owner:req.params.userId})
    const connectedDevices = req.app.get("connectedDevices")
    const toReturn = await devices.map((device,index)=>{
        if(connectedDevices[device.deviceId]){
            return {...device._doc,isConnected:true}
        }
        return {...device._doc,isConnected:false}
    })

    setTimeout(()=>{
        return res.status(200).json(toReturn)
    })
}


export const asssignToUser = async (req,res) => {
    const device = await devicesModel.findOne({deviceId:req.body.deviceId})
    const user = await userModel.findById(req.body.userId)

    if(!device) return res.status(404).json({message:"Device not found",buttonText:"Continue"})
    if(!user) return res.status(404).json({message:"User not found",buttonText:"Continue"})

    if(device.owner) return res.status(404).json({message:"This device is already owned by someone",buttonText:"Continue"})

    device.owner = user._id

    await device.save()

    const connectedDevices = req.app.get("connectedDevices")

    const toReturn = connectedDevices[req.params.deviceId] ? {...device._doc,connected:true}:{...device._doc,connected:false}
    return res.status(200).json(toReturn)
}


export const lighOn = async (req, res) => {
    const device = await devicesModel.findOne({deviceId:req.params.deviceId})

    if(!device) return res.status(404).json({message:"Device not found", buttonText:"Continue"})

    const connectedDevices = req.app.get("connectedDevices")

    
    
    if(!connectedDevices[req.params.deviceId]) return res.status(404).json({message:"Device not connected",buttonText:"Retry again"})
    
    
    
    turnOnLight(connectedDevices[req.params.deviceId])
    
    return res.status(200).json({message:"Good", buttonText:"Continue"})
}


export const lighOff = async (req, res) => {
    const device = await devicesModel.findOne({deviceId:req.params.deviceId})

    if(!device) return res.status(404).json({message:"Device not found", buttonText:"Continue"})
    const connectedDevices = req.app.get("connectedDevices")

    if(!connectedDevices[req.params.deviceId]) return res.status(404).json({message:"Device not connected",buttonText:"Retry again"})

    
    turnOffLight(connectedDevices[req.params.deviceId])
    
    return res.status(200).json({message:"Good", buttonText:"Continue"})
}


export const lock = async (req, res) => {
    const device = await devicesModel.findOne({deviceId:req.params.deviceId})

    if(!device) return res.status(404).json({message:"Device not found", buttonText:"Continue"})
    const connectedDevices = req.app.get("connectedDevices")
    if(!connectedDevices[req.params.deviceId]) return res.status(404).json({message:"Device not connected",buttonText:"Retry again"})

    lockDoor(connectedDevices[req.params.deviceId])

    return res.status(200).json({message:"Good", buttonText:"Continue"})

    
}



export const unlock = async (req, res) => {
    const device = await devicesModel.findOne({deviceId:req.params.deviceId})
    const connectedDevices = req.app.get("connectedDevices")
    if(!device) return res.status(404).json({message:"Device not found", buttonText:"Continue"})

    if(!connectedDevices[req.params.deviceId]) return res.status(404).json({message:"Device not connected",buttonText:"Retry again"})

    unlockDoor(connectedDevices[req.params.deviceId])

    return res.status(200).json({message:"Good", buttonText:"Continue"})
    
}


export const chooseColor = async (req, res) => {
    const device = await devicesModel.findOne({deviceId:req.params.deviceId})

    const connectedDevices = req.app.get("connectedDevices")
    if(!device) return res.status(404).json({message:"Device not found", buttonText:"Continue"})

    if(!connectedDevices[req.params.deviceId]) return res.status(404).json({message:"Device not connected",buttonText:"Retry again"})

    setColor(connectedDevices[req.params.deviceId],req.body.newColors)

    return res.status(200).json({message:"Good", buttonText:"Continue"})
    
}


export const startNewCardMode = async (req, res) => {
    const devices = await devicesModel.find({owner:req.params.userId})

    if (devices.length==0) return res.status(404).json({message:"No device connected", buttonText:"Continue"})
    const connectedDevices = req.app.get("connectedDevices")

    devices.forEach((device)=>{
        if(!connectedDevices[device.deviceId]) return
        setNewCardMode(connectedDevices[device.deviceId])
    })

    return res.status(200).json({message:"Good", buttonText:"Continue"})
    
}


export const startBackToNormal = async (req, res) => {
    const devices = await devicesModel.find({owner:req.params.userId})

    if (devices.length==0) return res.status(404).json({message:"No device connected", buttonText:"Continue"})
    const connectedDevices = req.app.get("connectedDevices")

    devices.forEach((device)=>{
        if(!connectedDevices[device.deviceId]) return
        backToNormalMode(connectedDevices[device.deviceId])
    })

    return res.status(200).json({message:"Good", buttonText:"Continue"})
}


export const startReadDataMode = async (req, res) => {
    const devices = await devicesModel.find({owner:req.params.userId})

    if (devices.length==0) return res.status(404).json({message:"No device connected", buttonText:"Continue"})
    const connectedDevices = req.app.get("connectedDevices")

    devices.forEach((device)=>{
        if(!connectedDevices[device.deviceId]) return
        readDataMode(connectedDevices[device.deviceId])
    })

    return res.status(200).json({message:"Good", buttonText:"Continue"})
}


export const startChangeUUIDMode = async (req, res) => {
    const devices = await devicesModel.find({owner:req.params.userId})

    console.log(req.body.newUUID)
    if (devices.length==0) return res.status(404).json({message:"No device connected", buttonText:"Continue"})
    const connectedDevices = req.app.get("connectedDevices")

    devices.forEach((device)=>{
        if(!connectedDevices[device.deviceId]) return
        changeUUIDMode(connectedDevices[device.deviceId],req.body.newUUID)
    })

    return res.status(200).json({message:"Good", buttonText:"Continue"})
}


export const startWriteDataIntoCardMode = async (req, res) => {
    const devices = await devicesModel.find({owner:req.params.userId})
    console.log(req.body.nameOnCard)
    if (devices.length==0) return res.status(404).json({message:"No device connected", buttonText:"Continue"})
    const connectedDevices = req.app.get("connectedDevices")

    devices.forEach((device)=>{
        if(!connectedDevices[device.deviceId]) return
        writeDataIntoCardMode(connectedDevices[device.deviceId],req.body.nameOnCard)
    })

    return res.status(200).json({message:"Good", buttonText:"Continue"})
}


export const startGetDataToCopyMode = async (req, res) => {
    const devices = await devicesModel.find({owner:req.params.userId})

    if (devices.length==0) return res.status(404).json({message:"No device connected", buttonText:"Continue"})
    const connectedDevices = req.app.get("connectedDevices")

    devices.forEach((device)=>{
        if(!connectedDevices[device.deviceId]) return
        getDataToCopyMode(connectedDevices[device.deviceId])
    })

    return res.status(200).json({message:"Good", buttonText:"Continue"})
}


export const startWriteCopiedDataMode = async (req, res) => {
    const devices = await devicesModel.find({owner:req.params.userId})

    if (devices.length==0) return res.status(404).json({message:"No device connected", buttonText:"Continue"})
    const connectedDevices = req.app.get("connectedDevices")

    devices.forEach((device)=>{
        if(!connectedDevices[device.deviceId]) return
        writeCopiedDataMode(connectedDevices[device.deviceId])
    })

    return res.status(200).json({message:"Good", buttonText:"Continue"})
}


export const startWipeCardDataMode = async (req, res) => {
    const devices = await devicesModel.find({owner:req.params.userId})

    if (devices.length==0) return res.status(404).json({message:"No device connected", buttonText:"Continue"})
    const connectedDevices = req.app.get("connectedDevices")

    devices.forEach((device)=>{
        if(!connectedDevices[device.deviceId]) return
        wipeCardDataMode(connectedDevices[device.deviceId])
    })

    return res.status(200).json({message:"Good", buttonText:"Continue"})
}



const turnOnLight = (socket) => socket.emit("LIGHT_ON")
const turnOffLight = (socket) => socket.emit("LIGHT_OFF")
const lockDoor = (socket) => socket.emit("LOCK")
const unlockDoor = (socket) => socket.emit("UNLOCK")
const setColor = (socket,newColor) => socket.emit("SET_COLOR",newColor)
const setNewCardMode = (socket) => socket.emit("SET_NEW_CARD_MODE")
const backToNormalMode = (socket) => socket.emit("BACK_TO_NORMAL_MODE")
const readDataMode = (socket) => socket.emit("READ_DATA_MODE")
const changeUUIDMode = (socket,newUUID) => socket.emit("CHANGE_UUID_MODE",{newUUID})
const writeDataIntoCardMode = (socket,nameOnCard) => socket.emit("WRITE_DATA_INTO_CARD_MODE",{nameOnCard})
const getDataToCopyMode = (socket) => socket.emit("GET_DATA_TO_COPY")
const writeCopiedDataMode = (socket) => socket.emit("WRITE_COPIED_DATA")
const wipeCardDataMode = (socket) => socket.emit("WIPE_CARD_DATA")
