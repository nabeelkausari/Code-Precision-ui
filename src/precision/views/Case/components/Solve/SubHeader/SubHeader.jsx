import React, {Component, Fragment} from 'react';
import {Nav, Navbar} from "react-bootstrap";
import {NavLink} from "react-router-dom";

import './SubHeader.scss';

class SubHeader extends Component {

    render() {
        const case_id = this.props.match.params.case_id
        const scenario_id =  this.props.match.params.scenario_id
        const current_route = `/cases/${case_id}/${scenario_id}`;
        return (
            <Fragment>
                <Navbar bg="sub-header">
                    <Nav>
                        <div className="bg-sub-header__container">

                            <Nav.Item bsPrefix="bg-sub-header__items">
                                <NavLink exact to={`${current_route}/dashboard`}
                                         className='bg-sub-header__link'
                                         activeClassName="active"
                                >

                                    Dashboard
                                </NavLink>
                            </Nav.Item>

                            <Nav.Item bsPrefix="bg-sub-header__items">
                                <NavLink exact to={`${current_route}/dataset`}
                                         className='bg-sub-header__link'
                                         activeClassName="active">
                                    Data Set
                                </NavLink>
                            </Nav.Item>

                            <Nav.Item bsPrefix="bg-sub-header__items">
                                <NavLink exact to={`${current_route}/console`}
                                         className='bg-sub-header__link'
                                         activeClassName="active"
                                >Console
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