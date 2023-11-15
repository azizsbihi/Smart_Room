const devicesReducer = (state = [], action) => {
    switch(action.type){
        case "LOAD_DEVICES":
            return action.payload
        case "ADD_DEVICE":
            return [...state,action.payload]
        case "UPDATE_DEVICE":
            state = state.map((device,index)=>device._id===action.payload._id?action.payload:device)
            return [...state]
        case "DELETE_DEVICE":
            state = state.filter((device,index)=>device._id!==action.payload._id)
            return [...state]
        default:
            return state
    }
}

export default devicesReducer