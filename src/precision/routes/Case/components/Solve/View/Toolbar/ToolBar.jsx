import React, {Component} from 'react';

import './Toolbar.scss';
import FunctionsFlyout from "./FunctionsFlyout";
import TablesFlyout from "./TablesFlyout";
import ToolBarItems from "./ToolBarItems";

import {ToolbarContainer} from "../../../../containers/solve/view/toolbar/toolbar";

class ToolBar extends Component {
    state = {
        is_function_flyout_open: false,
        is_table_flyout_open: false
    };

    toggleTable = () => {
        if(this.state.is_function_flyout_open)
            this.setState({is_function_flyout_open:false});

        this.setState((state) => {
            return {is_table_flyout_open: !state.is_table_flyout_open};
        });

    };

    toggleFunction = () =>{
        if(this.state.is_table_flyout_open)
            this.setState({is_table_flyout_open:false});

        this.setState((state) => {
            return {is_function_flyout_open: !state.is_function_flyout_open};
        });
    };

    render() {
        const {is_function_flyout_open, is_table_flyout_open, data_sets} = this.state;
        return (
            <div style={{position:"relative"}}>
                <ToolBarItems
                    onTableItemClick={this.toggleTable}
                    onFunctionItemClick={this.toggleFunction}
                    {...this.props}
                />
                {
                    is_function_flyout_open &&
                        <FunctionsFlyout/>
                }
                {
                    is_table_flyout_open &&
                        <TablesFlyout data_sets={this.props.dataset_list.items} {...this.props} />
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