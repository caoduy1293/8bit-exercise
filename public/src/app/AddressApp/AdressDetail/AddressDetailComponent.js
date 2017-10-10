/**
 * Created by caoquang on 06/10/2017.
 */
import React, {Component, PropTypes} from 'react';
import { connect } from 'react-redux';
import { initialize, change } from 'redux-form';

import AddressForm from '../AddressForm';
import { upAddress, resetUpAddress } from '../AddressAction';

class AddressDetailComponent extends Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handlePlacesChanged = this.handlePlacesChanged.bind(this);
    }
    static contextTypes = {
        router: PropTypes.object
    };

    componentWillMount() {
        this.props.fetchAddress(this.props.addressId);
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.activeAddress.address) {
            this.props.dispatch(initialize('addressFrom', {
                street: nextProps.activeAddress.address.street,
                ward: nextProps.activeAddress.address.ward,
                district: nextProps.activeAddress.address.district,
                city: nextProps.activeAddress.address.city,
            }, ['street', 'ward', 'district', 'city']));
        }
    }

    renderAddress(addressObj, loading, error) {
        if (loading) {
            return (
                <div>
                    loading ...
                </div>
            )
        } else if (error !== null) {
            return (
                <div>
                    {error}
                </div>
            )
        } else if (addressObj !== null) {
            return (
                <div>
                    <AddressForm onSubmit={this.handleSubmit} onPlacesChangedFn={this.handlePlacesChanged}/>
                </div>
            )
        } else {
            return (
                <div>
                    empty
                </div>
            )
        }

    }
    handleSubmit(data) {
        return this.props.dispatch(upAddress(this.props.addressId)).payload.update(data).then((snapshot)=>{
            this.props.dispatch(initialize('addressFrom', {}));
            this.context.router.push('/');
        });
        // return this.props.dispatch(createAddress()).payload.push(data).then((snapshot)=>{
        //
        //     this.props.dispatch(initialize('addressFrom', {}));
        // });
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
        const {address, loading, error} = this.props.activeAddress;
        return (
            <div>
                {this.renderAddress(address, loading, error)}
            </div>
        )
    }
}

export default connect()(AddressDetailComponent)