import {
GET_ANSWERS,
GET_ANSWERS_CATEGORIES,
CREATE_ANSWER,
UPDATE_ANSWER,
DELETE_ANSWER,
GET_ANSWERS_FILTERED,
} from "../action-types";

import axios from "axios";

export const createAnswer = (answer) => {
    return async function (dispatch) {
        try {
            const response = await axios.post("", answer);
            dispatch({type: CREATE_ANSWER, payload: response.data})
        } catch (error) {
            
        }
    }
}