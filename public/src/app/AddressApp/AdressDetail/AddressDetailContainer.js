/**
 * Created by caoquang on 06/10/2017.
 */
import React, {Component} from 'react';
import { connect } from 'react-redux';

import AddressDetailComponent from './AddressDetailComponent';
import * as addressAction from '../AddressAction';

const mapStateToProps = (state, ownProps) => {
    return {
        activeAddress: state.address.activeAddress,
        addressId: ownProps.id
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchAddress: (id) => {
            dispatch(addressAction.fetchAddress(id)).payload.once('value').then((snapshot) => {
                dispatch(addressAction.fetchAddressSuccess(snapshot.val()));
            })
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddressDetailComponent);