import React, {Component} from 'react';
import './skeleton.scss'

class StepSkeleton extends Component {
    render() {
        return (
            <div className="step-skeleton">
                <div className="step-skeleton__container">
                    <div className="step-skeleton__functions"></div>
                    <div className="step-skeleton__columns"></div>
                </div>
            </div>
        );
    }
}

export default StepSkeleton;