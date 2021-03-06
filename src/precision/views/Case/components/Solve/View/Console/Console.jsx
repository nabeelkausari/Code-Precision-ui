import React, { Component } from 'react';
import {ConsoleContainer} from "../../../../containers/solve/view/console/console";
import './Console.scss'

class Console extends Component {

    componentDidUpdate(prevProps, prevState, snapshot) {
        if(this.props.fetch_case_succeeded === null){
            this.props.getScenarioDetails()
        }
        if(this.props.fetch_case_succeeded && this.props.fetch_case_succeeded !== prevProps.fetch_case_succeeded){
            this.props.fetchConsole()
        }
    }

    render() {
        const {console_url} = this.props;
        return (
            <div className="console-container">
                <iframe title="console" src={console_url} id='myIFrame' style={{ width: '100%', height: '-webkit-fill-available' }}/>
            </div>
        );
    };
};

export default ConsoleContainer(Console);