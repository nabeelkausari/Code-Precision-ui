import React, {Component} from 'react';

import './Steps.scss'


class Step extends Component {


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
        console.log('selections ; ', selections)
        if(selections !== null){
            let selected_column_string = ""

            let selections_key =  Object.keys(selections);
            console.log('selections key ; ', selections_key)
            selections[selections_key].forEach((column) => (
                selected_column_string += column.label + ", "
            ))
            return selected_column_string.slice(0,selected_column_string.length - 2);
        }

        else{
            return ""
        }

    }

    render() {

        const {step} = this.props

        return (
            <div className="step">

                <span className="step__index-no">{this.getPrefix(step.sequence_number)}</span>

                <div className="step__main-container">
                    <div className="step__info-container">
                        <div className="step__function-name"><span className="step__function-icon"></span>{step.operation_name}</div>
                        <div className="step__selected-columns"><span className="step__column-icon"></span> {this.getSelectedColumns(step.selections)}</div>
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
