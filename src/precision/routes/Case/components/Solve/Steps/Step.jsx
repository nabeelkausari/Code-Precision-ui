import React, {Component} from 'react';
import ReactTruncate from 'react-truncate'

import Tooltip from '../../../../../components/Tooltip/Tooltip'

import './Steps.scss'


class Step extends Component {

    state = {
        is_function_truncated : false,
        is_column_truncated : false
    }

    // Function to determine whether the sequence of the step needs to have an appended 0
    getPrefix = (sequence_number) => {
        let string_number = sequence_number.toString();
        let regex_expression = /[0-9]/g;
        if(string_number.match(regex_expression)){
            return ("0"+string_number)
        }
        else {
            return string_number
        }
    }

    // Function to get the string of all selected columns
    getSelectedColumns = (selections) => {
        if(selections !== null){
            let selected_column_string = ""

            let selections_key =  Object.keys(selections);
            selections[selections_key].forEach((column) => (
                selected_column_string += column.label + ", "
            ))
            return selected_column_string.slice(0,selected_column_string.length - 2);
        }

        else{ return "" }
    }


    didTruncate = (truncated, ele) => {
        if (this.state[ele] !== truncated) {
            this.setState({
                [ele]: truncated
            });

        }
    }

    render() {

        const {step} = this.props
        const {is_column_truncated} = this.state
        return (
            <div className="step">

                <span className="index-no">{this.getPrefix(step.sequence_number)}</span>

                <div className="step__main-container">
                    <div className="step__info-container">



                        <div className="step__functions-wrapper">
                            <ReactTruncate lines={1} onTruncate={(default_value) => this.didTruncate(default_value, "is_function_truncated")}>
                                <div className="step__function-name"><span className="step__function-icon"></span>{step.operation_name}</div>
                            </ReactTruncate>
                        </div>


                        {is_column_truncated?
                            <Tooltip placement={"bottom"} text={this.getSelectedColumns(step.selections)}>
                                <div className="step__columns-wrapper">
                                    <ReactTruncate lines={1} onTruncate={(default_value) => this.didTruncate(default_value, "is_column_truncated")}>
                                        <div className="step__function-name">{this.getSelectedColumns(step.selections)}</div>
                                    </ReactTruncate>
                                </div>
                            </Tooltip>

                            :
                            <div className="step__columns-wrapper">
                                <ReactTruncate lines={1} onTruncate={(default_value) => this.didTruncate(default_value, "is_column_truncated")}>
                                    <div className="step__function-name">{this.getSelectedColumns(step.selections)}</div>
                                </ReactTruncate>
                            </div>
                        }









                    </div>

                    <div className="step__actions-container">
                        <button className="step__action btn-link">Result</button>
                        <button className="step__action btn-link">Notes</button>
                        <button className="step__action btn-link">Delete</button>
                    </div>
                </div>
            </div>
        );
    }
}

export default Step;
