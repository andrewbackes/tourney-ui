import React, { Component } from 'react';
import Panel from 'components/panel';

import OpeningBookTable from 'scenes/tournament-summary/opening';
import StandingsTable from 'scenes/tournament-summary/standings';
import MathupsTable from 'scenes/tournament-summary/matchups';
import TimeControlTable from 'scenes/tournament-summary/time-control';

export default class TournamentDashboard extends Component {
  render() {
    return (
      <div className="row">
        <div className="col-xs-12 col-sm-6">
          <Panel title="Standings" mode="default" content={
            <StandingsTable 
              contestants={this.props.tournament.settings ? this.props.tournament.settings.contestants : []}
              stats={this.props.tournament.summary ? this.props.tournament.summary.stats : null}
            />}
          />
        </div>
        <div className="col-xs-12 col-sm-6">
          <Panel title="Matchups" mode="default" content={<MathupsTable stats={this.props.tournament.summary ? this.props.tournament.summary.stats : null}/>}/>
        </div>
        
        { this.props.tournament && this.props.tournament.settings &&
        <div className="col-xs-12 col-sm-6">
          <Panel title="Time Control" mode="default" content={<TimeControlTable timeControl={this.props.tournament.settings.timeControl}/>}/>
        </div>
        }
        { this.props.tournament && this.props.tournament.settings &&
        <div className="col-xs-12 col-sm-6">
          <Panel title="Opening Book" mode="default" content={<OpeningBookTable opening={this.props.tournament.settings.opening}/>}/>
        </div>
        }
      </div>
    );
  }
}
