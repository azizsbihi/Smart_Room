import 'dotenv/config'
import express from "express"
import mongoose from "mongoose"
import cors from "cors"
import http from "http"
import Server from "socket.io"
import path from "path"


import authRouter from "./routes/auth.js"
import cardsRouter from "./routes/cards.js"
import devicesRouter from "./routes/devices.js"

import deviceModel from './models/device.js'

import morgan from 'morgan'
import userModel from './models/user.js'
import cardModel from './models/card.js'

const app = express()
const server = http.createServer(app)
const io = new Server(server)
app.use(cors())
app.use(express.urlencoded({extended:false}))
app.use(express.json())
app.use(morgan("dev"))
const __dirname = path.resolve()
app.use(express.static(__dirname + '/public'));

app.get("/",(req,res)=>{
    res.render("index.html")
})

let sockets = {}
let users = {}
io.on("connection",(socket)=>{
    socket.on("RECEIVE_CODE",async ({message})=>{
        console.log("A device connected")
        console.log({message})
        sockets[message] = socket;

        socket.on("disconnect",()=>{
            console.log("A device disconnected")
            delete sockets[message];
        })

        socket.on("RECEIVE_NEW_CARD_DATA",async ({uuid,deviceId})=>{
            console.log(uuid,deviceId)
            
            const device = await deviceModel.findOne({deviceId:deviceId})
            if(!device) return console.log("Device not found")
            
            const user = await userModel.findById(device.owner)
            if(!user) return console.log("This device has no owner")

            users[user._id].emit("GET_NEW_CARD_DATA",{uuid,deviceId})
        })

        socket.on("CHECK_CARD_TO_DOOR",async ({uuid,deviceId})=>{
            console.log(uuid,deviceId)

            const device = await deviceModel.findOne({deviceId:deviceId})
            if(!device) return console.log("Device not found")
            
            const user = await userModel.findById(device.owner)
            if(!user) return console.log("This device has no owner")

            const card = await cardModel.findOne({cardId:uuid})
            if(!card ){
                users[user._id].emit("WRONG_CARD",card)
                return 
            }

            const difference = new Date().getTime() - card.paymentDate.getTime() 

            const days = Math.ceil(difference / (1000 * 3600 * 24))

            if(days > 31 ){
                users[user._id].emit("WRONG_CARD",card)
                return 
            }

            if(card.beverages <= 0 ){
                users[user._id].emit("WRONG_CARD",card)
                return 
            }

            console.log("GOOD")

            users[user._id].emit("RIGHT_CARD",card)
        })

        socket.on("DOOR_CLOSED",async ({deviceId})=>{
            console.log(deviceId,"closed")

            const device = await deviceModel.findOne({deviceId:deviceId})
            if(!device) return

            const user = await userModel.findById(device.owner)
            if(!user) return

            const newDevice = await deviceModel.findByIdAndUpdate(device._id,{sensor:false},{new:true})
            
            users[user._id].emit("DOOR_CLOSED",newDevice)
        })
        
        socket.on("DOOR_OPENED",async ({deviceId})=>{
            console.log(deviceId,"opened")
            
            
            const device = await deviceModel.findOne({deviceId:deviceId})
            if(!device) return
            
            const user = await userModel.findById(device.owner)
            if(!user) return

            const newDevice = await deviceModel.findByIdAndUpdate(device._id,{beverages:device.beverages-1},{new:true})

        
            users[user._id].emit("DOOR_OPENED",newDevice)
        })

        socket.on("SEND_READ_DATA",async ({deviceId,readData,uuid,cardType})=>{
            console.log(deviceId,readData,uuid,cardType)

            const device = await deviceModel.findOne({deviceId:deviceId})
            if(!device) return
            
            const user = await userModel.findById(device.owner)
            if(!user) return
            
            users[user._id].emit("SEND_READ_DATA",{deviceId,readData,uuid,cardType})
            
        })
        
        socket.on("ERROR",async ({deviceId,message,buttonText}) => {
            console.log(deviceId,message,buttonText)

            const device = await deviceModel.findOne({deviceId:deviceId})
            if(!device) return
            
            const user = await userModel.findById(device.owner)
            if(!user) return
            
            users[user._id].emit("ERROR",{message,buttonText})

        })

        

        const device = await deviceModel.findOne({deviceId:message})

        if(device) return

        new deviceModel({deviceName:message,deviceId:message}).save().then((device,err)=>{
            if(err) console.error(err)
            console.log(device)
        }).catch(err=>{
            if(err) console.error(err)
        })


        
    })

    socket.on("NEW_USER_CONNECTED",(userId) => {
        console.log("A user connected")
        console.log(userId)
        users[userId] = socket

        socket.on("disconnect",()=>{
            console.log("A user disconnected")
            /* sockets = sockets.filter(s=>s.id != socket.conn.id) */
            delete users[userId];
        })
    })

    socket.emit("ASK_FOR_CODE",{})
})





app.use("/auth",authRouter)
app.use("/cards",cardsRouter)
app.use("/devices",devicesRouter)

app.set("connectedDevices",sockets)


const PORT = 5000
const CONNECTION_URL = "mongodb://127.0.0.1:27017/smart-home"
mongoose.connect(CONNECTION_URL).then(()=>{
    console.log("Connected to database")
    server.listen(PORT,()=>{
        console.log(`App listening on port ${PORT}`)
    })  
}).catch(e=>{
    console.error(e)
})



