import React, {Component} from 'react';
import Checkbox from "../../../../../../components/Checkbox/Checkbox";
import ToolbarFlyout from "./ToolbarFlyout";
import "./tablesFlyout.scss"



class TablesFlyout extends Component {


    handleAvailableColumnSelect = (column) => {

        if(this.props.selections[this.props.current_dataset] !== undefined){
            this.props.setColumnSelections(this.props.current_dataset, column);
        }else{
            if(Object.keys(this.props.selections).length < 2){
                this.props.setColumnSelections(this.props.current_dataset, column);
            }else{
                alert("you have already selected two tables")
            }
        }

    };

    render() {
        const {columns, current_dataset} = this.props
        const selected = this.props.selections[current_dataset] || [];
        return (
            <div>
                <ToolbarFlyout>
                    <div className="columns-box">
                        {/*{(selected.length !== 0)?*/}
                        {/*<h6 className="columns-box__selected-text">{selected.length}&nbsp;Selected</h6>*/}
                        {/*:*/}
                        {/*<h6 className="columns-box__selected-text">&nbsp;</h6>*/}
                        {/*}*/}
                        {/*{columns.length > 0 && columns.map((column,i) =>*/}

                            {/*<Checkbox checked={selected.indexOf(column) >= 0}  onChange={() => this.handleAvailableColumnSelect(column)} label={column.key} key={i}/>*/}

                        {/*)}*/}

                        <div className="columns-box__left">
                            {columns.length > 0 && columns.slice(0,Math.ceil(columns.length/2)).map((column,i) =>

                                <Checkbox checked={selected.some((item)=> item.key === column.key)}  onChange={() => this.handleAvailableColumnSelect(column)} label={column.key} key={i}/>

                            )}
                        </div>

                        <div className="columns-box__right">
                            {columns.length > 0 && columns.slice(Math.ceil(columns.length/2),columns.length).map((column,i) =>

                                <Checkbox checked={selected.some((item)=> item.key === column.key)}  onChange={() => this.handleAvailableColumnSelect(column)} label={column.key} key={i}/>
                            )}
                        </div>

                    </div>
                </ToolbarFlyout>
            </div>
        );
    }
}

export default TablesFlyout;