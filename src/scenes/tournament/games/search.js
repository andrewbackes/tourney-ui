import React, { Component } from 'react';

export default class Search extends Component {
  constructor(props) {
    super(props);
    this.state = { value: this.props.filterText };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    this.props.history.push(window.location.pathname + '?q=' + this.state.value);
    event.preventDefault();
  }
  
  render() {
    return (
      <div className="panel panel-default">
        <div className="panel-body">
          <form onSubmit={this.handleSubmit}>
            <div className="input-group">
              <input type="text" className="form-control" placeholder="Search" value={this.state.value} onChange={this.handleChange}/>
              <div className="input-group-btn">
                <button className="btn btn-default" type="submit">
                  <i className="glyphicon glyphicon-search"></i>
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}
