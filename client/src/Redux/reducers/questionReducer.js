import {
CREATE_QUESTION,
DELETE_QUESTION,
GET_QUESTIONS,
GET_QUESTION_DETAIL,
CLEAR_QUESTION_DETAIL,
UPDATE_QUESTION,
} from "../action-types";

const initialState = {
    questions: [],
    allQuestions: [],
    questionDetail: [],
};

const questionReducer = (state = initialState, action) => {

    switch(action.type) {
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
            };    
        
        case GET_QUESTION_DETAIL:
            return {
                ...state, questionDetail: action.payload,
            };
            
        case CLEAR_QUESTION_DETAIL:
            return {
                ...state,
                questionDetail: [],
            };

        case UPDATE_QUESTION:
            const updatedQuestion = action.payload;
            const updatedQuestions = state.questions.map(question =>
                question.id === updatedQuestion.id ? updatedQuestion : question
                );
                return {
                    ...state,
                    questions: updatedQuestions,
                }    
            
            default:
                return {...state};

    }
};

export default questionReducer;