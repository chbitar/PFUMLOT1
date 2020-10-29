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
import * as $ from 'jquery';

export interface IChatBarContactProps {
  name: string;
  time: string;
  status: string;
}

const baseHref = document
  .querySelector('base')
  .getAttribute('href')
  .replace(/\/$/, '');

export interface IChatBarContactProps extends StateProps, DispatchProps {}

export class ChatBarContact extends React.Component<IChatBarContactProps> {
  componentDidMount() {
    /*     this.props.getSession();
    this.props.getProfile(); */
  }

  handleClick() {
    $('.page-chatbar .chatbar-contacts').show();
    $('.page-chatbar .chatbar-messages').hide();
  }

  render() {
    return (
      <div className="messages-contact">
        <div className="contact-avatar">
          <img src="assets/img/avatars/divyia.jpg" />
        </div>
        <div className="contact-info">
          <div className="contact-name">{this.props.name}</div>
          <div className="contact-status">
            <div className="online" />
            <div className="status">{this.props.status}</div>
          </div>
          <div className="last-chat-time">{this.props.time}</div>
          <div className="back" onClick={this.handleClick}>
            <i className="fa fa-arrow-circle-left" />
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
  isSwaggerEnabled: applicationProfile.isSwaggerEnabled
});

const mapDispatchToProps = { setLocale, getSession, getProfile };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ChatBarContact);
