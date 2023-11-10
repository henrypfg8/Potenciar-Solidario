import {
GET_ANSWERS,
CREATE_ANSWER,
UPDATE_ANSWER,
DELETE_ANSWER,
CREATE_ANSWER_COMMENT,
DELETE_ANSWER_COMMENT,
UPDATE_ANSWER_COMMENT,
GET_ANSWER_COMMENT,
} from "../action types/answersActionTypes.js";

import axios from "axios";
import { configureHeaders } from "../auth/configureHeaders .js";

export const getAnswers = () => {
    return async function (dispatch) {
        try {
            const config = configureHeaders()
            const response = await axios.get("http://localhost:19789/answers",config);
           
            dispatch({type: GET_ANSWERS, payload: response.data});
        } catch (error) {
            console.log(error, "por favor contactar a soporte por este error");
        }
    }
}

export const createAnswer = (answer) => {
    return async function (dispatch) {
        try {
            const config = configureHeaders()
            const response = await axios.post("http://localhost:19789/answers", answer,config);
            dispatch({type: CREATE_ANSWER, payload: response.data});
            return Promise.resolve(response); 
        } catch (error) {
            console.log(error, "por favor contactar a soporte por este error");
            return Promise.reject(error);
        }
    }
}


export const updateAnswer = (id, updatedAnswerData) => {
    return async function (dispatch) {
        try {
            const config = configureHeaders()
            const response = await axios.put(`http://localhost:19789/answers/${id}`, updatedAnswerData,config);
            dispatch({type: UPDATE_ANSWER, payload: response.data})
        } catch (error) {
            console.log(error, "por favor contactar a soporte por este error");
        }
    }
}

export const deleteAnswer = (id) => {
    return async function (dispatch) {
        try {
            const config = configureHeaders()
            const response = await axios.delete(`http://localhost:19789/answers/${id}`,config);
            dispatch({type: DELETE_ANSWER, payload: response.data})
        } catch (error) {
            console.log(error, "por favor contactar a soporte por este error");
        }
    }
}

export const createAnswerComment = (comment) => {
    return async function (dispatch) {
        try {
            console.log(comment)
            const config = configureHeaders()
            const response = await axios.post("http://localhost:19789/answers/comments", comment, config);
            dispatch({type: CREATE_ANSWER_COMMENT, payload: response.data})
        } catch (error) {
            console.log(error, "por favor contactar a soporte por este error");
        }
    }
}

export const deleteAnswerComment = (id) => {
    return async function (dispatch) {
        try {
            const config = configureHeaders()
            const response = await axios.delete(`http://localhost:19789/answers/comments/${id}`, config)
            dispatch({type: DELETE_ANSWER_COMMENT, payload: response.data})
        } catch (error) {
            console.log(error, "por favor contactar a soporte por este error");
        }
    }
}

export const updateAnswerComment = (id, updatedAnswerComment) => {
    return async function (dispatch) {
        try {
            const config = configureHeaders()
            const response = await axios.put(`http://localhost:19789/answers/comments/${id}`, updatedAnswerComment, config)
            dispatch({type: UPDATE_ANSWER_COMMENT, payload: response.data})
        } catch (error) {
            console.log(error, "por favor contactar a soporte por este error");
        }
    }
}

export const getAnswerComment = () => {
    return async function (dispatch) {
        try {
            const config = configureHeaders()
            const response = await axios.get("http://localhost:19789/answers/comments", config)
            dispatch({type: GET_ANSWER_COMMENT, payload: response.data})
        } catch (error) {
            console.log(error, "por favor contactar a soporte por este error");
        }
    }
}