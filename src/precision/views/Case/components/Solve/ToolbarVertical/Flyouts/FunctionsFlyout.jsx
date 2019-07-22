import React, {Component, Fragment} from 'react';
import cx from "classnames";
import ToolbarFlyout from "./ToolbarFlyout";
import {Button} from "../../../../../../components/Buttons/Button";
import FunctionParams from "../../Toolbar/FunctionFlyout/FunctionParams";
import "./toolbarFlyout.scss"

class FunctionsFlyout extends Component {
    render() {

        const {active_category:{name, sub_categories },description, active_function, selections, parameters, parameter_flyout_open, addFunction, execution, onFunctionClick} = this.props
        // const is_fx_add_disabled = Object.keys(selections).length === 0 ;
        const is_fx_add_disabled = false;
        return (
            <Fragment>
                <ToolbarFlyout>
                   <div className="function-flyout">

                       <div className="function-flyout__left">
                           <div className="fx__list fx__list--1">
                               <div className="fx__list-left">
                                   {sub_categories && sub_categories
                                       .slice(0,Math.ceil(sub_categories.length/2))
                                       .map((sub_category,i) =>
                                           <div className="fx-list__item" key={i} >
                                               <h4 className="fx-list__title">{sub_category.name}</h4>
                                               {
                                                   sub_category.functions_list && sub_category.functions_list.map((fx, i) =>
                                                       <p key={i} className={cx("fx-list__subtitle",{'fx-active':active_function.function_id === fx.function_id})}
                                                           onClick={() =>onFunctionClick(fx)}
                                                       >
                                                           {fx.name}
                                                       </p>
                                                   )
                                               }
                                           </div>
                                       ) }
                               </div>

                               <div className="fx__list-right fx__list-right-vertical">
                                   {sub_categories && sub_categories
                                       .slice(Math.floor(sub_categories.length/2) + 1,sub_categories.length)
                                       .map((sub_category,i) =>
                                           <div className="fx-list__item" key={i}>
                                               <h4 className="fx-list__title" key={i}>{sub_category.name}</h4>
                                               {
                                                   sub_category.functions_list && sub_category.functions_list.map((fx,index) =>
                                                       <p className={cx("fx-list__subtitle",{'fx-active':active_function.function_id === fx.function_id})}
                                                          key={index}
                                                           onClick={() => onFunctionClick(fx)}
                                                       >
                                                           {fx.name}
                                                       </p>
                                                   )
                                               }
                                           </div>
                                       ) }
                               </div>
                           </div>
                       </div>

                       {
                           parameter_flyout_open &&
                           <div className="function-flyout__right">
                               <div className="fx__header">
                                   <h2 className="fx__header-title">{execution.current_function.name}</h2>
                                   <Button buttonType="primary" disabled={is_fx_add_disabled} onClick={addFunction}>Add</Button>
                               </div>
                               <div className="">
                                   { Object.keys(selections).length > 0 && <div className="fx__parameters">
                                       {
                                           parameters.list.map(({ name, multi_table }) =>
                                               <FunctionParams
                                                   key={name}
                                                   parameter_name={name}
                                                   readonly={false}
                                                   multi_table={multi_table}/>
                                           )
                                       }
                                   </div>}
                                   <div className="fx__description">
                                       {description.info.text}
                                   </div>
                               </div>
                           </div>

                       }
                   </div>
                </ToolbarFlyout>
            </Fragment>
        );
    }
}

export default FunctionsFlyout;