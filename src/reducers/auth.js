const authReducer = (state = null, action) => {
    switch(action.type){
        case "VERIFY_LOGIN":
            const user =JSON.parse(localStorage.getItem("PROFILE"))
            return user?user:state
            case "LOGIN_REDUCER":
                localStorage.setItem("PROFILE",JSON.stringify(action.payload))
            return action.payload
        case "LOGOUT_REDUCER":
            localStorage.removeItem("PROFILE")
            return null
        default:
            return state
    }
}

export default authReducer