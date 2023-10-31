import { types } from "./types";

const initialState = {
    user: {},
    token: localStorage.getItem('token'),
    isAuthenticated: false,
    isAdmin : false,
    loading: true,
    error: null
}

const authReducer = (state = initialState, action) => {
    switch(action.type){
        case types.REGISTER:
           
            return {
                ...state,
                user: action.payload,
            }
        case types.LOGIN:
            localStorage.setItem('token', action.payload.token);
            return {
                ...state,
                ...action.payload,
                isAuthenticated: true,
                isAdmin: action.payload.user.isAdmin,
                loading: false,
            }
        case types.LOGOUT:
            localStorage.removeItem('token');
            return {
                ...state,
                user: null,
                token: null,
                isAuthenticated: false,
                isAdmin: false,
                loading: false,
            } 
        case types.ERROR_REGISTER:
            return {
                ...state,
                error: action.payload,
            }    
         default : {
                return {...state};
         }         
    }
};

export default authReducer;