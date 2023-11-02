import {
GET_ANSWERS,
CREATE_ANSWER,
UPDATE_ANSWER,
DELETE_ANSWER,
} from "../action-types";

const initialState = {
    answers: [],
    allAnswers: [],
}

const answerReducer = (state = initialState, action) => {

    switch(action.type) {
        case GET_ANSWERS:
            return {
                ...state,
                answers: action.payload,
                allAnswers: action.payload,
            };
        
        case CREATE_ANSWER:
            return {
                ...state,
                answers: [...state.answers, action.payload],
            };

        case UPDATE_ANSWER:
            const updatedAnswer = action.payload;
            const updatedAnswers = state.answers.map(answer =>
                answer.id === updatedAnswer.id ? updatedAnswer : answer
                );
                return {
                    ...state,
                    answers: updatedAnswers,
                } 
                
        case DELETE_ANSWER:
            return {
                ...state,
                answers: state.answers.filter(
                    (answer) => answer.id !== action.payload
                ),
            };
            
        default:
            return {...state};

    }
}

export default answerReducer;
