import React, { Component } from 'react';

import TournamentService from 'services/tournament';
import EngineListTable from 'scenes/engine-list/EngineListTable';

export default class EngineList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      engines: [],
    };
    this.setEngines = this.setEngines.bind(this);
    this.refreshList();
    }

  componentDidMount() {
    this.timerID = setInterval(
      () => this.refreshList(),
      5000
    );
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  setEngines(engines) {
    if (this.timerID) {
      this.setState({ engines: engines });
    }
  }

  refreshList() {
    TournamentService.getEngineList(this.setEngines);
  }
  
  render() {
    return (
      <div>
        <div className="row">
          <h2 style={{ 'marginBottom': '20px' }}>Engines</h2>
        </div>
        <div className="row">
          <div className="col-xs-12">
            <EngineListTable list={this.state.engines} history={this.props.history}/>
          </div>
        </div>
      </div>
    );
  }
}