import * as React from 'react';
import cx from 'classnames';
import {Button as BootstrapButton} from "react-bootstrap";

import './Button.scss'


export const Button = (props) => {
    const {disabled, styles, buttonType, children, ...rest} = props;
    return (
        <BootstrapButton
            variant="light"
            className={cx(['cc-button',buttonType])}
            disabled={disabled}
            {...rest}
        >
            {children}
        </BootstrapButton>
    );
}
