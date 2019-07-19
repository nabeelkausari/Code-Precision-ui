import React, {Component, Fragment} from 'react';
import { Link } from "react-router-dom";
import {FormInput} from "../../../../components/Forms/FormInput/FormInput";
import {CaseCard, CreateCaseCard} from "./caseCard";

import CasesListContainer from '../../containers/list/list';
import Loader from '../../../../components/Loader'

import './List.scss'


class CaseList extends Component {

    componentDidMount() {
        this.props.getCases();
        this.props.getCaseCategories();

    }

    render() {
        const {is_fetching, my_cases} = this.props;
        return (
           <Fragment>
               <Loader loading={is_fetching}/>
               <div className="case-container">
                   <Link to={'/cases/4'}>List</Link>
                   <FormInput type="text" placeholder="Search by tag, Keyboard"/>
                   <div style={{display:"flex",flexWrap: "wrap"}}>
                       <CreateCaseCard/>
                       {
                           my_cases.map((item) => (
                               <CaseCard key={item.id} case={item} />
                           ))
                       }
                   </div>
               </div>
           </Fragment>
        );
    }
}

export default CasesListContainer(CaseList);