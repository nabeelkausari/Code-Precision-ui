import React, { Component } from 'react';
import ToolBar from "../../Toolbar/ToolBar";
import Steps from "../../../Steps/Steps";

export class Dataset extends Component {
    render() {
        return (
            <div style={{position:"relative"}}>
                <ToolBar/>
                <Steps/>
            </div>
        );
    };
};