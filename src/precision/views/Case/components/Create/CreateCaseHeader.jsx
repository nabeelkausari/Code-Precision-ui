import * as React from 'react';
import {Logo} from "../../../../images";
import {Fragment} from "react";

export const CreateCaseHeader = (props) => {
    const cancelCreateCase = () =>{
        props.history.push("/cases")
    }
    return (
      <Fragment>
          <header className="header-create">
              <img className="logo" src={Logo} alt="Logo"/>
              <p className="title">Capturing Business Requirements</p>
             <span onClick={cancelCreateCase}> <i className="fa fa-times"></i></span>
          </header>
          {props.children}
      </Fragment>
    );
};