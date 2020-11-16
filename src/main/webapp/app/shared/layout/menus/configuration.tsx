import React from 'react';
import MenuItem from 'app/shared/layout/menus/menu-item';
import { DropdownItem } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Translate, translate } from 'react-jhipster';
import { NavLink as Link } from 'react-router-dom';
import { NavDropdown } from './menu-components';

export const ConfigurationMenu = props => (
  // tslint:disable-next-line:jsx-self-close
  <NavDropdown icon="cog" name="Paramétrage" id="entity-menu" style={{ width: '100%' }}>
    {/*     <MenuItem icon="folder" to="/entity/annee-inscription">
      Ajouter année inscription
    </MenuItem> */}
    <MenuItem icon="folder" to="/entity/etablissement">
      Ajouter établissement
    </MenuItem>
    <MenuItem icon="folder" to="/entity/modalite-paiement">
      Ajouter modalité paiement
    </MenuItem>
    <MenuItem icon="folder" to="/entity/document">
      Ajouer un avis
    </MenuItem>
    {/* jhipster-needle-add-entity-to-menu - JHipster will add entities to the menu here */}
  </NavDropdown>
);
