import React from 'react';
import MenuItem from 'app/shared/layout/menus/menu-item';
import { Alert, DropdownItem } from 'reactstrap';
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
    <MenuItem icon="asterisk" to="/entity/etudiants-executif">
      Espace Master Executif
    </MenuItem>
  </>
);

const EspaceEtudiantMenuLicence = (
  <>
    <MenuItem icon="asterisk" to="/entity/etudiants-licence">
      Espace BAC+3
    </MenuItem>
  </>
);

const EspaceEtudiantMenuMaster = (
  <>
    <MenuItem icon="asterisk" to="/entity/etudiants-master">
      Espace MASTER ACADEMIQUE
    </MenuItem>
  </>
);

export const EspaceEtudiantMenu = ({ isAdmin, isEtudiantExecutif, isEtudiantLicence, isEtudiantMaster }) => (
  <NavDropdown icon="user-edit" name="Espace Etudiant" id="entity-menu" style={{ width: '100%' }}>
    {isEtudiantExecutif || isAdmin ? EspaceEtudiantMenuExecutif : ''}
    {isEtudiantLicence || isAdmin ? EspaceEtudiantMenuLicence : ''}
    {isEtudiantMaster || isAdmin ? EspaceEtudiantMenuMaster : ''}
  </NavDropdown>
);

export default EspaceEtudiantMenu;
