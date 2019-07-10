import React, {Component} from 'react';
import {Button} from "../../../../../../components/Buttons/Button";

class ToolBarItems extends Component {
    render() {
        return (
            <div className="toolbar-container">
                <div className="tool" onClick={this.props.onTableItemClick}>
                    <p className="tool__title">Table:</p>
                    <div className="pill-container">
                        {/*<span className="pill-container__placeholder">Select Column</span>*/}
                        <div className="pill">
                            <span className="pill__text">Table 1: 10 column selected</span>
                            <span className="pill__cancel"><i className="fa fa-times"></i></span>
                        </div>
                        <div className="pill">
                            <span className="pill__text">Table 1: 10 column selected</span>
                            <span className="pill__cancel"><i className="fa fa-times"></i></span>
                        </div>
                    </div>
                </div>
                <div className="tool" onClick={this.props.onFunctionItemClick}>
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
                    style={{flexBasis:"20%"}}
                >
                    Run Function
                </Button>
            </div>
        );
    }
}

export default ToolBarItems;