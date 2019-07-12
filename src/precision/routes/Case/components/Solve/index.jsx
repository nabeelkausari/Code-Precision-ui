import React, {Component} from 'react';
import ToolBar from "./View/Toolbar/ToolBar";

import SubHeader from "./SubHeader/SubHeader";
import Steps from "./Steps/Steps";
import Dataset from "./View/Dataset/Dataset";


import {SolveContainer} from '../../containers/solve/solve'
import {Console} from "./View/Console/Console";
import Process from "./View/Process/Process";
import Dashboard from "./View/Dashboard/Dashboard";
import Notes from "./View/Notes/Notes";

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

    renderCaseView = () =>{
      console.log(this.props.match.params.view);
      switch (this.props.match.params.view) {
          case 'dataset': return <Dataset/>;
          case 'console': return <Console/>;
          case 'process': return <Process/>;
          default: return  <Dashboard />
      }
    };

  render() {
      const {show_notes_flyout, notes_info} = this.props;
      return (
      <div style={{display:"flex"}}>
        <div style={{flex:"1"}}>
            <SubHeader/>
            <ToolBar/>
            {this.renderCaseView()}
        </div>
          <Steps/>
          {!!show_notes_flyout && <Notes notes={notes_info}/>}
      </div>
    );
  }
}

export default SolveContainer(CaseSolve);
