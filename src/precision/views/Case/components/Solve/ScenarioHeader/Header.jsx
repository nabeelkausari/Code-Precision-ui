import React, {Component, Fragment} from 'react';
import {Nav, Navbar} from "react-bootstrap";
import { NavLink } from 'react-router-dom'
import {Logo} from "../../../../../images";
import './Header.scss';

class ScenarioHeader extends Component {
    render() {
        return (
            <Fragment>
                <Navbar bg="scenario-header">
                    <Navbar.Brand href="/">
                        <img className="logo" src={Logo} alt="Logo"/>
                    </Navbar.Brand>
                    <Nav >
                        <Nav.Item bsPrefix="scenario-item">
                            <NavLink exact to="/cases/3/4" className='reference' activeClassName="active">Reference</NavLink>
                        </Nav.Item>
                        <Nav.Item bsPrefix="scenario-item">
                            <NavLink to="/cases/3/5/" className='scenarios' activeClassName="active">Scenario 1</NavLink>
                        </Nav.Item>
                    </Nav>
                    <h4 className="case-title">Case: Lowering Attrition Rate</h4>

                    {/*<div>*/}
                        {/*<img src="" alt="Add Scenario"/>*/}
                    {/*</div>*/}
                </Navbar>
                {this.props.children}
            </Fragment>
        );
    }
}

export default ScenarioHeader;