import React, {Component} from 'react';
import {FormInput} from "../../../../../../components/Forms/FormInput/FormInput";
import {Button} from "../../../../../../components/Buttons/Button";
import {SearchResults} from "./SearchResults";
import {FunctionsMenu} from "./FunctionsMenu";

class FunctionsFlyout extends Component {

    state = {
        category_selected:false,
        function_selected: false,
        search_text:"",
        active_category: {},
        active_function:{}
    };

    componentDidUpdate(prevProps, prevState, snapshot) {
        if(this.props.is_fetched && this.props.is_fetched !== prevProps.is_fetched ){
            this.setState({active_category:this.props.categories[0]});
        }
    }

    handleInputChange = (e) => {
        this.setState({[e.target.name]:e.target.value});
        this.props.suggestFunctions(e.target.value);
    };

    onCategorySelect = (category) => {
        this.setState({active_category: category});
    };

    onFunctionClick = (fx) => {
        this.setState({active_function: fx,function_selected:true});
        this.props.getFunctionDescription(fx._links.material)
        console.log(fx)
    };

    render() {
        const {function_selected, search_text,active_category, active_function} = this.state;
        const {categories,suggestions,description} = this.props;
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
                           <SearchResults suggestions={suggestions}/> :
                           <FunctionsMenu
                               active_category={active_category}
                               active_function={active_function}
                               categories={categories}
                               onCategoryChange={this.onCategorySelect}
                               onFunctionClick={this.onFunctionClick}
                           />
                   }
              </div>

             {
                 function_selected && <div className="fx__right">
                 <div className="fx__right-details">
                     <div className="fx__header">
                        <h2 className="fx__header-title">{active_function.name}</h2>
                         <Button buttonType="primary">Add</Button>
                     </div>
                     <div className="">
                        <div className="fx__parameters">
                            parameters
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