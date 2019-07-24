import React, {Component} from 'react';
import Checkbox from "../../../../../../components/Checkbox/Checkbox";
import ToolbarFlyout from "./ToolbarFlyout";
import "./tablesFlyout.scss"
import {search_icon} from '../../../../../../images/index'

class TablesFlyout extends Component {

    state = {
        is_search_open: false,
        columns_state: []
    };

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


    handleSearch = ev => {
        ev.preventDefault();
        this.setState({ is_search_open: true });
        let updatedList = this.props.columns;
        updatedList = updatedList.filter(function(col) {
            return (
                col.key.toLowerCase().search(ev.target.value.toLowerCase()) !== -1
            );
        });
        this.setState({
            columns_state: updatedList
        }, () => console.log(this.state.columns_state));
    };

    render() {
        const {columns, current_dataset} = this.props;
        const {is_search_open, columns_state} = this.state;
        const selected = this.props.selections[current_dataset] || [];
        return (
            <div>
                <ToolbarFlyout>
                    <div className="search-columns">
                        <img src={search_icon} className="search-columns__icon"/>
                        <input
                            className="search-columns__input"
                            type="text"
                            placeholder="Search Columns"
                            onSelect={ev => this.handleSearch(ev)}
                        />
                    </div>
                    <div className="columns-box">
                        {/*{(selected.length !== 0)?*/}
                        {/*<h6 className="columns-box__selected-text">{selected.length}&nbsp;Selected</h6>*/}
                        {/*:*/}
                        {/*<h6 className="columns-box__selected-text">&nbsp;</h6>*/}
                        {/*}*/}
                        {/*{columns.length > 0 && columns.map((column,i) =>*/}

                            {/*<Checkbox checked={selected.indexOf(column) >= 0}  onChange={() => this.handleAvailableColumnSelect(column)} label={column.key} key={i}/>*/}

                        {/*)}*/}

                        {!is_search_open &&
                        <div style={{display: 'flex'}}>
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
                        }
                        {!!is_search_open &&
                        <div style={{display: 'flex'}}>
                            <div className="columns-box__left">
                                {columns_state.length > 0 && columns_state.slice(0,Math.ceil(columns.length/2)).map((column,i) =>

                                    <Checkbox checked={selected.some((item)=> item.key === column.key)}  onChange={() => this.handleAvailableColumnSelect(column)} label={column.key} key={i}/>

                                )}
                            </div>
                            <div className="columns-box__right">
                                {columns_state.length > 0 && columns_state.slice(Math.ceil(columns.length/2),columns.length).map((column,i) =>

                                    <Checkbox checked={selected.some((item)=> item.key === column.key)}  onChange={() => this.handleAvailableColumnSelect(column)} label={column.key} key={i}/>
                                )}
                            </div>
                        </div>
                        }
                    </div>
                </ToolbarFlyout>
            </div>
        );
    }
}

export default TablesFlyout;