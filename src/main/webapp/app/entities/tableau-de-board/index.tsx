import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import TableauDeBoard from './tableau-de-board';
import TableauDeBoardDetail from './tableau-de-board-detail';
import TableauDeBoardUpdate from './tableau-de-board-update';
import TableauDeBoardDeleteDialog from './tableau-de-board-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={TableauDeBoardUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={TableauDeBoardUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={TableauDeBoardDetail} />
      <ErrorBoundaryRoute path={match.url} component={TableauDeBoard} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={TableauDeBoardDeleteDialog} />
  </>
);

export default Routes;
