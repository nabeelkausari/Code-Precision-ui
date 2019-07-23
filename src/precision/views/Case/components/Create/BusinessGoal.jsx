import React, {Component} from 'react';
import {Button} from "../../../../components/Buttons/Button";

import CaseContainer from "../../containers/Create/createCase"

class BusinessGoal extends Component {
    state ={
        description:"dsa",
        issue:"fads",
        outcome:"fdsa"
    };

    componentDidMount() {
        this.props.getCaseCategories()
    }

    handleInputChange = (e) => {
        this.setState({[e.target.name]:e.target.value});
    }

    submitBusinessGoal = () =>{
        this.props.createBusinessProblem(this.state);
    };

    componentDidUpdate(prevProps, prevState, snapshot) {
        const {create_problem_succeeded} = this.props.case_create;
        if(create_problem_succeeded && create_problem_succeeded !== prevProps.create_problem_succeeded){
            this.props.history.push('/create/our_recommendations')
        }
    }


    render() {
        const { description, issue, outcome} = this.state;
        return (
            <div>
               <div style={{display:"flex",justifyContent:"space-between"}}>
                   <h4>Define Business goal</h4>
                   <Button buttonType="primary" onClick={this.submitBusinessGoal}>Continue</Button>
               </div>
               <div style={{display:"flex", flexDirection:"column"}}>
                    <p>Describe your business problem or strategy</p>
                   <textarea placeholder=" Describe here" name="description" value={description} onChange={this.handleInputChange}/>

               </div>
               <div style={{display:"flex", flexDirection:"column"}}>
                    <p>Current state or issue</p>
                   <textarea placeholder=" Describe here" name="issue" value={issue} onChange={this.handleInputChange}/>

               </div>
               <div style={{display:"flex", flexDirection:"column"}}>
                    <p>Expected Outcome</p>
                   <textarea placeholder=" Describe here" name="outcome" value={outcome} onChange={this.handleInputChange}/>
               </div>
            </div>
        );
    }
}

export default CaseContainer(BusinessGoal);