import React, { Component } from 'react';

export default ComposedComponent => {
  class UnAuth extends Component {

    checkUnAuth = () => {
      let token = localStorage.getItem('__auth');
      if (token) {
        this.props.history.push('/cases/3/4/dataset');
      }
    }

    componentDidMount() {
      this.checkUnAuth()
    }

    componentDidUpdate() {
      this.checkUnAuth()
    }

    render() {
      return <ComposedComponent {...this.props} />
    }
  }

  return UnAuth
}

