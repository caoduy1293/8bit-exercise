import * as addressActionType from './AddressActionType';
import { database } from '../../config/config';
import * as utility from '../../ultility';

export function fetchAddresses() {
    return {
        type: addressActionType.FETCH_ADDRESSES,
        payload: database.ref('addressList/')
    };
}

export function fetchAddressesSuccess( addressList ) {
    let addressArray = utility.convertObjToArray(addressList);
    return {
        type: addressActionType.FETCH_ADDRESSES_SUCCESS,
        payload: addressArray
    };
}

export function fetchAddress(id) {
    return {
        type: addressActionType.FETCH_ADDRESS,
        payload: database.ref('addressList/' + id)
    };
}

export function fetchAddressSuccess(address) {
    return {
        type: addressActionType.FETCH_ADDRESS_SUCCESS,
        payload: address
    };
}

export function deleteAddress() {
    return {
        type: addressActionType.DELETE_ADDRESS,
        payload: database.ref('addressList/')
    };
}

export function deleteAddressSuccess(idAddress) {
    return {
        type: addressActionType.DELETE_ADDRESS_SUCCESS,
        payload: idAddress
    };
}