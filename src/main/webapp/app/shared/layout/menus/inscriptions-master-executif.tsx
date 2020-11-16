import React from 'react';
import MenuItem from 'app/shared/layout/menus/menu-item';
import { Alert, DropdownItem } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Translate, translate } from 'react-jhipster';
import { NavLink as Link } from 'react-router-dom';
import { NavDropdown } from './menu-components';

export const InscriptionsMasterExecutifMenu = props => (
  // tslint:disable-next-line:jsx-self-close
  <NavDropdown icon="user-edit" name="Inscription Master Exécutif" id="entity-menu" style={{ width: '100%' }}>
    <MenuItem icon="plus" to="/entity/etudiants-executif/new">
      Nouvelle inscription
    </MenuItem>
    <MenuItem icon="list" to="/entity/etudiants-executif">
      Liste d'inscrits
    </MenuItem>
  </NavDropdown>
);
