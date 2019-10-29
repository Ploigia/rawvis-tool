import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { ICrudGetAllAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './valinor-options.reducer';
import { IValinorOptions } from 'app/shared/model/valinor-options.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IValinorOptionsProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export class ValinorOptions extends React.Component<IValinorOptionsProps> {
  componentDidMount() {
    this.props.getEntities();
  }

  render() {
    const { valinorOptionsList, match } = this.props;
    return (
      <div>
        <h2 id="valinor-options-heading">
          Valinor Options
          <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
            <FontAwesomeIcon icon="plus" />
            &nbsp; Explore a new file
          </Link>
        </h2>
        <div className="table-responsive">
          {valinorOptionsList && valinorOptionsList.length > 0 ? (
            <Table responsive aria-describedby="valinor-options-heading">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Csv</th>
                  <th>X Col</th>
                  <th>Y Col</th>
                  <th>Delimiter</th>
                  <th>Grid Size</th>
                  <th>Threshold</th>
                  <th>X Min</th>
                  <th>X Max</th>
                  <th>Y Min</th>
                  <th>Y Max</th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {valinorOptionsList.map((valinorOptions, i) => (
                  <tr key={`entity-${i}`}>
                    <td>
                      <Button tag={Link} to={`${match.url}/${valinorOptions.id}`} color="link" size="sm">
                        {valinorOptions.id}
                      </Button>
                    </td>
                    <td>{valinorOptions.csv}</td>
                    <td>{valinorOptions.xCol}</td>
                    <td>{valinorOptions.yCol}</td>
                    <td>{valinorOptions.delimiter}</td>
                    <td>{valinorOptions.gridSize}</td>
                    <td>{valinorOptions.threshold}</td>
                    <td>{valinorOptions.xMin}</td>
                    <td>{valinorOptions.xMax}</td>
                    <td>{valinorOptions.yMin}</td>
                    <td>{valinorOptions.yMax}</td>
                    <td className="text-right">
                      <div className="btn-group flex-btn-group-container">
                        <Button tag={Link} to={`${match.url}/${valinorOptions.id}`} color="info" size="sm">
                          <FontAwesomeIcon icon="eye" /> <span className="d-none d-md-inline">View</span>
                        </Button>
                        <Button tag={Link} to={`${match.url}/${valinorOptions.id}/edit`} color="primary" size="sm">
                          <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
                        </Button>
                        <Button tag={Link} to={`${match.url}/${valinorOptions.id}/delete`} color="danger" size="sm">
                          <FontAwesomeIcon icon="trash" /> <span className="d-none d-md-inline">Delete</span>
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          ) : (
            <div className="alert alert-warning">No Valinor Options found</div>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ valinorOptions }: IRootState) => ({
  valinorOptionsList: valinorOptions.entities
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ValinorOptions);
