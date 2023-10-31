import {
GET_ONGS,
GET_ONGS_BY_NAME
} from "../action-types"

import axios from "axios";

export const getOngs = () => {
    return async function (dispatch) {
        try {
            const response = await axios.get("http://localhost:19789/ongs");
            dispatch({type: GET_ONGS, payload: response.data});
        } catch (error) {
            throw new Error(error.response + "por favor contacte a soporte por este error");
        }
    }
}

export const getOngsByName = (query) => {
    return async function (dispatch) {
        try {
            const response = await axios.get(`http://localhost:19789/ongs?name=${query}`);
            dispatch({type: GET_ONGS_BY_NAME, payload: response.data});
        } catch (error) {
            throw new Error(error.response + "por favor contacte a soporte por este error");
        }
    }
}