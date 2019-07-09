import * as React from 'react';
import cx from 'classnames';
import {Button as BootstrapButton} from "react-bootstrap";

import './_button.scss'


export const Button = (props) => {
    const {disabled, styles, buttonType, children} = props;
    return (
        <BootstrapButton
            variant="light"
            className={cx('cc-button',buttonType)}
            {...props}
        >
            {children}
        </BootstrapButton>
    );
}