import {
CREATE_POST,
DELETE_POST,
GET_POSTS,
GET_POST_DETAIL,
CLEAR_POST_DETAIL,
} from "../action-types";

const initialState = {
    posts: [],
    allPosts: [],
    postDetail: [],
};

const postReducer = (state = initialState, action) => {

    switch (action.type) {
        case CREATE_POST: 
            return {
                ...state,
                posts: [...state.posts, action.payload],
            };

        case DELETE_POST:
            return {
                ...state,
                posts: state.posts.filter(
                    (post) => post.id !== action.payload
                ),
            };

        case GET_POSTS:
            return {
                ...state,
                posts: action.payload,
                allPosts: action.payload,
            };
        
        case GET_POST_DETAIL:
            return {
                ...state,
                postDetail: action.payload,
            };

        case CLEAR_POST_DETAIL:
            return {
                ...state,
                postDetail: [],
            };     
            
            default:
                return {...state};  
    }
}

export default postReducer;



