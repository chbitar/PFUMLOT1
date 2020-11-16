import React from 'react';
import MenuItem from 'app/shared/layout/menus/menu-item';
import { Alert, Button, DropdownItem } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Translate, translate } from 'react-jhipster';
import { NavLink as Link } from 'react-router-dom';
import { NavDropdown } from './menu-components';
import { hasAnyAuthority } from 'app/shared/auth/private-route';
import { IRootState } from 'app/shared/reducers';
import { AUTHORITIES } from 'app/config/constants';
import { connect } from 'react-redux';

const EspaceEtudiantMenuExecutif = (
  <>
    <MenuItem icon="user-circle" to="/entity/espace-etudiant/executif/profil">
      Mon profil
    </MenuItem>

    <MenuItem icon="user-edit" to="/entity/espace-etudiant/executif/inscription">
      Inscription
    </MenuItem>

    <MenuItem icon="clock" to="/entity/espace-etudiant/executif/emploidutemps">
      Emplois du temps
    </MenuItem>

    <MenuItem icon="calendar" to="/entity/espace-etudiant/executif/calendrierexamen">
      Calendrier Examen
    </MenuItem>
    <MenuItem icon="folder" to="/entity/espace-etudiant/executif/mesresultats">
      Mes résultats
    </MenuItem>

    <MenuItem icon="folder" to="/entity/espace-etudiant/executif/envoiedemande">
      Demandes
    </MenuItem>
  </>
);
const EspaceEtudiantMenuLicence = (
  <>
    <MenuItem icon="user-circle" to="/entity/espace-etudiant/licence/profil">
      Mon profil
    </MenuItem>

    <MenuItem icon="user-edit" to="/entity/espace-etudiant/licence/inscription">
      Inscription
    </MenuItem>

    <MenuItem icon="clock" to="/entity/espace-etudiant/licence/emploidutemps">
      Emplois du temps
    </MenuItem>

    <MenuItem icon="calendar" to="/entity/espace-etudiant/licence/calendrierexamen">
      Calendrier Examen
    </MenuItem>
    <MenuItem icon="folder" to="/entity/espace-etudiant/licence/mesresultats">
      Mes résultats
    </MenuItem>

    <MenuItem icon="folder" to="/entity/espace-etudiant/licence/envoiedemande">
      Demandes
    </MenuItem>
  </>
);
const EspaceEtudiantMenuMaster = (
  <>
    <MenuItem icon="user-circle" to="/entity/espace-etudiant/master/profil">
      Mon profil
    </MenuItem>

    <MenuItem icon="user-edit" to="/entity/espace-etudiant/master/inscription">
      Inscription
    </MenuItem>

    <MenuItem icon="clock" to="/entity/espace-etudiant/master/emploidutemps">
      Emplois du temps
    </MenuItem>

    <MenuItem icon="calendar" to="/entity/espace-etudiant/master/calendrierexamen">
      Calendrier Examen
    </MenuItem>
    <MenuItem icon="folder" to="/entity/espace-etudiant/master/mesresultats">
      Mes résultats
    </MenuItem>

    <MenuItem icon="folder" to="/entity/espace-etudiant/master/envoiedemande">
      Demandes
    </MenuItem>
  </>
);

export const EspaceEtudiantMenu = ({ /* isAdmin, */ isEtudiantExecutif, isEtudiantLicence, isEtudiantMaster }) => (
  <NavDropdown icon="user" name="Espace Etudiant" id="entity-menu">
    {isEtudiantExecutif /* || isAdmin */ ? EspaceEtudiantMenuExecutif : ''}
    {isEtudiantLicence /* || isAdmin */ ? EspaceEtudiantMenuLicence : ''}
    {isEtudiantMaster /* || isAdmin */ ? EspaceEtudiantMenuMaster : ''}
  </NavDropdown>
);

export default EspaceEtudiantMenu;
