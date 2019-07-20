import React, { Component } from 'react'
import {flatten, toPairs, values} from "ramda";
import Modal from "react-bootstrap/Modal";
import Tab from "react-bootstrap/Tab";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Nav from "react-bootstrap/Nav";
import {UserStepDetailsContainer} from "../../../../containers/solve/steps/stepDetails/userStepDetails";
import FileViewer from './FileViewer'
import './UserStepDetails.scss'

const generateFileViewers = (step) =>
    !!step && !!step.code_files !== undefined &&
    step.code_files.map(codeFile =>
        <FileViewer key={codeFile._links.code_file.href} file_link={codeFile._links.code_file} function_language={codeFile.function_language}/>);

class UserStepDetails extends Component{
    state = {
        collapseID: null
    };

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

    toggleCollapse = collapseID => () => {
        this.setState({
            collapseID: collapseID
        });
    };

    render() {
        const { show, handleClose, userSteps, userCode, userCodeSteps, learnRSteps, learnSasSteps, learnPythonSteps} = this.props;
        return(
            <Modal show={show} onHide={handleClose} size="lg" aria-labelledby="example-modal-sizes-title-lg" className="bg-user-step-container">
                <Modal.Header closeButton>
                    <Modal.Title>User Step Details</Modal.Title>
                </Modal.Header>
                <Modal.Body>{
                    <Tab.Container id="left-tabs-example" defaultActiveKey={0}>
                        <Row>
                            <Col className="border-right steps-list" sm={3}>
                                {userSteps !== undefined && userSteps.length > 0 && userSteps.map((step, index) =>
                                    <Nav variant="pills">
                                        <Nav.Item>
                                            <Nav.Link eventKey={index}>
                                                {
                                                    userCodeSteps !== undefined && userCodeSteps[index] &&
                                                    (step.isUdf === true && step.isUdf !== undefined ? `${userCodeSteps[index].name} (UDF)` : userCodeSteps[index].name)
                                                }
                                            </Nav.Link>
                                        </Nav.Item>
                                    </Nav>
                                )}
                            </Col>
                            <Col sm={9} className="code-list">
                                {userSteps !== undefined && userSteps.length > 0 && userSteps.map((step, index) =>
                                    <Row>
                                        <Col>
                                            <Tab.Content>
                                                <Tab.Pane eventKey={index}>
                                                    {this.getSelectedColumns(step).length > 0 &&
                                                    <div>
                                                        <h4>Selected Columns</h4>
                                                        <div>{this.getSelectedColumns(step)}</div>
                                                    </div>
                                                    }
                                                    {this.getParameterName(step).length > 0 &&
                                                    <div>
                                                        <h4>Parameters</h4>
                                                        <div>
                                                            {this.getParameterName(step).map(parameter =>
                                                                <p>{parameter.name} : {parameter.value} </p>)}
                                                        </div>
                                                    </div>
                                                    }
                                                    <h4>Function Description</h4>
                                                    <div></div>
                                                    <h4>Results</h4>
                                                    <div></div>
                                                    <div></div>
                                                    {userCodeSteps !== undefined && userCodeSteps[index] &&
                                                    <div>
                                                        <h4>Code</h4>
                                                        <div className="code-block">{generateFileViewers( userCodeSteps[index])}</div>
                                                    </div>}
                                                    {learnRSteps !== undefined  && <div>
                                                        <h4>Learn R</h4>
                                                        <div className="code-block">{generateFileViewers(learnRSteps[index])}</div>
                                                    </div>}
                                                    {learnSasSteps !== undefined &&
                                                    <div>
                                                        <h4>Learn SASS</h4>
                                                        <div className="code-block">{generateFileViewers(learnSasSteps[index])}</div>
                                                    </div>}
                                                    {learnPythonSteps !== undefined &&
                                                    <div>
                                                        <h4>Learn Python</h4>
                                                        <div className="code-block">{generateFileViewers(learnPythonSteps[index])}</div>
                                                    </div>}
                                                </Tab.Pane>
                                            </Tab.Content>
                                        </Col>
                                    </Row>
                                )}
                            </Col>
                        </Row>

                    </Tab.Container>}
                </Modal.Body>
            </Modal>
        )
    }
}

export default UserStepDetailsContainer(UserStepDetails)