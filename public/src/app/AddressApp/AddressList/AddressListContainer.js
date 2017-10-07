/**
 * Created by caoquang on 06/10/2017.
 */
import React, {Component} from 'react';
import { connect } from 'react-redux';

import * as addressAction from '../AddressAction';
import AddressListComponent from './AddressListComponent';

const mapDispatchToProps = (dispatch) => {
    return {
        fetchAddresses: () => {
            dispatch(addressAction.fetchAddresses()).payload.on('value', (snapshot) => {
                dispatch(addressAction.fetchAddressesSuccess(snapshot.val()));
            })
        }
    };
};
const mapStateToProps = (state) => {
    return {
        addressList: state.address.addressesList
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(AddressListComponent);