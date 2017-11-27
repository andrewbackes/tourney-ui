import React, { Component } from 'react';

import TournamentService from 'services/tournament';

import Mac from 'images/oses/mac.svg';
import Linux from 'images/oses/linux.svg';
import Windows from 'images/oses/windows.svg';

const osImages = {
  'mac': Mac,
  'windows': Windows,
  'linux': Linux,
}

export default class Engine extends Component {
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
    TournamentService.getEngineVersionList(this.props.match.params.engineName, this.setEngines);
  }

  render() {
    return (
      <div>
        <div className="row">
          <h2 style={{ 'marginBottom': '20px' }}>{ this.props.match.params.engineName }</h2>
        </div>
        <div className="row">
          <div className="col-xs-12">
            <EngineList name={this.props.match.params.engineName} list={this.state.engines} history={this.props.history}/>
          </div>
        </div>
      </div>
    );
  }
}

class EngineList extends Component {
  render() {
    var rows = [];
    let versions = {};
    this.props.list.forEach( (engine) => {
      if (engine.version in versions) {
        versions[engine.version].oses.add(engine.os);
      } else {
        versions[engine.version] = { oses: new Set([engine.os])};
      }
    });
    const sortedVersions = Object.keys(versions).sort();
    sortedVersions.forEach( (key) => {
      rows.push(<EngineListTableRow key={key} name={this.props.name} version={key} oses={versions[key].oses} history={this.props.history}></EngineListTableRow>);
    });
    return (
      <table className="table table-hover table-condensed">
        <thead>
          <tr>
            <th>Version</th>
            <th>Operating Systems</th>
          </tr>
        </thead>
        <tbody>
          { rows }
        </tbody>
      </table>
    );
  }
}

class EngineListTableRow extends Component {
  handleClick(e) {
    this.props.history.push('/engines/' + this.props.name + '/' + this.props.version);
  }

  render() {
    let oses = [];
    Array.from(this.props.oses).sort().forEach( (os) => {
      oses.push(<img key={os} alt={os} src={osImages[os]} style={{ 'width' : '20px', 'height': '20px' }}/>);
    });
    return (
      <tr className='clickable' onClick={this.handleClick.bind(this)}>
        <td>{ this.props.version }</td>
        <td>{ oses }</td>
      </tr>
    )
  }
}