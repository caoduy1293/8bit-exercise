/**
 * Created by caoquang on 10/10/2017.
 */
import React, { Component, PropTypes } from 'react';
import { reduxForm, Field, SubmissionError, change as changeFieldValue } from 'redux-form';
import { Link } from 'react-router';

import { validateAddress } from '../../utils';
import renderField from '../../common/renderField/renderField';
import MyFancyComponent from '../../common/googleMap/SearchBoxGoogle';

class AddressForm extends Component {
    static contextTypes = {
        router: PropTypes.object
    };
    render() {
        const { handleSubmit, submitting, onPlacesChangedFn } = this.props;
        return (
            <form onSubmit={ handleSubmit }>
                <MyFancyComponent onPlacesChanged={onPlacesChangedFn}/>
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
                        Submit
                    </button>
                    <Link
                        to="/"
                        className="btn btn-error"> Cancel
                    </Link>
                </div>
            </form>
        );
    }
}

AddressForm = reduxForm({
    form: 'addressFrom',                      // the name of your form and the key to
                                          // where your form's state will be mounted
    fields: ['street', 'ward', 'district', 'city'], // a list of all your fields in your form
    validate: validateAddress             // a synchronous validation function
})(AddressForm);

export default AddressForm;