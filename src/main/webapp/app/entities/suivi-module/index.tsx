import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import SuiviModule from './suivi-module';
import SuiviModuleDetail from './suivi-module-detail';
import SuiviModuleUpdate from './suivi-module-update';
import SuiviModuleDeleteDialog from './suivi-module-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={SuiviModuleUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={SuiviModuleUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={SuiviModuleDetail} />
      <ErrorBoundaryRoute path={match.url} component={SuiviModule} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={SuiviModuleDeleteDialog} />
  </>
);

export default Routes;
