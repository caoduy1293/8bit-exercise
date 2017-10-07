import * as addressActionType from './AddressActionType';
import * as addressAction from './AddressAction';

const INITIAL_STATE = {
    addressesList: {addresses: [], error:null, loading: false},
    newAddress:{address:null, error: null, loading: false},
    activeAddress:{address:null, error:null, loading: false},
    deletedAddress: {address: null, error:null, loading: false}
};

export default (state = INITIAL_STATE, action) => {
    let error;
    switch (action.type) {
        // for addresses
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
        // for address
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
        default:
            return state;
    }
}