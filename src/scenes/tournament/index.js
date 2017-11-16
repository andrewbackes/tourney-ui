import React, { Component } from 'react';

import Tabs from 'scenes/tournament/tabs';
import TournamentDashboard from 'scenes/tournament-summary';
import GameList from 'scenes/game-list';

export default class Tournament extends Component {
  render() {
    let section = <TournamentDashboard tournamentId={this.props.match.params.tournamentId} history={this.props.history}/>;
    switch(this.props.match.params.tab) {
      case 'games':
        section = <GameList tournamentId={this.props.match.params.tournamentId} history={this.props.history}/>;
        break;
      default:
        break;
    }
    return (
      <div>
        <Tabs tournamentId={this.props.match.params.tournamentId} history={this.props.history} tab={this.props.match.params.tab}/>
        { section }
      </div>
    );
  }
}
