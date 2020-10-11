import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import ModalitePaiement from './modalite-paiement';
import ModalitePaiementDetail from './modalite-paiement-detail';
import ModalitePaiementUpdate from './modalite-paiement-update';
import ModalitePaiementDeleteDialog from './modalite-paiement-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={ModalitePaiementUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={ModalitePaiementUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={ModalitePaiementDetail} />
      <ErrorBoundaryRoute path={match.url} component={ModalitePaiement} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={ModalitePaiementDeleteDialog} />
  </>
);

export default Routes;
