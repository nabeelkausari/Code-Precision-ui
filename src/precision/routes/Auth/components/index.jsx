import React, { Component } from 'react';
import LoginContainer from '../containers/login'
import {Card, FormControl} from "react-bootstrap";
import {Button} from "../../../components/Buttons/Button";

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
      history.push('/cases/4/5/dataset')
    }
  }

  render() {
    const { email, password } = this.state;
    return (
      <div style={{display: "flex",justifyContent: "center"}}>
        <Card style={{zIndex:"1"}}>
          {/*<Card.Header>Sign in to account</Card.Header>*/}
          <Card.Body style={{display:"flex",flexDirection:"column", justifyContent:"space-between", alignItems:"center"}}>
            <h4>Sign in to account</h4>

            <FormControl
                placeholder="Email"
                type="text" value={email} onChange={this.handleChange} name="email"
            />
            <FormControl
                placeholder="Password"
                type="password" value={password} onChange={this.handleChange} name="password"
            />
            <Button buttonType="primary" onClick={this.handleLogin}>Login</Button>

            {/*<input type="text" value={email} onChange={this.handleChange} name="email"/>*/}
            {/*<input type="password" value={password} onChange={this.handleChange} name="password"/>*/}
          </Card.Body>
        </Card>
      </div>
    )
  }
}

export default LoginContainer(Login)
