import React, { Component } from 'react';
import Panel from 'components/panel';
import TournamentService from 'services/tournament';

import EvaluationChart from 'scenes/game/EvaluationChart';
import DurationChart from 'scenes/game/DurationChart';
import DepthChart from 'scenes/game/DepthChart';
import PieceDiff from 'scenes/game/PieceDiff';
import MoveTable from 'scenes/game/move-list-table';
import EngineAnalysisTable from 'scenes/game/engine-analysis-table';
import Board from 'scenes/game/chessboard';

export default class GameDashboard extends Component {

  constructor(props) {
    super(props);
    this.state = {
      game: {
        positions: [],
        status: '',
      },
      position: {
        fen: ""
      },
      positionIndex: 0,
      tournament: {},
    };
    this.initGame = this.initGame.bind(this);
    this.setGame = this.setGame.bind(this);
    this.setTournament = this.setTournament.bind(this);
    this.setPosition = this.setPosition.bind(this);
    this.gotoFirst = this.gotoFirst.bind(this);
    this.gotoPrevious = this.gotoPrevious.bind(this);
    this.gotoNext = this.gotoNext.bind(this);
    this.gotoLast = this.gotoLast.bind(this);
    this.currentPositionIndex = this.currentPositionIndex.bind(this);
    TournamentService.getGame(this.props.match.params.tournamentId, this.props.match.params.gameId, this.initGame);
    TournamentService.getTournament(this.props.match.params.tournamentId, this.setTournament);
  }

  componentDidMount() {
    this.timerID = setInterval(
      () => this.refreshGame(),
      1000
    );
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  queryStringPositionIndex() {
    let val = decodeURIComponent(this.props.location.search.substring('?positionIndex='.length, this.props.location.search.length));
    return val.split("#")[0];
  }

  initGame(game) {
    this.setState({ game: game });
    if (game.status === "Complete") {
      clearInterval(this.timerID);
      if (this.queryStringPositionIndex() !== "") {
        this.setPosition(game.positions[this.queryStringPositionIndex()]);
      } else {
        this.setPosition(game.positions[0]);
      }
    } else {
      this.setPosition(this.state.game.positions[this.state.game.positions.length-1]);
    }
  }

  setTournament(tournament) {
    this.setState({ tournament: tournament });
  }

  setGame(game) {
    let updatePosition = false;
    if (this.state.game && this.state.game.positions) {
      updatePosition = this.state.position === this.state.game.positions[this.state.game.positions.length-1]
    }
    if (this.timerID) {
      this.setState({ game: game });
    }
    if (updatePosition) {
      this.setPosition(this.state.game.positions[this.state.game.positions.length-1]);
    }
    
    if (this.state.game.status === "Complete") {
      clearInterval(this.timerID);
    }
  }

  setPosition(position) {
    if (this.timerID) {
      this.setState({ position: position });
    }
  }

  refreshGame() {
    TournamentService.getGame(this.props.match.params.tournamentId, this.props.match.params.gameId, this.setGame);
  }
  
  currentPositionIndex() {
    for (let i = 0; i < this.state.game.positions.length; i++) {
      if (this.state.game.positions[i] === this.state.position) {
        return i;
      }
    }
    return 0;
  }

  gotoFirst() {
    let url = '/tournaments/' + this.state.game.tournamentId + '/games/' + this.state.game.id;
    let i = 0;
    this.setPosition(this.state.game.positions[0]);
    this.props.history.push(url + '?positionIndex=' + i);
  }

  gotoPrevious() {
    let url = '/tournaments/' + this.state.game.tournamentId + '/games/' + this.state.game.id;
    let i = this.currentPositionIndex();
    if (i > 0) {
      this.setPosition(this.state.game.positions[i-1]);
      this.props.history.push(url + '?positionIndex=' + (i-1));
    }
  }

  gotoNext() {
    let url = '/tournaments/' + this.state.game.tournamentId + '/games/' + this.state.game.id;
    let i = this.currentPositionIndex();
    if (i < this.state.game.positions.length-1) {
      this.setPosition(this.state.game.positions[i+1]);
      this.props.history.push(url + '?positionIndex=' + (i+1));
    }
  }

  gotoLast() {
    let url = '/tournaments/' + this.state.game.tournamentId + '/games/' + this.state.game.id;
    let i = this.state.game.positions.length-1;
    this.setPosition(this.state.game.positions[i]);
    this.props.history.push(url + '?positionIndex=' + i);
  }

  render() {
    return (
      <div>
        <div className="row">
          <h2 style={{ 'marginBottom': '0px' }}><a href='#back' onClick={ this.props.history.goBack }>{this.state.tournament.name ? this.state.tournament.name : this.state.game.tournamentId}</a></h2>
          <h2 style={{ 'marginTop': '0px', 'marginBottom': '40px'  }}><small>Round {this.state.game.round}</small></h2>
        </div>
        {
          this.state.game.status.toLowerCase() === "pending" &&
          <div className="container-fluid">
            <div className="row">
              <div className="alert alert-info">
                This game is <strong>pending</strong>.
              </div>
            </div>
          </div>
        }
        {
          this.state.game.status.toLowerCase() === "running" &&
          <div className="container-fluid">
            <div className="row">
              <div className="alert alert-success">
              This game is <strong>running</strong>.
              </div>
            </div>
          </div>
        }
        <div className="panel panel-default">
          <div className="panel-body">
            <div className="row">
              <div className="col-sm-12 col-xs-12">
                <h4>{ this.state.game.contestants ? this.state.game.contestants[1].name + " " + this.state.game.contestants[1].version : "-"}</h4>
              </div>
            </div>
            <div className="row">
              <div className="col-sm-6 col-xs-12">
                <Board position={this.state.position}/>
              </div>
              <div className="col-sm-6 col-xs-12" style={{ 'marginBottom': '30px' }}>
                <div className="btn-group btn-group-justified">
                  <a href="#first" onClick={ this.gotoFirst } className="btn btn-default"><span className="glyphicon glyphicon-fast-backward"/></a>
                  <a href="#previous" onClick={ this.gotoPrevious } className="btn btn-default"><span className="glyphicon glyphicon-backward"/></a>
                  <a href="#next" onClick={ this.gotoNext } className="btn btn-default"><span className="glyphicon glyphicon-forward"/></a>
                  <a href="#last" onClick={ this.gotoLast } className="btn btn-default"><span className="glyphicon glyphicon-fast-forward"/></a>
                </div>
              </div>
              <div className="col-sm-6 col-xs-12">
                <MoveTable game={this.state.game} setPosition={this.setPosition} index={ this.currentPositionIndex() } currentPosition={this.state.position} />
              </div>
              <div className="col-sm-6 col-xs-12">
                <PieceDiff position={this.state.position}/>
              </div>
            </div>
            <div className="row">
              <div className="col-sm-12 col-xs-12">
                <h4>{ this.state.game.contestants ? this.state.game.contestants[0].name + " " + this.state.game.contestants[0].version : "-"}</h4>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-xs-12">
            <Panel title="Analysis" mode="default" content={
              <div>
                <EvaluationChart positions={ this.state.game.positions }/>
                <DepthChart positions={ this.state.game.positions }/>
                <DurationChart positions={ this.state.game.positions }/>
              </div>
            }/>
          </div>
        </div>
        <div className="row">
          <div className="col-sm-12">
            <Panel title="Engine Output" mode='default' content={<EngineAnalysisTable analysis={this.state.position.analysis}/>}/>
          </div>
        </div>
      </div>
    );
  }
}
