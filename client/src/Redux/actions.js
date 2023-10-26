/* eslint-disable no-unreachable */
import { CREATE_POST } from "./action-types";


export const createPost = (post) => {
    
    try {
        return dispatch => {

            dispatch({
                type: CREATE_POST,
                payload: post,
            });
        }
    } catch (error) {
        console.log(error);
    }
}


