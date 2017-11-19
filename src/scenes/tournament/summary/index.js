import React, { Component } from 'react';
import Panel from 'components/panel';

import OpeningBookTable from 'scenes/tournament/summary/opening';
import StandingsTable from 'scenes/tournament/summary/standings';
import MathupsTable from 'scenes/tournament/summary/matchups';
import TimeControlTable from 'scenes/tournament/summary/time-control';

export default class Summary extends Component {
  render() {
    const complete = this.props.gameList.filter( (game) => { return game.status === 'Complete'; } ).length;
    const running = this.props.gameList.filter( (game) => { return game.status === 'Running'; } ).length;
    const complete_progress = 100 * complete / this.props.gameList.length;
    const running_progress = 100 * running / this.props.gameList.length;
    return (
      <div>
        { this.props.tournament.status === 'Running' &&
        <div className="row">
          <div className="col-xs-12">
            <div className="progress">
              <div className="progress-bar progress-bar progress-bar-striped" role="progressbar"
              aria-valuenow={complete_progress} aria-valuemin="0" aria-valuemax="100" style={{ "width": complete_progress + "%" }}>
              {complete} Complete
              </div>
              <div className="progress-bar progress-bar-success progress-bar-striped active" role="progressbar"
              aria-valuenow={running_progress} aria-valuemin="0" aria-valuemax="100" style={{ "width": running_progress + "%" }}>
              {running} Running
              </div>
            </div>
          </div>
        </div>
        }
        <div className="row">
          { this.props.tournament && this.props.tournament.settings &&
          <div className="col-xs-12 col-sm-5">
            <Panel title="Time Control" mode="default" content={<TimeControlTable timeControl={this.props.tournament.settings.timeControl}/>}/>
          </div>
          }
          { this.props.tournament && this.props.tournament.settings &&
          <div className="col-xs-12 col-sm-7">
            <Panel title="Opening Book" mode="default" content={<OpeningBookTable opening={this.props.tournament.settings.opening}/>}/>
          </div>
          }
        </div>
        <div className="row">
          <div className="col-xs-12 col-sm-5">
            <Panel title="Standings" mode="default" content={
              <StandingsTable gameList={this.props.gameList}/>
            }/>
          </div>
          <div className="col-xs-12 col-sm-7">
            <Panel title="Matchups" mode="default" content={
              <MathupsTable gameList={this.props.gameList}/>
            }/>
          </div>
        </div>
      </div>
    );
  }
}
