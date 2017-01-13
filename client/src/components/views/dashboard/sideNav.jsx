import React, { Component } from 'react';


export default class SideNav extends Component {
  constructor(props) {
    super(props);

    // Correctly Bind class methods to reacts class instance
    this.toggleSideNav = this.toggleSideNav.bind(this);
  }

  toggleSideNav(e) {
    this.props.toggleSideNav(false);
    e.preventDefault();
  }

  render() {
    return (
      <div className="">
        <div className="sidenav z-depth-3">
          <div className="header left-align">
            <h2>Doc-Man</h2>
            <i className="material-icons icon" onClick={this.toggleSideNav}>cancel</i>
          </div>
          <ul className="menu">
            <li className="menu-item">
              <a className="">
                <i className="material-icons prefix">library_books</i>
                <span className="text">Documents</span>
              </a>
            </li>
            <li className="menu-item">
              <a className="">
                <i className="material-icons prefix">people</i>
                <span className="text">Users</span>
              </a>
            </li>
            <li className="menu-item">
              <a className="">
                <i className="material-icons prefix">lock_outline</i>
                <span className="text">Roles</span>
              </a>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}

SideNav.propTypes = {
  toggleSideNav: React.PropTypes.func.isRequired,
};
