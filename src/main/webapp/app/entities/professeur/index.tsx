import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Professeur from './professeur';
import ProfesseurDetail from './professeur-detail';
import ProfesseurUpdate from './professeur-update';
import ProfesseurDeleteDialog from './professeur-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={ProfesseurUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={ProfesseurUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={ProfesseurDetail} />
      <ErrorBoundaryRoute path={match.url} component={Professeur} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={ProfesseurDeleteDialog} />
  </>
);

export default Routes;
