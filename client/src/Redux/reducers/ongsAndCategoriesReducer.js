import {
GET_CATEGORIES,
GET_ONGS
} from "../action-types";

const initialState = {
    categories: [],
    ongs: [],
};

const ongsAndCategoriesReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_CATEGORIES:
            return {
                ...state,
                categories: action.payload,
            };

        case GET_ONGS:
            return {
                ...state,
                ongs: action.payload,
            };    
        default:
            return {...state};    
    }
};

export default ongsAndCategoriesReducer;