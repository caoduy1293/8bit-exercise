/**
 * Created by caoquang on 08/10/2017.
 */
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { initialize, change } from 'redux-form';

import { createAddress, createAddressSuccess } from '../AddressAction';
import AddressForm from '../AddressForm';

class NewAddressComponent extends Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handlePlacesChanged = this.handlePlacesChanged.bind(this);
    }
    static contextTypes = {
        router: PropTypes.object
    };
    inputElement = null;
    componentWillMount() {
        this.props.dispatch(initialize('addressFrom', {}));
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
            this.context.router.push('/');
            this.inputElement.value = '';
        });
    }
    handlePlacesChanged(data) {
        let componentForm = {
            street_number: 'short_name',
            route: 'long_name',// street name
            administrative_area_level_1: 'short_name',// city
            administrative_area_level_2: 'short_name',// district
            sublocality_level_1: 'short_name'// ward
        };
        let streetNumber = '';
        let objAddress = {};
        for (var i = 0; i < data.address_components.length; i++) {
            var addressType = data.address_components[i].types[0];
            if (componentForm[addressType]) {
                let valTemp;
                if(addressType === 'street_number'){
                    streetNumber = data.address_components[i][componentForm[addressType]];
                }
                if(addressType === 'route'){
                    valTemp = streetNumber + ' ' + data.address_components[i][componentForm[addressType]];
                    valTemp = valTemp.trim();
                    this.props.dispatch(change( "addressFrom", "street", valTemp || '' ));
                }
                if(addressType === 'administrative_area_level_1'){
                    valTemp = data.address_components[i][componentForm[addressType]];
                    this.props.dispatch(change( "addressFrom", "city", valTemp || '' ));
                }
                if(addressType === 'administrative_area_level_2'){
                    valTemp = data.address_components[i][componentForm[addressType]];
                    this.props.dispatch(change( "addressFrom", "district", valTemp || '' ));
                }
                if(addressType === 'sublocality_level_1'){
                    valTemp = data.address_components[i][componentForm[addressType]];
                    this.props.dispatch(change( "addressFrom", "ward", valTemp|| '' ));
                }
            }
        }
    }
    render() {
        const {newAddress} = this.props;
        return (
            <div>
                { this.renderError(newAddress) }
                <AddressForm onSubmit={this.handleSubmit} onPlacesChangedFn={this.handlePlacesChanged} inputRef={el => this.inputElement = el}/>
            </div>
        )
    }
}

export default connect()(NewAddressComponent)