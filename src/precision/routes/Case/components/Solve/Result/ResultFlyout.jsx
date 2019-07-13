import React, {Component, Fragment} from 'react';
import Error from './Error'
import { CsvTable } from './CsvTable'
import Flyout from "../../../../../components/Flyout/Flyout";
import resultsContainer from '../../../containers/solve/results'
import {hideSecondaryFlyout} from "../../../../../modules/case/actions";

class ResultFlyout extends Component {
    render() {
        const {secondary, results1, results2, is_primary_step_set, is_secondary_step_set,  hideFlyout} = this.props
        console.log("PRIMARY STEP : ", is_primary_step_set)
        return (
               <Fragment> {
                   is_primary_step_set &&
                   (results1 && !secondary?
                       <Flyout require_pin = {true} require_download = {true} require_full_screen ={true} sequence_no = {results1.sequence_number} title={results1.operation_name} secondary = {secondary} hideFlyout = {hideFlyout}>
                           {is_primary_step_set && renderResult(results1.results[0])}
                       </Flyout>
                       :
                       <Fragment>
                           {
                               results2 && is_secondary_step_set?
                                   <Flyout require_pin = {true} require_download = {true} require_full_screen ={true} sequence_no = {results2.sequence_number} title={results2.operation_name} secondary = {secondary} hideFlyout = {hideFlyout}>
                                       {is_secondary_step_set && renderResult(results2.results[0])}
                                   </Flyout>
                                   :
                                   <Fragment></Fragment>
                           }
                       </Fragment>
                       )
               }
               </Fragment>

        );
    }
}

export default resultsContainer(ResultFlyout);



export const renderResult = ({ name, _links: { data, image, table, error, chart, pdf } }) => {


    if (data != undefined) {
        return <p key={data.href}>{!!name && <b>{`${name}: `}</b>}The data is updated in the table</p>;
    }


    if (image != undefined) {
        return (<div key={image.href}>
            {name && <h6>{name}</h6>}
            <img key={image.href} src={image.href} alt={name} width="fit-content"/>
        </div>);
    }


    if (table != undefined) {
        return (<div key={table.href}>
            {name && <h6>{formatHeader(name)}</h6>}
            <CsvTable csv={table.href} download={true}
                /*** In j-engine, a delimiter is added before column name, which leads to actual column name being pushed to index 1 in headers array.
                 Hence check is made to see if first value in headers array is an empty string and decide if execution is through j-engine ot r-engine.
                 For r-engine execution an extra entry is added to array at index 0, to indicate a column for row names.
                 To log headers and debug, convert arrow function to regular function
                 getHeaders = {function(headers){console.log(headers); return headers[0]===""?[...headers]:['', ...headers]}}
                ***/
                      getHeaders={headers => headers[0] === "" ? [...headers] : ['', ...headers]} delimiter=';' responsive bordered/>
        </div>);
    }


    if (error != undefined) {
        return (<div key={error.href}>
            {name && <h6>{name}</h6>}
            <Error error_text={error.href} download={true}/>
        </div>);
    }


    // if (chart != undefined) {
    //     return (<div key={chart.href}>
    //         {name && <h6>{name}</h6>}
    //         <Chart link={chart}/>
    //     </div>);
    // }


    if (pdf !== undefined) {
        return (<div key={pdf.href}>
            {name && <h6>{name}</h6>}
            <object data={pdf.href} type='application/pdf' width='100%' height='500px'>
                <p>Your web browser doesn't have a PDF plugin.
                    Instead you can <a href={pdf.href}>click here to download the PDF file.</a></p>
            </object>
        </div>);
    }
    return null;
};

const formatHeader = (label) => {
    label = label.replace(/^\d+_/i, ' ');
    return label;
};