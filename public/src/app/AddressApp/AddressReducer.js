import _ from 'lodash';

import * as addressActionType from './AddressActionType';
import { removeOutArrayById } from '../../ultility';

const INITIAL_STATE = {
    addressesList: {addresses: [], error:null, loading: false},
    newAddress:{address:null, error: null, loading: false},
    activeAddress:{address:null, error:null, loading: false}
};

export default (state = INITIAL_STATE, action) => {
    let error;
    switch (action.type) {
        // for fetch addresses
        case addressActionType.FETCH_ADDRESSES:{
            return {...state, addressesList: {
                    addresses: [],
                    error:null,
                    loading: true
                }
            };
        }
        case addressActionType.FETCH_ADDRESSES_SUCCESS:{
            return {...state, addressesList: {
                    addresses: action.payload,
                    error: null,
                    loading: false
                }
            };
        }
        case addressActionType.FETCH_ADDRESSES_FAILURE:{
            error = action.payload;
            return {...state, addressesList: {
                    addresses: [],
                    error: error,
                    loading: false
                }
            };
        }
        // for fetch a address
        case addressActionType.FETCH_ADDRESS:{
            return {...state, activeAddress: {
                    address:null,
                    error: null,
                    loading: true
                }
            };
        }
        case addressActionType.FETCH_ADDRESS_SUCCESS:{
            return {...state, activeAddress: {
                    address: action.payload,
                    error: null,
                    loading: false
                }
            };
        }
        case addressActionType.FETCH_ADDRESS_FAILURE:{
            error = action.payload;
            return {...state, activeAddress: {
                    address:null,
                    error: error,
                    loading: false
                }
            };
        }
        // for delete address
        case addressActionType.DELETE_ADDRESS:{
            let addressList = _.cloneDeep(state.addressesList.addresses);
            return {...state, addressesList: {
                addresses:addressList,
                error: null,
                loading: true
            }
            };
        }
        case addressActionType.DELETE_ADDRESS_SUCCESS:{
            let idAddress = action.payload;
            return {...state, addressesList: {
                addresses: removeOutArrayById(idAddress, state.addressesList.addresses),
                error: null,
                loading: false
            }
            };
        }
        case addressActionType.DELETE_ADDRESS_FAILURE:{
            error = action.payload;
            return {...state, addressesList: {
                addresses:null,
                error: error,
                loading: false
            }
            };
        }
        // for add a address
        case addressActionType.CREATE_ADDRESS:{
            return {...state, newAddress: {
                address:null,
                error: null,
                loading: true
            }
            };
        }
        case addressActionType.RESET_NEW_ADDRESS:{
            return {...state, newAddress: {
                address:null,
                error: null,
                loading: false
            }
            };
        }
        default:
            return state;
    }
}