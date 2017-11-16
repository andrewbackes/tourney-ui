import React, { Component } from 'react';
import Panel from 'components/panel';
import TournamentService from 'services/tournament';

import OpeningBookTable from 'scenes/tournament-summary/opening';
import StandingsTable from 'scenes/tournament-summary/standings';
import MathupsTable from 'scenes/tournament-summary/matchups';
import TimeControlTable from 'scenes/tournament-summary/time-control';
import WorkersTable from 'scenes/tournament-summary/workers';

export default class TournamentDashboard extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      tournament: {},
      runningGames: [],
      workers: []
    };
    this.setTournament = this.setTournament.bind(this);
    this.setRunningGames = this.setRunningGames.bind(this);
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

  setRunningGames(games) {
    if (this.timerID) {
      this.setState({ runningGames: games });
    }
  }

  refreshTournament() {
    TournamentService.getTournament(this.props.tournamentId, this.setTournament)
    TournamentService.getGameList(this.props.tournamentId, this.setRunningGames, "running")
  }

  render() {
    return (
      <div className="row">
        <div className="col-xs-12 col-sm-6">
          <Panel title="Standings" mode="default" content={
            <StandingsTable 
              contestants={this.state.tournament.settings ? this.state.tournament.settings.contestants : []}
              stats={this.state.tournament.summary ? this.state.tournament.summary.stats : null}
            />}
          />
        </div>
        <div className="col-xs-12 col-sm-6">
          <Panel title="Matchups" mode="default" content={<MathupsTable stats={this.state.tournament.summary ? this.state.tournament.summary.stats : null}/>}/>
        </div>
        
        { this.state.tournament && this.state.tournament.settings &&
        <div className="col-xs-12 col-sm-4">
          <Panel title="Time Control" mode="default" content={<TimeControlTable timeControl={this.state.tournament.settings.timeControl}/>}/>
        </div>
        }
        { this.state.tournament && this.state.tournament.settings &&
        <div className="col-xs-12 col-sm-4">
          <Panel title="Opening Book" mode="default" content={<OpeningBookTable opening={this.state.tournament.settings.opening}/>}/>
        </div>
        }
        { this.state.tournament && this.state.tournament.settings &&
        <div className="col-xs-12 col-sm-4">
          <Panel title="Workers" mode="success" content={<WorkersTable workers={this.state.workers}/>}/>
        </div>
        }
      </div>
    );
  }
}
