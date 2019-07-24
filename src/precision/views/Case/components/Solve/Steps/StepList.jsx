import React, {Component} from 'react';
import Step from './Step'

import Tooltip from '../../../../../components/Tooltip/Tooltip'
import StepsContainer from '../../../containers/solve/steps'
import './StepList.scss'
import {UndoIcon, RedoIcon, ResetIcon, RightArrowIcon, LeftArrowIcon} from '../../../../../images/index';

// import  {ReactComponent as RedoIcon} from '../../../../../images/icons/icon_redo.svg';

import StepSkeleton from '../../../../../components/Skeletons/StepSkeleton'


class StepList extends Component {

    state = {
        open_user_steps: false,
    };


    componentDidUpdate(prevProps, prevState, snapshot) {
        if(this.props.function_execution_succeeded && this.props.function_execution_succeeded !== prevProps.function_execution_succeeded){
            this.props.getSteps()
        }
    }

    handleUserStepDetails = () => {
        this.setState({
            open_user_steps: true
        })
    };

    closeUserStepDetails = () => {
        this.setState({
            open_user_steps: false
        })
    };

    render() {
        const {
            steps, onShowResultClick, undo_available, redo_available, last_step, onUndoClick,
            onRedoClick, redo_requested, undo_requested, can_reset, onResetClick, reset_requested
        } = this.props;


        const {is_steps_open, toggleSteps} = this.props
        return (
            <div className={is_steps_open ? 'steps' : 'steps steps--closed'}>

                <div className="steps__header">
                    <h3 className="steps__title">STEPS</h3>
                    <div className="steps__sub-container">
                        <span className="steps__number-of-selected">0 selected</span>


                        {/*{*/}
                        {/*<Tooltip placement={"bottom"} text={"Show User Steps"}>*/}
                            {/*<div className="steps__action-wrapper">*/}
                                {/*<div onClick={this.handleUserStepDetails}>Show Steps</div>*/}
                            {/*</div>*/}
                        {/*</Tooltip>*/}
                        {/*}*/}

                        {undo_available &&
                        <Tooltip placement={"bottom"} text={"Undo"}>
                            <div className="steps__action-wrapper">

                                <UndoIcon className={undo_requested ? "steps__action-icon steps__action-icon--active u-disable" : "steps__action-icon"}
                                          onClick={() => onUndoClick(last_step._links.undo)}/>
                                {/*<img src={undo_icon} alt="undo icon"*/}
                                     {/*className={undo_requested ? "steps__action-icon steps__action-icon--active u-disable" : "steps__action-icon"}*/}
                                     {/*onClick={() => onUndoClick(last_step._links.undo)}/>*/}
                            </div>
                        </Tooltip>
                        }

                        {redo_available &&
                        <Tooltip placement={"bottom"} text={"Redo"}>
                            <div className="steps__action-wrapper">

                                <RedoIcon className={redo_requested? "steps__action-icon steps__action-icon--active  u-disable" : "steps__action-icon"}
                                        onClick={() => onRedoClick(last_step._links.redo)}/>
                                {/*<img src={redo_icon} alt="redo icon" className={redo_requested? "steps__action-icon steps__action-icon--active  u-disable" : "steps__action-icon"}*/}

                            </div>
                        </Tooltip>
                        }

                        {can_reset &&
                        <Tooltip placement={"bottom"} text={"Reset"}>
                            <div className="steps__action-wrapper">
                                <ResetIcon className={reset_requested? "steps__action-icon steps__action-icon--active  u-disable" : "steps__action-icon"}
                                           onClick={() => onResetClick()}/>
                                {/*<img src={reset_icon} alt="reset icon" className={reset_requested? "steps__action-icon steps__action-icon--active  u-disable" : "steps__action-icon"}*/}
                                     {/*onClick={() => onResetClick()}/>*/}
                            </div>
                        </Tooltip>
                        }
                    </div>
                </div>
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
                        {redo_requested && <li className="steps__item"><StepSkeleton/></li>}
                    </ul>
                </div>

                <div className={is_steps_open? "steps__toggle-btn--1" : "steps__toggle-btn--1-hide"} onClick={toggleSteps}>
                    {/*<img src={right_arrow_icon} alt="right arrow" className="steps__toggle-icon"/>*/}
                    <div className="steps__btn-icon-wrapper">
                        <RightArrowIcon className="steps__toggle-icon"/>
                    </div>
                </div>

                <div className={is_steps_open? "steps__toggle-btn--2 steps__toggle-btn--2-hide" : "steps__toggle-btn--2"} onClick={toggleSteps}>
                    <div className="steps__btn-icon-wrapper">
                        <LeftArrowIcon className="steps__toggle-icon"/>
                    </div>
                    {/*<img src={left_arrow_icon} alt="left arrow" className="steps__toggle-icon u-margin-left-small"/>*/}
                </div>
                {/*{this.state.open_user_steps && <UserStepDetails show={this.state.open_user_steps} handleClose={this.closeUserStepDetails}/>}*/}
            </div>
        );
    }
}

export default StepsContainer(StepList);