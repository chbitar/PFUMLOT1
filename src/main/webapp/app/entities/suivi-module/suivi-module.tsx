import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, InputGroup, Col, Row, Table, Label } from 'reactstrap';
import { AvForm, AvGroup, AvInput } from 'availity-reactstrap-validation';
// tslint:disable-next-line:no-unused-variable
import { byteSize, Translate, translate, ICrudSearchAction, ICrudGetAllAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';
import { getSearchEntities, getEntitiesByUserId, getEntities, getEntitiesByModule } from './suivi-module.reducer';
import { ISuiviModule } from 'app/shared/model/suivi-module.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_DATE_FORMAT_TIMESTAMP, APP_LOCAL_DATE_FORMAT, AUTHORITIES } from 'app/config/constants';
import { hasAnyAuthority } from 'app/shared/auth/private-route';
import { Transform } from 'stream';
import { getModulesAffectedToProf as getModules } from 'app/entities/module/module.reducer';

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
    this.props.getModules();
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

  displayRemaining = (id, volume) => {
    const total = this.props.suiviModuleList
      .filter(suivi => suivi.module.id === id)
      .map(suivi => suivi.duree)
      .reduce((curval, newval) => curval + newval);
    return '' + (volume - total);
  };

  handleSearch = event => this.setState({ search: event.target.value });

  filtrerListByModule = e => {
    if (e.target.value === '') this.props.getEntities();
    else this.props.getEntitiesByModule(e.target.value);
  };

  render() {
    const { suiviModuleList, match, isProfesseur, modules } = this.props;
    return (
      <div>
        <h2 id="suivi-module-heading">
          &nbsp; &nbsp; <Translate contentKey="pfumApp.suiviModule.home.title"> Suivi Modules </Translate>
          <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
            <FontAwesomeIcon icon="plus" />
            &nbsp;
            <Translate contentKey="pfumApp.suiviModule.home.createLabel">Create new Suivi Module</Translate>
          </Link>
        </h2>
        {/* <Row>
          <Col sm="12">
            <AvForm onSubmit={this.search}>
              <AvGroup>
                <InputGroup>
                  <AvInput
                    type="text"
                    name="search"
                    value={this.state.search}
                    onChange={this.handleSearch}
                    placeholder={translate('pfumApp.suiviModule.home.search')}
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
        </Row> */}
        <br />
        <Row>
          <Col md="6">
            <div>
              Filtrer par Module : &nbsp;
              <select onChange={this.filtrerListByModule}>
                <option value="" />
                {modules
                  ? modules.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.nomModule}
                      </option>
                    ))
                  : null}
              </select>
            </div>
          </Col>
        </Row>
        <br />
        <div className="table-responsive">
          {suiviModuleList && suiviModuleList.length > 0 ? (
            <Table responsive>
              <thead>
                <tr>
                  <th>
                    <Translate contentKey="pfumApp.suiviModule.professeur">Professeur</Translate>
                  </th>
                  <th>
                    <Translate contentKey="pfumApp.suiviModule.semestre">Semestre</Translate>
                  </th>
                  <th>
                    <Translate contentKey="pfumApp.suiviModule.module">Module</Translate>
                  </th>
                  <th>Reste</th>
                  {/*                   <th>
                    <Translate contentKey="pfumApp.suiviModule.descriptif">Descriptif</Translate>
                  </th> */}
                  <th>
                    <Translate contentKey="pfumApp.suiviModule.observations">Observations</Translate>
                  </th>
                  <th>
                    <Translate contentKey="pfumApp.suiviModule.date">Date</Translate>
                  </th>
                  <th>
                    <Translate contentKey="pfumApp.suiviModule.debutCreneau">Debut Creneau</Translate>
                  </th>
                  <th>
                    <Translate contentKey="pfumApp.suiviModule.finCreneau">Fin Creneau</Translate>
                  </th>
                  <th>
                    <Translate contentKey="pfumApp.suiviModule.duree">Duree</Translate>
                  </th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {suiviModuleList.map((suiviModule, i) => (
                  <tr key={`entity-${i}`}>
                    <td>{suiviModule.user ? suiviModule.user.firstName + ' ' + suiviModule.user.lastName : ''}</td>
                    <td>
                      <Translate contentKey={`pfumApp.Semestre.${suiviModule.semestre}`} />
                    </td>
                    <td>{suiviModule.module ? <Link to={`module/${suiviModule.module.id}`}>{suiviModule.module.nomModule}</Link> : ''}</td>
                    <td>
                      <div className="aaa">{this.displayRemaining(suiviModule.module.id, suiviModule.module.volumeHoraire)}</div>
                    </td>
                    {/* <td>{suiviModule.descriptif}</td> */}
                    <td>{suiviModule.observations}</td>
                    <td>
                      <TextFormat type="date" value={suiviModule.date} format={APP_DATE_FORMAT} />
                    </td>
                    <td>
                      <TextFormat type="date" value={suiviModule.debutCreneau} format={APP_DATE_FORMAT_TIMESTAMP} />
                    </td>
                    <td>
                      <TextFormat type="date" value={suiviModule.finCreneau} format={APP_DATE_FORMAT_TIMESTAMP} />
                    </td>
                    <td>{suiviModule.duree}</td>
                    <td className="text-right">
                      <div className="btn-group flex-btn-group-container">
                        <Button tag={Link} to={`${match.url}/${suiviModule.id}`} color="info" size="sm">
                          <FontAwesomeIcon icon="eye" />{' '}
                          <span className="d-none d-md-inline">
                            <Translate contentKey="entity.action.view">View</Translate>
                          </span>
                        </Button>
                        {isProfesseur && (
                          <dd>
                            <Button tag={Link} to={`${match.url}/${suiviModule.id}/edit`} color="primary" size="sm">
                              <FontAwesomeIcon icon="pencil-alt" />{' '}
                              <span className="d-none d-md-inline">
                                <Translate contentKey="entity.action.edit">Edit</Translate>
                              </span>
                            </Button>
                          </dd>
                        )}
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
              <Translate contentKey="pfumApp.suiviModule.home.notFound">No Suivi Modules found</Translate>
            </div>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (storeState: IRootState) => ({
  suiviModuleList: storeState.suiviModule.entities,
  isProfesseur: hasAnyAuthority(storeState.authentication.account.authorities, [AUTHORITIES.PROF]),
  modules: storeState.module.entities
});

const mapDispatchToProps = {
  getSearchEntities,
  getEntitiesByUserId,
  getModules,
  getEntities,
  getEntitiesByModule
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SuiviModule);
