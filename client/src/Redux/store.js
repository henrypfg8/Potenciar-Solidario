import { applyMiddleware, createStore, combineReducers } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import questionReducer from "./reducers/questionReducer";
import postReducer from "./reducers/postReducer";
import searchAndFilterReducer from "./reducers/search&FilterReducer";
import thunk from "redux-thunk";

// Combina los reducers
const rootReducer = combineReducers({
  questions: questionReducer,
  posts: postReducer,
  search: searchAndFilterReducer,
});

// Crea la tienda con los reducers combinados
const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));

export default store;