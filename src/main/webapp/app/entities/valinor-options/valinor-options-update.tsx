import React from 'react';
import {connect} from 'react-redux';
import {Link, RouteComponentProps} from 'react-router-dom';
import {Button, Col, CustomInput, FormGroup, Label, Row} from 'reactstrap';
import {AvFeedback, AvField, AvForm, AvGroup, AvInput} from 'availity-reactstrap-validation';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {IRootState} from 'app/shared/reducers';

import {createEntity, getEntity, reset, updateEntity} from './valinor-options.reducer';

export interface IValinorOptionsUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {
}

export interface IValinorOptionsUpdateState {
  isNew: boolean;
}

export class ValinorOptionsUpdate extends React.Component<IValinorOptionsUpdateProps, IValinorOptionsUpdateState> {
  private fileInput: any;

  constructor(props) {
    super(props);
    this.state = {
      isNew: !this.props.match.params || !this.props.match.params.id
    };
  }

  componentWillUpdate(nextProps, nextState) {
    if (nextProps.updateSuccess !== this.props.updateSuccess && nextProps.updateSuccess) {
      this.handleClose();
    }
  }

  componentDidMount() {
    if (this.state.isNew) {
      this.props.reset();
    } else {
      this.props.getEntity(this.props.match.params.id);
    }
  }

  saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const {valinorOptionsEntity} = this.props;
      const entity = {
        ...valinorOptionsEntity,
        ...values
      };

      if (this.state.isNew) {
        this.props.createEntity(entity);
      } else {
        this.props.updateEntity(entity);
      }
    }
  };

  handleClose = () => {
    this.props.history.push('/entity/valinor-options');
  };

  render() {
    const {valinorOptionsEntity, loading, updating} = this.props;
    const {isNew} = this.state;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="rawvisToolApp.valinorOptions.home.createOrEditLabel">Explore a CSV file </h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : valinorOptionsEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="valinor-options-id">ID</Label>
                    <AvInput id="valinor-options-id" type="text" className="form-control" value="" name="id" required
                             readOnly/>
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <input id="valinor-options-csv" type="file" name="csv" ref={ref => this.fileInput = ref} />
                </AvGroup>
                <AvGroup>
                  <Label id="xColLabel" for="valinor-options-xCol">
                    X Col
                  </Label>
                  <AvField id="valinor-options-xCol" type="string" className="form-control" name="xCol"/>
                </AvGroup>
                <AvGroup>
                  <Label id="yColLabel" for="valinor-options-yCol">
                    Y Col
                  </Label>
                  <AvField id="valinor-options-yCol" type="string" className="form-control" name="yCol"/>
                </AvGroup>
                <AvGroup>
                  <Label id="delimiterLabel" for="valinor-options-delimiter">
                    Delimiter
                  </Label>
                  <AvField id="valinor-options-delimiter" type="text" name="delimiter"/>
                </AvGroup>
                <AvGroup>
                  <Label id="gridSizeLabel" for="valinor-options-gridSize">
                    Grid Size
                  </Label>
                  <AvField id="valinor-options-gridSize" type="string" className="form-control" name="gridSize"/>
                </AvGroup>
                <AvGroup>
                  <Label id="thresholdLabel" for="valinor-options-threshold">
                    Threshold
                  </Label>
                  <AvField id="valinor-options-threshold" type="string" className="form-control" name="threshold"/>
                </AvGroup>
                <AvGroup>
                  <Label id="xMinLabel" for="valinor-options-xMin">
                    X Min
                  </Label>
                  <AvField id="valinor-options-xMin" type="string" className="form-control" name="xMin"/>
                </AvGroup>
                <AvGroup>
                  <Label id="xMaxLabel" for="valinor-options-xMax">
                    X Max
                  </Label>
                  <AvField id="valinor-options-xMax" type="string" className="form-control" name="xMax"/>
                </AvGroup>
                <AvGroup>
                  <Label id="yMinLabel" for="valinor-options-yMin">
                    Y Min
                  </Label>
                  <AvField id="valinor-options-yMin" type="string" className="form-control" name="yMin"/>
                </AvGroup>
                <AvGroup>
                  <Label id="yMaxLabel" for="valinor-options-yMax">
                    Y Max
                  </Label>
                  <AvField id="valinor-options-yMax" type="string" className="form-control" name="yMax"/>
                </AvGroup>
                <Button tag={Link} id="cancel-save" to="/entity/valinor-options" replace color="info">
                  <FontAwesomeIcon icon="arrow-left"/>
                  &nbsp;
                  <span className="d-none d-md-inline">Back</span>
                </Button>
                &nbsp;
                <Button color="primary" id="save-entity" type="submit" disabled={updating}>
                  <FontAwesomeIcon icon="save"/>
                  &nbsp; Save
                </Button>
              </AvForm>
            )}
          </Col>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = (storeState: IRootState) => ({
  valinorOptionsEntity: storeState.valinorOptions.entity,
  loading: storeState.valinorOptions.loading,
  updating: storeState.valinorOptions.updating,
  updateSuccess: storeState.valinorOptions.updateSuccess
});

const mapDispatchToProps = {
  getEntity,
  updateEntity,
  createEntity,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ValinorOptionsUpdate);
