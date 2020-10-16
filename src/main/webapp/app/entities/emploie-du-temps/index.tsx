import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import EmploieDuTemps from './emploie-du-temps';
import EmploieDuTempsDetail from './emploie-du-temps-detail';
import EmploieDuTempsUpdate from './emploie-du-temps-update';
import EmploieDuTempsDeleteDialog from './emploie-du-temps-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={EmploieDuTempsUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={EmploieDuTempsUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={EmploieDuTempsDetail} />
      <ErrorBoundaryRoute path={match.url} component={EmploieDuTemps} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={EmploieDuTempsDeleteDialog} />
  </>
);

export default Routes;
