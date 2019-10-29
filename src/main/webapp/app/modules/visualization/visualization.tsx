import React from 'react';
import {connect} from 'react-redux';
import {RouteComponentProps} from 'react-router-dom';
import {Button, Col, Row} from 'reactstrap';
import {fetchValinorOptions} from './visualization.reducer';
import ScatterPlot from "app/modules/visualization/scatter";
import {IRootState} from "app/shared/reducers";

export interface IVisualizationProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {
}

class Visualization extends React.Component<IVisualizationProps> {
  componentDidMount() {
    this.props.fetchValinorOptions(this.props.match.params.id);
  }

  render() {
    const {valinorOptions, loading, fetchDataFailure} = this.props;
    return (
      <Row>
        <Col md="3">
          <h2>
            Project Id: <b>{valinorOptions.id}</b>
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="csv">Csv File Path</span>
            </dt>
            <dd>{valinorOptions.csv}</dd>
            <dt>
              <span id="xCol">X Column</span>
            </dt>
            <dd>{valinorOptions.xCol}</dd>
            <dt>
              <span id="yCol">Y Column</span>
            </dt>
            <dd>{valinorOptions.yCol}</dd>
            <dt>
              <span id="delimiter">Delimiter</span>
            </dt>
            <dd>{valinorOptions.delimiter}</dd>
            <dt>
              <span id="gridSize">Initial Grid Size</span>
            </dt>
            <dd>{valinorOptions.gridSize}</dd>
            <dt>
              <span id="threshold">Splitting Threshold</span>
            </dt>
            <dd>{valinorOptions.threshold}</dd>
            <dt>
              <span>X Range</span>
            </dt>
            <dd>{valinorOptions.xMin} - {valinorOptions.xMax}</dd>
            <dt>
              <span>Y Range</span>
            </dt>
            <dd>{valinorOptions.yMin} - {valinorOptions.yMax}</dd>
          </dl>
        </Col>
        <Col>
          {!loading && !fetchDataFailure && <ScatterPlot/>}
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = ({visualization}: IRootState) => ({
  valinorOptions: visualization.valinorOptions,
  loading: visualization.loading,
  fetchDataFailure: visualization.fetchDataFailure
});

const mapDispatchToProps = {fetchValinorOptions};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Visualization);
