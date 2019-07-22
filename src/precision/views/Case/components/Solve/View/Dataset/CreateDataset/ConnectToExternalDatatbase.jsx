import React ,{ Component } from 'react'
import {ConnectToExternalDataBase as ExternalDatabase} from "../../../../../containers/solve/view/dataset/createDataset/connectToExternalDatabase";
import {Button} from "../../../../../../../components/Buttons/Button";


class ConnectToExternalDatabase extends Component {

    state = {
        conn: "",
        query: ""
    };

    onChange = (e) => {
        this.setState({ [e.target.name]: [e.target.value]})
    };

    render(){
        return(
            <div className="upload-container">
                {
                    this.props.sql_form.length > 0 && this.props.sql_form.map(sql =>
                    <div style={{marginBottom: '20px', display: 'flex', flexFlow: 'column'}}>
                        <label>{sql.label}</label>
                        <input type={sql.type} onChange={this.onChange} name={sql.name} style={{width: '300px'}}/>
                    </div>
                    )
                }
                <Button buttonType="primary" onClick={() => this.props.connectToExternalDatabase(this.state)}>Connect</Button>
            </div>
        )
    }
}

export default ExternalDatabase(ConnectToExternalDatabase)