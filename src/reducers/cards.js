const cardsReducer = (state = [], action) => {
    switch(action.type){
        case "LOAD_CARDS":
            return action.payload
        case "ADD_CARD":
            return [...state,action.payload]
        case "UPDATE_CARD":
            state = state.map((device,index)=>device._id===action.payload._id?action.payload:device)
            return [...state]
        case "DELETE_CARD":
            state = state.filter((device,index)=>device._id!==action.payload._id)
            return [...state]
        default:
            return state
    }
}

export default cardsReducer