import React, {Component, Fragment} from 'react';
import {Nav, Navbar} from "react-bootstrap";
import {NavLink} from "react-router-dom";
import './SubHeader.scss';

class SubHeader extends Component {
    render() {
        return (
            <Fragment>
                <Navbar bg="sub-header">
                    <Nav>
                        <div className="bg-sub-header__left-container">
                            <Nav.Item bsPrefix="bg-sub-header__items">
                                <NavLink exact to="/cases/3/5/dashboard"
                                         className='bg-sub-header__link'
                                         activeClassName="active"
                                >Dashboard
                                </NavLink>
                            </Nav.Item>
                        </div>
                        <div className="bg-sub-header__right-container">
                            <Nav.Item bsPrefix="bg-sub-header__items">
                                <NavLink exact to="/cases/3/5/dataset"
                                         className='bg-sub-header__link'
                                         activeClassName="active"
                                >Data Set
                                </NavLink>
                            </Nav.Item>
                            <Nav.Item bsPrefix="bg-sub-header__items">
                                <NavLink exact to="/cases/3/5/console"
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