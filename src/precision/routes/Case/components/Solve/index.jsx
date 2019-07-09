import React, {Component} from 'react';
import ToolBar from "./View/Toolbar/ToolBar";

import SolveContainer from '../../containers/solve/solve'

class CaseSolve extends Component {

  componentDidMount() {
    this.props.getCase()
  }

  render() {
    return (
      <div style={{position : "relative"}}>
        <span>Scenario</span>
        <ToolBar/>
      </div>
    );
  }
}

export default SolveContainer(CaseSolve);
