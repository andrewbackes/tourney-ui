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

export default class PieceDiff extends Component {

  pieceDiff(fen) {
    const pieces = fen.split(' ')[0];
    let counts = {
      'p': 8, 'n': 2, 'b': 2, 'r': 2, 'q': 1, 'k': 1,
      'P': 8, 'N': 2, 'B': 2, 'R': 2, 'Q': 1, 'K': 1,
    }
    for (let i=0; i < pieces.length; i++) {
      const char = pieces.charAt(i);
      if ('a' <= char.toLowerCase() && char.toLowerCase() <= 'z') {
        counts[char] = counts[char] - 1;
      }
    }
    return counts;
  }

  render() {
    const imgWidth = 25;
    const imgMargin = 5;
    const pieceStyle = {"width": imgWidth + "px", "height": imgWidth + "px", "marginLeft": imgMargin + "px", "marginTop": imgMargin + "px" };
    const whiteSymbols = ['K', 'Q', 'R', 'B', 'N', 'P'];
    const blackSymbols = ['k', 'q', 'r', 'b', 'n', 'p'];
    const pieceCounts = this.pieceDiff(this.props.position.fen);
    let blackPieces = [];
    let whitePieces = [];
    for (let i in whiteSymbols) {
      for (let j = 0; j < (pieceCounts[whiteSymbols[i]] - pieceCounts[blackSymbols[i]]); j++) {
        const pieces = {
          'R': <img alt="R" src={WhiteRook} style={pieceStyle} key={ 'R' + j }/>,
          'N': <img alt="R" src={WhiteKnight} style={pieceStyle} key={ 'N' + j }/>,
          'B': <img alt="R" src={WhiteBishop} style={pieceStyle} key={ 'B' + j }/>,
          'Q': <img alt="R" src={WhiteQueen} style={pieceStyle} key={ 'Q' + j }/>,
          'K': <img alt="R" src={WhiteKing} style={pieceStyle} key={ 'K' + j }/>,
          'P': <img alt="R" src={WhitePawn} style={pieceStyle} key={ 'P' + j }/>,
        };
        whitePieces.push(pieces[whiteSymbols[i]]);
      }
    }
    for (let i in blackSymbols) {
      for (let j = 0; j < (pieceCounts[blackSymbols[i]] - pieceCounts[whiteSymbols[i]]); j++) {
        const pieces = {
          'r': <img alt="R" src={BlackRook} style={pieceStyle} key={ 'r' + j }/>,
          'n': <img alt="R" src={BlackKnight} style={pieceStyle} key={ 'n' + j }/>,
          'b': <img alt="R" src={BlackBishop} style={pieceStyle} key={ 'b' + j }/>,
          'q': <img alt="R" src={BlackQueen} style={pieceStyle} key={ 'q' + j }/>,
          'k': <img alt="R" src={BlackKing} style={pieceStyle} key={ 'k' + j }/>,
          'p': <img alt="R" src={BlackPawn} style={pieceStyle} key={ 'p' + j }/>
        };
        blackPieces.push(pieces[blackSymbols[i]]);
      }
    }
    return (
      <div className="container-fluid">
        <div className="row">
          { blackPieces }
        </div>
        <div className="row">
          { whitePieces }
        </div>
      </div>
    );
  }
}
