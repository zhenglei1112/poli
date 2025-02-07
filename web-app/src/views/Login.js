
import React from 'react';
import ReactDOM from 'react-dom';
import { withRouter } from 'react-router-dom';
import axios from 'axios';

import './Login.css';
import Checkbox from '../components/Checkbox';
import * as Constants from '../api/Constants';

class Login extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      errorMsg: '',
      username: '',
      password: '',
      version: '',
      rememberMe: true
    };
  }

  componentDidMount() {
    const thisNode = ReactDOM.findDOMNode(this);
    if (thisNode) {
      const { ownerDocument } = thisNode;
      ownerDocument.addEventListener("keydown", this.onKeyDown);
    }
  
    axios.get('/info/version')
      .then(res => {
        const version = res.data;
        this.setState({
          version: version
        });
      });

    const rememberMeConfig = localStorage.getItem(Constants.REMEMBERME);
    const rememberMe = rememberMeConfig && rememberMeConfig === Constants.YES;
    
    this.setState({
      rememberMe: rememberMe
    });
  }

  componentWillUnmount() {
    const thisNode = ReactDOM.findDOMNode(this);
    if (thisNode) {
      const { ownerDocument } = thisNode;
      ownerDocument.removeEventListener('keydown', this.onKeyDown);
    }
  }

  handleCheckBoxChange = (name, isChecked) => {
    this.setState({
      [name]: isChecked
    });

    if (name === Constants.REMEMBERME) {
      const value = isChecked ? Constants.YES : Constants.NO;
      localStorage.setItem(Constants.REMEMBERME, value);
    }
  }

  handleInputChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
      errorMsg: ''
    });
  }

  onKeyDown = (event) => {
    if(event.keyCode === 13) {
      this.login();
    }
  }

  login = () => {
    const {
      username,
      password
    } = this.state;

    const user = {
      username: username,
      password: password
    }

    if (!username) {
      this.setState({
        errorMsg: 'Enter username.'
      });
      return;
    }

    if (!password) {
      this.setState({
        errorMsg: 'Enter password.'
      });
      return;
    }

    axios.post('/auth/login/user', user)
      .then(res => {
        const loginResponse = res.data;
        if (loginResponse.error) {
          this.setState({
            errorMsg: loginResponse.error
          });
        } else {
          this.props.onLoginSuccess(loginResponse);
        }
      });
  }

  render() {
    return (
      <div className="login-view">
        <div className="login-panel">
          <div className="login-app-title">Poli</div>
          <div className="login-error-msg">{this.state.errorMsg}</div>
          <div className="login-panel-body">
            <div className="form-panel">
              <label>Username</label>
              <input 
                className="form-input"
                type="text" 
                name="username" 
                value={this.state.username}
                onChange={this.handleInputChange} 
              />
              <label>Password</label>
              <input 
                className="form-input"
                type="password" 
                name="password" 
                value={this.state.password}
                onChange={this.handleInputChange} 
              />
              <div>
                <Checkbox name="rememberMe" value="Remember me" checked={this.state.rememberMe} onChange={this.handleCheckBoxChange} />
              </div>
              <button className="button login-button button-green" onClick={this.login}>Login</button>
            </div>
          </div>
        </div>
        <div className="version-number">
          Version {this.state.version}
        </div>
      </div>
    )
  }
}

export default withRouter(Login);