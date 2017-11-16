import React, { Component } from 'react';

import NavBar from 'layout/header/nav';

export default class Header extends Component {
  render() {
    return (
      <div className="row">
        <div>
          <NavBar location={this.props.location}/>
        </div>
      </div>
    ); 
  }
}