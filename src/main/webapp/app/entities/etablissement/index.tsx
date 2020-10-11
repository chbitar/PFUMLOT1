import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Etablissement from './etablissement';
import EtablissementDetail from './etablissement-detail';
import EtablissementUpdate from './etablissement-update';
import EtablissementDeleteDialog from './etablissement-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={EtablissementUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={EtablissementUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={EtablissementDetail} />
      <ErrorBoundaryRoute path={match.url} component={Etablissement} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={EtablissementDeleteDialog} />
  </>
);

export default Routes;
