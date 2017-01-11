import React, { Component } from 'react';

export default class Dashboard extends Component {
  componentDidMount() {
    const { store } = this.context;
    console.log(store.getState());
    // @TODO check to see that token details is available on the store / localstorage
    // Else kick user out to signin page
  }

  render() {
    return (
      <h1>
        Hello we are in the dashboard now
      </h1>
    );
  }
}

Dashboard.contextTypes = {
  store: React.PropTypes.object,
  router: React.PropTypes.object.isRequired,
};
