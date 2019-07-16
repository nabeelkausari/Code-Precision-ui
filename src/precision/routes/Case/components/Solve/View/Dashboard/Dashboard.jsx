import React, { Component } from 'react';
import {DashboardContainer} from "../../../../containers/solve/view/dashboard/dashboard";
import './dashboard.scss';
import Editor from "../../../../../../components/Editor";


class Dashboard extends Component {
    render() {
        return (
            <div className="card-container">
                <Editor/>

                {this.props.steps && this.props.steps.map((step, index) =>
                <div className="card" >
                    <div>
                    <span className="card__index-no">{index+1}</span>
                    </div>
                </div>
                )}

            </div>
        );
    };
};

export default DashboardContainer(Dashboard)