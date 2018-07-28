import React, {Component} from "react";
import {Form} from "antd";
import {formItemLayout} from "../constants";
import {isAudio, isImage, isVideo} from "../../utils/utils";
const FormItem = Form.Item;

class FormFieldForFileInput extends Component{
    state = {
        isValid: true,
        errMsg: '',
    };
    fileInput;
    onChange = (e) => {
        let file = e.target.files[0];
        let valid = true;
        let errMsg = '';
        if(!isImage(file.name) && !isVideo(file.name) && !!isAudio(file.name)) {
            valid = false;
            errMsg = 'Not Image or Video or Audio';
        }
        if(file.size/1024/1024 > 15) {
            valid = false;
            errMsg = 'Image not allow more than 15 MB';
        }
        if(valid) {
            const { onChange } = this.props.input;
            onChange(file);
        } else {
            this.fileInput.value = '';
        }
        this.setState({
            isValid: valid,
            errMsg: errMsg,
        });
    };
    render() {
        const {input, meta, hasFeedback, label, type, placeholder} = this.props;
        const hasError = meta.touched && meta.invalid;
        if(this.fileInput && !meta.dirty) {
            this.fileInput.value = '';
        }
        return (
            <FormItem
                {...formItemLayout}
                label={label}
                validateStatus={(!this.state.isValid || hasError) ? "error" : "success"}
                hasFeedback={hasFeedback && (!this.state.isValid || hasError)}
                help={(!this.state.isValid && this.state.errMsg) || (hasError && meta.error)}
            >
                <input placeholder={placeholder} type={type} onChange={this.onChange}
                       ref={ref => this.fileInput = ref} />
            </FormItem>
        );
    };
}

export default FormFieldForFileInput;

