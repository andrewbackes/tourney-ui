import React, { Component } from 'react';
import Panel from 'components/panel';

import OpeningBookTable from 'scenes/tournament/summary/opening';
import StandingsTable from 'scenes/tournament/summary/standings';
import MathupsTable from 'scenes/tournament/summary/matchups';
import TimeControlTable from 'scenes/tournament/summary/time-control';

export default class Summary extends Component {
  render() {
    return (
      <div>
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
