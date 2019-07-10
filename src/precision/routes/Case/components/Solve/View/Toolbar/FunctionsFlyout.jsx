import React, {Component} from 'react';
import {FormInput} from "../../../../../../components/Forms/FormInput/FormInput";

class FunctionsFlyout extends Component {
    render() {
        return (
            <div className="fx">
              <div className="fx__left">
                <div className="fx__header">
                    <FormInput
                        type={"text"}
                        placeholder="Search functions"
                        name="search"
                        onChange={() =>{}}
                        value={"Search functions"}
                    />
                </div>
                 <div className="fx__content">
                     <div className="fx__menu">

                     </div>
                     <div className="fx__list">

                     </div>
                 </div>
              </div>
              <div className="fx__right">
                <div className="fx__header">

                </div>
              <div className="fx__content">

              </div>

              </div>
            </div>
        );
    }
}

export default FunctionsFlyout;