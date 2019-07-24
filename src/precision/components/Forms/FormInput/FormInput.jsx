import * as React from 'react';
import {FormControl, InputGroup} from "react-bootstrap";

export const FormInput = (props) => {
    const {placeholder, name, onChange, value, type, ...rest} = props;
    return (
        <InputGroup >
            <FormControl
                type={type}
                placeholder={placeholder}
                name={name}
                onChange={onChange}
                value={value}
                {...rest}
            />
        </InputGroup>
    );
};