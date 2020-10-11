import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import AffectationModule from './affectation-module';
import AffectationModuleDetail from './affectation-module-detail';
import AffectationModuleUpdate from './affectation-module-update';
import AffectationModuleDeleteDialog from './affectation-module-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={AffectationModuleUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={AffectationModuleUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={AffectationModuleDetail} />
      <ErrorBoundaryRoute path={match.url} component={AffectationModule} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={AffectationModuleDeleteDialog} />
  </>
);

export default Routes;
