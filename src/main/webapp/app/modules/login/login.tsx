// tslint:disable
import '../../../static/assets/css/beyond.min.css';
import '../../../static/assets/js/validation/bootstrapValidator.js';
import React from 'react';
import { connect } from 'react-redux';
import { Redirect, RouteComponentProps } from 'react-router-dom';

import { IRootState } from 'app/shared/reducers';
import { login } from 'app/shared/reducers/authentication';
import LoginModal from './login-modal';
import $ from 'jquery';

export interface ILoginProps extends StateProps, DispatchProps, RouteComponentProps<{}> {}

export interface ILoginState {
  showModal: boolean;
}

export class Login extends React.Component<ILoginProps, ILoginState> {
  state: ILoginState = {
    showModal: this.props.showModal
  };

  componentDidMount() {
    $('#registrationForm').bootstrapValidator();
  }

  handleLogin = (username, password, rememberMe = false) => {
    this.props.login(username, password, rememberMe);
  };

  handleClose = () => {
    this.setState({ showModal: false });
  };

  render() {
    return (
      <div>
        <div className="login-container animated fadeInDown">
          <div className="loginbox bg-white">
            <div className="loginbox-title">SIGN IN</div>
            <div className="loginbox-social">
              <div className="social-title ">Connect with Your Social Accounts</div>
              <div className="social-buttons">
                <a href="" className="button-facebook">
                  <i className="social-icon fa fa-facebook" />
                </a>
                <a href="" className="button-twitter">
                  <i className="social-icon fa fa-twitter" />
                </a>
                <a href="" className="button-google">
                  <i className="social-icon fa fa-google-plus" />
                </a>
              </div>
            </div>
            <div className="loginbox-or">
              <div className="or-line" />
              <div className="or">OR</div>
            </div>
            <form
              id="registrationForm"
              method="post"
              className="form-horizontal"
              data-bv-message="This value is not valid"
              data-bv-feedbackicons-valid="glyphicon glyphicon-ok"
              data-bv-feedbackicons-invalid="glyphicon glyphicon-remove"
              data-bv-feedbackicons-validating="glyphicon glyphicon-refresh"
            >
              <div className="loginbox-textbox">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Email"
                  name="username"
                  data-bv-notempty="true"
                  data-bv-notempty-message="The Email is required and cannot be empty"
                />
              </div>
              <div className="loginbox-textbox">
                <input
                  type="password"
                  className="form-control"
                  placeholder="Password"
                  name="password"
                  data-bv-notempty="true"
                  data-bv-notempty-message="The password is required and cannot be empty"
                />
              </div>
              <div className="loginbox-forgot">
                <a href="">Forgot Password?</a>
              </div>
              <div className="loginbox-submit">
                <input type="button" className="btn btn-primary btn-block" value="Login" />
              </div>
              <div className="loginbox-signup">
                <a href="register.html">Sign Up With Email</a>
              </div>
            </form>
          </div>
          <div className="logobox" />
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ authentication }: IRootState) => ({
  isAuthenticated: authentication.isAuthenticated,
  loginError: authentication.loginError,
  showModal: authentication.showModalLogin
});

const mapDispatchToProps = { login };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
