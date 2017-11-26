import React, { Component } from 'react';

export default class Engine extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <div className="row">
          <h2 style={{ 'marginBottom': '0px' }}>{ this.props.match.params.engineName }</h2>
        </div>
      </div>
    );
  }
}