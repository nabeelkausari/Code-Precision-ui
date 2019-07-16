import React, {Component} from 'react';

import FunctionsFlyout from "./FunctionFlyout";
import TablesFlyout from "./TablesFlyout";
import ToolBarItems from "./ToolBarItems";
import './ToolBar.scss';
import {ToolbarContainer} from "../../../containers/solve/view/toolbar/toolbar";

class ToolBar extends Component {
    state = {
        is_function_flyout_open: false,
        is_table_flyout_open: false,
        fx_selected: false,
        fx_name: ""
    };


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

        this.setState((state) => {
            return {is_function_flyout_open: !state.is_function_flyout_open};
        });
    };

    addFunction = () => {
        const {execution} = this.props;
        this.setState({
            fx_selected: true,
            fx_name: execution.current_function.name,
            is_function_flyout_open: false
        });
        this.props.closeParameterFlyout()
    };

    removeFunction = () => {
        this.setState({
            fx_selected: false,
            fx_name: ""
        });
        this.props.removeSelectedFunctionsAndParameters()
    }

    render() {
        const {is_function_flyout_open, is_table_flyout_open, fx_selected, fx_name} = this.state;
        return (
            <div style={{position:"relative"}}>
                <ToolBarItems
                    onTableItemClick={this.toggleTable}
                    onFunctionItemClick={this.toggleFunction}
                    fx_selected={fx_selected}
                    fx_name={fx_name}
                    removeSelectedFunction={this.removeFunction}
                    {...this.props}
                />
                {
                    is_function_flyout_open &&
                        <FunctionsFlyout
                            {...this.props}
                            addFunction={this.addFunction}
                        />
                }
                {
                    is_table_flyout_open &&
                        <TablesFlyout
                            data_sets={this.props.dataset_list.items}
                            {...this.props}
                        />
                }

                {
                    is_function_flyout_open  &&
                    <div className="fx-flyout__backdrop"></div>
                }
            </div>
        );
    }
}

export default ToolbarContainer(ToolBar);