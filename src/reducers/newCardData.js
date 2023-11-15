const newCardDataReducer = (state=null,action) => {
    switch(action.type){
        case "CARD_INSERTED":
            return action.payload
        case "BACK_TO_NORMAL":
            return null
        default:
            return state
    }
}


export default newCardDataReducer