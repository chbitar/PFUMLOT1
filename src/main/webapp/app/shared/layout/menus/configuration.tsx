import React from 'react';
import MenuItem from 'app/shared/layout/menus/menu-item';
import { DropdownItem } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Translate, translate } from 'react-jhipster';
import { NavLink as Link } from 'react-router-dom';
import { NavDropdown } from './menu-components';

export const ConfigurationMenu = props => (
  // tslint:disable-next-line:jsx-self-close
  <NavDropdown icon="" name="Configuration" id="entity-menu">
    <MenuItem icon="asterisk" to="/entity/annee-inscription">
      Ajouter année inscription
    </MenuItem>
    <MenuItem icon="asterisk" to="/entity/etablissement">
      Ajouter établissement
    </MenuItem>
    <MenuItem icon="asterisk" to="/entity/modalite-paiement">
      Ajouter modalité paiement
    </MenuItem>

    {/* jhipster-needle-add-entity-to-menu - JHipster will add entities to the menu here */}
  </NavDropdown>
);
