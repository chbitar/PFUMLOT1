import './header.scss';

import React from 'react';
import { Translate, Storage } from 'react-jhipster';
import { Navbar, Nav, NavbarToggler, NavbarBrand, Collapse } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { NavLink as Link } from 'react-router-dom';
import LoadingBar from 'react-redux-loading-bar';
import { Home, Brand } from './header-components';
import { AdminMenu, EntitiesMenu, AccountMenu, LocaleMenu } from '../menus';
import { ScolariteMenu } from 'app/shared/layout/menus/scolarite';
import { EspaceProfMenu } from 'app/shared/layout/menus/espaceprofesseur';
import { ConfigurationMenu } from 'app/shared/layout/menus/configuration';
import { AUTHORITIES } from 'app/config/constants';
import { hasAnyAuthority } from 'app/shared/auth/private-route';
import { IRootState } from 'app/shared/reducers';
import { connect } from 'react-redux';
import { EspaceEtudiantMenu } from '../menus/espace-etudiant';
import { InscriptionsMasterMenu } from '../menus/inscriptions-master';
import { InscriptionsLicenceMenu } from '../menus/inscriptions-licence';
import { InscriptionsMasterExecutifMenu } from '../menus/inscriptions-master-executif';

export interface IHeaderProps {
  isAuthenticated: boolean;
  isAdmin: boolean;
  isUser: boolean;
  isEtudiantLicence: boolean;
  isEtudiantMaster: boolean;
  isEtudiantExecutif: boolean;
  isProf: boolean;
  isRespFil: boolean;
  ribbonEnv: string;
  isInProduction: boolean;
  isSwaggerEnabled: boolean;
  currentLocale: string;
  onLocaleChange: Function;
}

export interface IHeaderState {
  menuOpen: boolean;
}

export class Header extends React.Component<IHeaderProps, IHeaderState> {
  state: IHeaderState = {
    menuOpen: false
  };

  handleLocaleChange = event => {
    const langKey = event.target.value;
    Storage.session.set('locale', langKey);
    this.props.onLocaleChange(langKey);
  };

  renderDevRibbon = () =>
    this.props.isInProduction === false ? (
      <div className="ribbon dev">
        <a href="">
          <Translate contentKey={`global.ribbon.${this.props.ribbonEnv}`} />
        </a>
      </div>
    ) : null;

  toggleMenu = () => {
    this.setState({ menuOpen: !this.state.menuOpen });
  };

  render() {
    const {
      currentLocale,
      isAuthenticated,
      isAdmin,
      isEtudiantLicence,
      isRespFil,
      isUser,
      isEtudiantExecutif,
      isEtudiantMaster,
      isProf,
      isSwaggerEnabled,
      isInProduction
    } = this.props;

    /* jhipster-needle-add-element-to-menu - JHipster will add new menu items here */

    return (
      <div id="app-header">
        <LoadingBar className="loading-bar" />
        <Navbar light expand="sm" fixed="top" className="bg-light">
          <NavbarToggler aria-label="Menu" onClick={this.toggleMenu} />
          <Collapse isOpen={this.state.menuOpen} navbar>
            <Nav id="header-tabs" className="ml-auto" navbar>
              <div className="pull-left image">
                <img src="content/images/logo-ostelea-ma.png" className="img-circle" alt="User Image" width="200 px" />
              </div>
              <Home />
              {isAuthenticated && (isUser || isAdmin) && <InscriptionsLicenceMenu />}
              {isAuthenticated && (isUser || isAdmin) && <InscriptionsMasterMenu />}
              {isAuthenticated && (isUser || isAdmin) && <InscriptionsMasterExecutifMenu />}
              {isAuthenticated && (isRespFil || isAdmin) && <ScolariteMenu />}
              {isAuthenticated && (isProf || isAdmin) && <EspaceProfMenu />}
              {isAuthenticated && (isEtudiantExecutif || isEtudiantLicence || isEtudiantMaster) /* || isAdmin */ && (
                <EspaceEtudiantMenu
                  /* isAdmin={isAdmin} */
                  isEtudiantExecutif={isEtudiantExecutif}
                  isEtudiantLicence={isEtudiantLicence}
                  isEtudiantMaster={isEtudiantMaster}
                />
              )}
              {/* {isAuthenticated && <EntitiesMenu />} */}
              {isAuthenticated && isAdmin && <ConfigurationMenu />}
              {isAuthenticated && isAdmin && <AdminMenu showSwagger={isSwaggerEnabled} showDatabase={!isInProduction} />}
              <LocaleMenu currentLocale={currentLocale} onClick={this.handleLocaleChange} />
              <AccountMenu isAuthenticated={isAuthenticated} />
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    );
  }
}

const mapStateToProps = ({ authentication }: IRootState) => ({
  isEtudiantExecutif: hasAnyAuthority(authentication.account.authorities, [AUTHORITIES.ROLE_ETUDIANT_EXECUTIF]),
  isEtudiantLicence: hasAnyAuthority(authentication.account.authorities, [AUTHORITIES.ROLE_ETUDIANT_LICENCE]),
  isEtudiantMaster: hasAnyAuthority(authentication.account.authorities, [AUTHORITIES.ROLE_ETUDIANT_MASTER]),
  isProf: hasAnyAuthority(authentication.account.authorities, [AUTHORITIES.PROF]),
  isUser: hasAnyAuthority(authentication.account.authorities, [AUTHORITIES.USER]),
  isRespFil: hasAnyAuthority(authentication.account.authorities, [AUTHORITIES.ROLE_RESP_FILIERE])
});

const mapDispatchToProps = {};
type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Header);
