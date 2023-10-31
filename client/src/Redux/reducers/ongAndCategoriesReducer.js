import {
GET_POSTS_BY_CATEGORIES,
GET_POSTS_BY_ONGS
} from "../action-types"

const initialState = {
    postsByCategories: [],
    postsByOngs: [],
};

const ongAndCategoryReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_POSTS_BY_CATEGORIES:
            return {
                ...state,
                postsByCategories: action.payload,
            };

        case GET_POSTS_BY_ONGS:
            return {
                ...state,
                postsByOngs:action.payload,
            };    
    }
}

export default ongAndCategoryReducer;