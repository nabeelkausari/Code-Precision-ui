import React, {Component} from 'react';
import ToolBar from "./View/Toolbar/ToolBar";
import {SolveContainer} from '../../containers/solve/solve'
import Steps from "./Steps/Steps";
import Dashboard from "./View/Dashboard/Dashboard";

class CaseSolve extends Component {

  componentDidMount() {
    this.props.getCase();
    this.props.getCategoryAndFunctions()
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    const {fetch_case_succeeded} = this.props;

    if(fetch_case_succeeded && prevProps.fetch_case_succeeded !== fetch_case_succeeded){
      this.props.getSteps()
    }
  }

  render() {
    return (
      <div>
        <Steps />
        <ToolBar/>
          <Dashboard />
      </div>
    );
  }
}

export default SolveContainer(CaseSolve);
