import React from 'react';
import MenuItem from 'app/shared/layout/menus/menu-item';
import { Alert, DropdownItem } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Translate, translate } from 'react-jhipster';
import { NavLink as Link } from 'react-router-dom';
import { NavDropdown } from './menu-components';

export const EspaceProfMenu = props => (
  // tslint:disable-next-line:jsx-self-close
  <NavDropdown name="Espace professeur" id="entity-menu">
    <MenuItem icon="asterisk" to="/entity/absence">
      Absence étudiant
    </MenuItem>

    <MenuItem icon="asterisk" to="/entity/suivi-module">
      Suivi module
    </MenuItem>

    <Alert variant="primary">Notes</Alert>
    <MenuItem icon="asterisk" to="/entity/note-licence">
      Licence
    </MenuItem>
    <MenuItem icon="asterisk" to="/entity/note-master">
      Master
    </MenuItem>
    <MenuItem icon="asterisk" to="/entity/note-executif">
      Master executif
    </MenuItem>

    {/* jhipster-needle-add-entity-to-menu - JHipster will add entities to the menu here */}
  </NavDropdown>
);
