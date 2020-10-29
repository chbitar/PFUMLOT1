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
import AccountItem from './accountitem';
import MessageItem from './messageitem';
import TaskItem from './taskitem';
import * as $ from 'jquery';

const baseHref = document
  .querySelector('base')
  .getAttribute('href')
  .replace(/\/$/, '');

export interface INavbarHeaderRightProps extends StateProps, DispatchProps {}

export class NavbarHeaderRight extends React.Component<INavbarHeaderRightProps> {
  componentDidMount() {
    /*     this.props.getSession();
    this.props.getProfile(); */
  }

  chatClick = e => {
    $('.page-chatbar').toggleClass('open');
    $('#chat-link').toggleClass('open');
  };

  createCookie = e => {
    if (100) {
      var date = new Date();
      var gmt = date['toGMTString']();

      date.setTime(date.getTime() + 100 * 24 * 60 * 60 * 1000);
      var expires = '; expires=' + gmt;
    } else var expires = '';
    document.cookie = e + expires + '; path=/';
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

  setCookiesForFixedSettings() {
    this.createCookie('navbar-fixed-top' + '=' + $('#checkbox_fixednavbar').is(':checked'));
    this.createCookie('sidebar-fixed' + '=' + $('#checkbox_fixedsidebar').is(':checked'));
    this.createCookie('breadcrumbs-fixed' + '=' + $('#checkbox_fixedbreadcrumbs').is(':checked'));
    this.createCookie('page-header-fixed' + '=' + $('#checkbox_fixedheader').is(':checked'));
  }

  initiateSettings = e => {
    if (this.readCookie('navbar-fixed-top') != null) {
      if (this.readCookie('navbar-fixed-top') == 'true') {
        $('#checkbox_fixednavbar').prop('checked', true);
        $('.navbar').addClass('navbar-fixed-top');
      }
    }

    if (this.readCookie('breadcrumbs-fixed') != null) {
      if (this.readCookie('breadcrumbs-fixed') == 'true') {
        $('#checkbox_fixedbreadcrumbs').prop('checked', true);
        $('.page-breadcrumbs').addClass('breadcrumbs-fixed');
      }
    }
    if (this.readCookie('page-header-fixed') != null) {
      if (this.readCookie('page-header-fixed') == 'true') {
        $('#checkbox_fixedheader').prop('checked', true);
        $('.page-header').addClass('page-header-fixed');
      }
    }

    $('#checkbox_fixednavbar').change(function() {
      $('.navbar').toggleClass('navbar-fixed-top');
      if ($('#checkbox_fixedsidebar').is(':checked')) {
        $('#checkbox_fixedsidebar').prop('checked', false);
        $('.page-sidebar').toggleClass('sidebar-fixed');
      }

      if ($('#checkbox_fixedbreadcrumbs').is(':checked') && !$(this).is(':checked')) {
        $('#checkbox_fixedbreadcrumbs').prop('checked', false);
        $('.page-breadcrumbs').toggleClass('breadcrumbs-fixed');
      }

      if ($('#checkbox_fixedheader').is(':checked') && !$(this).is(':checked')) {
        $('#checkbox_fixedheader').prop('checked', false);
        $('.page-header').toggleClass('page-header-fixed');
      }
      this.setCookiesForFixedSettings();
    });

    $('#checkbox_fixedsidebar').change(function() {
      $('.page-sidebar').toggleClass('sidebar-fixed');
      if (!$('#checkbox_fixednavbar').is(':checked')) {
        $('#checkbox_fixednavbar').prop('checked', true);
        $('.navbar').toggleClass('navbar-fixed-top');
      }
      if ($('#checkbox_fixedbreadcrumbs').is(':checked') && !$(this).is(':checked')) {
        $('#checkbox_fixedbreadcrumbs').prop('checked', false);
        $('.page-breadcrumbs').toggleClass('breadcrumbs-fixed');
      }
      if ($('#checkbox_fixedheader').is(':checked') && !$(this).is(':checked')) {
        $('#checkbox_fixedheader').prop('checked', false);
        $('.page-header').toggleClass('page-header-fixed');
      }
      this.setCookiesForFixedSettings();
    });
    $('#checkbox_fixedbreadcrumbs').change(function() {
      $('.page-breadcrumbs').toggleClass('breadcrumbs-fixed');
      if (!$('#checkbox_fixedsidebar').is(':checked')) {
        $('#checkbox_fixedsidebar').prop('checked', true);
        $('.page-sidebar').toggleClass('sidebar-fixed');
      }
      if (!$('#checkbox_fixednavbar').is(':checked')) {
        $('#checkbox_fixednavbar').prop('checked', true);
        $('.navbar').toggleClass('navbar-fixed-top');
      }
      if ($('#checkbox_fixedheader').is(':checked') && !$(this).is(':checked')) {
        $('#checkbox_fixedheader').prop('checked', false);
        $('.page-header').toggleClass('page-header-fixed');
      }
      this.setCookiesForFixedSettings();
    });
    $('#checkbox_fixedheader').change(function() {
      $('.page-header').toggleClass('page-header-fixed');
      if (!$('#checkbox_fixedbreadcrumbs').is(':checked')) {
        $('#checkbox_fixedbreadcrumbs').prop('checked', true);
        $('.page-breadcrumbs').toggleClass('breadcrumbs-fixed');
      }
      if (!$('#checkbox_fixedsidebar').is(':checked')) {
        $('#checkbox_fixedsidebar').prop('checked', true);
        $('.page-sidebar').toggleClass('sidebar-fixed');
      }
      if (!$('#checkbox_fixednavbar').is(':checked')) {
        $('#checkbox_fixednavbar').prop('checked', true);
        $('.navbar').toggleClass('navbar-fixed-top');
      }
      this.setCookiesForFixedSettings();
    });
  };

  settingsClick = e => {
    $('.navbar-account').toggleClass('setting-open');
  };

  render() {
    return (
      <div className="navbar-header pull-right">
        <div className="navbar-account">
          <ul className="account-area">
            <li>
              <a className=" dropdown-toggle" data-toggle="dropdown" title="Notifications" href="#">
                <i className="icon fa fa-warning" />
              </a>
              <ul className="pull-right dropdown-menu dropdown-arrow dropdown-notifications">
                <AccountItem title="Skype meeting with Patty" desc="03:30 pm - 05:15 pm" extra="" />
                <AccountItem title="Uncharted break" desc="03:30 pm - 05:15 pm" extra="" />
                <AccountItem title="Kate birthday party" desc="08:30 pm" extra="at home" />
                <AccountItem title="Dinner with friends" desc="10:30 pm" extra="" />
                <li className="dropdown-footer ">
                  <span>Today, March 28</span>
                  <span className="pull-right">
                    10°c
                    <i className="wi wi-cloudy" />
                  </span>
                </li>
              </ul>
            </li>
            <li>
              <a className="dropdown-toggle" data-toggle="dropdown" title="Mails" href="#">
                <i className="icon fa fa-envelope" />
                <span className="badge">3</span>
              </a>
              <ul className="pull-right dropdown-menu dropdown-arrow dropdown-messages">
                <MessageItem
                  sender="Divyia Austin"
                  time="2 minutes ago"
                  subject="Here's the recipe for apple pie"
                  body="to identify the sending application when the senders image is shown for the main icon"
                />
                <MessageItem
                  sender="Bing.com"
                  time="Yesterday"
                  subject="Bing Newsletter: The January Issue‏"
                  body="Discover new music just in time for the Grammy® Awards."
                />
                <MessageItem
                  sender="Nicolas"
                  time="Friday, September 22"
                  subject="New 4K Cameras"
                  body="The 4K revolution has come over the horizon and is reaching the general populous"
                />
              </ul>
            </li>
            <li>
              <a className="dropdown-toggle" data-toggle="dropdown" title="Tasks" href="#">
                <i className="icon fa fa-tasks" />
                <span className="badge">4</span>
              </a>
              <ul className="pull-right dropdown-menu dropdown-tasks dropdown-arrow ">
                <li className="dropdown-header bordered-darkorange">
                  <i className="fa fa-tasks" />4 Tasks In Progress
                </li>
                <TaskItem title="Account Creation" percent="65%" />
                <TaskItem title="Profile Data" percent="35%" />
                <TaskItem title="Updating Resume" percent="75%" />
                <TaskItem title="Adding Contacts" percent="10%" />
                <li className="dropdown-footer">
                  <a href="#">See All Tasks</a>
                  <button className="btn btn-xs btn-default shiny darkorange icon-only pull-right">
                    <i className="fa fa-check" />
                  </button>
                </li>
              </ul>
            </li>
            <li>
              <a className="wave in" id="chat-link" title="Chat" href="#" onClick={this.chatClick}>
                <i className="icon glyphicon glyphicon-comment" />
              </a>
            </li>
            <li>
              <a className="login-area dropdown-toggle" data-toggle="dropdown">
                <div className="avatar" title="View your public profile">
                  <img src="assets/img/avatars/adam-jansen.jpg" />
                </div>
                <section>
                  <h2>
                    <span className="profile">
                      <span>David Stevenson</span>
                    </span>
                  </h2>
                </section>
              </a>

              <ul className="pull-right dropdown-menu dropdown-arrow dropdown-login-area">
                <li className="username">
                  <a>David Stevenson</a>
                </li>
                <li className="email">
                  <a>David.Stevenson@live.com</a>
                </li>

                <li>
                  <div className="avatar-area">
                    <img src="assets/img/avatars/adam-jansen.jpg" className="avatar" />
                    <span className="caption">Change Photo</span>
                  </div>
                </li>

                <li className="edit">
                  <a href="profile.html" className="pull-left">
                    Profile
                  </a>
                  <a href="#" className="pull-right">
                    Setting
                  </a>
                </li>

                <li className="theme-area">
                  <ul className="colorpicker" id="skin-changer">
                    <li>
                      <a className="colorpick-btn" href="#" style={{ backgroundColor: '#5DB2FF' }} rel="assets/css/skins/blue.min.css" />
                    </li>
                    <li>
                      <a className="colorpick-btn" href="#" style={{ backgroundColor: '#2dc3e8' }} rel="assets/css/skins/azure.min.css" />
                    </li>
                    <li>
                      <a className="colorpick-btn" href="#" style={{ backgroundColor: '#03B3B2' }} rel="assets/css/skins/teal.min.css" />
                    </li>
                    <li>
                      <a className="colorpick-btn" href="#" style={{ backgroundColor: '#53a93f' }} rel="assets/css/skins/green.min.css" />
                    </li>
                    <li>
                      <a className="colorpick-btn" href="#" style={{ backgroundColor: '#FF8F32' }} rel="assets/css/skins/orange.min.css" />
                    </li>
                    <li>
                      <a className="colorpick-btn" href="#" style={{ backgroundColor: '#cc324b' }} rel="assets/css/skins/pink.min.css" />
                    </li>
                    <li>
                      <a className="colorpick-btn" href="#" style={{ backgroundColor: '#AC193D' }} rel="assets/css/skins/darkred.min.css" />
                    </li>
                    <li>
                      <a className="colorpick-btn" href="#" style={{ backgroundColor: '#8C0095' }} rel="assets/css/skins/purple.min.css" />
                    </li>
                    <li>
                      <a
                        className="colorpick-btn"
                        href="#"
                        style={{ backgroundColor: '#0072C6' }}
                        rel="assets/css/skins/darkblue.min.css"
                      />
                    </li>
                    <li>
                      <a className="colorpick-btn" href="#" style={{ backgroundColor: '#585858' }} rel="assets/css/skins/gray.min.css" />
                    </li>
                    <li>
                      <a className="colorpick-btn" href="#" style={{ backgroundColor: '#474544' }} rel="assets/css/skins/black.min.css" />
                    </li>
                    <li>
                      <a
                        className="colorpick-btn"
                        href="#"
                        style={{ backgroundColor: '#001940' }}
                        rel="assets/css/skins/deepblue.min.css"
                      />
                    </li>
                  </ul>
                </li>

                <li className="dropdown-footer">
                  <a href="login.html">Sign out</a>
                </li>
              </ul>
            </li>
          </ul>
          <div className="setting">
            <a id="btn-setting" title="Setting" href="#" onClick={this.settingsClick}>
              <i className="icon glyphicon glyphicon-cog" />
            </a>
          </div>
          <div className="setting-container">
            <label>
              <input type="checkbox" id="checkbox_fixednavbar" />
              <span className="text">Fixed Navbar</span>
            </label>
            <label>
              <input type="checkbox" id="checkbox_fixedsidebar" />
              <span className="text">Fixed SideBar</span>
            </label>
            <label>
              <input type="checkbox" id="checkbox_fixedbreadcrumbs" />
              <span className="text">Fixed BreadCrumbs</span>
            </label>
            <label>
              <input type="checkbox" id="checkbox_fixedheader" />
              <span className="text">Fixed Header</span>
            </label>
          </div>
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
  isSwaggerEnabled: applicationProfile.isSwaggerEnabled,
  title: 'title',
  sender: 'sender'
});

const mapDispatchToProps = { setLocale, getSession, getProfile };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NavbarHeaderRight);
