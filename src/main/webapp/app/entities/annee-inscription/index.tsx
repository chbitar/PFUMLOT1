import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import AnneeInscription from './annee-inscription';
import AnneeInscriptionDetail from './annee-inscription-detail';
import AnneeInscriptionUpdate from './annee-inscription-update';
import AnneeInscriptionDeleteDialog from './annee-inscription-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={AnneeInscriptionUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={AnneeInscriptionUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={AnneeInscriptionDetail} />
      <ErrorBoundaryRoute path={match.url} component={AnneeInscription} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={AnneeInscriptionDeleteDialog} />
  </>
);

export default Routes;
