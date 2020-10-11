import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Filiere from './filiere';
import FiliereDetail from './filiere-detail';
import FiliereUpdate from './filiere-update';
import FiliereDeleteDialog from './filiere-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={FiliereUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={FiliereUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={FiliereDetail} />
      <ErrorBoundaryRoute path={match.url} component={Filiere} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={FiliereDeleteDialog} />
  </>
);

export default Routes;
