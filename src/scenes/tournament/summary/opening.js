import React, { Component } from 'react';

export default class OpeningBookTable extends Component {
  render() {
    return (
      <table className="table table-condensed">
        <tbody>
          <tr><th>File</th><td>{this.props.opening && this.props.opening.book.filePath ? this.props.opening.book.filePath : "-"}</td></tr>
          <tr><th>Depth</th><td>{this.props.opening && this.props.opening.depth ? this.props.opening.depth : "-"}</td></tr>
          <tr><th>Randomized</th><td>{
            this.props.opening  ? ( this.props.opening && this.props.opening.randomize ? 'True' : 'False' ) : '-'
          }</td></tr>
        </tbody>
      </table>
    );
  }
}