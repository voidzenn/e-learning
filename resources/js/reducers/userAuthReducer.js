import { SIGN_IN, SIGN_UP } from "../actions/types";

export default (state = [], action) => {
    switch (action.type) {
        case SIGN_IN: 
            return action.payload;
        case SIGN_UP:
            return action.payload;
        default: 
            return state;
    }
}