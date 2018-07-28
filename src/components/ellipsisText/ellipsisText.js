import React from 'react';
import {Popover} from 'antd';


const EllipsisText = (props) => {
    return ((props.text).length > props.maxLimit) ? (
        <Popover content={props.text}>
            {((props.text).substring(0, props.maxLimit-3 )) + '...'}
        </Popover>
    ) : props.text;
};

export default EllipsisText;