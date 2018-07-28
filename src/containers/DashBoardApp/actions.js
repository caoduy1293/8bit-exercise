export const GET_ITEMS = 'BookingApp/GET_ITEMS';

export function getItems(payload) {
    return {
        type: GET_ITEMS,
        payload
    };
}

export const GET_NASA_DATA = 'BookingApp/GET_NASA_DATA';
export const GET_NASA_DATA_DONE = 'BookingApp/GET_NASA_DATA_DONE';
export function getNASAData(count) {
    return {
        type: GET_NASA_DATA,
        count
    };
}
export function getNASADataDone(payload) {
    return {
        type: GET_NASA_DATA_DONE,
        payload
    };
}


export const EDIT_ITEM = 'BookingApp/EDIT_ITEM';
export const EDIT_ITEM_SUCCESS = 'BookingApp/EDIT_ITEM_SUCCESS';
export const EDIT_ITEM_ERROR = 'BookingApp/EDIT_ITEM_ERROR';
export function editItem(userId, userInput) {
    return {
        type: EDIT_ITEM,
        userId,
        userInput
    };
}
export function editItemSuccess(res) {
    return {
        type: EDIT_ITEM_SUCCESS,
        res
    };
}
export function editItemError(res) {
    return {
        type: EDIT_ITEM_ERROR,
        res
    };
}
export const ADD_ITEM = 'BookingApp/ADD_ITEM';
export const ADD_ITEM_SUCCESS = 'BookingApp/ADD_ITEM_SUCCESS';
export const ADD_ITEM_ERROR = 'BookingApp/ADD_ITEM_ERROR';
export function addItem(userInput) {
    return {
        type: ADD_ITEM,
        userInput
    };
}
export function addItemSuccess(res) {
    return {
        type: ADD_ITEM_SUCCESS,
        res
    };
}
export function addItemError(res) {
    return {
        type: ADD_ITEM_ERROR,
        res
    };
}

export const DELETE_ITEM = 'BookingApp/DELETE_ITEM';
export const DELETE_ITEM_DONE = 'BookingApp/DELETE_ITEM_DONE';
export function deleteItem(userId) {
    return {
        type: DELETE_ITEM,
        userId
    };
}
export function deleteItemDone(res) {
    return {
        type: DELETE_ITEM_DONE,
        res
    };
}
