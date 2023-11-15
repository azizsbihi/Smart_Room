import { deleteCard, editCard, getCards, saveNewCard } from "../api"

export const setNewCardData = (uuid,deviceId) => async (dispatch) => {
    try {
        dispatch({type:"CARD_INSERTED",payload:{uuid,deviceId}})
    } catch (error) {
        dispatch({type:"SHOW_ERROR",payload:error.response.data})
    }
}

export const setNewAdminCardData = (deviceId,readData,uuid,cardType) => async (dispatch) => {
    try {
        dispatch({type:"ADMIN_INSERTED",payload:{deviceId,readData,uuid,cardType}})
    } catch (error) {
        dispatch({type:"SHOW_ERROR",payload:error.response.data})
    }
}

export const loadCards = (userId) => async (dispatch) => {
    try {
        const {data} = await getCards(userId)
        dispatch({type:"LOAD_CARDS",payload:data})
    } catch (error) {
        dispatch({type:"SHOW_ERROR",payload:error.response.data})
    }
}

export const addNewCard = (userId, newCardData) => async (dispatch) => {
    try {
       const {data} = await saveNewCard(userId,newCardData)
       dispatch({type:"ADD_CARD",payload:data}) 
    } catch (error) {
        dispatch({type:"SHOW_ERROR",payload:error.response.data})
    }
}

export const editCards = (newCard) => async (dispatch) => {
    try {
        const {data} = await editCard(newCard)
        dispatch({type:"UPDATE_CARD",payload:data})
    } catch (error) {
        dispatch({type:"SHOW_ERROR",payload:error.response.data})
    }
}

export const deleteCards = (cardId) => async (dispatch) => {
    try {
        const {data} = await deleteCard(cardId)
        dispatch({type:"DELETE_CARD",payload:data})
    } catch (error) {
        dispatch({type:"SHOW_ERROR",payload:error.response.data})
    }
}