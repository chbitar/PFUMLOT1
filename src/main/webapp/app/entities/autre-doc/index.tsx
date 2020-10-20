import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import AutreDoc from './autre-doc';
import AutreDocDetail from './autre-doc-detail';
import AutreDocUpdate from './autre-doc-update';
import AutreDocDeleteDialog from './autre-doc-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={AutreDocUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={AutreDocUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={AutreDocDetail} />
      <ErrorBoundaryRoute path={match.url} component={AutreDoc} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={AutreDocDeleteDialog} />
  </>
);

export default Routes;
