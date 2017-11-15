import React, { Component } from 'react';
import WhitePawn from 'images/pieces/piece11.png';
import WhiteKnight from 'images/pieces/piece12.png';
import WhiteBishop from'images/pieces/piece13.png';
import WhiteRook from 'images/pieces/piece14.png';
import WhiteQueen from 'images/pieces/piece15.png';
import WhiteKing from 'images/pieces/piece16.png';
import BlackPawn from 'images/pieces/piece01.png';
import BlackKnight from 'images/pieces/piece02.png';
import BlackBishop from 'images/pieces/piece03.png';
import BlackRook from 'images/pieces/piece04.png';
import BlackQueen from 'images/pieces/piece05.png';
import BlackKing from 'images/pieces/piece06.png';

export default class Board extends Component {
  componentDidMount() {
    this.width = this.myInput.offsetWidth; 
  }

  render() {
    let squares = [];
    const allowedLetters = ['r', 'n', 'b', 'k', 'q', 'p'];
    const squareWidth = Math.floor(this.width / 8);
    const imgWidth = 0.6 * squareWidth;
    const imgMargin = 0.2 * squareWidth;
    const pieceStyle = {"width": imgWidth + "px", "height": imgWidth + "px", "marginLeft": imgMargin + "px", "marginTop": imgMargin + "px" };
    const images = {
      'R': <img alt="R" src={WhiteRook} style={pieceStyle}/>,
      'N': <img alt="R" src={WhiteKnight} style={pieceStyle}/>,
      'B': <img alt="R" src={WhiteBishop} style={pieceStyle}/>,
      'Q': <img alt="R" src={WhiteQueen} style={pieceStyle}/>,
      'K': <img alt="R" src={WhiteKing} style={pieceStyle}/>,
      'P': <img alt="R" src={WhitePawn} style={pieceStyle}/>,
      'r': <img alt="R" src={BlackRook} style={pieceStyle}/>,
      'n': <img alt="R" src={BlackKnight} style={pieceStyle}/>,
      'b': <img alt="R" src={BlackBishop} style={pieceStyle}/>,
      'q': <img alt="R" src={BlackQueen} style={pieceStyle}/>,
      'k': <img alt="R" src={BlackKing} style={pieceStyle}/>,
      'p': <img alt="R" src={BlackPawn} style={pieceStyle}/>
    };
    for (let i = 0; i < this.props.position.fen.length && this.props.position.fen[i] !== ' '; i++) {
      if (allowedLetters.includes(this.props.position.fen[i].toLowerCase())) {
        squares.push(this.props.position.fen.charAt(i));
      } else {
        if (this.props.position.fen.charAt(i) !== '/') {
          // its a number
          for(let j = 0; j < parseInt(this.props.position.fen[i], 10); j++) {
            squares.push('');
          }
        }
      }
    }
    let squareDivs = [];
    const colors = ['white', 'gray'];
    let color = 0;
    let index = 0;
    for (let i=0; i <8; i++) {
      for (let j=0; j <8; j++) {
        let border = '1px black solid';
        if (this.props.position && this.props.position.lastMove) {
          if ((63 - index) === this.props.position.lastMove.source || (63 - index) === this.props.position.lastMove.destination) {
            border = '2px yellow solid';
          }
        }
        squareDivs.push(
          <div id={index} key={i.toString() + j.toString()} style={{ 
            "border": border,
            "display": "inline-block",
            "width": squareWidth + "px",
            "height": squareWidth + "px",
            "position": "absolute",
            "top": i * squareWidth + "px",
            "left": j * squareWidth + "px",
            "backgroundColor": colors[color]
          }}>
            {images[squares[index]]}
          </div>);
        color = (color + 1) % 2;
        index++;
      }
      color = (color + 1) % 2;
    }
    return (
      <div style={{ 'width': '100%' }} ref={input => {this.myInput = input}}>
        <div id="board" style={{ 'position': 'relative', 'width': this.width, 'height': this.width }}>
          { squareDivs }
        </div>
      </div>
    );
  }
}