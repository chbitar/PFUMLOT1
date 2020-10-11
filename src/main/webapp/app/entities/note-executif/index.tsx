import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import NoteExecutif from './note-executif';
import NoteExecutifDetail from './note-executif-detail';
import NoteExecutifUpdate from './note-executif-update';
import NoteExecutifDeleteDialog from './note-executif-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={NoteExecutifUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={NoteExecutifUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={NoteExecutifDetail} />
      <ErrorBoundaryRoute path={match.url} component={NoteExecutif} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={NoteExecutifDeleteDialog} />
  </>
);

export default Routes;
