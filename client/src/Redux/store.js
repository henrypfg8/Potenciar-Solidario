import { applyMiddleware, createStore, combineReducers } from "redux";
import userReducer from "./reducers/userReducer";
import postReducer from "./reducers/postReducer";
import questionReducer from "./reducers/questionReducer";
import authReducer from "./auth/AuthReducer";
import thunk from "redux-thunk";

// Combina los reducers
const rootReducer = combineReducers({
  users: userReducer,
  posts: postReducer,
  questions: questionReducer,
  auth: authReducer,
});

// Aplica el middleware usando applyMiddleware
const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;