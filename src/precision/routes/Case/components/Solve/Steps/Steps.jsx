import React, {Component} from 'react';
import Step from './Step'

import StepsContainer from '../../../containers/solve/steps'


import './Steps.scss'

class Steps extends Component {



    render() {
        const {steps} = this.props
        console.log(steps)
        return (
            <div className="steps">
                <div className="steps__header">
                    <h3 className="steps__title">STEPS</h3>
                    <span className="steps__number-of-selected">0 selected</span>
                </div>
                <hr/>
                <div className="steps__list-container">
                    <ul className="steps__list">
                        { steps &&
                            steps.map((step, index) => (
                                <li className="steps__item" key={index}> <Step step={step} /> </li>
                            ))
                        }
                    </ul>
                </div>
                {this.props.children}
            </div>
        );
    }
}

export default StepsContainer(Steps);