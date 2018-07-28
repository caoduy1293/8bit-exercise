import React from 'react';
import propTypes from 'prop-types';
import {FIELDS, ITEM_FORM_ID} from "../constants";
import {Field, formValueSelector, reduxForm} from "redux-form";
import FormFieldForInput from "../../../components/FormField/Input";
import {Button, Form, Input} from "antd";
import {connect} from "react-redux";
import {get} from "lodash";
import {formItemLayout, tailFormItemLayout} from "../../../components/constants";
import FormFieldForFileInput from "../../../components/FormField/FileInput";

const FormItem = Form.Item;
const AInput = FormFieldForInput(Input);
const { TextArea } = Input;
const ATextArea = FormFieldForInput(TextArea);

class ItemForm extends React.Component{
    state = {
        selectedItem: null,
    };
    componentWillReceiveProps(nextProps){
        let selectedItem = get(nextProps, 'selectedItem', null);
        let idSelected = get(selectedItem, FIELDS.itemId.id, null);
        let idSelectedInternal = get(this.state.selectedItem, FIELDS.itemId.id, null);
        //when present item different previous item
        if(idSelected && idSelected !== idSelectedInternal) {
            nextProps.reset();
            this.props.change(FIELDS.title.id, get(selectedItem, FIELDS.title.id, ''));
            this.props.change(FIELDS.itemId.id, get(selectedItem, FIELDS.itemId.id, ''));
            this.props.change(FIELDS.description.id, get(selectedItem, FIELDS.description.id, ''));
        }
        this.setState({selectedItem});
    }
    checkDisable = (selectedItem) => {
        return get(selectedItem, FIELDS.title.id, '') === this.props.title
            && get(selectedItem, FIELDS.description.id, '') === this.props.description
            && this.props.preview;
    };

    render() {
        const {
            handleSubmit,
            selectedItem,
            pristine,
            submitting,
        } = this.props;
        return (
            <div>
                <Form onSubmit={handleSubmit}>
                    <Field
                        label={FIELDS.title.label}
                        name={FIELDS.title.id}
                        component={AInput}
                        placeholder={FIELDS.title.label}
                        hasFeedback/>
                    <Field
                        label={FIELDS.description.label}
                        name={FIELDS.description.id}
                        component={ATextArea}
                        placeholder={FIELDS.description.label}
                        hasFeedback/>

                    {selectedItem ? (<FormItem
                        {...formItemLayout}
                        label="Preview File"
                    >
                        <span className="ant-form-text">{selectedItem.previewUrl}</span>
                    </FormItem>) : ''}

                    <Field name={FIELDS.preview.id} label={FIELDS.preview.label} type="file"
                           component={FormFieldForFileInput} placeholder={FIELDS.preview.label} hasFeedback/>
                    <FormItem {...tailFormItemLayout}>
                        <Button type="primary"
                                disabled={this.props.loading || pristine || submitting || this.checkDisable(selectedItem)}
                                htmlType="submit"
                                style={{ marginRight: "10px" }}>
                            { !get(selectedItem, 'id', '') ? 'Add' : 'Edit'}
                        </Button>
                    </FormItem>
                    <Field
                        label={FIELDS.itemId.label}
                        name={FIELDS.itemId.id}
                        component={AInput}
                        type="hidden"
                        placeholder={FIELDS.itemId.label}
                        hasFeedback/>
                </Form>
            </div>
        );
    }
}

ItemForm.propTypes = {
    //form state
    title: propTypes.string,
    description: propTypes.string,
    preview: propTypes.any,
    change: propTypes.func,
    handleSubmit: propTypes.any,

    //HOC prop
    selectedItem: propTypes.object,
    loading: propTypes.bool,
    onOffSignal: propTypes.bool,
};

const validate = values => {
    const errors = {};
    if (!values[FIELDS.title.id]) {
        errors[FIELDS.title.id] = 'Required';
    }
    if (!values[FIELDS.preview.id] && !values[FIELDS.itemId.id]) {
        errors[FIELDS.preview.id] = 'Required';
    }
    return errors;
};

ItemForm = reduxForm({
    form: ITEM_FORM_ID,
    validate
})(ItemForm);

const selectorItemForm = formValueSelector(ITEM_FORM_ID);

ItemForm = connect(state => {
    const { title, description } = selectorItemForm(state, FIELDS.title.id, FIELDS.description.id);
    const preview = selectorItemForm(state, FIELDS.preview.id);
    return {
        title, description, preview,
    };
})(ItemForm);

export default ItemForm;