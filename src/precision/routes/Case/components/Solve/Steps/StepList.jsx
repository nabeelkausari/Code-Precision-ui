import React, {Component} from 'react';
import Step from './Step'

import StepsContainer from '../../../containers/solve/steps'
import './StepList.scss'
import {undo_icon, redo_icon} from '../../../../../images/index'


class StepList extends Component {

    state = {
        is_steps_open : true
    };

    toggleSteps = () => {
        this.setState((state) => ({is_steps_open: !state.is_steps_open}))
    };

    componentDidUpdate(prevProps, prevState, snapshot) {
        if(this.props.function_execution_succeeded && this.props.function_execution_succeeded !== prevProps.function_execution_succeeded){
            this.props.getSteps()
        }
    }

    render() {
        const {steps, onShowResultClick, undo_available, redo_available, last_step, onUndoClick, onRedoClick, redo_requested , undo_requested, can_reset, onResetClick} = this.props;
        const {is_steps_open} = this.state;
        return (
            <div className={is_steps_open ? 'steps' : 'steps steps--closed'}>

                <div className="steps__header">
                    <h3 className="steps__title">STEPS</h3>
                    <div className="steps__sub-container">
                        <span className="steps__number-of-selected">0 selected</span>
                        <div className="steps__action-wrapper u-margin-right-small">
                            {undo_available &&
                            <img src={undo_icon} alt="undo icon" className={undo_requested? "steps__action-icon steps__action-icon--active u-disable" : "steps__action-icon"}
                                 onClick={() => onUndoClick(last_step._links.undo)}/>
                            }
                        </div>

                        <div className="steps__action-wrapper">
                            {redo_available &&
                            <img src={redo_icon} alt="undo icon" className={redo_requested? "steps__action-icon steps__action-icon--active  u-disable" : "steps__action-icon"}
                                 onClick={() => onRedoClick(last_step._links.redo)}/>
                            }
                        </div>
                        {can_reset && <button onClick={() => onResetClick()}>reset</button>}
                    </div>
                </div>
                <hr/>
                <div className="steps__list-container">
                    <ul className="steps__list">
                        { steps &&
                            steps.slice(1).map((step, index) => (
                                (index !== (steps.length -1))?

                                    <li className="steps__item" key={index}>
                                        <Step step={step} onShowResultClick = {onShowResultClick}/>
                                    </li>
                                :
                                    <li className="steps__item" key={index}>
                                        <Step step={step} onShowResultClick = {onShowResultClick} lastChild/>
                                    </li>
                            ))
                        }
                        {redo_requested && <li>LOADING</li>}
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

export default StepsContainer(StepList);