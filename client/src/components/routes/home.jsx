import React, { Component } from 'react';

export default class Home extends Component {
  componentDidMount() {
    const { store } = this.context;
    console.log(store.getState());
    // @TODO poplulate roles in store from server
  }

  render() {
    return (
      <h1>
        Hi Muahmmed
      </h1>
    );
  }
}

Home.contextTypes = {
  store: React.PropTypes.object,
};
