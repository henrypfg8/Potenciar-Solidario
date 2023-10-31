import { applyMiddleware, createStore, combineReducers } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import userReducer from "./reducers/userReducer";
import postReducer from "./reducers/postReducer";
import questionReducer from "./reducers/questionReducer";
import thunk from "redux-thunk";

// Combina los reducers
const rootReducer = combineReducers({
  users: userReducer,
  posts: postReducer,
  questions: questionReducer,
});

// Aplica el middleware usando composeWithDevTools
const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);

export default store;