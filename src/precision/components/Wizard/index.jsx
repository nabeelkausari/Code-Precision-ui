import React, {Component} from "react";
import {Container} from "react-bootstrap";
import './Wizard.scss'


export class Wizard extends Component {
    state = {
        currentStep: 1,
    };

    next = () => {
        this.setState(state => {
            if (this.props.steps.length > state.currentStep) {
                return {currentStep: state.currentStep + 1}
            }
        });
    };

    prev = () => {
        this.setState(state => {
            if (state.currentStep !== 1) {
                return {currentStep: state.currentStep - 1}
            }
        });
    };

    render() {
        return (
            <div>
                <Container>
                    <div className='assignTimelineWrapper'>
                        <div className='assignTimeLine'>
                            <div>
                                {this.props.steps.map((step, i) =>
                                    <div>
                                        <span key={i} className={step.id === this.state.currentStep ? 'timeLineButton-active' : 'timeLineButton'}/>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className='assignTimelineText'>
                        {this.props.steps.map((step, i) =>
                            <div>
                                <span key={i} className='timeline-text'>{step.name}</span>
                            </div>
                        )}
                    </div>
                    <div className='btn-wrapper'>
                        <button onClick={this.prev}>Previous</button>
                        <button onClick={this.next}>Next</button>
                    </div>
                    <div>
                        {this.props.steps.filter(step => step.id === this.state.currentStep).map((step, i) =>
                            <div>
                                {step.component}
                            </div>
                        )}
                    </div>
                </Container>
            </div>);
    }
}

