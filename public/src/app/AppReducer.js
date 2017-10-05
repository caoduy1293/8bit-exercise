import {combineReducers} from 'redux';
import {reducer as formReducer} from 'redux-form';

import addressReducer from './AddressApp/AddressReducer';

const rootReducer = combineReducers({
    address: addressReducer,
    form: formReducer
});

export default rootReducer;

