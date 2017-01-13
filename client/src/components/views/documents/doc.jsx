import React, { Component } from 'react';

export default class Doc extends Component {
  render() {
    return (
      <div className="row doc-wrapper">
        <div className="doc z-depth-1 col s11 offset-s1 l8 offset-l2">
          <span className="text">
            {this.props.data.title}
          </span>
          <ul className="controls right">
            <li className="control">
              <i className="material-icons">remove_red_eye</i>
            </li>
            <li className="control" style={{ color: 'red' }}>
              <i className="material-icons">delete</i>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}

Doc.propTypes = {
  data: React.PropTypes.object.isRequired,
};
