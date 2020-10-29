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
import Filiere from 'app/entities/filiere/filiere';

const baseHref = document
  .querySelector('base')
  .getAttribute('href')
  .replace(/\/$/, '');

export interface IPageContentProps extends StateProps, DispatchProps {}
interface Document {
  exitFullscreen: any;
  mozCancelFullScreen: any;
  webkitExitFullscreen: any;
  fullscreenElement: any;
  mozFullScreenElement: any;
  webkitFullscreenElement: any;
}
export class PageContent extends React.Component<IPageContentProps> {
  componentDidMount() {
    /*     this.props.getSession();
    this.props.getProfile(); */
  }

  fullScreenClick() {
    var element = document.documentElement;

    const docElmWithBrowsersFullScreenFunctions = document.documentElement as HTMLElement & {
      mozRequestFullScreen(): Promise<void>;
      webkitRequestFullscreen(): Promise<void>;
      msRequestFullscreen(): Promise<void>;
      exitFullscreen(): Promise<void>;
      mozCancelFullScreen(): Promise<void>;
      webkitExitFullscreen(): Promise<void>;
      docElmWithBrowsersFullScreenFunctions(): Promise<void>;
    };

    if (!$('body').hasClass('full-screen')) {
      $('body').addClass('full-screen');
      $('#fullscreen-toggler').addClass('active');
      if (docElmWithBrowsersFullScreenFunctions.requestFullscreen) {
        docElmWithBrowsersFullScreenFunctions.requestFullscreen();
      } else if (docElmWithBrowsersFullScreenFunctions.mozRequestFullScreen) {
        docElmWithBrowsersFullScreenFunctions.mozRequestFullScreen();
      } else if (docElmWithBrowsersFullScreenFunctions.webkitRequestFullscreen) {
        docElmWithBrowsersFullScreenFunctions.webkitRequestFullscreen();
      } else if (docElmWithBrowsersFullScreenFunctions.msRequestFullscreen) {
        docElmWithBrowsersFullScreenFunctions.msRequestFullscreen();
      }
    } else {
      $('body').removeClass('full-screen');
      $('#fullscreen-toggler').removeClass('active');
      if (docElmWithBrowsersFullScreenFunctions.exitFullscreen) {
        docElmWithBrowsersFullScreenFunctions.exitFullscreen();
      } else if (docElmWithBrowsersFullScreenFunctions.mozCancelFullScreen) {
        docElmWithBrowsersFullScreenFunctions.mozCancelFullScreen();
      } else if (docElmWithBrowsersFullScreenFunctions.webkitExitFullscreen) {
        docElmWithBrowsersFullScreenFunctions.docElmWithBrowsersFullScreenFunctions();
      }
    }
  }

  sideBarClick() {
    $('#sidebar').toggleClass('hide');
    $('.sidebar-toggler').toggleClass('active');
    return false;
  }

  render() {
    return (
      <div className="page-content">
        <div className="page-breadcrumbs">
          <ul className="breadcrumb">
            <li>
              <i className="fa fa-home" />
              <a href="#">Home</a>
            </li>
            <li>
              <a href="#">More Pages</a>
            </li>
            <li className="active">Blank Page</li>
          </ul>
        </div>

        <div className="page-header position-relative">
          <div className="header-title">
            <h1>Blank Page</h1>
          </div>

          <div className="header-buttons">
            <a className="sidebar-toggler" href="#" onClick={this.sideBarClick}>
              <i className="fa fa-arrows-h" />
            </a>
            <a className="refresh" id="refresh-toggler" href="">
              <i className="glyphicon glyphicon-refresh" />
            </a>
            <a className="fullscreen" id="fullscreen-toggler" href="#" onClick={this.fullScreenClick}>
              <i className="glyphicon glyphicon-fullscreen" />
            </a>
          </div>
        </div>

        <div className="page-body">
          <Filiere />
        </div>
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
)(PageContent);
