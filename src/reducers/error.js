const errorReducer = (state=null,action) => {
    switch(action.type){
        case "SHOW_ERROR":
            return action.payload
        case "HIDE_ERROR":
            return null
        default:
            return state
    }
}


export default errorReducer