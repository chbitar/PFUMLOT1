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
import MenuItemIcon from './menuitemicon';
import ParentMenuIcon from './parentmenuicon';
import MenuItem from './menuitem';
import ParentMenu from './parentmenu';
import * as $ from 'jquery';

const baseHref = document
  .querySelector('base')
  .getAttribute('href')
  .replace(/\/$/, '');

export interface IPageSidebarProps extends StateProps, DispatchProps {}

export class PageSidebar extends React.Component<IPageSidebarProps> {
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
      <div className="page-sidebar" id="sidebar">
        <div className="sidebar-header-wrapper">
          <input type="text" className="searchinput" />
          <i className="searchicon fa fa-search" />
          <div className="searchhelper">Search Reports, Charts, Emails or Notifications</div>
        </div>

        <ul className="nav sidebar-menu" onClick={this.bodyClickHandler}>
          <li>
            <MenuItemIcon href="index.html" text="Dashboard" />
          </li>

          <li>
            <MenuItemIcon href="databoxes.html" text="Data Boxes" />
          </li>

          <li>
            <MenuItemIcon href="widgets.html" text="Widgets" />
          </li>

          <li>
            <ParentMenuIcon text="Elements" />

            <ul className="submenu">
              <li>
                <MenuItem href="elements.html" text="Basic Elements" />
              </li>
              <li>
                <ParentMenu text="Icons" />

                <ul className="submenu">
                  <li>
                    <MenuItemIcon href="font-awesome.html" text="Font Awesome" />
                  </li>
                  <li>
                    <MenuItemIcon href="glyph-icons.html" text="Glyph Icons" />
                  </li>
                  <li>
                    <MenuItemIcon href="typicon.html" text="Typicons" />
                  </li>
                  <li>
                    <MenuItemIcon href="weather-icons.html" text="Weather Icons" />
                  </li>
                </ul>
              </li>
              <li>
                <MenuItem href="tabs.html" text="Tabs & Accordions" />
              </li>
              <li>
                <MenuItem href="alerts.html" text="Alerts & Tooltips" />
              </li>
              <li>
                <MenuItem href="modals.html" text="Modals & Wells" />
              </li>
              <li>
                <MenuItem href="buttons.html" text="Buttons" />
              </li>
              <li>
                <MenuItem href="nestable-list.html" text="Nestable List" />
              </li>
              <li>
                <MenuItem href="treeview.html" text="Treeview" />
              </li>
            </ul>
          </li>
          <li>
            <ParentMenuIcon text="Tables" />

            <ul className="submenu">
              <li>
                <MenuItem href="tables-simple.html" text="Simple & Responsive" />
              </li>
              <li>
                <MenuItem href="tables-data.html" text="Data Tables" />
              </li>
            </ul>
          </li>
          <li>
            <ParentMenuIcon text="Forms" />

            <ul className="submenu">
              <li>
                <MenuItem href="form-layouts.html" text="Form Layouts" />
              </li>

              <li>
                <MenuItem href="form-inputs.html" text="Form Inputs" />
              </li>

              <li>
                <MenuItem href="form-pickers.html" text="Data Pickers" />
              </li>
              <li>
                <MenuItem href="form-wizard.html" text="Wizard" />
              </li>
              <li>
                <MenuItem href="form-validation.html" text="Validation" />
              </li>
              <li>
                <MenuItem href="form-editors.html" text="Editors" />
              </li>
              <li>
                <MenuItem href="form-inputmask.html" text="Input Mask" />
              </li>
            </ul>
          </li>
          <li>
            <ParentMenuIcon text="Charts" />

            <ul className="submenu">
              <li>
                <MenuItem href="flot.html" text="Flot Charts" />
              </li>

              <li>
                <MenuItem href="morris.html" text="Morris Charts" />
              </li>
              <li>
                <MenuItem href="sparkline.html" text="Sparkline Charts" />
              </li>
              <li>
                <MenuItem href="easypiecharts.html" text="Easy Pie Charts" />
              </li>
              <li>
                <MenuItem href="chartjs.html" text="ChartJS" />
              </li>
            </ul>
          </li>

          <li>
            <MenuItemIcon href="profile.html" text="Profile" />
          </li>

          <li>
            <ParentMenuIcon text="Mail" />

            <ul className="submenu">
              <li>
                <MenuItem href="inbox.html" text="Inbox" />
              </li>

              <li>
                <MenuItem href="message-view.html" text="View Message" />
              </li>
              <li>
                <MenuItem href="message-compose.html" text="Compose Message" />
              </li>
            </ul>
          </li>
          <li className="active">
            <MenuItemIcon href="calendar.html" text="Calendar" />
          </li>

          <li>
            <ParentMenuIcon text="Pages" />
            <ul className="submenu">
              <li>
                <MenuItem href="timeline.html" text="Timeline" />
              </li>
              <li>
                <MenuItem href="pricing.html" text="Pricing Tables" />
              </li>

              <li>
                <MenuItem href="invoice.html" text="Invoice" />
              </li>

              <li>
                <MenuItem href="login.html" text="Login" />
              </li>
              <li>
                <MenuItem href="register.html" text="Register" />
              </li>
              <li>
                <MenuItem href="lock.html" text="Lock Screen" />
              </li>
              <li>
                <MenuItem href="typography.html" text="Typography" />
              </li>
            </ul>
          </li>
          <li>
            <ParentMenuIcon text="More Pages" />

            <ul className="submenu">
              <li>
                <MenuItem href="error-404.html" text="Error 404" />
              </li>

              <li>
                <MenuItem href="error-500.html" text="Error 500" />
              </li>
              <li>
                <MenuItem href="blank.html" text="Blank Page" />
              </li>
              <li>
                <MenuItem href="grid.html" text="Grid" />
              </li>
              <li>
                <ParentMenu text="Multi Level Menu" />

                <ul className="submenu">
                  <li>
                    <MenuItemIcon href="#" text="Level 3" />
                  </li>

                  <li>
                    <ParentMenuIcon text="Level 4" />

                    <ul className="submenu">
                      <li>
                        <MenuItemIcon href="#" text="Some Item" />
                      </li>

                      <li>
                        <MenuItemIcon href="#" text="Another Item" />
                      </li>
                    </ul>
                  </li>
                </ul>
              </li>
            </ul>
          </li>

          <li>
            <ParentMenuIcon text="Right to Left" />
            <ul className="submenu">
              <li>
                <a>
                  <span className="menu-text">RTL</span>
                  <label className="pull-right margin-top-10">
                    <input id="rtl-changer" className="checkbox-slider slider-icon colored-primary" type="checkbox" />
                    <span className="text" />
                  </label>
                </a>
              </li>
              <li>
                <MenuItem href="index-rtl-ar.html" text="Arabic Layout" />
              </li>

              <li>
                <MenuItem href="index-rtl-fa.html" text="Persian Layout" />
              </li>
            </ul>
          </li>
          <li>
            <MenuItemIcon href="versions.html" text="BeyondAdmin Versions" />
          </li>
        </ul>
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
)(PageSidebar);
