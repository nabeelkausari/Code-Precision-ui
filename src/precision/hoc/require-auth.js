import React, { Component } from 'react';
import ProfileContainer from '../routes/Profile/containers/profile'

export default ComposedComponent => {
  class Authentication extends Component {
    state = {
      profile_loaded: false
    };

    checkAuth = () => {
      let token = localStorage.getItem('__auth');
      if (!token) {
        this.props.history.push('/auth/login')
      }
    };

    componentDidMount() {
      this.checkAuth();
      this.props.getprofile()
    }

    componentDidUpdate(prevProps) {
      const { fetch_profile_succeeded } = this.props;
      this.checkAuth();

      if ( fetch_profile_succeeded && fetch_profile_succeeded !== prevProps.fetch_profile_succeeded) {
        this.setState({ profile_loaded: true })
      }
    }

    render() {
      const { profile_loaded } = this.state;
      if (!profile_loaded) return <div/>;
      return <ComposedComponent {...this.props} />
    }
  }

  return ProfileContainer(Authentication)
}
