/* tslint:disable */
import $ from 'jquery';
import '../../../static/assets/css/beyond.min.css';

import React from 'react';
import { connect } from 'react-redux';
import { Redirect, RouteComponentProps } from 'react-router-dom';

import { IRootState } from 'app/shared/reducers';
import { login } from 'app/shared/reducers/authentication';
import LoginModal from './login-modal';

export interface ILoginProps extends StateProps, DispatchProps, RouteComponentProps<{}> {}

export interface ILoginState {
  showModal: boolean;
}

export class Login extends React.Component<ILoginProps, ILoginState> {
  state: ILoginState = {
    showModal: this.props.showModal
  };

  componentDidMount() {}

  handleLogin = (username, password, rememberMe = false) => {
    this.props.login(username, password, rememberMe);
  };

  handleClose = () => {
    this.setState({ showModal: false });
  };

  render() {
    return (
      <div className="row">
        <div className="col-lg-12 col-sm-12 col-xs-12">
          <h5 className="row-title before-themeprimary">
            <i className="fa fa-folder themeprimary" />Tabbed Wizard
          </h5>
          <div id="tabbedwizard" className="wizard wizard-tabbed" data-target="#tabbedwizardsteps">
            <ul className="steps">
              <li data-target="#tabbedwizardstep1" className="active">
                <span className="step">1</span>Information générales<span className="chevron" />
              </li>
              <li data-target="#tabbedwizardstep2">
                <span className="step">2</span>Information Filièere<span className="chevron" />
              </li>
              <li data-target="#tabbedwizardstep3">
                <span className="step">3</span>Pièeces jintes<span className="chevron" />
              </li>
              <li data-target="#tabbedwizardstep4">
                <span className="step">4</span>Step 4<span className="chevron" />
              </li>
              <li data-target="#tabbedwizardstep5">
                <span className="step">5</span>Step 5<span className="chevron" />
              </li>
            </ul>
          </div>
          <div className="step-content" id="tabbedwizardsteps">
            <div className="step-pane active" id="tabbedwizardstep1">
              <div className="row">
                <div className="col-lg-6 col-sm-6 col-xs-12">
                  <div className="widget radius-bordered">
                    <div className="widget-header">
                      <span className="widget-caption">Registration Form</span>
                    </div>
                    <div className="widget-body">
                      <form
                        id="registrationForm"
                        method="post"
                        className="form-horizontal"
                        data-bv-message="This value is not valid"
                        data-bv-feedbackicons-valid="glyphicon glyphicon-ok"
                        data-bv-feedbackicons-invalid="glyphicon glyphicon-remove"
                        data-bv-feedbackicons-validating="glyphicon glyphicon-refresh"
                      >
                        <div className="form-title">Basic Validator With HTML Attributes</div>
                        <div className="form-group">
                          <label className="col-lg-4 control-label">Full name</label>
                          <div className="col-lg-4">
                            <input
                              type="text"
                              className="form-control"
                              name="firstName"
                              placeholder="First name"
                              data-bv-notempty="true"
                              data-bv-notempty-message="The first name is required and cannot be empty"
                            />
                          </div>
                          <div className="col-lg-4">
                            <input
                              type="text"
                              className="form-control"
                              name="lastName"
                              placeholder="Last name"
                              data-bv-notempty="true"
                              data-bv-notempty-message="The last name is required and cannot be empty"
                            />
                          </div>
                        </div>

                        <div className="form-group">
                          <label className="col-lg-4 control-label">Username</label>
                          <div className="col-lg-8">
                            <input
                              type="text"
                              className="form-control"
                              name="username"
                              data-bv-message="The username is not valid"
                              data-bv-notempty="true"
                              data-bv-notempty-message="The username is required and cannot be empty"
                              data-bv-regexp="true"
                              data-bv-regexp-regexp="[a-zA-Z0-9_\.]+"
                              data-bv-regexp-message="The username can only consist of alphabetical, number, dot and underscore"
                              data-bv-stringlength="true"
                              data-bv-stringlength-min="6"
                              data-bv-stringlength-max="30"
                              data-bv-stringlength-message="The username must be more than 6 and less than 30 characters long"
                              data-bv-different="true"
                              data-bv-different-field="password"
                              data-bv-different-message="The username and password cannot be the same as each other"
                            />
                          </div>
                        </div>

                        <div className="form-group">
                          <label className="col-lg-4 control-label">Email address</label>
                          <div className="col-lg-8">
                            <input
                              className="form-control"
                              name="email"
                              type="email"
                              data-bv-emailaddress="true"
                              data-bv-emailaddress-message="The input is not a valid email address"
                            />
                          </div>
                        </div>

                        <div className="form-group">
                          <label className="col-lg-4 control-label">Password</label>
                          <div className="col-lg-8">
                            <input
                              type="password"
                              className="form-control"
                              name="password"
                              data-bv-notempty="true"
                              data-bv-notempty-message="The password is required and cannot be empty"
                              data-bv-identical="true"
                              data-bv-identical-field="confirmPassword"
                              data-bv-identical-message="The password and its confirm are not the same"
                              data-bv-different="true"
                              data-bv-different-field="username"
                              data-bv-different-message="The password cannot be the same as username"
                            />
                          </div>
                        </div>

                        <div className="form-group">
                          <label className="col-lg-4 control-label">Retype password</label>
                          <div className="col-lg-8">
                            <input
                              type="password"
                              className="form-control"
                              name="confirmPassword"
                              data-bv-notempty="true"
                              data-bv-notempty-message="The confirm password is required and cannot be empty"
                              data-bv-identical="true"
                              data-bv-identical-field="password"
                              data-bv-identical-message="The password and its confirm are not the same"
                              data-bv-different="true"
                              data-bv-different-field="username"
                              data-bv-different-message="The password cannot be the same as username"
                            />
                          </div>
                        </div>
                        <div className="form-group">
                          <div className="col-lg-offset-4 col-lg-8">
                            <input className="btn btn-palegreen" type="submit" value="Validate" />
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="step-pane" id="tabbedwizardstep2">
              <div className="col-lg-6 col-sm-6 col-xs-12">
                <div className="widget  radius-bordered">
                  <div className="widget-header">
                    <span className="widget-caption">Toggling Field Validator</span>
                  </div>
                  <div className="widget-body">
                    <form id="togglingForm" method="post" className="form-horizontal">
                      <div className="form-group">
                        <label className="col-lg-4 control-label">
                          Full name <sup>*</sup>
                        </label>
                        <div className="col-lg-4">
                          <input type="text" className="form-control" name="firstName" placeholder="First name" />
                        </div>
                        <div className="col-lg-4">
                          <input type="text" className="form-control" name="lastName" placeholder="Last name" />
                        </div>
                      </div>

                      <div className="form-group">
                        <label className="col-lg-4 control-label">
                          Company <sup>*</sup>
                        </label>
                        <div className="col-lg-8">
                          <input
                            type="text"
                            className="form-control"
                            name="company"
                            required
                            data-bv-notempty-message="The company name is required"
                          />
                        </div>
                      </div>
                      <div className="form-group">
                        <div className="col-lg-offset-4 col-lg-8">
                          <button type="button" className="btn btn-danger btn-sm" data-toggle="#jobInfo">
                            Add more info
                          </button>
                        </div>
                      </div>
                      <div id="jobInfo" style={{ display: 'none' }}>
                        <div className="form-group">
                          <label className="col-lg-4 control-label">
                            Job title <sup>*</sup>
                          </label>
                          <div className="col-lg-8">
                            <input type="text" className="form-control" name="job" />
                          </div>
                        </div>

                        <div className="form-group">
                          <label className="col-lg-4 control-label">
                            Department <sup>*</sup>
                          </label>
                          <div className="col-lg-8">
                            <input type="text" className="form-control" name="department" />
                          </div>
                        </div>
                      </div>
                      <hr className="wide" />
                      <div className="form-group">
                        <label className="col-lg-4 control-label">
                          Mobile phone <sup>*</sup>
                        </label>
                        <div className="col-lg-8">
                          <input type="text" className="form-control" name="mobilePhone" />
                        </div>
                      </div>
                      <div className="form-group">
                        <div className="col-lg-offset-4 col-lg-8">
                          <button type="button" className="btn btn-danger btn-sm" data-toggle="#phoneInfo">
                            Add more phone numbers
                          </button>
                        </div>
                      </div>

                      <div id="phoneInfo" style={{ display: 'none' }}>
                        <div className="form-group">
                          <label className="col-lg-4 control-label">Home phone</label>
                          <div className="col-lg-8">
                            <input type="text" className="form-control" name="homePhone" />
                          </div>
                        </div>

                        <div className="form-group">
                          <label className="col-lg-4 control-label">Office phone</label>
                          <div className="col-lg-8">
                            <input type="text" className="form-control" name="officePhone" />
                          </div>
                        </div>
                      </div>
                      <hr className="wide" />

                      <div className="form-group">
                        <div className="col-lg-8 col-lg-offset-4">
                          <button type="submit" className="btn btn-danger">
                            Validate
                          </button>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
            <div className="step-pane" id="tabbedwizardstep3">
              This is step 3
            </div>
            <div className="step-pane" id="tabbedwizardstep4">
              This is step 4
            </div>
            <div className="step-pane" id="tabbedwizardstep5">
              This is step 5
            </div>
          </div>
          <div className="actions actions-footer" id="tabbedwizard-actions">
            <div className="btn-group">
              <button type="button" className="btn btn-default btn-sm btn-prev">
                {' '}
                <i className="fa fa-angle-left" />Prev
              </button>
              <button type="button" className="btn btn-default btn-sm btn-next" data-last="Finish">
                Next<i className="fa fa-angle-right" />
              </button>
            </div>
          </div>
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
