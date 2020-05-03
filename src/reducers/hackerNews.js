import { FETCH_HACKER_NEWS,FETCH_NEWS_BY_PAGE } from "../actions/index";

export default function(state = {}, action) {
  switch (action.type) {
    case FETCH_HACKER_NEWS:
      return { ...state, ...action.payload.data };
    case FETCH_NEWS_BY_PAGE:
      return {...state, ...action.payload.data };
    default: return {
      ...state
    }
  }
}
