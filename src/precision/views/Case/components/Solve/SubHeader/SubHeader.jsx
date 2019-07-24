import React, {Component, Fragment} from 'react';
import {Nav, Navbar} from "react-bootstrap";
import {NavLink} from "react-router-dom";
import {DatasetIcon, ConsoleIcon} from '../../../../../images/index'

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

                            {/*<Nav.Item bsPrefix="bg-sub-header__items">*/}
                            {/*    <NavLink exact to={`${current_route}/dashboard`}*/}
                            {/*             className='bg-sub-header__link'*/}
                            {/*             activeClassName="active"*/}
                            {/*    >*/}

                            {/*        Dashboard*/}
                            {/*    </NavLink>*/}
                            {/*</Nav.Item>*/}

                            <Nav.Item bsPrefix="bg-sub-header__items">
                                <NavLink exact to={`${current_route}/dataset`}
                                         className='bg-sub-header__link'
                                         activeClassName="active">
                                    {/*<div className="tab-wrapper">*/}
                                        <span className="tab-wrapper__icon-wrapper">
                                            <DatasetIcon className="tab-wrapper__icon tab-wrapper__icon--dataset"/>
                                        </span>
                                        <span className="tab-wrapper__text">
                                            Data Set
                                        </span>
                                    {/*</div>*/}

                                </NavLink>
                            </Nav.Item>

                            <Nav.Item bsPrefix="bg-sub-header__items">
                                <NavLink exact to={`${current_route}/console`}
                                         className='bg-sub-header__link'
                                         activeClassName="active"
                                >
                                    {/*<div className="tab-wrapper">*/}
                                        <span className="tab-wrapper__icon-wrapper">
                                            <ConsoleIcon className="tab-wrapper__icon"/>
                                        </span>
                                        <span className="tab-wrapper__text">
                                            Console
                                        </span>
                                    {/*</div>*/}
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