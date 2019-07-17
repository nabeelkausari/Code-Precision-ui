import React, { Component } from 'react';
import {ConsoleContainer} from "../../../../containers/solve/view/console/console";

class Console extends Component {

    componentDidUpdate(prevProps, prevState, snapshot) {
        if(this.props.fetch_case_succeeded === null){
            this.props.getCase()
        }
        if(this.props.fetch_case_succeeded && this.props.fetch_case_succeeded !== prevProps.fetch_case_succeeded){
            this.props.fetchConsole()
        }
    }

    render() {
        const {console_url} = this.props;
        return (
            <div>
                <iframe src={console_url} id='myIFrame' style={{ width: '100%', height: '-webkit-fill-available' }}/>
            </div>
        );
    };
};

export default ConsoleContainer(Console);