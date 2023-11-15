import { login, signup, verifyAccount } from "../api"

export const signupController = (signupData) => async (dispatch) => {
    try {
        const {data} = await signup(signupData)
        dispatch({type:"SHOW_ERROR",payload:{message:"Account created successfully"}})
    } catch (error) {
        dispatch({type:"SHOW_ERROR",payload:error.response.data})
    }
}

export const verifyIsConnected = () => async (dispatch) => {
    try {
        dispatch({type:"VERIFY_LOGIN"})
    } catch (error) {
        dispatch({type:"SHOW_ERROR",payload:error.response.data})
    }
}

export const loginController = (loginData) => async (dispatch) => {
    try {
        const {data} = await login(loginData)
        dispatch({type:"LOGIN_REDUCER",payload:data})
    } catch (error) {
        dispatch({type:"SHOW_ERROR",payload:error.response.data})
    }
}

export const verifyUser = (verifToken) => async (dispatch) => {
    try {
        const {data} = await verifyAccount(verifToken)
        //dispatch({type:"LOGIN_REDUCER",payload:data})
    } catch (error) {
        dispatch({type:"SHOW_ERROR",payload:error.response.data})
    }
}

export const logout = () => async (dispatch) => {
    try {
        dispatch({type:"LOGOUT_REDUCER"})
    } catch (error) {
        dispatch({type:"SHOW_ERROR",payload:error.response.data})
    }
}