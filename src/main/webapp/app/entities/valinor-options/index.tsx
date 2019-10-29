import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import ValinorOptions from './valinor-options';
import ValinorOptionsDetail from './valinor-options-detail';
import ValinorOptionsUpdate from './valinor-options-update';
import ValinorOptionsDeleteDialog from './valinor-options-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={ValinorOptionsUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={ValinorOptionsUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={ValinorOptionsDetail} />
      <ErrorBoundaryRoute path={match.url} component={ValinorOptions} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={ValinorOptionsDeleteDialog} />
  </>
);

export default Routes;
