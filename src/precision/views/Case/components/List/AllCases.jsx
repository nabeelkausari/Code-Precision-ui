import React, {Component, Fragment} from 'react';
import {CaseCard, NoCases} from "./caseCard";
import {FormInput} from "../../../../components/Forms/FormInput/FormInput";

import CasesListContainer from '../../containers/list/list';
import Loader from "../../../../components/Loader";

class AllCases extends Component {

    state ={
        search_query:"",
        current_category:"All Categories"
    }
    componentDidMount() {
        this.props.getAllCases();
        this.props.getCaseCategories();
    }

    onSearch = (e) => {
        this.setState({[e.target.name]:e.target.value});
    };

    renderAllCases = () => {
        let cases_list = [];
        this.props.all_cases.map(item =>(
            cases_list.push(<CaseCard showView={false} key={item.id} viewCase={this.viewCase} case={item}/>)
        ));
        return cases_list;
    };

    viewCase = (currentCase) => {
        this.props.getCaseDetails(currentCase._links.get_case_details);
    }

    renderSelectedCategoryCases = () => {
        let cases_list = [];
        this.props.all_cases.map(item => {
            if(item.category === this.state.current_category){
               cases_list.push(<CaseCard showView={false} key={item.id} viewCase={this.viewCase}  case={item}/>)
            }
            return [];
        });
        if (cases_list.length === 0) cases_list.push(<NoCases/>)
        return cases_list
    };



    render() {
        const { case_categories, is_fetching} = this.props;
        const {search_query,current_category} = this.state;
        return (
            <Fragment>
                <Loader loading={is_fetching}/>
                <div className="case-container">
                    <FormInput type="text" name="search_query" value={search_query}  onChange={this.onSearch} placeholder="Search by tag, Keyword"/>
                    {!is_fetching && <div style={{display: "flex",justifyContent: "space-around", flexWrap: "wrap"}}>
                        {
                            case_categories.map((category,i) =>(
                                <p key={i} onClick={() =>this.setState({current_category:category})}>{category}</p>
                            ))
                        }
                    </div>}
                    <div style={{display:"flex",flexWrap: "wrap"}}>
                        {
                            current_category === "All Categories" ?
                                this.renderAllCases()
                                :
                                this.renderSelectedCategoryCases()
                        }
                    </div>
                </div>
            </Fragment>
        );
    }
}

export default CasesListContainer(AllCases);


