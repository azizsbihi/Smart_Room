export const hideError = () => async (dispatch) => {
    setTimeout(() => {
        dispatch({type:"HIDE_ERROR"})
    }, 5000);
}

export const showError = (error) => async (dispatch) => {
    dispatch({type:"SHOW_ERROR",payload:error})
}