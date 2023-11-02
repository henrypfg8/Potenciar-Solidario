import {
GET_ONGS,
} from "../action-types"

import axios from "axios";

export const getOngs = () => {
    return async function (dispatch) {
        try {
            const response = await axios.get("http://localhost:19789/ongs");
            dispatch({type: GET_ONGS, payload: response.data});
        } catch (error) {
            console.log(error, "por favor contactar a soporte por este error")
        }
    }
}

