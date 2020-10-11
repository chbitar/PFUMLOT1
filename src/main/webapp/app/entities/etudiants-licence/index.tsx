import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import EtudiantsLicence from './etudiants-licence';
import EtudiantsLicenceDetail from './etudiants-licence-detail';
import EtudiantsLicenceUpdate from './etudiants-licence-update';
import EtudiantsLicenceDeleteDialog from './etudiants-licence-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={EtudiantsLicenceUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={EtudiantsLicenceUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={EtudiantsLicenceDetail} />
      <ErrorBoundaryRoute path={match.url} component={EtudiantsLicence} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={EtudiantsLicenceDeleteDialog} />
  </>
);

export default Routes;
