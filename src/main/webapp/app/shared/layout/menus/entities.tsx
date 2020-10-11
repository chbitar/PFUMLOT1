import React from 'react';
import MenuItem from 'app/shared/layout/menus/menu-item';
import { DropdownItem } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Translate, translate } from 'react-jhipster';
import { NavLink as Link } from 'react-router-dom';
import { NavDropdown } from './menu-components';

export const EntitiesMenu = props => (
  // tslint:disable-next-line:jsx-self-close
  <NavDropdown icon="th-list" name={translate('global.menu.entities.main')} id="entity-menu">
    <MenuItem icon="asterisk" to="/entity/absence">
      <Translate contentKey="global.menu.entities.absence" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/entity/affectation-module">
      <Translate contentKey="global.menu.entities.affectationModule" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/entity/annee-inscription">
      <Translate contentKey="global.menu.entities.anneeInscription" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/entity/calendrier-module">
      <Translate contentKey="global.menu.entities.calendrierModule" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/entity/etudiants-executif">
      <Translate contentKey="global.menu.entities.etudiantsExecutif" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/entity/etudiants-licence">
      <Translate contentKey="global.menu.entities.etudiantsLicence" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/entity/etudiants-master">
      <Translate contentKey="global.menu.entities.etudiantsMaster" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/entity/filiere">
      <Translate contentKey="global.menu.entities.filiere" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/entity/module">
      <Translate contentKey="global.menu.entities.module" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/entity/professeur">
      <Translate contentKey="global.menu.entities.professeur" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/entity/suivi-module">
      <Translate contentKey="global.menu.entities.suiviModule" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/entity/etablissement">
      <Translate contentKey="global.menu.entities.etablissement" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/entity/modalite-paiement">
      <Translate contentKey="global.menu.entities.modalitePaiement" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/entity/espace-etudiant">
      <Translate contentKey="global.menu.entities.espaceEtudiant" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/entity/annonce">
      <Translate contentKey="global.menu.entities.annonce" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/entity/note-licence">
      <Translate contentKey="global.menu.entities.noteLicence" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/entity/note-master">
      <Translate contentKey="global.menu.entities.noteMaster" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/entity/note-executif">
      <Translate contentKey="global.menu.entities.noteExecutif" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/entity/tableau-de-board">
      <Translate contentKey="global.menu.entities.tableauDeBoard" />
    </MenuItem>
    {/* jhipster-needle-add-entity-to-menu - JHipster will add entities to the menu here */}
  </NavDropdown>
);
