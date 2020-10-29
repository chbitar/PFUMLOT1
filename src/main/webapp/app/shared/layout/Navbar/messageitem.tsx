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

export interface IMessageItemProps {
  sender: string;
  time: string;
  subject: string;
  body: string;
}
export interface IMessageItemProps extends StateProps, DispatchProps {}

export class MessageItem extends React.Component<IMessageItemProps> {
  componentDidMount() {
    /*     this.props.getSession();
    this.props.getProfile(); */
  }

  render() {
    return (
      <li>
        <a href="#">
          <img src="assets/img/avatars/divyia.jpg" className="message-avatar" alt="Divyia Austin" />
          <div className="message">
            <span className="message-sender">{this.props.sender}</span>
            <span className="message-time">{this.props.time}</span>
            <span className="message-subject">{this.props.subject}</span>
            <span className="message-body">{this.props.body}</span>
          </div>
        </a>
      </li>
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
)(MessageItem);
