import * as React from 'react';
import * as $ from 'jquery';
import { Component } from 'react';
import { CsvTable } from './CsvTable';
import {DataTableContainer} from "../../../../containers/solve/view/dataset/dataTable";
import './DataTable.scss';

const selected_style = { background: 'rgb(229, 247, 247)' };

class DataTable extends Component {

    handleScroll = (evt) => {
        const currentScrollTopOffset = evt.target.scrollTop;
        if (!!this.props.className)
            $('.' + this.props.className + ' .fixedTableHeaderWrapper').css('top', currentScrollTopOffset);
        else
            $('.fixedTableHeaderWrapper:last').css('top', currentScrollTopOffset);
    };

    render() {
        const { csv, selections, onColumnClick, onError, getHeaders, getRow, className, addHeaders, disable_selection, onDisableClick , top} = this.props;
        return (
            <div className={className || 'table-container'} style={{ top : `${top !== undefined ? top : '78px'}`}}  onScroll={(evt) => this.handleScroll(evt)}>
            {csv !== undefined && <CsvTable className="table"
                      bordered csv={csv}
                      download={true}
                      getHeaders={getHeaders}
                      getRow={getRow}
                      delimiter=';'
                      onColumnHeaderClick={!disable_selection ? onColumnClick : onDisableClick}
                      preview={201}
                      selectedColumnIndices={selections}
                      selectedStyle={selected_style}
                      onError={onError}
                      fixedHeader={true}
                      addHeaders={addHeaders}/>}
        </div>);
    }
}

export default DataTableContainer(DataTable)
