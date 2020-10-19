import React from 'react';
import { Switch } from 'react-router-dom';

// tslint:disable-next-line:no-unused-variable
import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Absence from './absence';
import AffectationModule from './affectation-module';
import AnneeInscription from './annee-inscription';
import CalendrierModule from './calendrier-module';
import EtudiantsExecutif from './etudiants-executif';
import EtudiantsLicence from './etudiants-licence';
import EtudiantsMaster from './etudiants-master';
import Filiere from './filiere';
import Module from './module';
import Professeur from './professeur';
import SuiviModule from './suivi-module';
import Etablissement from './etablissement';
import ModalitePaiement from './modalite-paiement';
import EspaceEtudiant from './espace-etudiant';
import Annonce from './annonce';
import Document from './document';
import NoteLicence from './note-licence';
import NoteMaster from './note-master';
import NoteExecutif from './note-executif';
import TableauDeBoard from './tableau-de-board';
import { AUTHORITIES } from 'app/config/constants';
import PrivateRoute from 'app/shared/auth/private-route';
import AbsenceLicence from './absence-licence';
import AbsenceMaster from './absence-master';
/* jhipster-needle-add-route-import - JHipster will add routes here */

const Routes = ({ match }) => (
  <div>
    <Switch>
      {/* prettier-ignore */}
      <ErrorBoundaryRoute path={`${match.url}/absence`} component={Absence} />
      <ErrorBoundaryRoute path={`${match.url}/absence-licence`} component={AbsenceLicence} />
      <ErrorBoundaryRoute path={`${match.url}/absence-master`} component={AbsenceMaster} />

      <PrivateRoute
        path={`${match.url}/affectation-module`}
        component={AffectationModule}
        hasAnyAuthorities={[AUTHORITIES.ADMIN, AUTHORITIES.USER]}
      />

      <PrivateRoute
        path={`${match.url}/annee-inscription`}
        component={AnneeInscription}
        hasAnyAuthorities={[AUTHORITIES.ADMIN, AUTHORITIES.USER]}
      />
      <PrivateRoute
        path={`${match.url}/calendrier-module`}
        component={CalendrierModule}
        hasAnyAuthorities={[AUTHORITIES.ADMIN, AUTHORITIES.USER]}
      />
      <PrivateRoute
        path={`${match.url}/etudiants-executif`}
        component={EtudiantsExecutif}
        hasAnyAuthorities={[AUTHORITIES.ADMIN, AUTHORITIES.USER, AUTHORITIES.ROLE_ETUDIANT_EXECUTIF]}
      />
      <PrivateRoute
        path={`${match.url}/etudiants-licence`}
        component={EtudiantsLicence}
        hasAnyAuthorities={[AUTHORITIES.ADMIN, AUTHORITIES.USER, AUTHORITIES.ROLE_ETUDIANT_LICENCE]}
      />
      <PrivateRoute
        path={`${match.url}/etudiants-master`}
        component={EtudiantsMaster}
        hasAnyAuthorities={[AUTHORITIES.ADMIN, AUTHORITIES.USER, AUTHORITIES.ROLE_ETUDIANT_MASTER]}
      />
      <PrivateRoute path={`${match.url}/filiere`} component={Filiere} hasAnyAuthorities={[AUTHORITIES.ADMIN, AUTHORITIES.USER]} />
      <PrivateRoute path={`${match.url}/module`} component={Module} hasAnyAuthorities={[AUTHORITIES.ADMIN, AUTHORITIES.USER]} />
      <PrivateRoute path={`${match.url}/professeur`} component={Professeur} hasAnyAuthorities={[AUTHORITIES.ADMIN, AUTHORITIES.USER]} />
      <PrivateRoute path={`${match.url}/suivi-module`} component={SuiviModule} hasAnyAuthorities={[AUTHORITIES.ADMIN, AUTHORITIES.PROF]} />

      <PrivateRoute
        path={`${match.url}/etablissement`}
        component={Etablissement}
        hasAnyAuthorities={[AUTHORITIES.ADMIN, AUTHORITIES.USER]}
      />
      <PrivateRoute
        path={`${match.url}/modalite-paiement`}
        component={ModalitePaiement}
        hasAnyAuthorities={[AUTHORITIES.ADMIN, AUTHORITIES.ROLE_RESP_FINANCE]}
      />
      <PrivateRoute
        path={`${match.url}/espace-etudiant`}
        component={EspaceEtudiant}
        hasAnyAuthorities={[
          AUTHORITIES.ADMIN,
          AUTHORITIES.ROLE_ETUDIANT_EXECUTIF,
          AUTHORITIES.ROLE_ETUDIANT_LICENCE,
          AUTHORITIES.ROLE_ETUDIANT_MASTER
        ]}
      />
      <PrivateRoute path={`${match.url}/annonce`} component={Annonce} hasAnyAuthorities={[AUTHORITIES.ADMIN, AUTHORITIES.USER]} />
      <PrivateRoute path={`${match.url}/note-licence`} component={NoteLicence} hasAnyAuthorities={[AUTHORITIES.ADMIN, AUTHORITIES.PROF]} />
      <PrivateRoute path={`${match.url}/note-master`} component={NoteMaster} hasAnyAuthorities={[AUTHORITIES.ADMIN, AUTHORITIES.PROF]} />
      <PrivateRoute
        path={`${match.url}/note-executif`}
        component={NoteExecutif}
        hasAnyAuthorities={[AUTHORITIES.ADMIN, AUTHORITIES.PROF]}
      />
      <PrivateRoute path={`${match.url}/document`} component={Document} hasAnyAuthorities={[AUTHORITIES.ADMIN, AUTHORITIES.USER]} />

      <ErrorBoundaryRoute path={`${match.url}/tableau-de-board`} component={TableauDeBoard} />
      <ErrorBoundaryRoute path={`${match.url}/document`} component={Document} />
      <ErrorBoundaryRoute path={`${match.url}/etudiants-executif`} component={EtudiantsExecutif} />

      {/* jhipster-needle-add-route-path - JHipster will add routes here */}
    </Switch>
  </div>
);

export default Routes;
