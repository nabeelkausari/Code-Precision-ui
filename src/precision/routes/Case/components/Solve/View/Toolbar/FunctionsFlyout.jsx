import React, {Component} from 'react';
import {FormInput} from "../../../../../../components/Forms/FormInput/FormInput";
import {Button} from "../../../../../../components/Buttons/Button";

class FunctionsFlyout extends Component {

    state = {
        categorySelected:false,
        functionSelected: false,
        searchText:""
    };

    handleInputChange = (e) => {

        this.setState({[e.target.name]:e.target.value});
    };
    render() {
        const {functionSelected, searchText} = this.state;
        return (
            <div className="fx">
              <div className="fx__left">
                <div className="fx__header">
                    <FormInput
                        type="text"
                        placeholder="Search functions"
                        name="searchText"
                        onChange={this.handleInputChange}
                        value={searchText}
                    />
                </div>
               {searchText !== "" ?
                   <div className="fx__search-results" >
                      <div className="fx__search-items">
                          <span className="fx__search-name">Linear Regression</span><span className="fx__search-category">(Machine Learning ->  Regression Models)</span>
                      </div>
                       <div className="fx__search-items">
                          <span className="fx__search-name">Linear Regression</span><span className="fx__search-category">(Machine Learning ->  Regression Models)</span>
                      </div>
                       <div className="fx__search-items">
                          <span className="fx__search-name">Linear Regression</span><span className="fx__search-category">(Machine Learning ->  Regression Models)</span>
                      </div>
                       <div className="fx__search-items">
                          <span className="fx__search-name">Linear Regression</span><span className="fx__search-category">(Machine Learning ->  Regression Models)</span>
                      </div>

                  </div> :
                 <div className="fx__content">
                         <div className="fx__menu">
                             <div className="fx-menu__item">
                                <h6 className="fx-menu__title">Data Management</h6>
                             </div>
                             <div className="fx-menu__item">
                                <h6 className="fx-menu__title">Data Management</h6>
                             </div>
                             <div className="fx-menu__item">
                                <h6 className="fx-menu__title">Data Management</h6>
                             </div>
                             <div className="fx-menu__item">
                                <h6 className="fx-menu__title">Data Management</h6>
                             </div>
                         </div>
                         <div className="fx__list">
                            <div className="fx__list-left">
                               <div className="fx-list__item">
                                   <h4 className="fx-list__title">Regression Models</h4>
                                   <p className="fx-list__subtitle" onClick={() => this.setState({functionSelected: true})}>Linear Regression</p>
                               </div>
                            </div>
                             <div className="fx__list-right">
                                 <div className="fx-list__item">
                                     <h4 className="fx-list__title">Regression Models</h4>
                                     <p className="fx-list__subtitle">Linear Regression</p>
                                 </div>
                             </div>
                         </div>
                     </div>
               }
              </div>
             {functionSelected && <div className="fx__right">
                 <div className="fx__description">
                     <div className="fx__header">
                        <h2 className="fx__header-title">Linear Regression</h2>
                         <Button buttonType="primary">Add</Button>
                     </div>
                     <div className="">
                        <div className="fx__parameters">
                            parameters
                        </div>
                         <div className="fx__description">
                             description
                         </div>
                     </div>

                 </div>
              </div>
             }
            </div>
        );
    }
}

export default FunctionsFlyout;