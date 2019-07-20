import React, {Component} from 'react';
import './toolbarFlyout.scss'

class ToolbarFlyout extends Component {
    render() {
        return (
            <div className="flyout">
                {this.props.children}
            </div>
        );
    }
}

export default ToolbarFlyout;