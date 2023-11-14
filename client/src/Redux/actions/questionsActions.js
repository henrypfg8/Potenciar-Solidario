import {
CREATE_QUESTION,
DELETE_QUESTION,
GET_QUESTIONS,
GET_QUESTION_DETAIL,
CLEAR_QUESTION_DETAIL,
UPDATE_QUESTION,
GET_QUESTIONS_FILTERED,
SET_QUESTIONS_FILTERS
} from "../action types/questionsActionTypes.js";

import axios from "axios";
import { configureHeaders } from "../auth/configureHeaders .js";

export const createQuestion = (question) => {
  return async function (dispatch) {
    try {
      const config = configureHeaders();
      const response = await axios.post(
        "http://localhost:19789/questions",
        question,
        config
      );
      dispatch({ type: CREATE_QUESTION, payload: response.data });
      return Promise.resolve(response);
    } catch (error) {
      console.log(error, "por favor contactar a soporte por este error");
      return Promise.reject(error);
    }
  };
};

export const deleteQuestion = (id) => {
  return async function (dispatch) {
    try {
      const config = configureHeaders();
      const response = await axios.delete(
        `http://localhost:19789/questions/${id}`,
        config
      );
      dispatch({ type: DELETE_QUESTION, payload: response.data });
      return Promise.resolve(response)
    } catch (error) {
      console.log(error, "por favor contactar a soporte por este error");
      return Promise.reject(error.message)
    }
  };
};

export const getQuestions = () => {
  return async function (dispatch) {
    try {
      const config = configureHeaders();
      const response = await axios.get(
        "http://localhost:19789/questions",
        config
      );
      dispatch({ type: GET_QUESTIONS, payload: response.data });
    } catch (error) {
      console.log(error, "por favor contactar a soporte por este error");
    }
  };
};

export const getQuestionDetail = (id) => {
  return async function (dispatch) {
    try {
      const config = configureHeaders();
      const response = await axios.get(
        `http://localhost:19789/questions/${id}`,
        config
      );
      dispatch({ type: GET_QUESTION_DETAIL, payload: response.data });
      return Promise.resolve(response);
    } catch (error) {
      console.log(error, "por favor contactar a soporte por este error");
      return Promise.reject(error);
    }
  };
};

export const clearQuestionDetail = () => {
  return { type: CLEAR_QUESTION_DETAIL };
};

export const updateQuestion = (id, updatedQuestionData) => {
  return async function (dispatch) {
    try {
      const config = configureHeaders();
      const response = await axios.put(
        `http://localhost:19789/questions/${id}`,
        updatedQuestionData,
        config
      );
      dispatch({ type: UPDATE_QUESTION, payload: response.data });
      return Promise.resolve(response)
    } catch (error) {
      console.log(error, "por favor contactar a soporte por este error");
      return Promise.reject(error)
    }
  };
};

export const getQuestionsFiltered = (filters) => {
  const { category, fromDate, untilDate } = filters;
  return async function (dispatch) {
    try {
      const config = configureHeaders();
      const { data } = await axios.get(
        `http://localhost:19789/questions?category=${category}&fromDate=${fromDate}&untilDate=${untilDate}`,
        config
      );
      dispatch({ type: GET_QUESTIONS_FILTERED, payload: data });
    } catch (error) {
      console.log(error, "por favor contactar a soporte por este error");
    }
  };
};

export const setQuestionsFilters = (filters) => {
  return {
    type: SET_QUESTIONS_FILTERS,
    payload: filters,
  };
};
