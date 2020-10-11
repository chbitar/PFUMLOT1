import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import NoteLicence from './note-licence';
import NoteLicenceDetail from './note-licence-detail';
import NoteLicenceUpdate from './note-licence-update';
import NoteLicenceDeleteDialog from './note-licence-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={NoteLicenceUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={NoteLicenceUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={NoteLicenceDetail} />
      <ErrorBoundaryRoute path={match.url} component={NoteLicence} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={NoteLicenceDeleteDialog} />
  </>
);

export default Routes;
