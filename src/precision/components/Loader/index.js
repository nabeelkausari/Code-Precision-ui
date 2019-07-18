import React, {Component, Fragment} from 'react';
import './Loader.scss'

class Loader extends Component {

    render() {
        const {loading} = this.props;
        return (
            <Fragment>
                {
                    loading &&
                    <div className="ath-loading">
                        <h3 className="ath-loading__title">Loading...!</h3>
                    </div>
                }
            </Fragment>

        );
    }
}

export default Loader;