import React, { Component } from 'react';
import Steps from "../../Steps/Steps";
import ToolBar from "../Toolbar/ToolBar";

export class Dataset extends Component {
    render() {
        return (
            <div>
                <Steps/>
                <ToolBar/>
                Data Set
            </div>
        );
    };
};