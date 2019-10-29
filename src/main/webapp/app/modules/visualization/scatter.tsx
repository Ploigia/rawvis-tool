import React from 'react';
import {connect} from 'react-redux';
import {Button, Col, Row} from 'reactstrap';
import {IRootState} from 'app/shared/reducers';
import {fetchDatapoints, setQuery} from "app/modules/visualization/visualization.reducer";
import * as d3 from 'd3';
import {ScaleLinear} from 'd3';
import './visualization.scss';


const defaultProps = {
  radius: 4,
  color: 'blue',
  margin: {
    left: 50,
    right: 10,
    top: 20,
    bottom: 50
  }
};

type DefaultProps = typeof defaultProps;

export interface IScatterPlotProps extends StateProps, DispatchProps, DefaultProps {
}

class ScatterPlot extends React.Component<IScatterPlotProps> {
  static defaultProps = defaultProps;

  private drawWidth: number;
  private drawHeight: number;
  private chartArea: SVGGElement;
  private xAxis: SVGGElement;
  private yAxis: SVGGElement;
  private yScale: ScaleLinear<number, number>;
  private xScale: ScaleLinear<number, number>;
  private width: number;
  private height: number;
  private chartWrapper: HTMLDivElement;
  private svg: SVGSVGElement;
  private rectArea: SVGRectElement;
  private initXScale: ScaleLinear<number, number>;
  private initYScale: ScaleLinear<number, number>;

  constructor(props) {
    super(props);
  }


  componentDidMount() {
    const {xMin, xMax, yMin, yMax} = this.props.valinorOptions;
    this.props.fetchDatapoints(this.props.valinorOptions.id, this.props.query);
    this.width = this.chartWrapper.offsetWidth;
    this.height = this.chartWrapper.offsetHeight;
    // Graph width and height - accounting for margins
    this.drawWidth = this.width - this.props.margin.left - this.props.margin.right;
    this.drawHeight = this.height - this.props.margin.top - this.props.margin.bottom;

    this.updateScales();
    this.initXScale = this.xScale;
    this.initYScale = this.yScale;
    const zoom = d3.zoom()
      .extent([[0, 0], [this.drawWidth, this.drawHeight]])
      // .translateExtent([[xMin, yMin], [xMax, yMax]])
      .on('zoom', this.zoomed.bind(this))
      .on('end', this.zoomEnded.bind(this));

    // .scaleExtent([1, 10])
    d3.select(this.rectArea)
      .call(zoom);
  }

  componentDidUpdate() {
    this.update();
  }

  zoomed() {
    const zoomTransform = d3.event.transform;
    this.props.setQuery({
      x: zoomTransform.rescaleX(this.initXScale).domain(),
      y: zoomTransform.rescaleY(this.initYScale).domain()
    });
  }

  zoomEnded() {
    const zoomTransform = d3.event.transform;
    this.props.fetchDatapoints(this.props.valinorOptions.id, {
      x: zoomTransform.rescaleX(this.initXScale).domain(),
      y: zoomTransform.rescaleY(this.initYScale).domain()
    });
  }

  updateScales() {
    const {query} = this.props;
    // Define scales
    this.xScale = d3.scaleLinear().domain(query.x).range([0, this.drawWidth]);
    this.yScale = d3.scaleLinear().domain(query.y).range([0, this.drawHeight]);
  }

  updatePoints() {
    const {datapoints} = this.props;

    // Select all circles and bind data
    const circles = d3.select(this.chartArea).selectAll('circle').data(datapoints) as any;

    // Use the .enter() method to get your entering elements, and assign their positions
    circles.enter().append('circle').merge(circles)
      .attr('r', d => this.props.radius)
      .attr('fill', d => this.props.color)
      .style('fill-opacity', 0.3)
      .transition().duration(0)
      .attr('cx', d => this.xScale(d.x))
      .attr('cy', d => this.yScale(d.y))
      .style('stroke', "black")
      .style('stroke-width', d => d.selected === true ? "3px" : "0px");


    // Use the .exit() and .remove() methods to remove elements that are no longer in the data
    circles.exit().remove();

  }

  updateAxes() {
    const xAxisFunction = d3.axisBottom(this.xScale)
      .ticks(10, 's');

    const yAxisFunction = d3.axisLeft(this.yScale)
      .ticks(10, 's');

    d3.select(this.xAxis)
      .call(xAxisFunction);

    d3.select(this.yAxis)
      .call(yAxisFunction);
  }

  update() {
    this.updateScales();
    this.updateAxes();
    this.updatePoints();
  }

  render() {
    const {datapoints} = this.props;
    return (
      <div className="chart-wrapper" ref={node => {
        this.chartWrapper = node;
      }}>
        <svg className="chart" width={this.width} height={this.height} ref={(node) => {
          this.svg = node;
        }}>
          <defs>
            <clipPath id="clip">
              <rect width={this.drawWidth} height={this.drawHeight}/>
            </clipPath>
          </defs>
          <g ref={(node) => {
            this.chartArea = node;
          }}
             transform={`translate(${this.props.margin.left}, ${this.props.margin.top})`}
             clipPath='url(#clip)'/>
          {/* Axes */}
          <g ref={(node) => {
            this.xAxis = node;
          }} transform={`translate(${this.props.margin.left}, ${this.height - this.props.margin.bottom})`}/>
          <g ref={(node) => {
            this.yAxis = node;
          }} transform={`translate(${this.props.margin.left}, ${this.props.margin.top})`}/>
          <rect ref={(node) => {
            this.rectArea = node;
          }} width={this.drawWidth} height={this.drawHeight} fill='none' pointerEvents='all'
                transform={`translate(${this.props.margin.left}, ${this.props.margin.top})`}/>
        </svg>
      </div>);
  };
}

const mapStateToProps = ({visualization}: IRootState) => ({
  valinorOptions: visualization.valinorOptions,
  query: visualization.query,
  datapoints: visualization.datapoints
});

const mapDispatchToProps = {fetchDatapoints, setQuery};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ScatterPlot);
