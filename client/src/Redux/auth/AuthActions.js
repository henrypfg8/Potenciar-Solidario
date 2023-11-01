import { types } from "./types";
import axios from "axios";

const registerUser = (user) => {
    return async dispatch => {
        try {
            const { data } = await axios.post('http://localhost:19789/register', user);
         
            dispatch({ type: types.REGISTER, payload: data.userWithoutPassword });
            return Promise.resolve(data);
        }
        catch (error) {
            dispatch({ type: types.ERROR_REGISTER, payload: error.response.data.message })
            console.log(error.response.data);
            return Promise.reject(error);
        }
    }
};

const getProfile =  (id) => {
    return async dispatch => {
        try {
            const { data } = await axios.get(`http://localhost:19789/users/${id}`);
            //console.log(data.id) // si aparece la data
            dispatch({ type: types.GET_PROFILE, payload: data });
            return Promise.resolve(data);
        }
        catch (error) {
            console.log(error);
            dispatch({ type: types.ERROR_REGISTER, payload: error.response.data })
            return Promise.reject(error);
       
        }
    }
}
const loginUser = (email, password) => {
    return async dispatch => {
        try {
            const { data } = await axios.post('http://localhost:19789/login', { email, password });
            
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