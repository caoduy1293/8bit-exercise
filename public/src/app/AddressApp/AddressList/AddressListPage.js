/**
 * Created by caoquang on 06/10/2017.
 */
import React, { Component } from 'react';

import AddressListContainer from './AddressListContainer';
import HeaderComponent from '../../../common/header/HeaderComponent';

class AddressListPage extends Component {
    render(){
        return (
            <div>
                <HeaderComponent />
                <div className={'container'}>
                    <AddressListContainer />
                </div>
            </div>
        );
    }
}
export default AddressListPage;