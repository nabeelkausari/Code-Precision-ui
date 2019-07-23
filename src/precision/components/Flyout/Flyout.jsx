import React, {Component} from 'react';
import './flyout.scss'
import {print_icon, full_screen_icon, pin_icon} from "../../images";
import Tooltip from "../Tooltip/Tooltip";

class Flyout extends Component {

    getPrefix = (sequence_number) => {
        let string_number = sequence_number.toString();
        let regex_expression = /[0-9]/g;
        if(string_number.match(regex_expression)){
            return ("0"+string_number)
        }
        else {
            return string_number
        }
    }

    render() {

        const {title, sequence_no, require_pin, require_full_screen, require_download, children, secondary, hideFlyout } = this.props

        return (
            <div className={secondary? "flyout-container flyout-container--2" : " flyout-container flyout-container--1"}>

                <div className="flyout-container__header">
                    <span className="index-no--1">{this.getPrefix(sequence_no)}</span>
                    <h6 className="flyout-container__title">{title}</h6>
                    <div className="flyout-container__options">

                        { require_download &&
                        <Tooltip placement={"bottom"} text={"Print"}>
                            <div className="flyout-container__action-wrapper">
                                <img src={print_icon} alt="Print icon" className="flyout-container__action-icon"/>
                            </div>
                        </Tooltip>
                        }
                        {require_pin &&
                        <Tooltip placement={"bottom"} text={"Pin"}>
                            <div className="flyout-container__action-wrapper">
                                <img src={pin_icon} alt="Pin icon" className="flyout-container__action-icon"/>
                            </div>
                        </Tooltip>
                        }
                        {require_full_screen &&
                        <Tooltip placement={"bottom"} text={"Full Screen"}>
                            <div className="flyout-container__action-wrapper">
                                <img src={full_screen_icon} alt="Pin icon" className="flyout-container__action-icon"/>
                            </div>
                        </Tooltip>
                        }
                    </div>
                    <div className="flyout-container__close-btn" onClick={secondary? () => hideFlyout(true) : () => hideFlyout(false)}>&times;</div>
                </div>

                <div className="flyout-container__content">
                    {children}
                </div>
            </div>
        );
    }
}

export default Flyout;