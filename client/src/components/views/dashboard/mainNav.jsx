import React, { Component } from 'react';


export default class MainNav extends Component {
  constructor(props) {
    super(props);
    // Correctly Bind class methods to reacts class instance
    this.toggleSideNav = this.toggleSideNav.bind(this);
  }

  toggleSideNav(e) {
    this.props.toggleSideNav();
    e.preventDefault();
  }

  render() {
    return (
      <div className="row navbar-fixed">
        <nav>
          <div className="col s1 l2">
            <a href="" className="left" onClick={this.toggleSideNav}><i className="material-icons">menu</i></a>
          </div>
          <div className="col s11 l8">
            <div className="col s12 nav-input">
              <div className="input-field col s12">
                <i className="material-icons prefix">search</i>
                <input
                  id="username"
                  type="text"
                  placeholder="Search for a document"
                />
              </div>
            </div>
          </div>
        </nav>
      </div>
    );
  }
}

MainNav.propTypes = {
  toggleSideNav: React.PropTypes.func.isRequired,
};
