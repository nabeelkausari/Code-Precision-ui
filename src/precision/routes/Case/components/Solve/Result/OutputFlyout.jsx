import React, {Component, Fragment} from 'react';
import Error from './Error'
import Flyout from "../../../../../components/Flyout/Flyout";
import OutputContainer from '../../../containers/solve/results';
import StepDataset from "../View/Dataset/StepDatasets";
import {FlyoutContent} from "./FlyoutContent";


export const renderResult = ({ name, _links: { data, image, table, error, chart, pdf } }) => {
    if (data !== undefined) {
        return <p key={data.href}>{!!name && <b>{`${name}: `}</b>}The data is updated in the table</p>;
    }
    if (image !== undefined) {
        return (<div key={image.href}>
            {name && <h6>{name}</h6>}
            <img key={image.href} src={image.href} alt={name} width="fit-content"/>
        </div>);
    }
    if (table !== undefined) {
        return (<div key={table.href}>
            {name && <h6>{formatHeader(name)}</h6>}
            {console.log(table.href)}
            {<StepDataset csv={table.href}/>}
        </div>);
    }
    if (error !== undefined) {
        return (<div key={error.href}>
            {name && <h6>{name}</h6>}
            <div>Error - {error.text}</div>
        </div>);
    }
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

class OutputFlyout extends Component {
    render() {
        const {secondary, results1, results2, is_primary_step_set, is_secondary_step_set,  hideFlyout} = this.props
        console.log("PRIMARY STEP : ", is_primary_step_set)
        return (
            <Fragment> {
                is_primary_step_set &&
                (results1 && !secondary?
                        <Flyout
                            require_pin = {true}
                            require_download = {true}
                            require_full_screen ={true}
                            sequence_no={results1.sequence_number}
                            title={results1.operation_name}
                            secondary = {secondary}
                            hideFlyout = {hideFlyout}
                        >
                            {is_primary_step_set &&
                            <FlyoutContent
                                result1={this.props.results1}
                                is_primary_step_set={is_primary_step_set}/>
                            }
                        </Flyout>
                        :
                        <Fragment>
                            {results2 && is_secondary_step_set &&
                            <Flyout
                                require_pin={true}
                                require_download={true}
                                require_full_screen={true}
                                sequence_no={results2.sequence_number}
                                title={results2.operation_name}
                                secondary={secondary}
                                hideFlyout={hideFlyout}
                            >
                                {is_secondary_step_set &&
                                <FlyoutContent
                                    result2={this.props.results2}
                                    is_secondary_step_set={is_secondary_step_set}/>
                                }
                            </Flyout>
                            }
                        </Fragment>
                )
            }
            </Fragment>

        );
    }
}

export default OutputContainer(OutputFlyout);
