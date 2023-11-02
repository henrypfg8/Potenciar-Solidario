import {
  CREATE_POST,
  DELETE_POST,
  GET_POSTS,
  GET_POST_DETAIL,
  CLEAR_POST_DETAIL,
  UPDATE_POST,
  UPDATE_POST_LIKES,
  GET_POSTS_BY_CATEGORIES,
  GET_POSTS_BY_ONGS,
  SEARCH_POSTS,
  GET_POSTS_FILTERED,
  SET_POSTS_FILTERS
} from "../action-types";

const initialState = {
  posts: [],
  postsFilters: {
    category: '',
    ong: '',
    fromDate: '',
    untilDate: ''
  },
  // allPosts: [],
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
        posts: state.posts.filter((post) => post.id !== action.payload),
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

    case UPDATE_POST:
      const updatedPost = action.payload;
      const updatedPosts = state.posts.map((post) =>
        post.id === updatedPost.id ? updatedPost : post
      );
      return {
        ...state,
        posts: updatedPosts,
      };

    case GET_POSTS_BY_CATEGORIES:
      return {
        ...state,
        postsByCategories: action.payload,
      };

    case GET_POSTS_BY_ONGS:
      return {
        ...state,
        postsByOngs: action.payload,
      };
    case SEARCH_POSTS:
      return {
        ...state,
        posts: action.payload
      }

    case GET_POSTS_FILTERED:
      return {
        ...state,
        posts: action.payload
      }

    case SET_POSTS_FILTERS:
      return {
        ...state,
        postsFilters: action.payload
      }

    case UPDATE_POST_LIKES:

    default:
      return { ...state };
  }
};

export default postReducer;