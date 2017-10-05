/**
 * Created by caoquang on 06/10/2017.
 */
import React, {Component} from 'react';
import { connect } from 'react-redux';

import * as addressAction from '../AddressAction';
import AddressListComponent from './AddressListComponent';

const mapDispatchToProps = (dispatch) => {
    return {
        fetchAddress: () => {
            dispatch(addressAction.fetchAddress()).payload.on('value', (snapshot) => {
                dispatch(addressAction.fetchAdressSuccess(snapshot.val()));
            })
        }
    };
};
const mapStateToProps = (state) => {
    return {
        addressList: state.address
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(AddressListComponent);