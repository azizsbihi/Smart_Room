import axios from "axios"
const BASE_URL = "http://localhost:5000/"



//AUTH
export const signup = (signupData) => axios.post(`${BASE_URL}auth/signup`,signupData)
export const login = (loginData) => axios.post(`${BASE_URL}auth/login`,loginData)
export const verifyAccount = (verifToken) => axios.put(`${BASE_URL}auth/verify/${verifToken}`)


//DEVICES
export const getDevices = (userId) => axios.get(`${BASE_URL}devices/${userId}`)
export const assignToUser = (userId, deviceId) => axios.put(`${BASE_URL}devices`,{userId,deviceId})


export const lightsOn = (deviceId) => axios.post(`${BASE_URL}devices/lightOn/${deviceId}`)
export const lightsOff = (deviceId) => axios.post(`${BASE_URL}devices/lightOff/${deviceId}`)
export const lock = (deviceId) => axios.post(`${BASE_URL}devices/lock/${deviceId}`)
export const unlock = (deviceId) => axios.post(`${BASE_URL}devices/unlock/${deviceId}`)
export const chooseColor = (deviceId,newColors) => axios.post(`${BASE_URL}devices/setColor/${deviceId}`,{newColors})
export const newCardModeOn = (userId) => axios.post(`${BASE_URL}devices/newCardMode/${userId}`)
export const newCardModeOff = (userId) => axios.post(`${BASE_URL}devices/backToNormalMode/${userId}`)
export const startReadDataMode = (userId) => axios.post(`${BASE_URL}devices/readDataMode/${userId}`)
export const startChangeUUIDMode= (userId,newUUID) => axios.post(`${BASE_URL}devices/changeUUIDMode/${userId}`,{newUUID})
export const startWriteDataIntoCardMode = (userId,nameOnCard) => axios.post(`${BASE_URL}devices/writeDataIntoCardMode/${userId}`,{nameOnCard})
export const startGetDataToCopyMode = (userId) => axios.post(`${BASE_URL}devices/getDataToCopyMode/${userId}`)
export const startWriteCopiedDataMode = (userId) => axios.post(`${BASE_URL}devices/writeCopiedDataMode/${userId}`)
export const startWipeCardDataMode = (userId) => axios.post(`${BASE_URL}devices/wipeCardDataMode/${userId}`)


//CARDS
export const getCards = (userId) => axios.get(`${BASE_URL}cards/${userId}`)
export const saveNewCard = (userId, newCardData) => axios.post(`${BASE_URL}cards/${userId}`,newCardData)
export const editCard = (newCard) => axios.put(`${BASE_URL}cards/`,newCard)
export const deleteCard = (cardId) => axios.delete(`${BASE_URL}cards/${cardId}`)