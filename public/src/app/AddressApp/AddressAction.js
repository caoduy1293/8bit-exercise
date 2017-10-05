import * as addressActionType from './AddressActionType';
import { database } from '../../config/config';

export function fetchAddress() {
    return {
        type: addressActionType.FETCH_ADDRESS,
        payload: database
    };
}

export function fetchAdressSuccess( addressList ) {
    return {
        type: addressActionType.FETCH_ADDRESS_SUCCESS,
        payload: addressList
    };
}