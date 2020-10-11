import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import NoteMaster from './note-master';
import NoteMasterDetail from './note-master-detail';
import NoteMasterUpdate from './note-master-update';
import NoteMasterDeleteDialog from './note-master-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={NoteMasterUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={NoteMasterUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={NoteMasterDetail} />
      <ErrorBoundaryRoute path={match.url} component={NoteMaster} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={NoteMasterDeleteDialog} />
  </>
);

export default Routes;
