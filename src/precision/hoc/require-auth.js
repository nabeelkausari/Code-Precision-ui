import React, { Component } from 'react';

export default ComposedComponent => {
  class Authentication extends Component {

    checkAuth = () => {
      let token = localStorage.getItem('__auth');
      if (!token) {
        this.props.history.push('/auth/login')
      }
    }

    componentDidMount() {
      this.checkAuth()
    }

    componentDidUpdate() {
      this.checkAuth()
    }

    render() {
      return <ComposedComponent {...this.props} />
    }
  }

  return Authentication
}
