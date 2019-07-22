import React, {Component, Fragment} from 'react';
import {Nav, Navbar} from "react-bootstrap";
import { NavLink } from 'react-router-dom'
import {Logo} from "../../../../../images";
import ScenarioHeaderContainer from '../../../containers/solve/scenarioHeader';

import './Header.scss';

class ScenarioHeader extends Component {
    render() {
        const {current_case} = this.props;
        return (
            <Fragment>
                <Navbar bg="scenario-header">
                    <Navbar.Brand href="/">
                        <img className="logo" src={Logo} alt="Logo"/>
                    </Navbar.Brand>
                    <h4 className="case-title">Case: Lowering Attrition Rate</h4>
                    <Nav>
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
                    <div>
                        <img src="" alt="Add Scenario"/>
                    </div>
                </Navbar>
                {this.props.children}
            </Fragment>
        );
    }
}

export default ScenarioHeaderContainer(ScenarioHeader);