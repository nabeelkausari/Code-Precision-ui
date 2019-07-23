import React, {Component} from 'react';

class UserCode extends Component {

    // componentDidMount() {
    //     if(this.props.results){
    //         this.props.fetchUserCode(this.props.results)
    //     }
    // }
    //
    // componentDidUpdate(prevProps, prevState, snapshot) {
    //     if(this.props.results !== prevProps.results){
    //         this.props.fetchUserCode(this.props.results)
    //     }
    // }

    componentDidMount() {
        this.props.handleCode(this.props.result)
    }

    render() {
        const {code} = this.props
        console.log("CODE : ", code, this.props.secondary)
        return (
            <div>
                User code
            </div>
        );
    }
}

export default UserCode;