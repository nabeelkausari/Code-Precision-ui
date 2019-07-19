import React, {Component, Fragment} from 'react';
import {CaseCard} from "./caseCard";
import {FormInput} from "../../../../components/Forms/FormInput/FormInput";

import CasesListContainer from '../../containers/list/list';
import Loader from "../../../../components/Loader";

class AllCases extends Component {

    componentDidMount() {
        this.props.getAllCases();
        this.props.getCaseCategories();
    }

    render() {
        const {all_cases, case_categories, is_fetching} = this.props;
        return (
            <Fragment>
                <Loader loading={is_fetching}/>
                <div className="case-container">
                    <FormInput type="text" placeholder="Search by tag, Keyboard"/>
                    {!is_fetching && <div style={{display: "flex",justifyContent: "space-around", flexWrap: "wrap"}}>
                        {
                            case_categories.map(category =>(
                                <p>{category}</p>
                            ))
                        }
                    </div>}
                    <div style={{display:"flex",flexWrap: "wrap"}}>
                        {
                            all_cases.map((item) =>(
                                <CaseCard key={item.id} case={item}/>
                            ))
                        }
                    </div>
                </div>
            </Fragment>
        );
    }
}

export default CasesListContainer(AllCases);


