import React, {Component} from 'react';
import ToolBar from "./View/Toolbar/ToolBar";

import SubHeader from "./SubHeader/SubHeader";
import Steps from "./Steps/StepList";
import {Dataset} from "./View/Dataset/Dataset";


import {SolveContainer} from '../../containers/solve/solve'
import {Console} from "./View/Console/Console";
import Process from "./View/Process/Process";
import Dashboard from "./View/Dashboard/Dashboard";
import Step from "./Steps/Step";
import Flyout from "../../../../components/Flyout/Flyout";
import ResultsFlyout from "./Result/ResultFlyout";
import {hidePrimaryFlyout, hideSecondaryFlyout} from "../../../../modules/case/actions";

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
      console.log(this.props.match.params.view)
      switch (this.props.match.params.view) {
          case 'dataset': return <Dataset/>;
          case 'console': return <Console/>;
          case 'process': return <Process/>;
          default: return  <Dashboard />

      }
    }

    renderSteps = () => {
      let route = this.props.match.params.view
        if(route === 'dataset' || route === 'dashboard')
        {
            return <Steps/>
        }
    }

  render() {

      const {is_primary_flyout_open, is_secondary_flyout_open, hidePrimaryFlyout, hideSecondaryFlyout} = this.props
      console.log("PRIMARY FLYOUT : ",is_primary_flyout_open)

      return (
      <div>
       <div style={{display:"flex"}}>
           <div style={{flex:"1", position:'relative'}}>
               <SubHeader/>
               <ToolBar/>
               {this.renderCaseView()}
               { (is_primary_flyout_open || is_secondary_flyout_open) &&
                   <div className="flyoutContainer">
                       {is_primary_flyout_open && <ResultsFlyout hideFlyout = {hidePrimaryFlyout}/>}
                       {is_secondary_flyout_open && <ResultsFlyout secondary hideFlyout={hideSecondaryFlyout}/>}
                   </div>
               }
           </div>

           {this.renderSteps()}

       </div>
          <div>


          </div>

      </div>
    );
  }
}

export default SolveContainer(CaseSolve);
