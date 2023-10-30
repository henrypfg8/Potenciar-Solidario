import {
CREATE_POST,
DELETE_POST,
GET_POSTS,
GET_POST_DETAIL,
UPDATE_POST,
SEARCH_POST,
CLEAR_POST_DETAIL,
} from "../action-types"
    
    import axios from "axios";
    
    export const createPost = (post) => {
        return async function (dispatch) {
            try {
                console.log(post)
                const response = await axios.post("http://localhost:19789/posts", post);
                dispatch({type: CREATE_POST, payload: response.data})
            } catch (error) {
                console.log(error)
                throw new Error(error.response + "por favor contactar a soporte por este error");
            }
        }
    }
    
    export const deletePost = (id) => {
        return async function (dispatch) {
            try {
                const response = await axios.delete(`http://localhost:19789/posts/${id}`);
                dispatch({type:DELETE_POST, payload: response.data});
            } catch (error) {
                throw new Error(error.response + "por favor contactar a soporte por este error");
            }
        }
    }
    
    
    export const getPosts = () => {
        return async function (dispatch) {
            try {
                const response = await axios.get("http://localhost:19789/posts")
                dispatch({type: GET_POSTS, payload: response.data})
            } catch (error) {
                throw new Error(error.response + "por favor contactar a soporte por este error")
            }
        }
    }
    
    export const getPostDetail = (id) => {
        return async function (dispatch) {
            try {
                const response = await axios.get(`http://localhost:19789/posts/${id}`);
                dispatch({type: GET_POST_DETAIL, payload: response.data});
            } catch (error) {
                throw new Error(error.response + "por favor contactar a soporte por este error");
            }
        }
    }
    
    export const updatePost = (id, updatePostData) => {
        return async function (dispatch) {
            try {
                const response = await axios.put(`http://localhost:19789/posts/${id}`);
                dispatch({type: UPDATE_POST, payload: response.data});
            } catch (error) {
                throw new Error(error.response + "por favor contactar a soporte por este error");
            }
        }
    }
    
    export const searchPost = (query) => {
        return async function (dispatch) {
            try {
                const response = await axios.get(`http://localhost:19789/posts?name=${query}`);
                dispatch({type: SEARCH_POST, payload: response.data});
            } catch (error) {
                throw new Error(error.response + "por favor contactar a soporte por este error")
            }
        }
    }
    export const clearPostDetail = () => {
        return {type: CLEAR_POST_DETAIL}
    }