import React, {Component} from 'react';

import './Steps.scss'


class Step extends Component {
    render() {
        return (
            <div className="step">

                <span className="step__index-no">01</span>

                <div className="step__main-container">
                    <div className="step__info-container">
                        <div className="step__function-name"><span className="step__function-icon"></span> Box Plot</div>
                        <div className="step__selected-columns"><span className="step__column-icon"></span> Age, Designation</div>
                    </div>

                    <div className="step__actions-container">
                        <button className="step__action">Result</button>
                        <button className="step__action">Notes</button>
                        <button className="step__action">Delete</button>
                    </div>
                </div>
            </div>
        );
    }
}

export default Step;
