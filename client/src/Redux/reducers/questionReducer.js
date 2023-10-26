import {
CREATE_QUESTION,
DELETE_QUESTION,
GET_QUESTIONS,
GET_QUESTION_DETAIL,
CLEAR_QUESTION_DETAIL,
} from "../action-types";

const initialState = {
    questions: [],
    allQuestions: [],
    questionDetail: [],
};

// const questionReducer = (state = initialState, action) => {

//     switch(action.type) {
//         case CREATE_QUESTION:
//             return {
//                 ...state,
//                 questions:
//             }




//     }
// }