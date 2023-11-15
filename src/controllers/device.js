import { assignToUser, chooseColor, getDevices, lightsOff, lightsOn, lock, newCardModeOff, newCardModeOn, startChangeUUIDMode, startGetDataToCopyMode, startReadDataMode, startWipeCardDataMode, startWriteCopiedDataMode, startWriteDataIntoCardMode, unlock } from "../api"

export const loadDevices = (userId) => async (dispatch) => {
    try {
        const {data} = await getDevices(userId)
        dispatch({type:"LOAD_DEVICES",payload:data})
    } catch (error) {
        dispatch({type:"SHOW_ERROR",payload:error.response.data})
    }
}

export const addDevice = (userId, deviceId) => async (dispatch) => {
    try {
        const {data} = await assignToUser(userId, deviceId)
        dispatch({type:"ADD_DEVICE",payload:data})
    } catch (error) {
        dispatch({type:"SHOW_ERROR",payload:error.response.data})
    }
}

export const turnOnLight = (deviceId) => async (dispatch) => {
    try {
        const {data} = await lightsOn(deviceId)
        dispatch({type:"SHOW_ERROR",payload:data})
    } catch (error) {
        console.log(error.response.data)
        dispatch({type:"SHOW_ERROR",payload:error.response.data})
    }
}

export const turnOffLight = (deviceId) => async (dispatch) => {
    try {
        const {data} = await lightsOff(deviceId)
        dispatch({type:"SHOW_ERROR",payload:data})
    } catch (error) {
        console.log(error.response.data)
        dispatch({type:"SHOW_ERROR",payload:error.response.data})
    }
}
export const lockDoor = (deviceId) => async (dispatch) => {
    try {
        const {data} = await lock(deviceId)
        dispatch({type:"SHOW_ERROR",payload:data})
    } catch (error) {
        console.log(error.response.data)
        dispatch({type:"SHOW_ERROR",payload:error.response.data})
    }
}

export const unlockDoor = (deviceId) => async (dispatch) => {
    try {
        const {data} = await unlock(deviceId)
        dispatch({type:"SHOW_ERROR",payload:data})
    } catch (error) {
        console.log(error.response.data)
        dispatch({type:"SHOW_ERROR",payload:error.response.data})
    }
}

export const setColor = (deviceId,newColors) => async (dispatch) => {
    try {
        const {data} = await chooseColor(deviceId,newColors)
        dispatch({type:"SHOW_ERROR",payload:data})
    } catch (error) {
        console.log(error.response.data)
    }
}

export const updateDevice = (device) => async (dispatch) => {
    try {
        dispatch({type:"UPDATE_DEVICE",payload:device})
    } catch (error) {
        dispatch({type:"SHOW_ERROR",payload:error.response.data})
    }
}

export const startNewCard = (userId) => async (dispatch) => {
    try {
        const {data} = await newCardModeOn(userId)
        dispatch({type:"SHOW_ERROR",payload:data})
        dispatch({type:"BACK_TO_NORMAL"})
    } catch (error) {
        console.log(error.response.data)
        dispatch({type:"SHOW_ERROR",payload:error.response.data})
    }
}

export const startBackToNormal = (userId) => async (dispatch) => {
    try {
        const {data} = await newCardModeOff(userId)
        dispatch({type:"SHOW_ERROR",payload:data})
        dispatch({type:"BACK_TO_NORMAL"})
    } catch (error) {
        console.log(error.response.data)
        dispatch({type:"SHOW_ERROR",payload:error.response.data})
    }
}
export const readDataMode = (userId) => async (dispatch) => {
    try {
        const {data} = await startReadDataMode(userId)
        dispatch({type:"SHOW_ERROR",payload:data})
        dispatch({type:"BACK_TO_NORMAL"})
    } catch (error) {
        console.log(error.response.data)
        dispatch({type:"SHOW_ERROR",payload:error.response.data})
    }
}
export const changeUUIDMode = (userId,newUUID) => async (dispatch) => {
    try {
        const {data} = await startChangeUUIDMode(userId,newUUID)
        dispatch({type:"SHOW_ERROR",payload:data})
        dispatch({type:"BACK_TO_NORMAL"})
    } catch (error) {
        console.log(error.response.data)
        dispatch({type:"SHOW_ERROR",payload:error.response.data})
    }
}
export const writeDataIntoCardMode = (userId,nameOnCard) => async (dispatch) => {
    try {
        const {data} = await startWriteDataIntoCardMode(userId,nameOnCard)
        dispatch({type:"SHOW_ERROR",payload:data})
        dispatch({type:"BACK_TO_NORMAL"})
    } catch (error) {
        console.log(error.response.data)
        dispatch({type:"SHOW_ERROR",payload:error.response.data})
    }
}
export const getDataToCopyMode = (userId) => async (dispatch) => {
    try {
        const {data} = await startGetDataToCopyMode(userId)
        dispatch({type:"SHOW_ERROR",payload:data})
        dispatch({type:"BACK_TO_NORMAL"})
    } catch (error) {
        console.log(error.response.data)
        dispatch({type:"SHOW_ERROR",payload:error.response.data})
    }
}
export const writeCopiedDataMode = (userId) => async (dispatch) => {
    try {
        const {data} = await startWriteCopiedDataMode(userId)
        dispatch({type:"SHOW_ERROR",payload:data})
        dispatch({type:"BACK_TO_NORMAL"})
    } catch (error) {
        console.log(error.response.data)
        dispatch({type:"SHOW_ERROR",payload:error.response.data})
    }
}
export const wipeCardDataMode = (userId) => async (dispatch) => {
    try {
        const {data} = await startWipeCardDataMode(userId)
        dispatch({type:"SHOW_ERROR",payload:data})
        dispatch({type:"BACK_TO_NORMAL"})
    } catch (error) {
        console.log(error.response.data)
        dispatch({type:"SHOW_ERROR",payload:error.response.data})
    }
}

