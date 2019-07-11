import React, {Component} from 'react';
import Step from './Step'

import StepsContainer from '../../../containers/solve/steps'


import './Steps.scss'

class Steps extends Component {

    state = {
        is_steps_open : true
    }

    toggleSteps = () => {
        this.setState((state) => ({is_steps_open: !state.is_steps_open}))
    }

    render() {
        const {steps} = this.props
        const {is_steps_open} = this.state
        console.log(steps)
        return (
            <div className={is_steps_open ? 'steps' : 'steps steps--closed'}>

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

                <div className={is_steps_open? "steps__toggle-btn--1" : "steps__toggle-btn--1-hide"} onClick={this.toggleSteps}>
                    <span className="steps__toggle-icon">&rarr;</span>
                </div>

                <div className={is_steps_open? "steps__toggle-btn--2 steps__toggle-btn--2-hide" : "steps__toggle-btn--2"} onClick={this.toggleSteps}>
                    <span className="steps__toggle-icon">&larr;</span>
                </div>


            </div>
        );
    }
}

export default StepsContainer(Steps);