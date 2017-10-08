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
            dispatch(addressAction.fetchAddresses()).payload.once('value').then((snapshot) => {
                dispatch(addressAction.fetchAddressesSuccess(snapshot.val()));
            });
        },
        deleteAddress: (idAddress)=>{
            dispatch(addressAction.deleteAddress()).payload.child(idAddress).remove().then(()=>{
                dispatch(addressAction.deleteAddressSuccess(idAddress));
            });
        }
    };
};
const mapStateToProps = (state) => {
    return {
        addressList: state.address.addressesList
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(AddressListComponent);