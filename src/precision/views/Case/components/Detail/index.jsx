import React, {Component} from 'react';
import {Link} from "react-router-dom";

class CaseDetail extends Component {
    render() {
        return (
            <div>
                Case detail <br/>
                <Link to={'/cases/4/4/dashboard'}>Scenario</Link>
            </div>
        );
    }
}

export default CaseDetail;