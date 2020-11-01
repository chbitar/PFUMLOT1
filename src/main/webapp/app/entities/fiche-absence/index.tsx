import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import FicheAbsence from './fiche-absence';
import FicheAbsenceDetail from './fiche-absence-detail';
import FicheAbsenceUpdate from './fiche-absence-update';
import FicheAbsenceDeleteDialog from './fiche-absence-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={FicheAbsenceUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={FicheAbsenceUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={FicheAbsenceDetail} />
      <ErrorBoundaryRoute path={match.url} component={FicheAbsence} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={FicheAbsenceDeleteDialog} />
  </>
);

export default Routes;
