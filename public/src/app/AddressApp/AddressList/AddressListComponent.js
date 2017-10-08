/**
 * Created by caoquang on 06/10/2017.
 */
import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';

import * as utility from '../../../ultility';
import TableComponent from '../../../common/table/TableComponent';
import {deleteAddress, deleteAddressSuccess} from '../AddressAction';

function convertAddressArray(addresses) {
    let addressList = [];
    for(let i = 0; i < addresses.length; i++){
        let objTemp = {};
        objTemp['id'] = addresses[i].id;
        objTemp['street'] = addresses[i].street;
        objTemp['ward'] = addresses[i].ward;
        objTemp['district'] = addresses[i].district;
        objTemp['city'] = addresses[i].city;
        addressList.push(objTemp);
    }
    return addressList;
}

class AddressListComponent extends Component{
    static contextTypes = {
        router: PropTypes.object
    };
    componentWillMount(){
        this.props.fetchAddresses();
    }

    renderAddressList(tableConfig, loading, error){
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
                <TableComponent tableConfig={tableConfig} />
            );
        }
    }

    render(){
        const { addresses, loading, error } = this.props.addressList;
        let tableConfig = {
            title: 'Address List',
            headerTable:['Street', 'Ward', 'District', 'City'],
            bodyTable: convertAddressArray(addresses),
            operation: {
                enable: true,
                editCallback: (idAddress) => {
                    this.context.router.push(utility.appRoute.addressPage + idAddress);
                },
                removeCallback: (idAddress) => {
                    this.props.deleteAddress(idAddress);
                }
            }
        };
        return (
            <div>
                {this.renderAddressList(tableConfig, loading, error)}
            </div>
        )
    }
}
export default AddressListComponent;