const adminCardDataReducer = (state=null,action) => {
    switch(action.type){
        case "ADMIN_INSERTED":
            return action.payload
        case "ADMIN_BACK_TO_NORMAL":
            return null
        default:
            return state
    }
}


export default adminCardDataReducer