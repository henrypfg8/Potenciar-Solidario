import { types } from "./types";
import axios from "axios";

const registerUser =  (user) => {
    return async dispatch => {
        try{
            const {data} = await axios.post('http://localhost:19789/register', user );
            console.log(data, 'respuesta del back');
           dispatch({type: types.REGISTER, payload:data});
        }
        catch(error){
            dispatch({type: types.ERROR_REGISTER, payload:error.response.data})
            console.log(error);
            console.log('hubo un error')
        }
    }
};

export {
    registerUser
}