import {
    CREATE_POST,
    DELETE_POST,
    GET_POSTS,
    GET_POST_DETAIL,
    SEARCH_POST,
    FILTER,
    CLEAR_SEARCH,
    CLEAR_DETAIL,
    CREATE_QUESTION,
    DELETE_QUESTION,
    GET_QUESTIONS,
} from "./action-types"

import axios from "axios";

export const createPost = (post) => {
    return async function (dispatch) {
        try {
            const response = await axios.post("/posts", post);
            dispatch({type: CREATE_POST, payload: response.data})
        } catch (error) {
            throw new Error(error.response + "por favor contactar a soporte por este error");
        }
    }
}

export const deletePost = (id) => {
    return async function (dispatch) {
        try {
            const response = await axios.delete(`/posts/${id}`);
            dispatch({type:DELETE_POST, payload: response.data});
        } catch (error) {
            throw new Error(error.response + "por favor contactar a soporte por este error");
        }
    }
}


export const getPosts = () => {
    return async function (dispatch) {
        try {
            const response = await axios.get("/posts")
            dispatch({type: GET_POSTS, payload: response.data})
        } catch (error) {
            throw new Error(error.response + "por favor contactar a soporte por este error")
        }
    }
}

export const getPostDetail = (id) => {
    return async function (dispatch) {
        try {
            const response = await axios.get(`/posts/${id}`);
            dispatch({type: GET_POST_DETAIL, payload: response.data});
        } catch (error) {
            throw new Error(error.response + "por favor contactar a soporte por este error")
        }
    }
}

export const searchPost = (query) => {
    return async function (dispatch) {
        try {
            const response = await axios.get(`/posts?name=${query}`);
            dispatch({type: SEARCH_POST, payload: response.data});
        } catch (error) {
            throw new Error(error.response + "por favor contactar a soporte por este error")
        }
    }
}
