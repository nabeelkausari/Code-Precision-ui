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

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.userCodeSteps !== this.props.userCodeSteps && this.props.userCodeSteps !== undefined && !!this.props.learnRStepsReference && this.props.current_step) {
            console.log("Coming here....");
            this.props.setCurrentShowCodeTab(this.props.learnRStepsReference);
            this.props.setCurrentShowCodeTab(this.props.learnSassStepsReference);
            this.props.setCurrentShowCodeTab(this.props.learnPythonStepsReference);
        }
    }

    render() {
        const { show, handleClose, userSteps, userCode, userCodeSteps, learnRSteps, learnSasSteps, learnPythonSteps, current_step} = this.props;
        console.log("Components are loading....");
        console.log('current_step: ', current_step)
        return(
            <div>
                <Modal.Header closeButton>
                    <Modal.Title>User Step Details</Modal.Title>
                </Modal.Header>
                <Modal.Body>{
                    <Tab.Container id="left-tabs-example" defaultActiveKey={0}>
                        <Row>
                            <Col className="border-right steps-list" sm={3}>
                                {userSteps !== undefined && userSteps.length > 0 && userSteps.filter(step => step._links.self.href === this.props.current_step._links.self.href).map((step, index) =>
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
            </div>
        )
    }
}

export default UserStepDetailsContainer(UserStepDetails)