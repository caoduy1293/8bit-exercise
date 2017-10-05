import * as addressActionType from './AddressActionType';
import * as addressAction from './AddressAction';

const INITIAL_STATE = {
    addresses: [],
    loading: false,
    error: null
};

export default (state = INITIAL_STATE, action) => {
    let error;
    switch (action.type) {
        case addressActionType.FETCH_ADDRESS:{
            return {...state, loading:true};
        }
        case addressActionType.FETCH_ADDRESS_SUCCESS:{
            return {...state, addresses:action.payload, loading:false};
        }
        case addressActionType.FETCH_ADDRESS_FAILURE:{
            error = action.payload;
            return {...state, error:error, loading:false};
        }
        default:
            return state;
    }
}