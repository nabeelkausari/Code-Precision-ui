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


    // componentDidMount() {
    //     const {result, secondary} = this.props
    //
    //     console.log("INSIDE FUNC ")
    //     this.props.fetchUserLearnPython(result, secondary ? 'secondary' : 'primary');
    //     this.props.fetchUserLearnR(result, secondary ? 'secondary' : 'primary');
    //     this.props.fetchUserCode(result, secondary ? 'secondary' : 'primary')
    //
    // }

    render() {
        const {code_primary, code_secondary, secondary} = this.props
        console.log("CODE : ", !secondary ? code_primary : code_secondary, this.props.secondary)
        return (
            <div>
                User code
            </div>
        );
    }
}

export default UserCode;