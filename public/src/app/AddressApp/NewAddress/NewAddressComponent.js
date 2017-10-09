/**
 * Created by caoquang on 08/10/2017.
 */
import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { reduxForm, Field, SubmissionError } from 'redux-form';

import renderField from '../../../common/renderField/renderField';
import { createAddress, createAddressSuccess } from '../AddressAction';

//Client side validation
function validate(values) {
    const errors = {};
    if (!values.street || values.street.trim() === '') {
        errors.street = 'Enter a Street';
    }
    if (!values.city || values.city.trim() === '') {
        if (!values.ward || values.ward.trim() === '') {
            errors.ward = 'Enter ward';
        }
        if (!values.district || values.district.trim() === '') {
            errors.district = 'Enter district';
        }
    }
    if( (!values.ward || values.ward.trim() === '') && (!values.district || values.district.trim() === '') ){
        if (!values.city || values.city.trim() === '') {
            errors.city = 'Enter city';
        }
    }
    return errors;
}

//For any field errors upon submission (i.e. not instant check)
const validateAndCreateAddress = (values, dispatch) => {
    return dispatch(createAddress()).payload.push(values).then((snapshot)=>{
        console.log(snapshot);
    });
}



class NewAddressComponent extends Component {
    static contextTypes = {
        router: PropTypes.object
    };

    componentWillMount() {
        //Important! If your component is navigating based on some global state(from say componentWillReceiveProps)
        //always reset that global state back to null when you REMOUNT
        this.props.resetMe();
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.newAddress.address && !nextProps.newAddress.error) {
            this.context.router.push('/');
        }
    }

    renderError(newAddress) {
        if (newAddress && newAddress.error && newAddress.error.message) {
            return (
                <div className="alert alert-danger">
                    { newAddress ? newAddress.error.message : '' }
                </div>
            );
        } else {
            return <span></span>
        }
    }
    render() {
        const {handleSubmit, submitting, newAddress} = this.props;
        return (
            <div className='container'>
                { this.renderError(newAddress) }
                <form onSubmit={ handleSubmit(validateAndCreateAddress) }>
                    <Field
                        name="street"
                        type="text"
                        component={ renderField }
                        label="Street*" />
                    <Field
                        name="ward"
                        type="text"
                        component={ renderField }
                        label="Ward" />
                    <Field
                        name="district"
                        type="text"
                        component={ renderField }
                        label="District" />
                    <Field
                        name="city"
                        type="text"
                        component={ renderField }
                        label="City" />
                    <div>
                        <button
                            type="submit"
                            className="btn btn-primary"
                            disabled={ submitting }>
                            Add
                        </button>
                        <Link
                            to="/"
                            className="btn btn-error"> Cancel
                        </Link>
                    </div>
                </form>
            </div>
        )
    }
}


export default reduxForm({
    form: 'NewAddressComponent', // a unique identifier for this form
    validate // <--- validation function given to redux-form
})(NewAddressComponent)