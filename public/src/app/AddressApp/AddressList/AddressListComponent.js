/**
 * Created by caoquang on 06/10/2017.
 */
import React, {Component, PropTypes} from 'react';

import {appRoute} from '../../../ultility';
import TableComponent from '../../../common/table/TableComponent';

function convertAddressArray(addresses) {
    let addressList = [];
    for (let i = 0; i < addresses.length; i++) {
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

class AddressListComponent extends Component {
    static contextTypes = {
        router: PropTypes.object
    };

    componentWillMount() {
        this.props.fetchAddresses();
    }

    renderAddressList(tableConfig, loading, error) {
        let template;
        if (loading) {
            template = (
                <div>
                    <p>loading</p>
                </div>
            );
        } else if (error !== null) {
            template = (
                <div><p>{error}</p></div>
            );
        } else {
            template = (
                <TableComponent tableConfig={tableConfig}/>
            );
        }
        return template;
    }

    render() {
        const {addresses, loading, error} = this.props.addressList;
        let tableConfig = {
            title: 'Address List',
            headerTable: ['Street', 'Ward', 'District', 'City'],
            bodyTable: convertAddressArray(addresses),
            addCallback: () => {
                this.context.router.push(appRoute.addressNew);
            },
            operation: {
                enable: true,
                editCallback: (idAddress) => {
                    this.context.router.push(appRoute.addressEdit + idAddress);
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