import React, { Component } from 'react'
import * as d3 from 'd3'

const data = [
  { date: new Date(2007, 3, 24), value: 93.24 },
  { date: new Date(2007, 3, 25), value: 95.35 },
  { date: new Date(2007, 3, 26), value: 98.84 },
  { date: new Date(2007, 3, 27), value: 99.92 },
  { date: new Date(2007, 3, 30), value: 99.8 },
  { date: new Date(2007, 4, 1), value: 99.47 }
]

class MiniAreaChart extends Component {
  componentDidMount() {
    const margin = { top: 20, right: 20, bottom: 30, left: 50 },
      width = 200 - margin.left - margin.right,
      height = 100 - margin.top - margin.bottom

    const x = d3.scaleLinear().range([0, width])
    const y = d3.scaleLinear().range([height, 0])
    const areaMap = d3.area()
      .x(function(d, i) {
        return x(d.x0)
      })
      .y0(height)
      .y1(function(d) {
        return y(d.length)
      })

    const valueline = d3
      .line()
      .x(function(d) {
        return x(d.x0)
      })
      .y(function(d) {
        return y(d.length)
      })

    const svg = d3
      .select('#mini-area')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .attr('class', 'chart')
      .append('g')
      .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')
    render()
      function render() {
        // generate data
        var data = d3.range(100).map(d3.randomBates(10));
        var bins=d3.histogram().thresholds(x.ticks(200))(data);
      
        // scale the range of the data
        x.domain(d3.extent(bins, function(d,i) { return d.x0; })).nice(2);
        y.domain(d3.extent(bins, function(d) { return d.length; })).nice();
      
        // add the area
        var a = svg.selectAll('.area')
           .data([bins]); // must cast as array
        
        var l = svg.selectAll('.line')
          .data([bins]);
        
        // enter
        a.enter()
          .append("path")
          .attr("class", "area")
          .transition()
          .duration(250)
          .attr("d", areaMap);
       
        // update
        a.transition()
          .duration(250)
          .attr("d", areaMap);
          
        // exit
        a.exit().remove();
        
        // enter
        l.enter()
          .append("path")
          .attr("class", "line")
          .transition()
          .duration(250)
          .attr("d", valueline);
       
        // update
        l.transition()
          .duration(250)
          .attr("d", valueline);
          
        // exit
        l.exit().remove();
        
      
      }
  }

  render() {
    return <svg id="mini-area" />
  }
}

export default MiniAreaChart
