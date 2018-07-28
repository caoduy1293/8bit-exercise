import React from "react";
import {Form} from "antd";
import {formItemLayout} from "../constants";
import moment from "moment";
const FormItem = Form.Item;

const FormFieldForDatePicker = Component => (e) => {
    const {input, meta, hasFeedback, label, valueDate, ...rest} = e;
    const hasError = meta.touched && meta.invalid;
    return (
        <FormItem
            {...formItemLayout}
            label={label}
            validateStatus={hasError ? "error" : "success"}
            hasFeedback={hasFeedback && hasError}
            help={hasError && meta.error}
        >
            <Component onChange={(date) => {input.onChange(date)}}
                       format="YYYY-MM-DD"
                       placeholder={label}
                       disabledDate={(current) => {return current && current < moment().startOf('day')}}
                       value={ !!valueDate ? valueDate : null} />
        </FormItem>
    );
};

export default FormFieldForDatePicker;

