import React, { Component } from 'react';
import Select from 'react-select';
import actions from '../../store/actions';
import signupValidators from '../../utils/signupValidators';

export default class Signup extends Component {
  constructor() {
    super();

    this.state = {
      userInfo: {
        username: '',
        firstname: '',
        lastname: '',
        password: '',
        confirmPass: '',
        role: '',
      },
      asyncLoader: {
        status: '',
        succeed: false,
        message: '',
      },
      roles: [],
    };

    // Set of validators for signup form
    this.validators = signupValidators;
    this.resetValidators();

    // Correctly Bind class methods to reacts class instance
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleRolesChange = this.handleRolesChange.bind(this);
    this.setDefaultRoles = this.setDefaultRoles.bind(this);
    this.displayValidationErrors = this.displayValidationErrors.bind(this);
    this.displayAsyncFeedback = this.displayAsyncFeedback.bind(this);
    this.updateValidators = this.updateValidators.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.isFormValid = this.isFormValid.bind(this);
  }

  componentDidMount() {
    this.store = this.context.store;
    const roles = [];

    // Populate roles from the server
    this.store.dispatch(actions.getRoles())
    .then((info) => {
      if (info.status === 'success') {
        info.success.forEach((role) => {
          roles.push({
            value: role.id,
            label: role.title,
          });
        });
        this.setDefaultRoles(roles);
      }
    });
  }

  setDefaultRoles(data) {
    const newState = this.state;
    newState.roles = data;
    newState.userInfo.role = data[0];
    this.setState(newState);
  }

  handleRolesChange(event) {
    const newState = this.state;
    newState.userInfo.role = event;
    this.setState(newState);
  }

  handleInputChange(event, inputPropName) {
    const newState = this.state;
    newState.userInfo[inputPropName] = event.target.value;
    this.setState(newState);
    this.updateValidators(inputPropName, event.target.value);
  }

  handleSubmit(e) {
    let newState = this.state;
    newState.asyncLoader.status = 'processing';
    this.setState(newState);
    this.store.dispatch(actions.signupHandler({
      username: this.state.userInfo.username,
      firstname: this.state.userInfo.firstname,
      lastname: this.state.userInfo.lastname,
      password: this.state.userInfo.password,
      roleId: this.state.userInfo.role.value,
    })).then((info) => {
      newState = this.state;
      if (info.status === 'error') {
        newState.asyncLoader = {
          status: 'completed',
          succeed: false,
          message: info.error.msg,
        };
      } else {
        newState.asyncLoader = {
          status: 'completed',
          succeed: true,
          message: info.success.msg,
        };
      }
      this.setState(newState);
    });
    e.preventDefault();
  }

  displayAsyncFeedback() {
    if (this.state.asyncLoader.status === 'processing') {
      return (
        <div className="row center-align async-loader">
          <div className="preloader-wrapper small active">
            <div className="spinner-layer spinner-green-only">
              <div className="circle-clipper left">
                <div className="circle" />
              </div><div className="gap-patch">
                <div className="circle" />
              </div><div className="circle-clipper right">
                <div className="circle" />
              </div>
            </div>
          </div>
        </div>
      );
    } else if (this.state.asyncLoader.status === 'completed') {
      if (!this.state.asyncLoader.succeed) {
        return (
          <div className="row center-align async-loader">
            <span style={{ color: 'red' }}> {this.state.asyncLoader.message}</span>
          </div>
        );
      }
      return (
        <div className="row center-align async-loader">
          <span style={{ color: 'green', display: 'block' }}>
            {this.state.asyncLoader.message}
          </span>
          <a href="/#/signin"><b>Click here to signin</b></a>
        </div>
      );
    }
    return '';
  }

  resetValidators() {
    Object.keys(this.validators).forEach((fieldName) => {
      this.validators[fieldName].errors = [];
      this.validators[fieldName].state = '';
      this.validators[fieldName].valid = false;
    });
  }

  displayValidationErrors(fieldName) {
    const rule = this.validators[fieldName];
    if (rule) {
      if (!rule.valid) {
        const errors = rule.errors.map((info, index) => {
          return <span className="error" key={index}>* {info}</span>;
        });

        return (
          <div className="col s12 row">
            {errors}
          </div>
        );
      }
      return '';
    }
    return '';
  }

  updateValidators(fieldName, value) {
    this.validators[fieldName].errors = [];
    this.validators[fieldName].state = value;
    this.validators[fieldName].valid = true;
    this.validators[fieldName].rules.forEach((rule) => {
      if (rule.test instanceof RegExp) {
        if (!rule.test.test(value)) {
          this.validators[fieldName].errors.push(rule.message);
          this.validators[fieldName].valid = false;
        }
      } else if (typeof rule.test === 'function') {
        if (!rule.test(value)) {
          this.validators[fieldName].errors.push(rule.message);
          this.validators[fieldName].valid = false;
        }
      }
    });
  }

  isFormValid() {
    let status = true;
    const fields = Object.keys(this.validators);

    fields.forEach((field) => {
      if (!this.validators[field].valid) {
        status = false;
      }
    });
    return status;
  }

  render() {
    return (
      <div className="row">
        <div className="col s12 m8 l4 offset-m2 offset-l4 z-depth-4 card-panel login-form">
          <form className="col s12" onSubmit={this.handleSubmit}>
            <div className="row">
              <div className="input-field col s12">
                <h4 className="center login-form-text">Create new acount</h4>
              </div>
            </div>
            <div className="row margin">
              <div className="input-field col s12">
                <i className="material-icons prefix">person</i>
                <input
                  id="firstname"
                  type="text"
                  value={this.state.userInfo.firstname}
                  onChange={event => this.handleInputChange(event, 'firstname')}
                />
                <label htmlFor="firstname" className="left-align">Firstname</label>
              </div>
              { this.displayValidationErrors('firstname') }
            </div>
            <div className="row margin">
              <div className="input-field col s12">
                <i className="material-icons prefix">person</i>
                <input
                  id="lastname"
                  type="text"
                  value={this.state.userInfo.lastname}
                  onChange={event => this.handleInputChange(event, 'lastname')}
                />
                <label htmlFor="lastname" className="left-align">lastname</label>
              </div>
              { this.displayValidationErrors('lastname') }
            </div>
            <div className="row margin">
              <div className="input-field col s12">
                <i className="material-icons prefix">person</i>
                <input
                  id="username"
                  type="text"
                  value={this.state.userInfo.username}
                  onChange={event => this.handleInputChange(event, 'username')}
                />
                <label htmlFor="username" className="left-align">Username</label>
              </div>
              { this.displayValidationErrors('username') }
            </div>
            <div className="row margin">
              <div className="input-field col s12">
                <i className="material-icons prefix">lock</i>
                <input
                  id="password"
                  type="password"
                  value={this.state.userInfo.password}
                  onChange={event => this.handleInputChange(event, 'password')}
                />
                <label htmlFor="password" className="left-align">Password</label>
              </div>
              { this.displayValidationErrors('password') }
            </div>
            <div className="row margin">
              <div className="input-field col s12">
                <i className="material-icons prefix">lock</i>
                <input
                  id="confirm"
                  type="password"
                  value={this.state.userInfo.confirmPass}
                  onChange={event => this.handleInputChange(event, 'confirmPass')}
                />
                <label htmlFor="confirm" className="left-align">Confirm password</label>
              </div>
              { this.displayValidationErrors('confirmPass') }
            </div>
            <div className="row margin role-select">
              <h6 className="left-align">Select role</h6>
              <Select
                className="select"
                name="form-field-name"
                value={this.state.userInfo.role}
                options={this.state.roles}
                onChange={this.handleRolesChange}
              />
            </div>
            { this.displayAsyncFeedback() }
            <div className="row">
              <div className="input-field col s12 signup-btn">
                <button className={`btn waves-effect waves-light col s12 ${this.isFormValid() ? '' : 'disabled'}`}>
                  Signup
                </button>
              </div>
            </div>
            <div className="row">
              <div className="input-field col s12">
                <p className="margin medium-small">Already a user? <a href="/#/signin">Sign in!</a></p>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

Signup.contextTypes = {
  store: React.PropTypes.object,
  router: React.PropTypes.object.isRequired,
};
