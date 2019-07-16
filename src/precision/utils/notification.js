import * as React from 'react';
import {  toast } from 'react-toastify';


const Notification = (props) => {
    const {title, message} = props
    return (
        <div>
            <h3>{title}</h3>
            <p>{message}</p>
        </div>
    );
};

const toast_config = {
    draggable: true,
}

export const notify = (type,title,message) => {
    toast(<Notification title={title} message={message}/>, {...toast_config, type:type});
}