import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import EspaceEtudiant from './espace-etudiant';
import EspaceEtudiantDetail from './espace-etudiant-detail';
import EspaceEtudiantUpdate from './espace-etudiant-update';
import EspaceEtudiantDeleteDialog from './espace-etudiant-delete-dialog';
import EspaceEtudiantsExecutif from './espace-etudiants-executif-detail';
import EspaceEtudiantsMaster from './espace-etudiants-master-detail';
import EspaceEtudiantsLicence from './espace-etudiants-licence-detail';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={EspaceEtudiantUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={EspaceEtudiantUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={EspaceEtudiantDetail} />
      {/* <ErrorBoundaryRoute path={match.url} component={EspaceEtudiant} /> */}
      <ErrorBoundaryRoute path={`${match.url}/executif/:bloc`} component={EspaceEtudiantsExecutif} />
      <ErrorBoundaryRoute path={`${match.url}/master/:bloc`} component={EspaceEtudiantsMaster} />
      <ErrorBoundaryRoute path={`${match.url}/licence/:bloc`} component={EspaceEtudiantsLicence} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={EspaceEtudiantDeleteDialog} />
  </>
);

export default Routes;
