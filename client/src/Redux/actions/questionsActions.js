import {
CREATE_QUESTION,
DELETE_QUESTION,
GET_QUESTIONS,
GET_QUESTION_DETAIL,
CLEAR_QUESTION_DETAIL,
UPDATE_QUESTION,
GET_QUESTIONS_FILTERED,
} from "../action-types";

import axios from "axios";

export const createQuestion = (question) => {
    return async function (dispatch) {
        try {
            const response = await axios.post("http://localhost:19789/questions", question);
            dispatch({type: CREATE_QUESTION, payload: response.data});
        } catch (error) {
            console.log(error, "por favor contactar a soporte por este error")
        }
    }
}

export const deleteQuestion = (id) => {
    return async function (dispatch) {
        try {
            const response = await axios.delete(`http://localhost:19789/questions/${id}`);
            dispatch({type: DELETE_QUESTION, payload: response.data});
        } catch (error) {
            console.log(error, "por favor contactar a soporte por este error")
        }
    }
}

export const getQuestions = () => {
    return async function (dispatch) {
        try {
            const response = await axios.get("http://localhost:19789/questions");
            dispatch({type: GET_QUESTIONS, payload: response.data})
        } catch (error) {
            console.log(error, "por favor contactar a soporte por este error")
        }
    }
}

export const getQuestionDetail = (id) => {
    return async function (dispatch) {
        try {
            const response = await axios.get(`http://localhost:19789/questions/${id}`);
            dispatch({type: GET_QUESTION_DETAIL, payload: response.data})
        } catch (error) {
            console.log(error, "por favor contactar a soporte por este error")
        }
    }
}

export const clearQuestionDetail = () => {
    return {type: CLEAR_QUESTION_DETAIL}
}

export const updateQuestion = (id, updatedQuestionData) => {
    return async function (dispatch) {
        try {
            const response = await axios.put(`http://localhost:19789/questions/${id}`, updatedQuestionData)
            dispatch({type: UPDATE_QUESTION, payload: response.data});
        } catch (error) {
            console.log(error, "por favor contactar a soporte por este error")
        }
    }
}

export const getQuestionsFiltered = (filters) => {
    const { category, fromDate, untilDate } = filters;
    return async function (dispatch) {
        try {
            const {data} = await axios.get(`http://localhost:19789/questions?category=${category}&fromDate=${fromDate}&untilDate=${untilDate}`);
            dispatch({type: GET_QUESTIONS_FILTERED, payload: data})
        } catch (error) {
            console.log(error, "por favor contactar a soporte por este error");
        }
    }
}