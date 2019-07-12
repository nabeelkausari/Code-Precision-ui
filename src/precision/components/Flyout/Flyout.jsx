import React, {Component} from 'react';
import './flyout.scss'

class Flyout extends Component {
    render() {

        const {title, sequence_no, require_pin, require_full_screen, require_download, children, secondary } = this.props

        return (
            <div className={secondary? "flyout-container flyout-container--2" : " flyout-container flyout-container--1"}>

                <div className="flyout-container__header">
                    <span className="index-no--1">{sequence_no}</span>
                    <h6 className="flyout-container__title">{title}</h6>
                    <div className="flyout-container__options">
                        { require_download && <button className="flyout-container__download-option">Download</button>}
                        { require_pin && <button className="flyout-container__pin-option">Pin</button>}
                        {require_full_screen && <button className="flyout-container__full-screen-option">Full Screen</button>}
                    </div>
                    <div className="flyout-container__close-btn">&times;</div>
                </div>

                <div className="flyout-container__content">
                    {children}
                </div>
            </div>
        );
    }
}

export default Flyout;