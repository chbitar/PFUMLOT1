import React from 'react';
import { connect } from 'react-redux';
import { Card } from 'reactstrap';
import { BrowserRouter as Router } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { hot } from 'react-hot-loader';

import { IRootState } from 'app/shared/reducers';
import { getSession } from 'app/shared/reducers/authentication';
import { getProfile } from 'app/shared/reducers/application-profile';
import { setLocale } from 'app/shared/reducers/locale';
import Header from 'app/shared/layout/header/header';
import Footer from 'app/shared/layout/footer/footer';
import { hasAnyAuthority } from 'app/shared/auth/private-route';
import ErrorBoundary from 'app/shared/error/error-boundary';
import { AUTHORITIES } from 'app/config/constants';
import AppRoutes from 'app/routes';
import { MenuItemIcon } from './menuitemicon';
import * as $ from 'jquery';

const baseHref = document
  .querySelector('base')
  .getAttribute('href')
  .replace(/\/$/, '');

export interface IParentMenuProps {
  text: string;
}

export interface IParentMenuProps extends StateProps, DispatchProps {}

export class ParentMenu extends React.Component<IParentMenuProps> {
  componentDidMount() {
    /*     this.props.getSession();
    this.props.getProfile(); */
  }

  bodyClickHandler = e => {
    var b = $('#sidebar').hasClass('menu-compact');
    var menuLink = $(e.target).closest('a');
    if (!menuLink || menuLink.length == 0) return;
    if (!menuLink.hasClass('menu-dropdown')) {
      if (b && menuLink.get(0).parentNode.parentNode == this) {
        var menuText = menuLink.find('.menu-text').get(0);
        if (e.target != menuText && !$.contains(menuText, e.target)) {
          return false;
        }
      }
      return;
    }
    var submenu = menuLink.next().get(0);
    if (!$(submenu).is(':visible')) {
      var c = $(submenu.parentNode).closest('ul');
      if (b && c.hasClass('sidebar-menu')) return;
      c.find('> .open > .submenu').each(function() {
        if (this != submenu && !$(this.parentNode).hasClass('active'))
          $(this)
            .slideUp(200)
            .parent()
            .removeClass('open');
      });
    }
    if (b && $(submenu.parentNode.parentNode).hasClass('sidebar-menu')) return false;
    $(submenu)
      .slideToggle(200)
      .parent()
      .toggleClass('open');
    return false;
  };

  render() {
    return (
      <a href="#" className="menu-dropdown">
        <span className="menu-text">{this.props.text}</span>
        <i className="menu-expand" />
      </a>
    );
  }
}

const mapStateToProps = ({ authentication, applicationProfile, locale }: IRootState) => ({
  currentLocale: locale.currentLocale,
  isAuthenticated: authentication.isAuthenticated,
  isAdmin: hasAnyAuthority(authentication.account.authorities, [AUTHORITIES.ADMIN]),
  ribbonEnv: applicationProfile.ribbonEnv,
  isInProduction: applicationProfile.inProduction,
  isSwaggerEnabled: applicationProfile.isSwaggerEnabled
});

const mapDispatchToProps = { setLocale, getSession, getProfile };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ParentMenu);
