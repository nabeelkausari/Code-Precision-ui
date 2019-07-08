import React, {Component} from 'react';
import Step from './Step'


import './steps.scss'

class Steps extends Component {
    render() {
        return (
            <div className="steps">
                <div className="steps__header">
                    <h3 className="steps__title">STEPS</h3>
                    <span className="steps__number-of-selected">0 selected</span>
                </div>
                <hr/>
                <div className="steps__list">
                    <Step />
                    <Step />
                    <Step />
                    <Step />
                    <Step />
                </div>

            </div>
        );
    }
}

export default Steps;