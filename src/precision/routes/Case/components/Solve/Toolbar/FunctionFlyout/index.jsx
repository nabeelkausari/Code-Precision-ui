import React, {Component} from 'react';
import {FormInput} from "../../../../../../components/Forms/FormInput/FormInput";
import {Button} from "../../../../../../components/Buttons/Button";
import {SearchResults} from "./SearchResults";
import {FunctionsMenu} from "./FunctionsMenu";
import FunctionParams from "./FunctionParams";

class FunctionsFlyout extends Component {

    state = {
        category_selected:false,
        function_selected: false,
        search_text:"",
        active_category: {},
        active_function:{}
    };

    componentDidMount() {
        if(Object.keys(this.props.execution.current_function_category).length === 0 ){
            this.props.setSelectedFunctionCategory(this.props.categories[0])
        }
    }

    handleInputChange = (e) => {
        this.setState({[e.target.name]:e.target.value});
        this.props.suggestFunctions(e.target.value);
    };

    onCategorySelect = (category) => {
        this.props.setSelectedFunctionCategory(category)
    };

    onFunctionClick = (fx) => {
        this.setState({function_selected:true});
        this.props.setSelectedFunction(fx);
        this.props.getFunctionDescription(fx._links.material);
        this.props.getFunctionParameters(fx);
    };

    render() {
        const {search_text} = this.state;
        const {categories,suggestions,description, parameters, parameter_flyout_open, addFunction, execution} = this.props;
        return (
            <div className="fx">
              <div className="fx__left">
                <div className="fx__header">
                    <FormInput
                        type="text"
                        placeholder="Search functions"
                        name="search_text"
                        onChange={this.handleInputChange}
                        value={search_text}
                    />
                </div>
                   {
                       search_text !== ""  ?
                           <SearchResults suggestions={suggestions}  onFunctionClick={this.onFunctionClick}/> :
                           <FunctionsMenu
                               active_category={execution.current_function_category}
                               active_function={execution.current_function}
                               categories={categories}
                               onCategoryChange={this.onCategorySelect}
                               onFunctionClick={this.onFunctionClick}
                           />
                   }
              </div>

             {
                 parameter_flyout_open && <div className="fx__right">
                 <div className="fx__right-details">
                     <div className="fx__header">
                        <h2 className="fx__header-title">{execution.current_function.name}</h2>
                         <Button buttonType="primary" onClick={addFunction}>Add</Button>
                     </div>
                     <div className="">
                        <div className="fx__parameters">
                            { parameters.fetch_function_parameters_succeeded &&
                                parameters.list.map(({ name, multi_table }) =>
                                <FunctionParams
                                    key={name}
                                    parameter_name={name}
                                    readonly={false}
                                    multi_table={multi_table}/>
                                    )
                            }
                        </div>
                         <div className="fx__description">
                             {description.info.text}
                         </div>
                     </div>

                 </div>
              </div>
             }
            </div>
        );
    }
}

export default FunctionsFlyout;