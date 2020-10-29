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
import ContactSearch from './contactsearch';
import Contact from './contact';
import $ from 'jquery';
// tslint:disable
import '../../../static/assets/js/slimscroll/jquery.slimscroll.min.js';

const baseHref = document
  .querySelector('base')
  .getAttribute('href')
  .replace(/\/$/, '');

export interface IContactListProps extends StateProps, DispatchProps {}

export class ContactList extends React.Component<IContactListProps> {
  componentDidMount() {
    /*  var position = (this.readCookie("rtl-support") || location.pathname == "/index-rtl-fa.html" || location.pathname == "/index-rtl-ar.html") ? 'right' : 'left';
    var additionalHeight = 0;
    if ($(window).width() < 531)
      additionalHeight = 45;
    $('.chatbar-contacts .contacts-list').slimscroll({
      position: position,
      size: '4px',
      color: themeprimary,
      height: $(window).height() - (86 + additionalHeight),
    });  */
  }

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
    const { title, desc, extra } = this.props;

    return (
      <ul className="contacts-list">
        <Contact name="Divyia Philips" status="online" last="last week" />
        <Contact name="Adam Johnson" status="left 4 mins ago" last="today" />
        <Contact name="John Smith" status="online" last="1:57 am" />
        <Contact name="Osvaldus Valutis" status="online" last="today" />
        <Contact name="Javi Jimenez" status="online" last="today" />
        <Contact name="Stephanie Walter" status="online" last="yesterday" />
        <Contact name="Sergey Azovskiy" status="offline since oct 24" last="22 oct" />
        <Contact name="Lee Munroe" status="online" last="today" />
        <Contact name="Divyia Philips" status="online" last="last week" />
      </ul>
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
  title: 'Tite',
  desc: 'Tite',
  extra: 'Tite'
});

const mapDispatchToProps = { setLocale, getSession, getProfile };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ContactList);
