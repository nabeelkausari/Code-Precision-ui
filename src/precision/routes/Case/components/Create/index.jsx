import React, {Component} from 'react';
import {CreateCaseHeader} from "./CreateCaseHeader";

import './Create.scss'

class CreateCase extends Component {
    render() {
        return (
            <div>
                <CreateCaseHeader/>
                create case
            </div>
        );
    }
}

export default CreateCase;