
import { types } from "./types";

const token = localStorage.getItem('token');    

const initialState = {
    user:{},
    userProfile: {},
    token:token,
    isAuthenticated: !!token,
    isAdmin : false,
    loading: true,
    errorRegister: null,
    errorLogin: null,
}


const authReducer = (state = initialState, action) => {
    switch(action.type){
        case types.REGISTER:
          
            return {
                ...state,
                user: action.payload,
            }
        case types.LOGIN:
          localStorage.setItem('token', JSON.stringify(action.payload.jwt));
            return {
                ...state,
                token: action.payload.jwt,
                isAuthenticated: true,
                // isAdmin: action.payload.user.isAdmin,
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
        case types.LOGIN_WITH_GOOGLE:
            localStorage.setItem('token', JSON.stringify(action.payload.jwt));
            return {
                ...state,
                token: action.payload.jwt,
                isAuthenticated: true,
                loading: false,
            }
        case types.GET_PROFILE:
            return {
                ...state,
                userProfile: action.payload,
                loading: false,
            } 
        case types.ERROR_REGISTER:
                return {
                    ...state,
                    errorRegister: action.payload,
                } 
             
        case types.ERROR_LOGIN:
                return {
                    ...state,
                    errorLogin: action.payload,
                }
         default : {
                return {...state};
         }

    }
};

export default authReducer;