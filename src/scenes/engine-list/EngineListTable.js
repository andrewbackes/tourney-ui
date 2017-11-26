import React, { Component } from 'react';

import Mac from 'images/oses/mac.svg';
import Linux from 'images/oses/linux.svg';
import Windows from 'images/oses/windows.svg';

const osImages = {
  'mac': Mac,
  'windows': Windows,
  'linux': Linux,
}

export default class EngineListTable extends Component {
  render() {
    var rows = [];
    let engines = {};
    this.props.list.forEach( (engine) => {
      if (engine.name in engines) {
        engines[engine.name].versions.add(engine.version);
        engines[engine.name].oses.add(engine.os);
      } else {
        engines[engine.name] = { versions: new Set([engine.version]), oses: new Set([engine.os])};
      }
    });
    const sortedEngines = Object.keys(engines).sort();
    sortedEngines.forEach( (key) => {
      rows.push(<EngineListTableRow key={key} name={key} versions={engines[key].versions} oses={engines[key].oses} history={this.props.history}></EngineListTableRow>);
    });
    return (
      <table className="table table-hover table-condensed">
        <thead>
          <tr>
            <th>Name</th>
            <th>Versions</th>
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
    this.props.history.push('/engines/' + this.props.name);
  }

  render() {
    let oses = [];
    Array.from(this.props.oses).sort().forEach( (os) => {
      oses.push(<img key={os} alt={os} src={osImages[os]} style={{ 'width' : '20px', 'height': '20px' }}/>);
    });
    return (
      <tr className='clickable' onClick={this.handleClick.bind(this)}>
        <td>{ this.props.name }</td>
        <td>{ this.props.versions.size }</td>
        <td>{ oses }</td>
      </tr>
    )
  }
}