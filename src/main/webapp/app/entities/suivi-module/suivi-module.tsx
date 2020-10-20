import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, InputGroup, Col, Row, Table } from 'reactstrap';
import { AvForm, AvGroup, AvInput } from 'availity-reactstrap-validation';
// tslint:disable-next-line:no-unused-variable
import { byteSize, Translate, translate, ICrudSearchAction, ICrudGetAllAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getSearchEntities, getEntities } from './suivi-module.reducer';
import { ISuiviModule } from 'app/shared/model/suivi-module.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface ISuiviModuleProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export interface ISuiviModuleState {
  search: string;
}

export class SuiviModule extends React.Component<ISuiviModuleProps, ISuiviModuleState> {
  state: ISuiviModuleState = {
    search: ''
  };

  componentDidMount() {
    this.props.getEntities();
  }

  search = () => {
    if (this.state.search) {
      this.props.getSearchEntities(this.state.search);
    }
  };

  clear = () => {
    this.setState({ search: '' }, () => {
      this.props.getEntities();
    });
  };

  handleSearch = event => this.setState({ search: event.target.value });

  render() {
    const { suiviModuleList, match } = this.props;
    return (
      <div>
        <h2 id="suivi-module-heading">
          <Translate contentKey="pfumv10App.suiviModule.home.title">Suivi Modules</Translate>
          <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
            <FontAwesomeIcon icon="plus" />
            &nbsp;
            <Translate contentKey="pfumv10App.suiviModule.home.createLabel">Create new Suivi Module</Translate>
          </Link>
        </h2>
        <Row>
          <Col sm="12">
            <AvForm onSubmit={this.search}>
              <AvGroup>
                <InputGroup>
                  <AvInput
                    type="text"
                    name="search"
                    value={this.state.search}
                    onChange={this.handleSearch}
                    placeholder={translate('pfumv10App.suiviModule.home.search')}
                  />
                  <Button className="input-group-addon">
                    <FontAwesomeIcon icon="search" />
                  </Button>
                  <Button type="reset" className="input-group-addon" onClick={this.clear}>
                    <FontAwesomeIcon icon="trash" />
                  </Button>
                </InputGroup>
              </AvGroup>
            </AvForm>
          </Col>
        </Row>
        <div className="table-responsive">
          {suiviModuleList && suiviModuleList.length > 0 ? (
            <Table responsive>
              <thead>
                <tr>
                  <th>
                    <Translate contentKey="global.field.id">ID</Translate>
                  </th>
                  <th>
                    <Translate contentKey="pfumv10App.suiviModule.semestre">Semestre</Translate>
                  </th>
                  <th>
                    <Translate contentKey="pfumv10App.suiviModule.descriptif">Descriptif</Translate>
                  </th>
                  <th>
                    <Translate contentKey="pfumv10App.suiviModule.observations">Observations</Translate>
                  </th>
                  <th>
                    <Translate contentKey="pfumv10App.suiviModule.date">Date</Translate>
                  </th>
                  <th>
                    <Translate contentKey="pfumv10App.suiviModule.debutCreneau">Debut Creneau</Translate>
                  </th>
                  <th>
                    <Translate contentKey="pfumv10App.suiviModule.finCreneau">Fin Creneau</Translate>
                  </th>
                  <th>
                    <Translate contentKey="pfumv10App.suiviModule.duree">Duree</Translate>
                  </th>
                  <th>
                    <Translate contentKey="pfumv10App.suiviModule.user">User</Translate>
                  </th>
                  <th>
                    <Translate contentKey="pfumv10App.suiviModule.module">Module</Translate>
                  </th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {suiviModuleList.map((suiviModule, i) => (
                  <tr key={`entity-${i}`}>
                    <td>
                      <Button tag={Link} to={`${match.url}/${suiviModule.id}`} color="link" size="sm">
                        {suiviModule.id}
                      </Button>
                    </td>
                    <td>
                      <Translate contentKey={`pfumv10App.Semestre.${suiviModule.semestre}`} />
                    </td>
                    <td>{suiviModule.descriptif}</td>
                    <td>{suiviModule.observations}</td>
                    <td>
                      <TextFormat type="date" value={suiviModule.date} format={APP_DATE_FORMAT} />
                    </td>
                    <td>
                      <TextFormat type="date" value={suiviModule.debutCreneau} format={APP_DATE_FORMAT} />
                    </td>
                    <td>
                      <TextFormat type="date" value={suiviModule.finCreneau} format={APP_DATE_FORMAT} />
                    </td>
                    <td>{suiviModule.duree}</td>
                    <td>{suiviModule.user ? suiviModule.user.id : ''}</td>
                    <td>{suiviModule.module ? <Link to={`module/${suiviModule.module.id}`}>{suiviModule.module.id}</Link> : ''}</td>
                    <td className="text-right">
                      <div className="btn-group flex-btn-group-container">
                        <Button tag={Link} to={`${match.url}/${suiviModule.id}`} color="info" size="sm">
                          <FontAwesomeIcon icon="eye" />{' '}
                          <span className="d-none d-md-inline">
                            <Translate contentKey="entity.action.view">View</Translate>
                          </span>
                        </Button>
                        <Button tag={Link} to={`${match.url}/${suiviModule.id}/edit`} color="primary" size="sm">
                          <FontAwesomeIcon icon="pencil-alt" />{' '}
                          <span className="d-none d-md-inline">
                            <Translate contentKey="entity.action.edit">Edit</Translate>
                          </span>
                        </Button>
                        <Button tag={Link} to={`${match.url}/${suiviModule.id}/delete`} color="danger" size="sm">
                          <FontAwesomeIcon icon="trash" />{' '}
                          <span className="d-none d-md-inline">
                            <Translate contentKey="entity.action.delete">Delete</Translate>
                          </span>
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          ) : (
            <div className="alert alert-warning">
              <Translate contentKey="pfumv10App.suiviModule.home.notFound">No Suivi Modules found</Translate>
            </div>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ suiviModule }: IRootState) => ({
  suiviModuleList: suiviModule.entities
});

const mapDispatchToProps = {
  getSearchEntities,
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SuiviModule);
