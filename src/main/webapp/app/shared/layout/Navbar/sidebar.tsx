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
import * as $ from 'jquery';

const baseHref = document
  .querySelector('base')
  .getAttribute('href')
  .replace(/\/$/, '');

export interface ISideBarProps extends StateProps, DispatchProps {}

export class SideBar extends React.Component<ISideBarProps> {
  componentDidMount() {
    /*     this.props.getSession();
    this.props.getProfile(); */
  }
  handleClick = e => {
    var b = $('#sidebar').hasClass('menu-compact');
    if (!$('#sidebar').is(':visible')) $('#sidebar').toggleClass('hide');
    $('#sidebar').toggleClass('menu-compact');
    $('.sidebar-collapse').toggleClass('active');
    b = $('#sidebar').hasClass('menu-compact');

    if (
      $('.sidebar-menu')
        .closest('div')
        .hasClass('slimScrollDiv')
    ) {
      $('.sidebar-menu').slimScroll({ destroy: true });
      $('.sidebar-menu').attr('style', '');
    }
    if (b) {
      $('.open > .submenu').removeClass('open');
    } else {
      if ($('.page-sidebar').hasClass('sidebar-fixed')) {
        var position =
          this.readCookie('rtl-support') || location.pathname == '/index-rtl-fa.html' || location.pathname == '/index-rtl-ar.html'
            ? 'right'
            : 'left';
        $('.sidebar-menu').slimscroll({
          height: 'auto',
          position: position,
          size: '3px',
          color: themeprimary
        });
      }
    }
  };

  readCookie = e => {
    var nameEq = e + '=';
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == ' ') c = c.substring(1, c.length);
      if (c.indexOf(nameEq) == 0) return c.substring(nameEq.length, c.length);
    }
    return null;
  };

  render() {
    const paddingTop = '60px';
    return (
      <div className="sidebar-collapse" id="sidebar-collapse" onClick={this.handleClick}>
        <i className="collapse-icon fa fa-bars" />
      </div>
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
)(SideBar);
