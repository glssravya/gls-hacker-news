import { combineReducers } from "redux";
import HackerNews from "./hackerNews";

const rootReducer = combineReducers({
  hackerNews: HackerNews
});

export default rootReducer;
