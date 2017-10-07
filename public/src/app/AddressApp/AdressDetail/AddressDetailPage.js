/**
 * Created by caoquang on 06/10/2017.
 */
import React, { Component, PropTypes } from 'react';

import AddressDetailContainer from './AddressDetailContainer';

class AddressDetailPage extends Component{
    static contextTypes = {
        router: PropTypes.object
    };
    render(){
        return (
            <div className='container'>
                <AddressDetailContainer id={this.props.params.id}/>
            </div>
        )
    }
}
export default AddressDetailPage;