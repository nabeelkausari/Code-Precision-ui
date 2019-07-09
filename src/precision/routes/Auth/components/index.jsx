import React, { Component } from 'react';
import LoginContainer from '../containers/login'

class Login extends Component {
  state = {
    email: '',
    password: ''
  }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value })
  }

  handleLogin = () => {
    this.props.login(this.state)
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    const { loginSuccess, history } = this.props;
    if (loginSuccess && prevProps.loginSuccess !== loginSuccess) {
      history.push('/cases/4/5')
    }
  }

  render() {
    const { email, password } = this.state;
    return (
      <div>
        <h1>Login</h1>
        <input type="text" value={email} onChange={this.handleChange} name="email"/>
        <input type="password" value={password} onChange={this.handleChange} name="password"/>
        <button onClick={this.handleLogin}>Login</button>
      </div>
    )
  }
}

export default LoginContainer(Login)
