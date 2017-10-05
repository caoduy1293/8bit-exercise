/**
 * Created by caoquang on 06/10/2017.
 */
import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';

class AddressListComponent extends Component{
    static contextTypes = {
        router: PropTypes.object
    };
    componentWillMount(){
        this.props.fetchAddress();
    }

    renderAddressItem(addressList){
        return addressList.map((address) => {
            return (
            <li className="list-group-item" key={address.id}>
                <Link style={{color:'black'}} to={"address/" + address.id}>
                    <h3 className="list-group-item-heading">{address.city}</h3>
                </Link>
            </li>
            );
        });
    }

    renderAddressList(addresses, loading, error){
        if(loading){
            return (
                <div><p>loading...</p></div>
            );
        }else if(error !== null) {
            return (
                <div><p>{error}</p></div>
            );
        }else{
            return (
                <div>
                    <ul className="list-group">
                        {this.renderAddressItem(addresses)}
                    </ul>
                </div>
            );
        }
    }

    render(){
        const { addresses, loading, error } = this.props.addressList;
        return (
            <div>
                <h1>Address List</h1>
                {this.renderAddressList(addresses, loading, error)}
            </div>
        )
    }
}
export default AddressListComponent;