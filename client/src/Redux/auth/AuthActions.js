import { types } from "./types";
import axios from "axios";

const registerUser = (user) => {
    return async dispatch => {
        try {
            const { data } = await axios.post('http://localhost:19789/register', user);
            dispatch({ type: types.REGISTER, payload: data.userWithoutPassword });
        }
        catch (error) {
            dispatch({ type: types.ERROR_REGISTER, payload: error.response.data.message })
            console.log(error.response.data)
        }
    }
};

const getProfile =  () => {
    return async dispatch => {
        try {
            const { data } = await axios.get(`http://localhost:19789/users/2fbdf6ef-7f4c-4d86-89a0-354318215fb8`);
            dispatch({ type: types.GET_PROFILE, payload: data });
        }
        catch (error) {
            console.log(error);
            dispatch({ type: types.ERROR_REGISTER, payload: error.response.data })
       
        }
    }
}
const loginUser = (email, password) => {
    return async dispatch => {
        try {
            const { data } = await axios.post('http://localhost:19789/login', { email, password });
            console.log(data)
            dispatch({ type: types.LOGIN, payload: data });
        }
        catch (error) {
            dispatch({ type: types.ERROR_REGISTER, payload: error.response.data.message })
        }
    }
}
export {
    registerUser,
    getProfile,
    loginUser
}