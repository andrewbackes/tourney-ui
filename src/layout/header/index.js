import React, { Component } from 'react';

import NavBar from 'layout/header/nav';
import NavBreadcrumbs from 'layout/header/breadcrumbs';

export default class Header extends Component {
  render() {
    return (
      <div>
        <div className="row">
          <div>
            <NavBar location={this.props.location}/>
          </div>
        </div>
        <div className="row">
          <div className="col-xs-12">
            <NavBreadcrumbs navPath={this.props.location.pathname}/>
          </div>
        </div>
      </div>
    ); 
  }
}
