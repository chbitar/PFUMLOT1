import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import EtudiantsExecutif from './etudiants-executif';
import EtudiantsExecutifDetail from './etudiants-executif-detail';
import EtudiantsExecutifUpdate from './etudiants-executif-update';
import EtudiantsExecutifDeleteDialog from './etudiants-executif-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={EtudiantsExecutifUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={EtudiantsExecutifUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={EtudiantsExecutifDetail} />
      <ErrorBoundaryRoute path={match.url} component={EtudiantsExecutif} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={EtudiantsExecutifDeleteDialog} />
  </>
);

export default Routes;
