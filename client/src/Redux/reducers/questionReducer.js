/* eslint-disable no-case-declarations */

import { notification } from "antd";
import {
  CREATE_QUESTION,
  DELETE_QUESTION,
  GET_QUESTIONS,
  GET_QUESTION_DETAIL,
  CLEAR_QUESTION_DETAIL,
  UPDATE_QUESTION,
  GET_QUESTIONS_FILTERED,
  SET_QUESTIONS_FILTERS,
  SET_QUESTIONS_ORDERINGS
} from "../action types/questionsActionTypes.js";

const initialState = {
  questions: [],
  questionsFilters: {
    category: "",
    fromDate: "",
    untilDate: "",
  },
  questionsOrderings: {
    value: 'date',
    direction: 'asc'
  },
  allQuestions: [],
  questionDetail: null,
};

const questionReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_QUESTION:
      return {
        ...state,
        questions: [...state.questions, action.payload],
      };

    case DELETE_QUESTION:
      return {
        ...state,
        questions: state.questions.filter(
          (question) => question.id !== action.payload
        ),
      };

    case GET_QUESTIONS:
      return {
        ...state,
        questions: action.payload,
        allQuestions: action.payload,
      };

    case GET_QUESTION_DETAIL:
      if (state.questionDetail) {
        const answersActual = state.questionDetail?.Answers;

        const answersNuevo = action.payload?.Answers;

        const nuevasNotificaciones = answersNuevo?.filter(
          (el) => !answersActual?.some((el2) => el2.id == el.id)
        );

        nuevasNotificaciones?.forEach((nuevaNotif) =>
          notification.open({
            message: `Nueva respuesta de ${nuevaNotif?.User?.name}`,
            description: nuevaNotif?.answer,
            onClose: () => console.log("Notification was closed."),
          })
        );
      }

      return {
        ...state,
        questionDetail: action.payload,
      };

    case CLEAR_QUESTION_DETAIL:
      return {
        ...state,
        questionDetail: null,
      };

    case UPDATE_QUESTION:
      const updatedQuestion = action.payload;
      const updatedQuestions = state.questions.map((question) =>
        question.id === updatedQuestion.id ? updatedQuestion : question
      );
      return {
        ...state,
        questions: updatedQuestions,
      };

    case GET_QUESTIONS_FILTERED:
      return {
        ...state,
        questions: action.payload,
      };

    case SET_QUESTIONS_FILTERS:
      return {
        ...state,
        questionsFilters: action.payload,
      };

    default:
      return { ...state };
  }
};

export default questionReducer;
