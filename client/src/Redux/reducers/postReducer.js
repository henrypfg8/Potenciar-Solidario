import { CREATE_POST } from "../action-types";


const ininiaState = {
    posts: [],
    post : {
        
    }

};


export const postReducer = (state = ininiaState, action) => {

    switch (action.type) {
        case CREATE_POST:
            return {
                ...state,
                posts: [...state.posts, action.payload],
            };

        default:
            return state;
    }
};

