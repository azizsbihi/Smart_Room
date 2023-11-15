import express from "express"
import { asssignToUser, chooseColor, getDevices, lighOff, lighOn, lock, startBackToNormal, startChangeUUIDMode, startGetDataToCopyMode, startNewCardMode, startReadDataMode, startWipeCardDataMode, startWriteCopiedDataMode, startWriteDataIntoCardMode, unlock } from "../controllers/devices.js"

const route = express.Router()

route.get("/:userId",getDevices)
route.put("/",asssignToUser)
route.post("/lightOn/:deviceId",lighOn)
route.post("/lightOff/:deviceId",lighOff)
route.post("/lock/:deviceId",lock)
route.post("/unlock/:deviceId",unlock)
route.post("/setColor/:deviceId",chooseColor)
route.post("/newCardMode/:userId",startNewCardMode)
route.post("/backToNormalMode/:userId",startBackToNormal)
route.post("/readDataMode/:userId",startReadDataMode)
route.post("/changeUUIDMode/:userId",startChangeUUIDMode)
route.post("/writeDataIntoCardMode/:userId",startWriteDataIntoCardMode)
route.post("/getDataToCopyMode/:userId",startGetDataToCopyMode)
route.post("/writeCopiedDataMode/:userId",startWriteCopiedDataMode)
route.post("/wipeCardDataMode/:userId",startWipeCardDataMode)
export default route