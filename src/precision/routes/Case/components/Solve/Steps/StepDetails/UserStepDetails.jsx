import React, { Component } from 'react'
import {flatten, toPairs, values} from "ramda";
import Modal from "react-bootstrap/Modal";
import {Button} from "../../../../../../components/Buttons/Button";
import {UserStepDetailsContainer} from "../../../../containers/solve/steps/stepDetails/userStepDetails";
import Accordion from "react-bootstrap/Accordion";
import Card from "react-bootstrap/Card";
import FileViewer from './FileViewer'

const generateFileViewers = (step) => !!step && !!step.code_files !== undefined && step.code_files.map(codeFile => <FileViewer key={codeFile._links.code_file.href} file_link={codeFile._links.code_file} function_language={codeFile.function_language}/>);

class UserStepDetails extends Component{
    componentDidMount() {
        this.props.fetchShowCodeTabs()
    }

    getSelectedColumns = (step) => {
        return flatten(values(step.selections)).map(header => header.label).join(',');
    };

    getParameterName = (step) => {
        const stepParameters = toPairs(step.parameters) || undefined;
        return stepParameters.map(parameter => {
            return {
                name: parameter[0].toString(),
                value: parameter[1].toString()
            };
        });
    };

    componentDidUpdate(prevProps, prevState, snapshot) {
        if(this.props.fetch_user_step && this.props.fetch_user_step !== prevProps.fetch_user_step){
            this.props.fetchShowCodeSteps()
        }

        if (prevProps.userCodeSteps !== this.props.userCodeSteps && this.props.userCodeSteps !== undefined && !!this.props.learnRStepsReference && this.props.show) {
            console.log("Coming here....");
            this.props.setCurrentShowCodeTab(this.props.learnRStepsReference);
            this.props.setCurrentShowCodeTab(this.props.learnSassStepsReference);
            this.props.setCurrentShowCodeTab(this.props.learnPythonStepsReference);
        }
    }

    render() {
        const { show, handleClose, userSteps, userCode, userCodeSteps, learnRSteps, learnSasSteps, learnPythonSteps} = this.props;
        return(
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>User Step Details</Modal.Title>
                </Modal.Header>
                <Modal.Body>{
                    <Accordion defaultActiveKey="0">
                        {userSteps !== undefined && userSteps.length > 0 && userSteps.map((step, index) =>
                            <div>
                                <Accordion.Toggle as={Card.Header} eventKey="0">
                                    {
                                        userCodeSteps !== undefined && userCodeSteps[index] &&
                                        (step.isUdf === true && step.isUdf !== undefined ? `${userCodeSteps[index].name} (UDF)` : userCodeSteps[index].name)
                                    }
                                </Accordion.Toggle>
                                <Accordion.Collapse eventKey="0">
                                    <Card.Body>
                                        <label>Selected Columns</label>
                                        <div>{this.getSelectedColumns(step)}</div>
                                        <label>Parameters</label>
                                        <div>
                                            {this.getParameterName(step).map(parameter =>
                                            <p>{parameter.name} : {parameter.value} </p>)}
                                        </div>
                                        <label>Function Description</label>
                                        <div></div>
                                        <label>Results</label>
                                        <div></div>
                                        <label>Code</label>
                                        <div>{generateFileViewers(userCodeSteps !== undefined && userCodeSteps[index] && userCodeSteps[index])}</div>
                                        <label>Learn R</label>
                                        <div>{generateFileViewers(learnRSteps !== undefined  && learnRSteps[index])}</div>
                                        <label>Learn SASS</label>
                                        <div>{generateFileViewers(learnSasSteps !== undefined && learnSasSteps[index])}</div>
                                        <label>Learn Python</label>
                                        <div>{generateFileViewers(learnPythonSteps !== undefined && learnPythonSteps[index])}</div>
                                    </Card.Body>
                                </Accordion.Collapse>
                            </div>
                        )}
                    </Accordion>}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>Close</Button>
                    <Button variant="primary" onClick={handleClose}>Save Changes</Button>
                </Modal.Footer>
            </Modal>
        )
    }
}

export default UserStepDetailsContainer(UserStepDetails)


{/*<span style={{display: 'block'}} className='bluearrow1'>*/}
// {/*  {userCodeSteps !== undefined && userCodeSteps[index] && (step.isUdf === true && step.isUdf !== undefined ? `${userCodeSteps[index].name} (UDF)` : userCodeSteps[index].name)}*/}
{/*</span>*/}


{/*<Accordion defaultActiveKey="0">*/}
{/*    <Card>*/}
{/*        <Accordion.Toggle as={Card.Header} eventKey="0">*/}
{/*            Click me!*/}
{/*        </Accordion.Toggle>*/}
{/*        <Accordion.Collapse eventKey="0">*/}
{/*            <Card.Body>Hello! I'm the body</Card.Body>*/}
{/*        </Accordion.Collapse>*/}
{/*    </Card>*/}
{/*    <Card>*/}
{/*        <Accordion.Toggle as={Card.Header} eventKey="1">*/}
{/*            Click me!*/}
{/*        </Accordion.Toggle>*/}
{/*        <Accordion.Collapse eventKey="1">*/}
{/*            <Card.Body>Hello! I'm another body</Card.Body>*/}
{/*        </Accordion.Collapse>*/}
{/*    </Card>*/}
{/*</Accordion>*/}