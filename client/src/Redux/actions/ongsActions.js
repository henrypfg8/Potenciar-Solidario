import {
GET_ONGS,
GET_POSTS_BY_ONGS
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

export const getPostsByOngs = (query) => {
    return async function (dispatch) {
        try {
            const response = await axios.get(`http://localhost:19789/ongs/filter?ongs=${query}`);
            dispatch({type: GET_POSTS_BY_ONGS, payload: response.data});
        } catch (error) {
            console.log(error, "por favor contactar a soporte por este error")
        }
    }
}