import {
GET_CATEGORIES,
GET_CATEGORIES_BY_NAME,
} from "../action-types"

import axios from "axios";

export const getCategories = () => {
    return async function (dispatch) {
        try {
            const response = await axios.get("http://localhost:19789/categories")
            dispatch({type: GET_CATEGORIES, payload: response.data});
        } catch (error) {
            console.log(error, "por favor contactar a soporte por este error")
        }
    }
}

export const getPostsByCategories = (query) => {
    return async function (dispatch) {
        try {
            const response = await axios.get(`http://localhost:19789/categories?name=${query}`);
            dispatch({type: GET_CATEGORIES_BY_NAME, payload: response.data});
        } catch (error) {
            console.log(error, "por favor contactar a soporte por este error")
        }
    }
}