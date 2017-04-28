import React, { Component } from 'react';
import Filter from '../views/documents/filter.jsx';
import Doc from '../views/documents/doc.jsx';

export default class Documents extends Component {
  constructor() {
    super();

    this.state = {
      filter: '',
      docs: [
        {
          title: 'The first doc i saved',
          content: 'This is the body of the document',
        },
        {
          title: 'The second doc i saved',
          content: 'This is the body of the document',
        },
        {
          title: 'The first doc i saved',
          content: 'This is the body of the document',
        },
        {
          title: 'The second doc i saved',
          content: 'This is the body of the document',
        },
        {
          title: 'The first doc i saved',
          content: 'This is the body of the document',
        },
        {
          title: 'The second doc i saved',
          content: 'This is the body of the document',
        },
        {
          title: 'The first doc i saved',
          content: 'This is the body of the document',
        },
        {
          title: 'The second doc i saved',
          content: 'This is the body of the document',
        },
        {
          title: 'The second doc i saved',
          content: 'This is the body of the document',
        },
        {
          title: 'The first doc i saved',
          content: 'This is the body of the document',
        },
      ],
    };

    // Correctly Bind class methods to reacts class instance
    this.filterChanged = this.filterChanged.bind(this);
    this.getDocsList = this.getDocsList.bind(this);
  }

  getDocsList() {
    const docs = [];
    this.state.docs.forEach((doc, index) => {
      docs.push(<Doc key={index} data={doc} />);
    });
    return docs;
  }

  filterChanged(data) {
    this.state.filter = data;
  }

  render() {
    return (
      <div>
        <Filter filterChanged={this.filterChanged} />
        <div>
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
        </div>
        { this.getDocsList() }
        <div className="fixed-action-btn">
          <a className="btn-floating btn-large waves-effect waves-light red">
            <i className="large material-icons">add</i>
          </a>
        </div>
        <ul className="pagination center-align">
          <li className="disabled"><a href="#!"><i className="material-icons">chevron_left</i></a></li>
          <li className="active"><a href="#!">1</a></li>
          <li className="waves-effect"><a href="#!">2</a></li>
          <li className="waves-effect"><a href="#!">3</a></li>
          <li className="waves-effect"><a href="#!"><i className="material-icons">chevron_right</i></a></li>
        </ul>
      </div>
    );
  }
}
