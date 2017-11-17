import React, { Component } from 'react';
import TournamentService from 'services/tournament';

import GameTable from 'scenes/game-list/game-table';
import Search from 'scenes/game-list/Search';

export default class GameList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tournament: {},
      gameList: [],
    };
    this.setTournament = this.setTournament.bind(this);
    this.setGameList = this.setGameList.bind(this);
    this.refreshState()
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
      if (this.state.tournament.status === "Complete") {
        clearInterval(this.timerID);
      }
    }
  }

  setGameList(gameList) {
    if (this.timerID) {
      this.setState({ gameList: gameList });
    }
  }

  refreshState() {
    TournamentService.getTournament(this.props.tournamentId, this.setTournament)
    TournamentService.getGameList(this.props.tournamentId, this.setGameList)
  }
  
  render() {
    let filterText = decodeURIComponent(this.props.location.search.substring('?q='.length, this.props.location.search.length));
    return (
      <div className="row">
        <div className="col-xs-12">
          <Search history={ this.props.history } filterText={ filterText }/>
        </div>
        <div className="col-xs-12">
          <GameTable gameList={ this.state.gameList } filterText={ filterText } location={ this.props.location } history={ this.props.history }/>
        </div>
      </div>
    );
  }
}
