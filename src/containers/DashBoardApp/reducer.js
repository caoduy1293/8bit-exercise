
import {GET_ITEMS, GET_NASA_DATA, GET_NASA_DATA_DONE} from "./actions";

export const APP_STATE_NAME = {
    items: 'items',
    nasaData: 'nasaData',
    loadingNasa: 'loadingNasa',
};
// The initial state of the App
const initialState = {
    items: null,
    nasaData: null,
    loadingNasa: false,
};

function reducer(state = initialState, action) {
    switch (action.type) {
        // get all users
        case GET_ITEMS:
            return {
                ...state,
                items: action.payload,
            };
        // get nasa data
        case GET_NASA_DATA:
            return {
                ...state,
                loadingNasa: true,
            };
        case GET_NASA_DATA_DONE:
            return {
                ...state,
                loadingNasa: false,
                nasaData: action.payload,
            };
        default:
            return state;
    }
}

export default reducer;