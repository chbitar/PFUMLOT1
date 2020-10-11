import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import EtudiantsMaster from './etudiants-master';
import EtudiantsMasterDetail from './etudiants-master-detail';
import EtudiantsMasterUpdate from './etudiants-master-update';
import EtudiantsMasterDeleteDialog from './etudiants-master-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={EtudiantsMasterUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={EtudiantsMasterUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={EtudiantsMasterDetail} />
      <ErrorBoundaryRoute path={match.url} component={EtudiantsMaster} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={EtudiantsMasterDeleteDialog} />
  </>
);

export default Routes;
