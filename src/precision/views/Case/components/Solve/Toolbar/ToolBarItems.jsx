import React, {Component, Fragment} from 'react';
import {Button} from "../../../../../components/Buttons/Button";

class ToolBarItems extends Component {

    renderTablePills = () => {
        const output = [];
        const {selections, dataset_list:{by_uri}} = this.props;
        for (let key in selections) {
            if (selections.hasOwnProperty(key)) {
                output.push(
                    <div key={key} className="pill">
                        <span className="pill__text">{by_uri[key].name}: {selections[key].length} column selected</span>
                        <span className="pill__cancel" onClick={() =>this.props.deleteColumnSelection(key)}><i className="fa fa-times" /></span>
                    </div>
                )
            }
        }
        return output
    };

    render() {
        const {selections, fx_selected, fx_name, removeSelectedFunction} = this.props;
        return (
            <div className="toolbar-container">
                <div className="tool --flex-basis-30" onClick={this.props.onTableItemClick}>
                    <p className="tool__title">Table:</p>
                    <div className="pill-container">
                       {Object.entries(selections).length === 0
                           ? <span className="pill-container__placeholder">Select Column</span>
                           :
                           <Fragment>
                               {this.renderTablePills()}
                           </Fragment>
                       }
                    </div>
                </div>
                <div className="tool --flex-basis-25" onClick={this.props.onFunctionItemClick}>
                    {/*<img className="tool__image" src="" alt="Table"/>*/}
                    <p className="tool__title">Function:</p>
                    <div className="pill-container">
                        {!fx_selected ?<span className="pill-container__placeholder">Select Function</span>:
                        <div className="pill">
                            <span className="pill__text">{fx_name}</span>
                            <span className="pill__cancel" onClick={removeSelectedFunction}><i className="fa fa-times"></i></span>
                        </div>}
                    </div>
                </div>
                <Button
                    buttonType="primary"
                    // className="--flex-basis-20"
                    onClick={this.props.executeFunction}
                >
                    Run Function
                </Button>
            </div>
        );
    }
}

export default ToolBarItems;
