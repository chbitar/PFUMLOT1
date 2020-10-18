import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import AbsenceDetail from './absence-detail';
import AbsenceUpdate from './absence-update';
import AbsenceDeleteDialog from './absence-delete-dialog';
import AbsenceMaster from './absence-master';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={AbsenceUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={AbsenceUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={AbsenceDetail} />
      <ErrorBoundaryRoute path={match.url} component={AbsenceMaster} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={AbsenceDeleteDialog} />
  </>
);

export default Routes;
