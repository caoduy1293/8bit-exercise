/**
 * Created by caoquang on 08/10/2017.
 */
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { initialize } from 'redux-form';

import { createAddress, createAddressSuccess } from '../AddressAction';
import AddressForm from '../AddressForm';

class NewAddressComponent extends Component {
    static contextTypes = {
        router: PropTypes.object
    };

    componentWillMount() {
        //Important! If your component is navigating based on some global state(from say componentWillReceiveProps)
        //always reset that global state back to null when you REMOUNT
        this.props.resetMe();
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.newAddress.address && !nextProps.newAddress.error) {
            this.context.router.push('/');
        }
    }

    renderError(newAddress) {
        if (newAddress && newAddress.error && newAddress.error.message) {
            return (
                <div className="alert alert-danger">
                    { newAddress ? newAddress.error.message : '' }
                </div>
            );
        } else {
            return <span></span>
        }
    }
    handleSubmit(data) {
        return this.props.dispatch(createAddress()).payload.push(data).then((snapshot)=>{
            console.log(snapshot);
            this.props.dispatch(initialize('addressFrom', {}));
        });
    }
    render() {
        const {newAddress} = this.props;
        return (
            <div>
                { this.renderError(newAddress) }
                <AddressForm onSubmit={this.handleSubmit.bind(this)}/>
            </div>
        )
    }
}


export default connect()(NewAddressComponent)