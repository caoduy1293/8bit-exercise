/**
 * Created by caoquang on 08/10/2017.
 */
import React, { Component } from 'react';
import HeaderComponent from '../../../common/header/HeaderComponent';
import NewAddressContainer from './NewAddressContainer';

class NewAddressPage extends Component {
    render() {
        return (
            <div>
                <HeaderComponent />
                <NewAddressContainer />
            </div>
        );
    }
}


export default NewAddressPage;