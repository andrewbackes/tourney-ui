import React, { Component } from 'react';

import GameTable from 'scenes/tournament/games/game-table';
import Search from 'scenes/tournament/games/search';

export default class Game extends Component {
  render() {
    let filterText = decodeURIComponent(this.props.location.search.substring('?q='.length, this.props.location.search.length));
    return (
      <div className="row">
        <div className="col-xs-12">
          <Search history={ this.props.history } filterText={ filterText }/>
        </div>
        <div className="col-xs-12">
          <GameTable gameList={ this.props.gameList } filterText={ filterText } location={ this.props.location } history={ this.props.history }/>
        </div>
      </div>
    );
  }
}
