import * as addressActionType from './AddressActionType';
import { database } from '../../config/config';
import {convertObjToArray} from '../../utils';

//FETCH LIST ADDRESS
export function fetchAddresses() {
    return {
        type: addressActionType.FETCH_ADDRESSES,
        payload: database.ref('addressList/')
    };
}

export function fetchAddressesSuccess( addressList ) {
    let addressArray = convertObjToArray(addressList);
    return {
        type: addressActionType.FETCH_ADDRESSES_SUCCESS,
        payload: addressArray
    };
}
//FETCH A ADDRESS
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
//DELETE A ADDRESS
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
//CREATE NEW ADDRESS
export function createAddress() {

    return {
        type: addressActionType.CREATE_ADDRESS,
        payload: database.ref('addressList/')
    };
}

export function createAddressSuccess() {
    return {
        type: addressActionType.CREATE_ADDRESS_SUCCESS
    };
}

export function resetNewAddress() {
    return {
        type: addressActionType.RESET_NEW_ADDRESS
    }
}

//CREATE NEW ADDRESS
export function upAddress(id) {

    return {
        type: addressActionType.UPDATE_ADDRESS,
        payload: database.ref('addressList/').child(id)

    };
}

export function upAddressSuccess() {
    return {
        type: addressActionType.UPDATE_ADDRESS_SUCCESS
    };
}

export function resetUpAddress() {
    return {
        type: addressActionType.RESET_UPDATE_ADDRESS
    }
}