import React, { Component } from 'react';

import Tabs from 'scenes/tournament/tabs';
import TournamentDashboard from 'scenes/tournament-summary';
import GameList from 'scenes/game-list';

import TournamentService from 'services/tournament';

export default class Tournament extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      tournament: {},
      gameList: [],
    };
    this.setTournament = this.setTournament.bind(this);
    this.setGameList = this.setGameList.bind(this);
    this.refreshState();
  }

  componentDidMount() {
    if (this.state.tournament.status !== "Complete") {
      this.timerID = setInterval(
        () => this.refreshState(),
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

  setGameList(gameList) {
    if (this.timerID) {
      this.setState({ gameList: gameList });
    }
  }

  refreshState() {
    TournamentService.getTournament(this.props.match.params.tournamentId, this.setTournament);
    TournamentService.getGameList(this.props.match.params.tournamentId, this.setGameList);
  }

  render() {
    let section = <TournamentDashboard tournament={this.state.tournament} history={this.props.history}/>;
    switch(this.props.match.params.tab) {
      case 'games':
        section = <GameList gameList={this.state.gameList} history={this.props.history} location={this.props.location}/>;
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
