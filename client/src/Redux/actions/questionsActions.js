import {
CREATE_QUESTION,
DELETE_QUESTION,
GET_QUESTIONS,
GET_QUESTION_DETAIL,
CLEAR_QUESTION_DETAIL,
UPDATE_QUESTION,
GET_QUESTIONS_FILTERED,
SET_QUESTIONS_FILTERS,
SET_QUESTIONS_ORDERINGS,
SET_SELECTED_FILTER_OPTION,
SET_SELECTED_ORDERING_OPTION
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
  let category = filters.category;
  let fromDate = filters.fromDate;
  let untilDate = filters.untilDate;

  if (fromDate !== '') fromDate = new Date(fromDate).toISOString();
  if (untilDate !== '') untilDate = new Date(untilDate).toISOString();
  
  // let category = filters.category;
  // let fromDate = new Date(filters.fromDate)
  // let untilDate = new Date(filters.untilDate)

  return async function (dispatch) {
    try {
      const config = configureHeaders();
      const { data } = await axios.get(
        `http://localhost:19789/questionFilters?category=${category}&fromDate=${fromDate}&untilDate=${untilDate}`,
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

export const setQuestionsOrderings = (orderBy) => {
  return {
    type: SET_QUESTIONS_ORDERINGS,
    payload: orderBy
  }
}

export const setSelectedFilterOption = (selectedFilterOption) => {
  return {
    type: SET_SELECTED_FILTER_OPTION,
    payload: selectedFilterOption
  }
}

export const setSelectedOrderingOption = (selectedOrderingOption) => {
  return {
    type: SET_SELECTED_ORDERING_OPTION,
    payload: selectedOrderingOption
  }
}
