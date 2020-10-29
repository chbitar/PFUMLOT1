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
import ChatBarContact from './chatbarcontact';
import ChatMessage from './chatmessage';
import ChatReply from './chatreply';
import $ from 'jquery';

const baseHref = document
  .querySelector('base')
  .getAttribute('href')
  .replace(/\/$/, '');

export interface IChatListProps extends StateProps, DispatchProps {}

export class ChatList extends React.Component<IChatListProps> {
  componentDidMount() {
    /*     this.props.getSession();
    this.props.getProfile(); */
    /*    var position = (this.readCookie("rtl-support") || location.pathname == "/index-rtl-fa.html" || location.pathname == "/index-rtl-ar.html") ? 'right' : 'left';
    var additionalHeight = 0;
    if ($(window).width() < 531)
      additionalHeight = 45;
    $('.chatbar-messages .messages-list').slimscroll({
      position: position,
      size: '4px',
      color: themeprimary,
      height: $(window).height() - (250 + additionalHeight),
    });   */
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
      <ul className="messages-list">
        <ChatMessage sender="Me" time="10:14 AM, Today" text="Hi, Hope all is good. Are we meeting today?" />
        <ChatReply sender="Divyia" time="10:15 AM, Today" text="Hi, Hope all is good. Are we meeting today?" />
        <ChatMessage sender="Me" time="10:14 AM, Today" text="Hi, Hope all is good. Are we meeting today?" />
        <ChatReply sender="Divyia" time="10:15 AM, Today" text="Hi, Hope all is good. Are we meeting today?" />
        <ChatMessage sender="Me" time="10:14 AM, Today" text="Hi, Hope all is good. Are we meeting today?" />
        <ChatReply sender="Divyia" time="10:15 AM, Today" text="Hi, Hope all is good. Are we meeting today?" />
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
)(ChatList);
