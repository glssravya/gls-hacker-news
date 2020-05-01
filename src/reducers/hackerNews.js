import {FETCH_HACKER_NEWS} from '../actions/index';
const initialState = {
    
}
export default function(state = {},action){
    switch(action.type){
        case FETCH_HACKER_NEWS:

            return {...state,
                ...action.payload.data};
    }
    return state;
}