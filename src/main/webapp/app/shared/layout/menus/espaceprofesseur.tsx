import React from 'react';
import MenuItem from 'app/shared/layout/menus/menu-item';
import { Alert, DropdownItem } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Translate, translate } from 'react-jhipster';
import { NavLink as Link } from 'react-router-dom';
import { NavDropdown } from './menu-components';

export const EspaceProfMenu = props => (
  // tslint:disable-next-line:jsx-self-close
  <NavDropdown icon="user" name="Espace professeur" id="entity-menu" style={{ width: '100%' }}>
    <MenuItem icon="clock" to="/entity/fiche-absence">
      Fiche d’absence
    </MenuItem>
    <MenuItem icon="folder" to="/entity/suivi-module">
      Suivi module
    </MenuItem>
    <Alert variant="primary">Notes</Alert>
    <MenuItem icon="folder" to="/entity/note-licence">
      Licence
    </MenuItem>
    <MenuItem icon="folder" to="/entity/note-master">
      Master
    </MenuItem>
    <MenuItem icon="folder" to="/entity/note-executif">
      Master executif
    </MenuItem>

    {/* jhipster-needle-add-entity-to-menu - JHipster will add entities to the menu here */}
  </NavDropdown>
);
