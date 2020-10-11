import React from 'react';
import MenuItem from 'app/shared/layout/menus/menu-item';
import { Alert, DropdownItem } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Translate, translate } from 'react-jhipster';
import { NavLink as Link } from 'react-router-dom';
import { NavDropdown } from './menu-components';

export const ScolariteMenu = props => (
  // tslint:disable-next-line:jsx-self-close
  <NavDropdown icon="" name="Scolarité" id="entity-menu">
    <Alert variant="primary">Config. scolarité</Alert>
    <MenuItem icon="asterisk" to="/entity/filiere">
      Ajouter Filiére
    </MenuItem>
    <MenuItem icon="asterisk" to="/entity/module">
      Ajouter Modules
    </MenuItem>
    <MenuItem icon="asterisk" to="/entity/professeur">
      Ajouter Professeur
    </MenuItem>
    <Alert variant="primary">Gestion scolarité</Alert>
    <MenuItem icon="asterisk" to="/entity/affectation-module">
      Affectation module
    </MenuItem>
    <MenuItem icon="asterisk" to="/entity/calendrier-module">
      Calendrier module
    </MenuItem>

    {/* jhipster-needle-add-entity-to-menu - JHipster will add entities to the menu here */}
  </NavDropdown>
);
