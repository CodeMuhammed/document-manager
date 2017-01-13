import React, { Component } from 'react';

export default class Filter extends Component {
  constructor() {
    super();

    this.state = {
      selected: 'public documents',
      accessLevels: [
        { key: 'public', value: 'All documents' },
        { key: 'owner', value: 'My documents' },
        { key: 'role', value: 'Access level documents' },
      ],
    };

    // Correctly Bind class methods to reacts class instance
    this.getAccesslist = this.getAccesslist.bind(this);
    this.handleAccessChange = this.handleAccessChange.bind(this);
  }

  getAccesslist() {
    const nodes = [];
    this.state.accessLevels.forEach((access, index) => {
      nodes.push(
        <li key={index} onClick={() => { this.handleAccessChange(access.value); }}>
          <a>{`${access.value}-(${access.key})`}</a>
        </li>
      );
    });
    return nodes;
  }

  handleAccessChange(data) {
    const newState = this.state;
    newState.selected = data;
    this.setState(newState);
    this.props.filterChanged(data);
  }

  render() {
    return (
      <div className="row" style={{ marginTop: '-1.45em', borderBottom: '3px solid red', backgroundColor: '#EFEFEF' }}>
        <div className="col s11 offset-s1 l8 offset-l2 doc-mainview-wrapper">
          <div className="col s12 doc-filter">
            <span className="text">
              <span>
                Showing top 20 documents
              </span>
            </span>
            <span className="dropdown-button right filer-dropdown col-s12" data-activates="rights">
              <span>
                Filter: {this.state.selected}
              </span>
              <i className="material-icons icon">keyboard_arrow_down</i>
            </span>
            <ul id="rights" className="dropdown-content">
              { this.getAccesslist() }
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

Filter.propTypes = {
  filterChanged: React.PropTypes.func.isRequired,
};
