/**
 * Created by caoquang on 08/10/2017.
 */
import { connect } from 'react-redux';

import NewAddressComponent from './NewAddressComponent';
import { resetNewAddress } from '../AddressAction';


const mapDispatchToProps = (dispatch) => {
    return {
        resetMe: () => {
            dispatch(resetNewAddress());
        }
    }
}


function mapStateToProps(state, ownProps) {
    return {
        newAddress: state.address.newAddress
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(NewAddressComponent);