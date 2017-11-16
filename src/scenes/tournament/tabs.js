import React, { Component } from 'react';
import { Link } from 'react-router-dom'

export default class Tabs extends Component {
  render() {
    return (
      <div className="row">
        <ul className="nav nav-tabs" style={{ 'margin-bottom': '20px' }}>
          <li className={ this.props.tab === 'summary' ? 'active' : '' }><Link to={'/tournaments/' + this.props.tournamentId + '/summary'}>Summary</Link></li>
          <li className={ this.props.tab === 'games' ? 'active' : '' }><Link to={'/tournaments/' + this.props.tournamentId + '/games' }>Games</Link></li>
        </ul>
      </div>
    );
  }
}
