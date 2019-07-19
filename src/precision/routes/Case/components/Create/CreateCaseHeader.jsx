import * as React from 'react';
import {Logo} from "../../../../images";

export const CreateCaseHeader = (props) => {
    return (
        <header className="header-create">
           <img className="logo" src={Logo} alt="Logo"/>
           <p className="title">Capturing Business Requirements</p>
            <p>Cross</p>
        </header>
    );
};