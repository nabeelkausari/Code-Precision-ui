import React , { Component } from 'react';
import {CreateDatasetModalContainer} from "../../../../../containers/solve/view/dataset/createDataset/createDatatSetModal";

class CreateDataSetModal extends Component{
    fileInput = "";
    state = {
        name: "",
        description: "",
        isprojectUploading: null,
        uploadLink: null,
        separator: ";",
        tenant_id: "",
        files: {
            filename: []
        },
        file: {},
        toggleCsv: true
    };

    componentDidMount() {
        this.props.getUploadLink()
    }

    handleEventChange = (e) => {
        this.setState({[e.target.name]: [e.target.value]})
    };

    handleFileChange = (e) => {
        e.preventDefault();
        let reader = new FileReader();
        let file = e.target.files[0];
        reader.onloadend = () => {
            this.setState({
                file: file
            });
        };
        reader.readAsDataURL(file);
    };


    handleSubmit = () => {
        const { separator , file} = this.state;
        const { solve_id } = this.props;
        let formData = new FormData();
        formData.append('file', file);
        formData.append('separator', separator);
        formData.append('solve_id', solve_id.toString());
        formData.append('user_id', "3820");
        formData.append('tenant_id', "da49652c-ba7d-4531-b610-a50cf856d841");
        this.props.createDatasetModal(formData)
    };

    toggleCsv = () => this.setState({ toggleCsv: true });

    onExcelSelect = () => {
        this.setState({
            separator: ' ',
            toggleCsv: false
        });
    };

    render() {
        return(
            <div>
                <form>
                    <div>
                        <input type="radio" name="radioGroup" checked={this.state.toggleCsv} onChange={this.toggleCsv} inline />
                        <span>CSV</span>
                        <input type="radio" name="radioGroup" checked={!this.state.toggleCsv} onChange={this.onExcelSelect} value='\0'  inline />
                        <span>Excel</span>
                    </div>
                    {this.state.toggleCsv &&
                    <div>
                        <label>Column separator</label>
                        <select onChange={this.handleEventChange} name="separator">
                            <option value=';'>Semicolon</option>
                            <option value=','>Comma</option>
                            <option value={`\t`}>Tab</option>
                        </select>
                    </div>}
                    <input type="file" accept="text/csv" ref={ref => (this.fileInput = ref)} onChange={this.handleFileChange} />
                </form>
                <button onClick={this.handleSubmit}>Create</button>
            </div>

        )
    }

}

export default CreateDatasetModalContainer(CreateDataSetModal)