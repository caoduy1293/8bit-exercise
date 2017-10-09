/**
 * Created by caoquang on 06/10/2017.
 */
import React, { Component, PropTypes } from 'react';

import AddressDetailContainer from './AddressDetailContainer';
import HeaderComponent from '../../../common/header/HeaderComponent';

class AddressDetailPage extends Component{
    static contextTypes = {
        router: PropTypes.object
    };
    render(){
        return (
            <div >
                <HeaderComponent />
                <div className='container'>
                    <AddressDetailContainer id={this.props.params.id}/>
                </div>
            </div>
        )
    }
}
export default AddressDetailPage;