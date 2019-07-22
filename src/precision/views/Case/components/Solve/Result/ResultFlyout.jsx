import React, {Component, Fragment} from 'react';
import StepDataset from "../View/Dataset/StepDatasets";


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

class ResultFlyout extends Component {
    render() {
        const {results} = this.props;
        return (
            <Fragment>
                {
                    results !== undefined && results.results[0] !== undefined  &&renderResult(results.results[0])
                }
            </Fragment>

        );
    }
}

export default ResultFlyout;