import React, { Component } from 'react';
import actions from '../../store/actions';

export default class Signin extends Component {
  componentDidMount() {
  }

  render() {
    return (
      <div className="row">
        <div className="col s12 m8 l4 offset-m2 offset-l4 z-depth-4 card-panel login-form">
          <form className="col s12">
            <div className="row">
              <div className="input-field col s12">
                <h4 className="center login-form-text">Sign into your account</h4>
              </div>
            </div>
            <div className="row margin">
              <div className="input-field col s12">
                <i className="material-icons prefix">person</i>
                <input id="username" type="text" />
                <label htmlFor="username" className="left-align">Username</label>
              </div>
            </div>
            <div className="row margin">
              <div className="input-field col s12">
                <i className="material-icons prefix">lock</i>
                <input id="username" type="text" />
                <label htmlFor="username" className="left-align">Password</label>
              </div>
            </div>
            <div className="row">
              <div className="input-field col s12">
                <a href="index.html" className="btn waves-effect waves-light col s12">Login</a>
              </div>
            </div>
            <div className="row">
              <div className="input-field col s6 m6 l6">
                <p className="margin medium-small">New user? <a href="/#/signup">Register Now!</a></p>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

Signin.contextTypes = {
  store: React.PropTypes.object,
};
