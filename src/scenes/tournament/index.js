import React, { Component } from 'react';

import Tabs from 'scenes/tournament/tabs';
import TournamentDashboard from 'scenes/tournament-summary';
import GameList from 'scenes/game-list';

import TournamentService from 'services/tournament';

export default class Tournament extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      tournament: {}
    };
    this.setTournament = this.setTournament.bind(this);
    this.refreshTournament();
  }

  componentDidMount() {
    if (this.state.tournament.status !== "Complete") {
      this.timerID = setInterval(
        () => this.refreshTournament(),
        1000
      );
    }
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  setTournament(tournament) {
    if (this.timerID) {
      this.setState({ tournament: tournament });
    }
    if (this.state.tournament.status === "Complete") {
      clearInterval(this.timerID);
    }
  }

  refreshTournament() {
    TournamentService.getTournament(this.props.match.params.tournamentId, this.setTournament)
  }

  render() {
    let section = <TournamentDashboard tournament={this.state.tournament} history={this.props.history}/>;
    switch(this.props.match.params.tab) {
      case 'games':
        section = <GameList tournamentId={this.props.match.params.tournamentId} history={this.props.history}/>;
        break;
      default:
        break;
    }
    return (
      <div>
        <div className="row">
          <h2>{ this.state.tournament.name ? this.state.tournament.name : this.state.tournament.id }</h2>
        </div>
        <Tabs tournamentId={this.props.match.params.tournamentId} history={this.props.history} tab={this.props.match.params.tab}/>
        { section }
      </div>
    );
  }
}
