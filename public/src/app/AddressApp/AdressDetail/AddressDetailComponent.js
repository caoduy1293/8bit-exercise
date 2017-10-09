/**
 * Created by caoquang on 06/10/2017.
 */
import React, {Component, PropTypes} from 'react';
import { connect } from 'react-redux';
import { initialize } from 'redux-form';

import AddressForm from '../AddressForm';

class AddressDetailComponent extends Component {
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
                    <AddressForm onSubmit={this.handleSubmit.bind(this)}/>
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
        console.log(snapshot);
        // return this.props.dispatch(createAddress()).payload.push(data).then((snapshot)=>{
        //
        //     this.props.dispatch(initialize('addressFrom', {}));
        // });
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