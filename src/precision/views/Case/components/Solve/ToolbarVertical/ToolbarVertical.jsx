import React, {Component} from 'react';
import cx from "classnames";
import {ToolbarContainer} from "../../../containers/solve/view/toolbar/toolbar";
import "./toolbarVertical.scss"
import {FunctionsIcon, DatasetIcon, RightArrowIcon} from "../../../../../images/index"
import FunctionsFlyout from "./Flyouts/FunctionsFlyout";
import TablesFlyout from "./Flyouts/TablesFlyout";
import {FormInput} from "../../../../../components/Forms/FormInput/FormInput";
import {removeSelectedFunctionsAndParameters} from "../../../../../modules/case/toolbar/actions";


class ToolbarVertical extends Component {

    state = {
        current_dataset: '',
        columns: [],
        selectedColumns: [],
        is_function_flyout_open: false,
        is_table_flyout_open: false,
        fx_selected: false,
        fx_name: "",
        selected_category : null,
        selected_dataset : null,
        search_text:"",
    };

    componentDidMount() {

        if(this.props.data_sets){
            this.setState({
                current_dataset: this.props.this.props.dataset_list.items[0].ref,
                columns: this.props.this.props.dataset_list.items[0].columns
            })

            if(Object.keys(this.props.execution.current_function_category).length === 0 ){
                this.props.setSelectedFunctionCategory(this.props.categories[0])
            }
        }
    }

    toggleTable = () => {
        if(this.state.is_function_flyout_open)
            this.setState({is_function_flyout_open:false});

        if(this.state.is_table_flyout_open)
            return this.setState({is_table_flyout_open: false});

        this.setState((state) => {
            return {is_table_flyout_open: true};
        });
    };

    toggleFunction = () =>{
        if(this.state.is_table_flyout_open)
            this.setState({is_table_flyout_open:false});

        if(this.state.is_function_flyout_open)
            return this.setState({is_function_flyout_open: false});

        this.setState((state) => {
            return {is_function_flyout_open: !state.is_function_flyout_open};
        });
    };

    onOutsideClick = () => {
        this.setState({
            is_function_flyout_open: false,
            is_table_flyout_open: false,
            selected_category : null,
            selected_dataset : null,
            search_text:""
        });
        this.props.removeSelectedFunctionsAndParameters()
    }


    handleDisplayColumns = (dataset) => {

        this.setState({
            current_dataset: dataset.ref,
            columns: dataset.columns,
            is_function_flyout_open : false,
            selected_category : null
        })

        if(this.state.selected_dataset == null){
            this.toggleTable();
        }
        if(dataset !== this.state.selected_dataset){
            this.setState({selected_dataset : dataset});
        }
        else{
            this.toggleTable();
            this.setState({selected_dataset : null});
        }
    };

    onCategorySelect = (category) => {
        this.props.removeSelectedFunctionsAndParameters();
        this.setState({
            is_table_flyout_open : false,
            selected_dataset : null
        })
        this.props.setSelectedFunctionCategory(category);

        if(this.state.selected_category == null){
            this.toggleFunction();
        }
        if(category !== this.state.selected_category)
        {
            this.setState({selected_category : category})
        } else {
            this.toggleFunction();
            this.setState({selected_category : null});

        }
    };

    onFunctionClick = (fx) => {
        this.setState({function_selected:true});
        this.props.setSelectedFunction(fx);
        this.props.getFunctionDescription(fx._links.material);
        this.props.getFunctionParameters(fx);
    };

    executeFunction = () => {
        this.props.executeFunction();
        this.toggleFunction();
    }

    renderSelectionsNotifier = (ref) => {
        if(!(Object.keys(this.props.selections).length === 0 || this.props.selections === undefined)){
            return this.props.selections[ref] && this.props.selections[ref].length
        }
    };

    handleInputChange = (e) => {
        if(e.target.value === ""){
            this.setState({is_function_flyout_open:false});
        } else{
            this.setState({is_function_flyout_open:true});
            this.props.suggestFunctions(e.target.value);
        }
        this.setState({[e.target.name]:e.target.value});
    };


    render() {
        const {is_function_flyout_open, is_table_flyout_open, search_text, current_dataset, columns} = this.state;
        const {dataset_list : {items}, dataset_list, categories, execution } = this.props;
        const active_category =  execution.current_function_category;


        return (
            <div className="toolbar">
              <div className="toolbar__main-container">
                  <div className="toolbar__datasets">
                      <div className="toolbar__header">
                          <div className="toolbar__icon-wrapper">
                              <DatasetIcon className="toolbar__header-icon"/>
                              {/*<img src={dataset_icon} alt="function icon" className="toolbar__header-icon"/>*/}
                          </div>
                          <h5 className="toolbar__header-text">Datasets</h5>
                      </div>
                      <div className="toolbar__search-bar"></div>
                      <ul className="toolbar__list">
                          {dataset_list && items.length > 0 && items.map((ds, i) =>
                              <li className="toolbar__item-container" key={i}
                                  // style={{color: '#52a7dc'}}
                                  onClick={() => this.handleDisplayColumns(ds)}
                              >
                                  <div className={cx("toolbar__item",{'toolbar__item--active':current_dataset === ds.ref})}>
                                      <h6 className="toolbar__title">{ds.name}</h6>
                                      <span className={this.renderSelectionsNotifier(ds.ref)?"toolbar__selected-col-notifier" : ""}>{this.renderSelectionsNotifier(ds.ref)}</span>
                                      <div className="toolbar__arrow-wrapper">
                                          <RightArrowIcon className="toolbar__arrow-icon"/>
                                          {/*<img src={right_arrow_icon} alt="left arrow" className="toolbar__arrow-icon"/>*/}
                                      </div>
                                  </div>
                              </li>
                          )}
                      </ul>
                  </div>

                  <div className="toolbar__functions">
                      <div className="toolbar__header">
                          <div className="toolbar__icon-wrapper">
                              <FunctionsIcon className="toolbar__header-icon"/>
                              {/*<img src={functions_icon} alt="function icon" className="toolbar__header-icon"/>*/}
                          </div>
                          <h5 className="toolbar__header-text">Functions</h5>
                      </div>
                      <div className="toolbar__search-bar">
                          <FormInput
                              type="text"
                              placeholder="Search functions"
                              name="search_text"
                              onChange={this.handleInputChange}
                              value={search_text}
                              autocomplete="off"
                          />
                      </div>
                      <ul className="toolbar__list">

                          {categories && categories.map((category,i) =>
                              <li className="toolbar__item-container" key={i} onClick={() => {this.onCategorySelect(category)}}>
                                  <div className={cx("toolbar__item",{'toolbar__item--active':active_category.name === category.name})}
                                      // onClick={() => onCategoryChange(category)}
                                       key={i}
                                  >
                                      <h6 className="toolbar__title">{category.name}</h6>
                                      <div className="toolbar__arrow-wrapper">
                                          <RightArrowIcon className="toolbar__arrow-icon"/>
                                          {/*<img src={right_arrow_icon} alt="left arrow" className="toolbar__arrow-icon"/>*/}
                                      </div>
                                  </div>
                              </li>
                          )}
                      </ul>
                  </div>
              </div>
                {/*<div className="toolbar__flyout-container">*/}
                {/*</div>*/}
                {
                    is_function_flyout_open &&
                    <FunctionsFlyout
                        active_category={execution.current_function_category}
                        active_function={execution.current_function}
                        categories={categories}
                        onFunctionClick={this.onFunctionClick}
                        {...this.props}
                        toggleFlyout = {this.toggleFunction}
                        execute={this.executeFunction}
                        search_text={this.state.search_text}
                    />
                }
                {
                    is_table_flyout_open &&
                    <TablesFlyout
                        data_sets={this.props.dataset_list.items}
                        {...this.props}
                        columns={columns}
                        current_dataset={current_dataset}
                    />
                }
                {
                    ( is_function_flyout_open || is_table_flyout_open) &&
                    <div className="fx-flyout__backdrop fx-flyout__backdrop--1" onClick={() => this.onOutsideClick()}></div>
                }


            </div>




        );
    }
}

export default ToolbarContainer(ToolbarVertical);