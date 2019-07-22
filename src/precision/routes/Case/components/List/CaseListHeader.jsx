import React, {Component, Fragment} from 'react';
import {Dropdown, Nav, Navbar} from "react-bootstrap";
import {NavLink} from "react-router-dom";
import {Logo} from "../../../../images";
import caseListHeaderContainer from "../../containers/list/caseListHeader";

class CaseListHeader extends Component {
    render() {
        const {profile} = this.props;
        return (
            <Fragment>
               { <Navbar bg="case-list-header">
                    <Navbar.Brand href="/">
                        <img className="logo" src={Logo} alt="Logo"/>
                    </Navbar.Brand>
                    <Nav>
                        <Nav.Item bsPrefix="case-list-header__item">
                            <NavLink exact to="/cases" className='case-list-header__item-link' activeClassName="active">My Cases</NavLink>
                        </Nav.Item>
                        <Nav.Item bsPrefix="case-list-header__item">
                            <NavLink to="/cases/all_cases" className='case-list-header__item-link' activeClassName="active">All Cases</NavLink>
                        </Nav.Item>
                    </Nav>
                    <Dropdown bsPrefix="user-profile">
                        <Dropdown.Toggle variant="success" id="dropdown-basic">
                            <img className="user-profile__logo" src={profile.profile_pic_url} alt=""/>
                            <p>{profile.name}</p>
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            <Dropdown.Item href="#/action-1">{profile.email_id}<br/><p>"Account"</p></Dropdown.Item>
                            <Dropdown.Item onClick={this.props.logout}>Log out</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </Navbar>}
                {this.props.children}
            </Fragment>
        );
    }
}

export default caseListHeaderContainer(CaseListHeader);