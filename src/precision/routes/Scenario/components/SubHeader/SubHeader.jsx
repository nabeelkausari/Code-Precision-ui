import React, {Component, Fragment} from 'react';
import {Nav, Navbar} from "react-bootstrap";
import {NavLink} from "react-router-dom";
import './_subHeader.scss';

class SubHeader extends Component {
    render() {
        return (
            <Fragment>
                <Navbar bg="scenario-sub-header">
                    <Nav>
                        <div className="dashboard-container">
                            <Nav.Item bsPrefix="sub-header-items">
                                <NavLink exact to="/cases/3/5/"
                                         className='sub-header-text'
                                         activeClassName="active"
                                >Dashboard
                                </NavLink>
                            </Nav.Item>
                        </div>
                        <div className="dataset-container">
                            <Nav.Item bsPrefix="sub-header-items">
                                <NavLink exact to="/cases/3/5/dataset"
                                         className='sub-header-text'
                                         activeClassName="active"
                                >Data Set
                                </NavLink>
                            </Nav.Item>
                            <Nav.Item bsPrefix="sub-header-items">
                                <NavLink exact to="/cases/3/5/console"
                                         className='sub-header-text'
                                         activeClassName="active"
                                >Console
                                </NavLink>
                            </Nav.Item>
                            <Nav.Item bsPrefix="sub-header-items">
                                <NavLink exact to="/cases/3/5/process"
                                         className='sub-header-text'
                                         activeClassName="active"
                                >Process
                                </NavLink>
                            </Nav.Item>
                        </div>
                    </Nav>
                </Navbar>
                {this.props.children}
            </Fragment>
        );
    }
}

export default SubHeader;