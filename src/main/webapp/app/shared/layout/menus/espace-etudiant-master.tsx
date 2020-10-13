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

export const EspaceEtudiantMenuMaster = props => (
  <NavDropdown icon="user-edit" name="Espace Etudiant" id="entity-menu">
    <MenuItem icon="asterisk" to="/entity/etudiants-master">
      Espace Master
    </MenuItem>
  </NavDropdown>
);
