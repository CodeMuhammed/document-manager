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
    this.state.docs.forEach((doc) => {
      docs.push(<Doc data={doc} />);
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
        { this.getDocsList() }
        <div className="fixed-action-btn">
          <a className="btn-floating btn-large waves-effect waves-light red">
            <i className="large material-icons">mode_edit</i>
          </a>
        </div>
        <ul className="pagination">
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
