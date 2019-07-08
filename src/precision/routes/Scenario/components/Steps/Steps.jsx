import React, {Component} from 'react';
import Step from './Step'


import './steps.scss'

class Steps extends Component {
    render() {
        return (
            <div className="steps">
                <Step />
                <Step />
                <Step />
                <Step />
                <Step />
            </div>
        );
    }
}

export default Steps;