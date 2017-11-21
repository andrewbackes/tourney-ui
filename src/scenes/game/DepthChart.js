import React from 'react';
import { Chart } from 'react-google-charts';

export default class DepthChart extends React.Component {
  
  depthOf(position) {
    if (!position || !position.analysis || !position.analysis.length) {
      return 0;
    }
    for (let i = position.analysis.length - 1; i >= 0; i--) {
      let terms = position.analysis[i].split(' ');
      if (terms.includes('depth') &&  !terms.includes('upperboard') && !terms.includes('lowerbound')) {
        const k = terms.indexOf('depth') + 1;
        if (k < terms.length) {
          return parseInt(terms[k], 10);
        }
      }
    }
  }

  render() {
    let data = [[0,0,0]];
    for (let i = 1; i < this.props.positions.length; i+=2) {
      let w = this.depthOf(this.props.positions[i]);
      let b = i+1 < this.props.positions.length ? this.depthOf(this.props.positions[i+1]) : 0;
      let m = Math.floor(i /2) +1;
      const r = [m, w, b];
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
            "vAxis":{"title":"Depth"}
        }}
        graph_id="DepthLineChart"
        width="100%"
        height="140px"
      />
    );
  }
}