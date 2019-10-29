import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './valinor-options.reducer';
import { IValinorOptions } from 'app/shared/model/valinor-options.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IValinorOptionsDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class ValinorOptionsDetail extends React.Component<IValinorOptionsDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { valinorOptionsEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            ValinorOptions [<b>{valinorOptionsEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="csv">Csv</span>
            </dt>
            <dd>{valinorOptionsEntity.csv}</dd>
            <dt>
              <span id="xCol">X Col</span>
            </dt>
            <dd>{valinorOptionsEntity.xCol}</dd>
            <dt>
              <span id="yCol">Y Col</span>
            </dt>
            <dd>{valinorOptionsEntity.yCol}</dd>
            <dt>
              <span id="delimiter">Delimiter</span>
            </dt>
            <dd>{valinorOptionsEntity.delimiter}</dd>
            <dt>
              <span id="gridSize">Grid Size</span>
            </dt>
            <dd>{valinorOptionsEntity.gridSize}</dd>
            <dt>
              <span id="threshold">Threshold</span>
            </dt>
            <dd>{valinorOptionsEntity.threshold}</dd>
            <dt>
              <span id="xMin">X Min</span>
            </dt>
            <dd>{valinorOptionsEntity.xMin}</dd>
            <dt>
              <span id="xMax">X Max</span>
            </dt>
            <dd>{valinorOptionsEntity.xMax}</dd>
            <dt>
              <span id="yMin">Y Min</span>
            </dt>
            <dd>{valinorOptionsEntity.yMin}</dd>
            <dt>
              <span id="yMax">Y Max</span>
            </dt>
            <dd>{valinorOptionsEntity.yMax}</dd>
          </dl>
          <Button tag={Link} to="/entity/valinor-options" replace color="info">
            <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
          </Button>
          &nbsp;
          <Button tag={Link} to={`/entity/valinor-options/${valinorOptionsEntity.id}/edit`} replace color="primary">
            <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
          </Button>
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = ({ valinorOptions }: IRootState) => ({
  valinorOptionsEntity: valinorOptions.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ValinorOptionsDetail);
