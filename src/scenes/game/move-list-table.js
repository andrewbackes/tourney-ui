import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import Duration from 'util/duration';
import Move from 'util/move';

export default class MoveTable extends Component {
    
  scrollToBottom = () => {
    const node = ReactDOM.findDOMNode(this.tbody);
    if (node !== null && node.lastElementChild !== null) {
      if (node.children.length > 24) {
        if (node.lastElementChild.classList && node.lastElementChild.classList.contains('active')) {
          if (node.lastElementChild.lastElementChild) {
            //node.lastElementChild.firstElementChild.scrollIntoView({ behavior: "smooth" });
            //let rowpos = $(node.lastElementChild.firstElementChild).position();
            //console.log($(node.lastElementChild.clientTop));
            //console.log($(node.lastElementChild).position().top);
            //$('#moveListBody').scrollTop(rowpos.top);
          }
        }
      }
    }
  }
  
  componentDidMount() {
    this.scrollToBottom();
  }
  
  componentDidUpdate() {
    this.scrollToBottom();
  }


  render() {
    let rows = [];
    if (this.props.game.positions) {
      this.props.game.positions.forEach( (pos, i) => {
        rows.push(<MoveTableRow index={i} key={pos.fen} clocks={pos.clock} position={pos} lastMove={pos.lastMove} setPosition={this.props.setPosition} currentPosition={this.props.currentPosition}/>)
      });
    }
    return (
      <div>
        <table className="table table-hover table-condensed table-fixed" id="moveList">
          <thead id="moveListHead">
            <tr>
              <th className="col-xs-3">Number</th>
              <th className="col-xs-3">Move</th>
              <th className="col-xs-3">Duration</th>
              <th className="col-xs-3">Clock</th>
            </tr>
          </thead>
          <tbody style={{ 'height' : '348px' }} ref={(el) => { this.tbody = el; }} id="moveListBody">
            { rows }
          </tbody>
        </table>
      </div>
    );
  }
}

class MoveTableRow extends Component {

  handleClick(e) {
    this.props.setPosition(this.props.position);
  }

  render() {
    let active = this.props.position.fen === this.props.currentPosition.fen;
    return (
      <tr className={'clickable ' + (active ? 'active' : '')} onClick={this.handleClick.bind(this)}>
        <td className="col-xs-3">{ this.props.index %2 === 1 ? Math.floor(this.props.index /2) +1 : "-" }</td>
        <td className="col-xs-3">{ this.props.index === 0 ? "-" : (this.props.index %2 === 0 ? "..." : "") + (Move.format(this.props.lastMove)) }</td>
        <td className="col-xs-3">{ this.props.lastMove.duration ? Duration.format(this.props.lastMove.duration) : "-" }</td>
        <td className="col-xs-3">{ Duration.format(this.props.clocks[this.props.index %2]) }</td>
      </tr>
    );
  }
}