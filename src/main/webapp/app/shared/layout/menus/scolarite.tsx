import React from 'react';
import MenuItem from 'app/shared/layout/menus/menu-item';
import { Alert, DropdownItem } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Translate, translate } from 'react-jhipster';
import { NavLink as Link } from 'react-router-dom';
import { NavDropdown } from './menu-components';

export const ScolariteMenu = props => (
  // tslint:disable-next-line:jsx-self-close
  <NavDropdown icon="university" name="Scolarité" id="entity-menu" style={{ width: '100%' }}>
    <Alert variant="primary">Config. scolarité</Alert>
    <MenuItem icon="folder" to="/entity/filiere">
      Gestion Filiére
    </MenuItem>
    <MenuItem icon="folder" to="/entity/module">
      Gestion Module
    </MenuItem>
    <MenuItem icon="folder" to="/entity/professeur">
      Gestion Professeur
    </MenuItem>
    <MenuItem icon="folder" to="/entity/document">
      Gestion emploi du temps
    </MenuItem>
    {/*     <MenuItem icon="folder" to="/entity/document">
      Ajouer un avis
    </MenuItem> */}
    <Alert variant="primary">Gestion scolarité</Alert>
    <MenuItem icon="folder" to="/entity/affectation-module">
      Gestion Affectation module
    </MenuItem>
    <MenuItem icon="folder" to="/entity/calendrier-module">
      Gestion Calendrier examen
    </MenuItem>
    {/* jhipster-needle-add-entity-to-menu - JHipster will add entities to the menu here */}
  </NavDropdown>
);
