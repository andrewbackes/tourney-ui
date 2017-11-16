import React, { Component } from 'react';

export default class GameTable extends Component {
    
  filterGame(game, filterText) {
    if (filterText === "") {
      return true;
    }
    return JSON.stringify(game).toLowerCase().includes(filterText);
  }

  render() {
    let rows = [];
    this.props.gameList.forEach( (game) => {
      if (this.filterGame(game, this.props.filterText)) {
        rows.push(<GameTableRow key={game.id} game={game} history={this.props.history}/>)
      }
    })
    return (
      <table className="table table-hover table-condensed">
        <thead>
          <tr>
            <th>Round</th>
            <th>White</th>
            <th>Black</th>
            <th>Result</th>
            <th>Ending</th>
            <th>Winner</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          { rows }
        </tbody>
      </table>
    );
  }
}

function engineLabel(engine) {
  return engine.name + " " + engine.version;
}

function resultLabel(result) {
  const labels = {
    0: "-",
    1: "1-0",
    2: "0-1",
    3: "1/2-1/2",
  };
  return labels[result];
}

class GameTableRow extends Component {
  handleClick(e) {
    this.props.history.push('/tournaments/' + this.props.game.tournamentId + '/games/' + this.props.game.id);
  }

  render() {
    return (
      <tr className='clickable' onClick={this.handleClick.bind(this)}>
        <td>{this.props.game.round}</td>
        <td>{engineLabel(this.props.game.contestants["0"])}</td> 
        <td>{engineLabel(this.props.game.contestants["1"])}</td> 
        <td>{resultLabel(this.props.game.result)}</td>
        <td>{this.props.game.endingCondition}</td>
        <td>{
          0 < this.props.game.result && this.props.game.result < 2 ?
          engineLabel(this.props.game.contestants[this.props.game.result - 1]) : '-'
        }</td>
        <td>{this.props.game.status}</td>
      </tr>
    );
  }
}
