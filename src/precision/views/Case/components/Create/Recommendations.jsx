import React, {Component} from 'react';
import {Button} from "../../../../components/Buttons/Button";
import {FormInput} from "../../../../components/Forms/FormInput/FormInput";
import {SelectableCaseCard} from "../List/caseCard";
import Loader from "../../../../components/Loader";
import CaseContainer from "../../containers/Create/createCase";

class Recommendations extends Component {

    state = {
        selected_recommendations:[]
    }
    continueToCaseInfo = () =>{
        this.props.selectRecommendation(this.state.selected_recommendations);
        this.props.history.push("/create/case_info")
    }

    skipToCaseInfo = () =>{
        this.props.history.push("/create/case_info")
    }


    componentDidMount() {
        if(this.props.case_create.problem._links === undefined) return  this.props.history.push('/create')
        this.props.getRecommendations()
    }

    selectRecommendation = (id) => {
        const {selected_recommendations} = this.state;
        let newSelections = [...selected_recommendations];
        const index = selected_recommendations.indexOf(id);
        if(index !== -1) {
            newSelections.splice(index,1);
        }else{
            newSelections.push(id);
        }
        this.setState({selected_recommendations:newSelections});

    }

    render() {
        const {recommendations} = this.props;
        return (
            <div>
                <Loader loading={recommendations.fetch_case_recommendations_requested}/>
                <div style={{display:"flex",justifyContent:"space-between"}}>
                    <h4>Select any of our recommended reference case</h4>
                    <p onClick={this.skipToCaseInfo}>skip</p>
                    <Button buttonType="primary" onClick={this.continueToCaseInfo}>Continue</Button>
                </div>
                <div>
                    <FormInput type="text" placeholder="Search by tag, Keyword"/>
                </div>
                <div style={{display:"flex",flexWrap: "wrap"}}>
                    {
                        recommendations.list !== undefined && recommendations.list.map((item,i) =>(
                            <SelectableCaseCard selectRecommendation={this.selectRecommendation} key={i} case={item}/>
                        ))
                    }
                </div>
            </div>
        );
    }
}

export default CaseContainer(Recommendations);