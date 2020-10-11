import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import CalendrierModule from './calendrier-module';
import CalendrierModuleDetail from './calendrier-module-detail';
import CalendrierModuleUpdate from './calendrier-module-update';
import CalendrierModuleDeleteDialog from './calendrier-module-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={CalendrierModuleUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={CalendrierModuleUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={CalendrierModuleDetail} />
      <ErrorBoundaryRoute path={match.url} component={CalendrierModule} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={CalendrierModuleDeleteDialog} />
  </>
);

export default Routes;
