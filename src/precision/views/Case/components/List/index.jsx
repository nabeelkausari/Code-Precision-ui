import React, {Component, Fragment} from 'react';
import {FormInput} from "../../../../components/Forms/FormInput/FormInput";
import {CaseCard, CreateCaseCard} from "./caseCard";

import CasesListContainer from '../../containers/list/list';
import Loader from '../../../../components/Loader'

import './List.scss'


class CaseList extends Component {

    state ={
        search_query:""
    }
    componentDidMount() {
        this.props.getCases();
        this.props.getCaseCategories();
    }

    onSearch = (e) => {
        this.setState({[e.target.name]:e.target.value});
    }

    viewCase = (currentCase) => {
        this.props.getCaseDetails(currentCase._links.get_case_details);
    }

    render() {
        const {is_fetching, my_cases} = this.props;
        return (
           <Fragment>
               <Loader loading={is_fetching}/>
               <div className="case-container">
                   <div className="case-container__header">

                       <div className="case-container__create-wrapper">
                           <CreateCaseCard  createCase={() =>this.props.history.push('/create')}/>
                       </div>

                       <div className="case-container__search-wrapper">
                           <FormInput type="text" name="search_query" value={this.state.search_query}  onChange={this.onSearch} placeholder="Search by tag, Keyword"/>
                       </div>

                   </div>
                   <div className="case-container__cases">
                       {
                           my_cases.map((item) => (
                               <CaseCard showView key={item.id} viewCase={this.viewCase} case={item} />
                           ))
                       }
                   </div>
               </div>
           </Fragment>
        );
    }
}

export default CasesListContainer(CaseList);