import React, { Component } from 'react';

export default class MathupsTable extends Component {
  calcRating(games) {
    let scores = {};
    for (let i in games) {
      switch (games[i].result) {
        case 0:
          scores.hasOwnProperty(engineLabel(games[i].contestants[0]) + " vs " + engineLabel(games[i].contestants[1])) ? 
            scores[engineLabel(games[i].contestants[0]) + " vs " + engineLabel(games[i].contestants[1])].incomplete++ : 
            scores[engineLabel(games[i].contestants[0]) + " vs " + engineLabel(games[i].contestants[1])] = { wins: 0, losses: 0, draws: 0, incomplete: 1};
          scores.hasOwnProperty(engineLabel(games[i].contestants[1]) + " vs " + engineLabel(games[i].contestants[0])) ?
            scores[engineLabel(games[i].contestants[1]) + " vs " + engineLabel(games[i].contestants[0])].incomplete++ :
            scores[engineLabel(games[i].contestants[1]) + " vs " + engineLabel(games[i].contestants[0])] = { wins: 0, losses: 0, draws: 0, incomplete: 1};
          break;
        case 1:
          // 1-0
          scores.hasOwnProperty(engineLabel(games[i].contestants[0]) + " vs " + engineLabel(games[i].contestants[1])) ?
            scores[engineLabel(games[i].contestants[0]) + " vs " + engineLabel(games[i].contestants[1])].wins++ :
            scores[engineLabel(games[i].contestants[0]) + " vs " + engineLabel(games[i].contestants[1])] = { wins:1, losses: 0, draws: 0, incomplete: 0};
          scores.hasOwnProperty(engineLabel(games[i].contestants[1]) + " vs " + engineLabel(games[i].contestants[0])) ?
            scores[engineLabel(games[i].contestants[1]) + " vs " + engineLabel(games[i].contestants[0])].losses++ :
            scores[engineLabel(games[i].contestants[1]) + " vs " + engineLabel(games[i].contestants[0])] = { wins: 0, losses: 1, draws: 0, incomplete: 0};
          break;
        case 2:
          // 0-1
          scores.hasOwnProperty(engineLabel(games[i].contestants[1]) + " vs " + engineLabel(games[i].contestants[0])) ?
            scores[engineLabel(games[i].contestants[1]) + " vs " + engineLabel(games[i].contestants[0])].wins++ :
            scores[engineLabel(games[i].contestants[1]) + " vs " + engineLabel(games[i].contestants[0])] = { wins:1, losses: 0, draws: 0, incomplete: 0};
          scores.hasOwnProperty(engineLabel(games[i].contestants[0]) + " vs " + engineLabel(games[i].contestants[1])) ?
            scores[engineLabel(games[i].contestants[0]) + " vs " + engineLabel(games[i].contestants[1])].losses++ :
            scores[engineLabel(games[i].contestants[0]) + " vs " + engineLabel(games[i].contestants[1])] = { wins: 0, losses: 1, draws: 0, incomplete: 0};
          break;
        case 3:
          // 1/2-1/2
          scores.hasOwnProperty(engineLabel(games[i].contestants[0]) + " vs " + engineLabel(games[i].contestants[1])) ?
            scores[engineLabel(games[i].contestants[0]) + " vs " + engineLabel(games[i].contestants[1])].draws++ :
            scores[engineLabel(games[i].contestants[0]) + " vs " + engineLabel(games[i].contestants[1])] = { wins:0, losses: 0, draws: 1, incomplete: 0};
          scores.hasOwnProperty(engineLabel(games[i].contestants[1]) + " vs " + engineLabel(games[i].contestants[0])) ?
            scores[engineLabel(games[i].contestants[1]) + " vs " + engineLabel(games[i].contestants[0])].draws++ :
            scores[engineLabel(games[i].contestants[1]) + " vs " + engineLabel(games[i].contestants[0])] = { wins: 0, losses: 0, draws: 1, incomplete: 0};
          break;
        default:
          break;
      }
    }
    for (let key in scores) {
      scores[key].label = key;
      scores[key].rate = (((scores[key].wins + (1/2 * scores[key].draws)) / (scores[key].wins + scores[key].draws + scores[key].losses)) * 100).toFixed(2);
    }
    return Object.values(scores).sort( (a,b) => { return b.rate - a.rate; } );
  }

  render() {
    let rows = [];
    let ratings = this.calcRating(this.props.gameList);
    for (let i = 0; i < ratings.length; i++) {
      rows.push(<Row key={ ratings[i].label } index={ i } entry={ ratings[i] }/>)
    }
    ratings.forEach( (record) => {
      
    })
    return (
      <table className="table table-condensed">
        <thead>
          <tr>
            <th>Position</th>
            <th>Name</th>
            <th>Rate</th>
            <th>Record</th>
            <th>Incomplete</th>
          </tr>
        </thead>
        <tbody>
          { rows }
        </tbody>
      </table>
    );
  }
}

function formatRecord(record) {
  return record.wins + "-" + record.losses + "-" + record.draws;
}

function engineLabel(engine) {
  return engine.name + " " + engine.version;
}

class Row extends Component {
  render() {
    return (
      <tr>
        <td>{ this.props.index + 1 }</td>
        <td>{ this.props.entry.label }</td>
        <td>{ this.props.entry.rate }%</td>
        <td>{ formatRecord(this.props.entry) }</td>
        <td>{ this.props.entry.incomplete }</td> 
      </tr>
    );
  }
}