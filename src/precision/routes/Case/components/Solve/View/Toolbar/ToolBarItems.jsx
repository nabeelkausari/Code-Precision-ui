import React, {Component, Fragment} from 'react';
import {Button} from "../../../../../../components/Buttons/Button";

class ToolBarItems extends Component {

    renderTablePills = () => {
        const output = [];
        const {selections, dataset_list:{by_uri}} = this.props;
        for (let key in selections) {
            if (selections.hasOwnProperty(key)) {
                output.push(
                    <div className="pill">
                        <span className="pill__text">{by_uri[key].name}: {selections[key].length} column selected</span>
                        <span className="pill__cancel"><i className="fa fa-times"></i></span>
                    </div>
                )
            }
        }
        return output
    };

    render() {
        const {selections} = this.props;
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
                        {/*<span className="pill-container__placeholder">Select Function</span>*/}
                        <div className="pill">
                            <span className="pill__text">Bar Chart</span>
                            <span className="pill__cancel"><i className="fa fa-times"></i></span>
                        </div>
                    </div>
                </div>
                <Button
                    buttonType="primary"
                    // className="--flex-basis-20"
                >
                    Run Function
                </Button>
            </div>
        );
    }
}

export default ToolBarItems;