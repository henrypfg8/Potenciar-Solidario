import {
  CREATE_POST,
  DELETE_POST,
  GET_POSTS,
  GET_POST_DETAIL,
  UPDATE_POST,
  SEARCH_POSTS,
  CLEAR_POST_DETAIL,
  //   GET_POSTS_BY_DATE,
  //   GET_POSTS_BY_CATEGORIES,
  //   GET_POSTS_BY_ONGS,
  GET_POSTS_FILTERED,
  SET_POSTS_FILTERS,
} from "../action-types";

import axios from "axios";
import unorm from 'unorm';

export const createPost = (post) => {
  return async function (dispatch) {
    try {
      const response = await axios.post("http://localhost:19789/posts", post);
      console.log(response + "soy el response");
      dispatch({ type: CREATE_POST, payload: response.data });
    } catch (error) {
      console.log(error, "por favor contactar a soporte por este error");
    }
  };
};

export const deletePost = (id) => {
  return async function (dispatch) {
    try {
      const response = await axios.delete(`http://localhost:19789/posts/${id}`);
      dispatch({ type: DELETE_POST, payload: response.data });
    } catch (error) {
      console.log(error, "por favor contactar a soporte por este error");
    }
  };
};

export const getPosts = () => {
  return async function (dispatch) {
    try {
      const response = await axios.get("http://localhost:19789/posts");
      dispatch({ type: GET_POSTS, payload: response.data });
    } catch (error) {
      console.log(error, "por favor contactar a soporte por este error");
    }
  };
};

export const getPostDetail = (id) => {
  return async function (dispatch) {
    try {
      const response = await axios.get(`http://localhost:19789/posts/${id}`);
      dispatch({ type: GET_POST_DETAIL, payload: response.data });
    } catch (error) {
      console.log(error, "por favor contactar a soporte por este error");
    }
  };
};

export const updatePost = (id, updatePostData) => {
  return async function (dispatch) {
    try {
      const response = await axios.put(`http://localhost:19789/posts/${id}`, updatePostData);
      dispatch({ type: UPDATE_POST, payload: response.data });
    } catch (error) {
      console.log(error, "por favor contactar a soporte por este error");
    }
  };
};

export const searchPosts = (posts, searchValue) => {
  //
  const searchPublications = (string, subString) => {
    const normalizedString = unorm.nfkd(string).replace(/[\u0300-\u036F]/g, "");
    const normalizedSubString = unorm.nfkd(subString).replace(/[\u0300-\u036F]/g, "");

    const regExp = new RegExp(normalizedSubString, "i");
    const coincidence = normalizedString.match(regExp);

    if (coincidence) return true;
    else return false;
  };
  //

  const searchedPosts = posts.filter(({ title, description, category }) => {
    if (
      searchPublications(title, searchValue) ||
      searchPublications(description, searchValue) ||
      searchPublications(category, searchValue)
    ) return true;

    else return false;
  });

  return {
    type: SEARCH_POSTS,
    payload: searchedPosts,
  };
};

// export const getPostsByDate = (initialDate, finalDate) => {
//   return async function (dispatch) {
//     try {
//       const response = await axios.get(
//         "http://localhost:19789/filterByDate",
//         initialDate,
//         finalDate
//       );
//       dispatch({ type: GET_POSTS_BY_DATE, payload: response.data });
//     } catch (error) {
//       console.log(error, "por favor contactar a soporte por este error");
//     }
//   };
// };

// export const getPostsByCategories = (query) => {
//   return async function (dispatch) {
//     try {
//       const response = await axios.get(
//         `http://localhost:19789/categories/filter?category=${query}`
//       );
//       dispatch({ type: GET_POSTS_BY_CATEGORIES, payload: response.data });
//     } catch (error) {
//       console.log(error, "por favor contactar a soporte por este error");
//     }
//   };
// };

// export const getPostsByOngs = (query) => {
//   return async function (dispatch) {
//     try {
//       const response = await axios.get(
//         `http://localhost:19789/ongs/filter?ongs=${query}`
//       );
//       dispatch({ type: GET_POSTS_BY_ONGS, payload: response.data });
//     } catch (error) {
//       console.log(error, "por favor contactar a soporte por este error");
//     }
//   };
// };

export const clearPostDetail = () => {
  return { type: CLEAR_POST_DETAIL };
};

export const getPostsFiltered = (filters) => {
  const { category, ong, fromDate, untilDate } = filters;
  return async function (dispatch) {
    try {
      const { data } = await axios.get(
        `http://localhost:19789/filters?category=${category}&ong=${ong}&fromDate=${fromDate}&untilDate=${untilDate}`
      );
      dispatch({
        type: GET_POSTS_FILTERED,
        payload: data,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export const setPostsFilters = (postsFilters) => {
  return {
    type: SET_POSTS_FILTERS,
    payload: postsFilters,
  };
};
