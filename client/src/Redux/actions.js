import {
    CREATE_POST,
    DELETE_POST,
    GET_POSTS,
    GET_POST_DETAIL,
    UPDATE_POST,
    SEARCH_POST,
    FILTER,
    CLEAR_SEARCH,
    CLEAR_POST_DETAIL,
    CLEAR_QUESTION_DETAIL,
    CLEAR_USER_DETAIL,
    CREATE_QUESTION,
    DELETE_QUESTION,
    GET_QUESTIONS,
    GET_QUESTION_DETAIL,
    CREATE_USER,
    DELETE_USER,
    GET_USERS,
    GET_USER_DETAIL,
    UPDATE_USER,
    UPDATE_QUESTION
} from "./action-types"

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

export const combinedFilter = (filterType, value) => {
    return {type: FILTER, payload: {filterType, value}}
}

export const clearSearch = () => {
    return {type: CLEAR_SEARCH}
}

export const clearPostDetail = () => {
    return {type: CLEAR_POST_DETAIL}
}

export const clearQuestionDetail = () => {
    return {type: CLEAR_QUESTION_DETAIL}
}

export const clearUserDetail = () => {
    return {type: CLEAR_USER_DETAIL}
}

export const createQuestion = (question) => {
    return async function (dispatch) {
        try {
            const response = await axios.post("http://localhost:19789/questions", question);
            dispatch({type: CREATE_QUESTION, payload: response.data});
        } catch (error) {
            throw new Error(error.response + "por favor contactar a soporte por este error");
        }
    }
}

export const deleteQuestion = (id) => {
    return async function (dispatch) {
        try {
            const response = await axios.delete(`http://localhost:19789/questions/${id}`);
            dispatch({type: DELETE_QUESTION, payload: response.data});
        } catch (error) {
            throw new Error(error.response + "por favor contactar a soporte por este error");
        }
    }
}

export const getQuestions = () => {
    return async function (dispatch) {
        try {
            const response = await axios.get("http://localhost:19789/questions");
            dispatch({type: GET_QUESTIONS, payload: response.data})
        } catch (error) {
            throw new Error(error.response + "por favor contactar a soporte por este error");
        }
    }
}

export const getQuestionDetail = (id) => {
    return async function (dispatch) {
        try {
            const response = await axios.get(`http://localhost:19789/questions/${id}`);
            dispatch({type: GET_QUESTION_DETAIL, payload: response.data})
        } catch (error) {
            throw new Error(error.response + "por favor contactar a soporte por este error");
        }
    }
}

export const updateQuestion = (id, updatedQuestionData) => {
    return async function (dispatch) {
        try {
            const response = await axios.put(`http://localhost:19789/questions/${id}`)
            dispatch({type: UPDATE_QUESTION, payload: response.data});
        } catch (error) {
            throw new Error(error.response + "por favor contactar a soporte por este error");
        }
    }
}

export const createUser = (user) => {
    return async function (dispatch) {
        try {
            const response = await axios.post("http://localhost:19789/users", user);
            dispatch({type: CREATE_USER, payload: response});
        } catch (error) {   
            throw new Error(error.response + "por favor contactar a soporte por este error");
        }
    }
}

export const deleteUser = (id) => {
    return async function (dispatch) {
        try {
            const response = await axios.delete(`http://localhost:19789/users/${id}`);
            dispatch({type: DELETE_USER, payload: response.data});
        } catch (error) {
            throw new Error(error.response + "por favor contactar a soporte por este error");
        }
    }
}

export const getUsers = () => {
    return async function (dispatch) {
        try {
            const response = await axios.get("http://localhost:19789/users");
            dispatch({type: GET_USERS, payload: response.data});
        } catch (error) {
            throw new Error(error.response + "por favor contactar a soporte por este error");
        }
    }
}

export const getUserDetail = (id) => {
    return async function (dispatch) {
        try {
            const response = await axios.get(`http://localhost:19789/users/${id}`);
            dispatch({type: GET_USER_DETAIL, payload: response.data});
        } catch (error) {
            throw new Error(error.response + "por favor contactar a soporte por este error");
        }
    }
}

export const updateUser = (id, updatedUserData) => {
    return async function (dispatch) {
        try {
            const response = await axios.put(`http://localhost:19789/users/${id}`);
            dispatch({type: UPDATE_USER, payload: response.data})
        } catch (error) {
            throw new Error(error.response + "por favor contactar a soporte por este error");
        }
    }
}