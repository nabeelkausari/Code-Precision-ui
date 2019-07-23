import React, {Component, Fragment} from 'react';
import {Nav, Navbar} from "react-bootstrap";
import { NavLink } from 'react-router-dom'

import ScenarioHeaderContainer from '../../../containers/solve/scenarioHeader'

import {Logo} from "../../../../../images";
import './Header.scss';

class ScenarioHeader extends Component {
    render() {
        const {current_case, profile} = this.props;
        return (
            <Fragment>
                <div style={{display : 'flex'}}>
                    <Navbar bg="scenario-header">
                        <Navbar.Brand href="/">
                            <img className="logo" src={Logo} alt="Logo"/>
                        </Navbar.Brand>
                        <Nav >
                            <Nav.Item bsPrefix="scenario-item">
                                <NavLink exact to="/cases/3/4" className='reference' activeClassName="active">Reference</NavLink>
                            </Nav.Item>
                            {
                                current_case.scenarios && current_case.scenarios.map(scenario =>(
                                    <Nav.Item bsPrefix="scenario-item">
                                        <NavLink to={`/cases/${current_case.id}/${scenario.id}`} className='scenarios' activeClassName="active">{scenario.name}</NavLink>
                                    </Nav.Item>
                                ))
                            }
                        </Nav>
                        <h4 className="case-title">Case: Lowering Attrition Rate</h4>

                        {/*<div>*/}
                        {/*<img src="" alt="Add Scenario"/>*/}
                        {/*</div>*/}
                    </Navbar>
                    <div className="user-details">
                        <span className="user-details__icon">NK</span>
                        {profile.name}
                    </div>
                </div>
                {this.props.children}
            </Fragment>
        );
    }
}

export default ScenarioHeaderContainer(ScenarioHeader);