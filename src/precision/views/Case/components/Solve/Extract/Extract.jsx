import React, {Component} from 'react'
import Modal from "react-bootstrap/Modal";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {FormInput} from "../../../../../components/Forms/FormInput/FormInput";
import ReactSelect from "react-select";
import {ExtractContainer} from "../../../containers/solve/extract/extract";

class Extract extends Component {

    state = {
        runTimeEnv: "",
        deployName: "",
        outputPath: "",
        category: "",
        startDate: new Date(),
        endDate: new Date()
    };

    handleInputChange = (e) => {
        this.setState({[e.target.name]:e.target.value});
    };

    onCategorySelect = (option) => {
        this.setState({category: option.value});
    };

    handleChangeStartDate = (date) => {
        this.setState({
            startDate: date
        });
    };

    handleChangeEndDate = (date) => {
        this.setState({
            endDate: date
        });
    };


    render() {
        const {show, handleClose , current_case, scenarios, scenario_id } = this.props;
        const { runTimeEnv, deployName, outputPath } = this.state;
        const options = [{value: "Weekly",label:"Weekly"} ,{value: "monthly",label:"Monthly"} ,{value: "daily",label:"Daily"}];
        const scenario = scenarios.filter(s => toString(s.id) === toString(scenario_id)).shift();
        return(
            <Modal show={show} onHide={handleClose} size="lg" aria-labelledby="example-modal-sizes-title-lg" className="bg-user-step-container">
                <Modal.Header closeButton>
                    <Modal.Title>Extract</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div>
                        <div style={{display:"flex", flexDirection:"column", marginBottom: "25px"}}>
                            <p>Case Name <span></span></p>
                            <p>Case :  <h4 className="case-title">{current_case.case_name}</h4></p>
                        </div>
                        <div style={{display:"flex", flexDirection:"column", marginBottom: "25px"}}>
                            <p>Scenario Name <span></span></p>
                            <p>{scenario.name}</p>
                        </div>
                        <div style={{display:"flex", flexDirection:"column", marginBottom: "25px"}}>
                            <p>Run time environment</p>
                            <FormInput  type="text" placeholder="Run Time Environment" name="runTimeEnv" value={runTimeEnv} onChange={this.handleInputChange}/>
                        </div>
                        <div style={{display:"flex", flexDirection:"column", marginBottom: "25px"}}>
                            <p>Deploy/Solve Name</p>
                            <FormInput  type="text" placeholder="Deploy/Solve Name" name="deployName" value={deployName} onChange={this.handleInputChange}/>
                        </div>
                        <div style={{display:"flex", flexDirection:"column", marginBottom: "25px"}}>
                            <p>Output path url</p>
                            <FormInput  type="text" placeholder="Output path url" name="outputPath" value={outputPath} onChange={this.handleInputChange}/>
                        </div>
                        <div style={{display:"flex", flexDirection:"row", marginBottom: "25px"}}>
                            <p>Schedule</p>
                            <ReactSelect onChange={this.onCategorySelect} options={options}/>
                            <p>Start Date</p>
                            <DatePicker selected={this.state.startDate}
                                        onChange={this.handleChangeStartDate}
                                        minDate={new Date()}
                                        dateFormat="MMMM d, yyyy"
                            />
                            <p>End Date</p>
                            <DatePicker selected={this.state.endDate}
                                        onChange={this.handleChangeEndDate}
                                        minDate={new Date()}
                                        dateFormat="MMMM d, yyyy"
                            />
                        </div>
                        <div style={{display: 'flex', justifyContent: 'center'}}>
                            <button buttonType="primary" style={{height: '30px', width: '100px', backgroundColor: '#0B233F', color: 'white'}}>Run</button>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        )
    }
}

export default ExtractContainer(Extract)