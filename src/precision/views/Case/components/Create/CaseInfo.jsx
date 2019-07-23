import React, {Component} from 'react';
import ReactSelect from 'react-select';

import {Button} from "../../../../components/Buttons/Button";
import {FormInput} from "../../../../components/Forms/FormInput/FormInput";
import CaseContainer from "../../containers/Create/createCase";

class CaseInfo extends Component {

    state = {
        name:"",
        description:"",
        category:""
    };

    componentDidMount() {
        if(this.props.case_create.problem._links === undefined)
            return  this.props.history.push('/create')
    }


    handleInputChange = (e) => {
        this.setState({[e.target.name]:e.target.value});
    };

    onCategorySelect = (option) => {
        this.setState({category:option.value});
    }

    saveCase = () => {
        this.props.createCase(this.state);
    }
    render() {
        const {name, description} = this.state;
        const options = this.props.case_categories.map(category => ({label:category,value: category}));
        return (
            <div>
                <div style={{display:"flex",justifyContent:"space-between"}}>
                    <h4>Add case information</h4>
                    <Button buttonType="primary" onClick={this.saveCase}>Save case</Button>
                </div>
                <div style={{display:"flex", flexDirection:"column"}}>
                    <p>Case name <span>(Mandatory)</span></p>
                   <FormInput  type="text" placeholder="Case Name" name="name" value={name} onChange={this.handleInputChange}/>
                </div>
                <div style={{display:"flex", flexDirection:"column"}}>
                    <p>Case Description</p>
                    <textarea placeholder=" Describe here" name="description" value={description} onChange={this.handleInputChange}/>
                </div>
                <div style={{display:"flex", flexDirection:"column"}}>
                    <p>Category</p>
                   <ReactSelect onChange={this.onCategorySelect} options={options}/>
                </div>
            </div>
        );
    }
}

export default CaseContainer(CaseInfo);