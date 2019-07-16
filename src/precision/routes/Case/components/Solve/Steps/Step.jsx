import React, {Component} from 'react';
import ReactTruncate from 'react-truncate'

import Tooltip from '../../../../../components/Tooltip/Tooltip'
import './StepList.scss'
import {StepContainer} from "../../../containers/solve/steps/step";
import {function_icon, column_icon} from '../../../../../images/index'


class Step extends Component {

    state = {
        is_function_truncated : false,
        is_column_truncated : false
    };

    // Function to determine whether the sequence of the step needs to have an appended 0
    getPrefix = (sequence_number) => {
        let string_number = sequence_number.toString();
        if(string_number.length === 1)
            return ("0"+string_number)
        else
            return string_number
    };

    // Function to get the string of all selected columns
    getSelectedColumns = (selections) => {
        if(selections !== null){
            let selected_column_string = [];

            for (let key in selections) {
                selected_column_string.push(selections[key].map(column => column.key));
            }

            return selected_column_string.join(', ');
        } else {
            return ""
        }
    };


    didTruncate = (truncated, ele) => {
        if (this.state[ele] !== truncated) {
            this.setState({
                [ele]: truncated
            });

        }
    };

    render() {

        const {step, onShowResultClick, resetResultsFlyouts, resetNotesFlyout, lastChild, undo_requested} = this.props
        const {is_column_truncated} = this.state
        return (
            <div className = {lastChild? undo_requested? "step step--undo":"step":"step"} >

                {/*<span className="index-no"></span>*/}
                <div className="index-no__wrapper">
                    <span className="index-no__text">{this.getPrefix(step.sequence_number)}</span>
                </div>

                <div className="step__main-container">
                    <div className="step__info-container">

                        <div className="step__functions-wrapper">
                            <div className="step__icon-wrapper">
                                <img src={function_icon} alt="" className="step__icon step__icon--function"/>
                            </div>
                            <ReactTruncate lines={1} onTruncate={(default_value) => this.didTruncate(default_value, "is_function_truncated")}>
                                <div className="step__function-name">
                                   {step.operation_name}
                                </div>
                            </ReactTruncate>
                        </div>
                        {is_column_truncated?
                            <Tooltip placement={"bottom"} text={this.getSelectedColumns(step.selections)}>
                                <div className="step__columns-wrapper">
                                    <div className="step__icon-wrapper">
                                        <img src={column_icon} alt="" className="step__icon step__icon--column"/>
                                    </div>
                                    <ReactTruncate lines={1} onTruncate={(default_value) => this.didTruncate(default_value, "is_column_truncated")}>
                                        <div className="step__function-name">{this.getSelectedColumns(step.selections)}</div>
                                    </ReactTruncate>
                                </div>
                            </Tooltip>

                            :
                            <div className="step__columns-wrapper">
                                <div className="step__icon-wrapper step__icon--column">
                                    <img src={column_icon} alt="" className="step__icon step__icon--column"/>
                                </div>
                                <ReactTruncate lines={1} onTruncate={(default_value) => this.didTruncate(default_value, "is_column_truncated")}>
                                    <div className="step__function-name">{this.getSelectedColumns(step.selections)}</div>
                                </ReactTruncate>
                            </div>
                        }
                    </div>

                    <div className="step__actions-container">
                        <button className="step__action btn-link" onClick={() => {resetNotesFlyout(); onShowResultClick(this.props.step)}}>Result</button>
                        <button className="step__action btn-link" onClick={() => {resetResultsFlyouts(); this.props.getUserNotes(step)}}>Notes</button>
                        <button className="step__action btn-link">Delete</button>
                    </div>
                </div>
            </div>
        );
    }
}

export default StepContainer(Step);
