import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Content from './content';
import ContentDetail from './content-detail';
import ContentUpdate from './content-update';
import ContentDeleteDialog from './content-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={ContentUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={ContentUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={ContentDetail} />
      <ErrorBoundaryRoute path={match.url} component={Content} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={ContentDeleteDialog} />
  </>
);

export default Routes;
