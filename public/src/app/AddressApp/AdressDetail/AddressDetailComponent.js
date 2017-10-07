/**
 * Created by caoquang on 06/10/2017.
 */
import React, {Component, PropTypes} from 'react';
import { Link } from 'react-router';

export default class AddressDetailComponent extends Component{
    static contextTypes = {
        router: PropTypes.object
    };
    componentWillMount() {
        this.props.fetchAddress(this.props.addressId);
    }
    renderAddress(addressObj, loading, error){
        if(loading){
            return (
                <div>
                loading ...
                </div>
            )
        }else if (error !== null){
            return (
                <div>
                    {error}
                </div>
            )
        }else if (addressObj !== null){
            return (
                <div>
                    {addressObj.city}
                </div>
            )
        }else{
            return (
                <div>
                    empty
                </div>
            )
        }

    }
    render(){
        const { address, loading, error } = this.props.activeAddress;
        console.log({ address, loading, error })
        return (
            <div>
                {this.renderAddress(address, loading, error)}
            </div>
        )
    }
}