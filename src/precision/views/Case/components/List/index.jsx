import React, {Component} from 'react';
import { Link } from "react-router-dom";

class CaseList extends Component {
    render() {
        return (
            <div>
                Case list <br/>
                <Link to={'/cases/4'}>List</Link>
            </div>
        );
    }
}

export default CaseList;