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
                <div className='container'>
                    <NewAddressContainer />
                </div>
            </div>
        );
    }
}


export default NewAddressPage;