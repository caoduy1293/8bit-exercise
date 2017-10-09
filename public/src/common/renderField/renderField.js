/**
 * Created by caoquang on 07/10/2017.
 */
import React from 'react';
const renderField = ({ input, label, type, meta: { touched, error, invalid, warning } }) => (
    <div className={`form-group ${touched && invalid ? 'has-error' : ''}`}>
        <div>
            <input {...input} className="form-control"  placeholder={label} type={type}/>
            <div className="help-block">
                {touched && ((error && <span>{error}</span>) || (warning && <span>{warning}</span>))}
            </div>
        </div>
    </div>
)

export default renderField;