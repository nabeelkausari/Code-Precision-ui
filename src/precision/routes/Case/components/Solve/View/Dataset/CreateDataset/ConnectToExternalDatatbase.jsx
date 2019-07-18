import React ,{ Component } from 'react'
import {ConnectToExternalDataBase as ExternalDatabase} from "../../../../../containers/solve/view/dataset/createDataset/connectToExternalDatabase";


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
            <div>
                {
                    this.props.sql_form.length > 0 && this.props.sql_form.map(sql =>
                    <div>
                        <label>{sql.label}</label>
                        <input type={sql.type} onChange={this.onChange} name={sql.name}/>
                    </div>
                    )
                }
                <button onClick={() => this.props.connectToExternalDatabase(this.state)}>Connect</button>
            </div>
        )
    }
}

export default ExternalDatabase(ConnectToExternalDatabase)