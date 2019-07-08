import React, {Component, Fragment} from 'react';
import {Nav, Navbar} from "react-bootstrap";
import {NavLink} from "react-router-dom";

class SubHeader extends Component {


    render() {
        return (
            <Fragment>
                <Navbar bg="scenario-sub-header">
                    <Nav>
                        <Nav.Item bsPrefix="scenario-item">
                            <NavLink exact to="/cases/3/4/Dashboard" activeClassName="active">Dashboard</NavLink>
                        </Nav.Item>
                        <Nav.Item bsPrefix="scenario-item">
                            <NavLink to="/cases/3/4/Data_Set" activeClassName="active">Data Set</NavLink>
                        </Nav.Item>
                        <Nav.Item bsPrefix="scenario-item">
                            <NavLink to="/cases/3/5/Console" activeClassName="active">Console</NavLink>
                        </Nav.Item>
                        <Nav.Item bsPrefix="scenario-item">
                            <NavLink to="/cases/3/5/Process" activeClassName="active">Process</NavLink>
                        </Nav.Item>
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

export default SubHeader;