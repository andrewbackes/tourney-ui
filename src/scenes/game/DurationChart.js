import React from 'react';
import { Chart } from 'react-google-charts';

import Duration from 'util/duration';

export default class DurationChart extends React.Component {
  render() {
    let data = [[0,0,0]];
    for (let i = 1; i < this.props.positions.length; i+=2) {
      let w = this.props.positions[i].lastMove && this.props.positions[i].lastMove.duration ? this.props.positions[i].lastMove.duration : 0;
      let b = i+1 < this.props.positions.length && this.props.positions[i+1].lastMove && this.props.positions[i+1].lastMove.duration ? this.props.positions[i+1].lastMove.duration : 0;
      let m = Math.floor(i/2) +1;
      const r = [m, Duration.seconds(w), Duration.seconds(b)];
      data.push(r);
    }
    return (
      <Chart
        chartType="LineChart"
        rows={data}
        columns={[
          {"label": "Move", "type": "number"},
          {"label": "White", "type": "number"},
          {"label": "Black", "type": "number"}
        ]}
        options={{
            "legend":true,
            //"hAxis":{"title":"Move"},
            "vAxis":{"title":"Seconds"}
        }}
        graph_id="DurationLineChart"
        width="100%"
        height="140px"
      />
    );
  }
}