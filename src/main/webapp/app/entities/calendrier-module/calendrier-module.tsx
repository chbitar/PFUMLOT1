import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, InputGroup, Col, Row, Table } from 'reactstrap';
import { AvForm, AvGroup, AvInput } from 'availity-reactstrap-validation';
// tslint:disable-next-line:no-unused-variable
import { Translate, translate, ICrudSearchAction, ICrudGetAllAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getSearchEntities, getEntities, getEntitiesByModule, getEntitiesByProgramme } from './calendrier-module.reducer';
import { ICalendrierModule } from 'app/shared/model/calendrier-module.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { getModulesAffectedToProf as getModules } from 'app/entities/module/module.reducer';
export interface ICalendrierModuleProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export interface ICalendrierModuleState {
  search: string;
}

export class CalendrierModule extends React.Component<ICalendrierModuleProps, ICalendrierModuleState> {
  state: ICalendrierModuleState = {
    search: ''
  };

  componentDidMount() {
    this.props.getEntities();
    this.props.getModules();
  }

  filtrerListByModule = e => {
    if (e.target.value === '') this.props.getEntities();
    else this.props.getEntitiesByModule(e.target.value);
  };

  filtrerListByProgramme = e => {
    if (e.target.value === '') this.props.getEntities();
    else this.props.getEntitiesByProgramme(e.target.value);
  };

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
    const { calendrierModuleList, match, modules } = this.props;
    return (
      <div>
        <h2 id="calendrier-module-heading">
          &nbsp; &nbsp; Liste des Calendriers Modules
          <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
            <FontAwesomeIcon icon="plus" />
            &nbsp;
            <Translate contentKey="pfumApp.calendrierModule.home.createLabel">Create new Calendrier Module</Translate>
          </Link>
        </h2>
        <br />
        <Row>
          <Col>
            <div>
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

          <Col>
            <div>
              <select onChange={this.filtrerListByProgramme} placeholder="Filtrer par Programme">
                <option value="" />
                <option value="LICENCE">{translate('pfumApp.Programme.LICENCE')}</option>
                <option value="MASTER">{translate('pfumApp.Programme.MASTER')}</option>
                <option value="MASTER_EXECUTIF">{translate('pfumApp.Programme.MASTER_EXECUTIF')}</option>
              </select>
            </div>
          </Col>
        </Row>
        <br />
        <div className="table-responsive" style={{ marginLeft: '10px' }}>
          &nbsp; &nbsp;{' '}
          {calendrierModuleList && calendrierModuleList.length > 0 ? (
            <Table responsive>
              <thead>
                <tr>
                  <th>
                    <Translate contentKey="pfumApp.calendrierModule.libelle">Libelle</Translate>
                  </th>
                  <th>
                    <Translate contentKey="pfumApp.calendrierModule.dateControlContinu1">Date Control Continu 1</Translate>
                  </th>
                  <th>
                    <Translate contentKey="pfumApp.calendrierModule.dateControlContinu2">Date Control Continu 2</Translate>
                  </th>
                  <th>
                    <Translate contentKey="pfumApp.calendrierModule.module">Module</Translate>
                  </th>
                  <th>Programme</th>
                  <th>
                    <Translate contentKey="pfumApp.calendrierModule.anneeInscription">Annee Inscription</Translate>
                  </th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {calendrierModuleList.map((calendrierModule, i) => (
                  <tr key={`entity-${i}`}>
                    <td>{calendrierModule.libelle}</td>
                    <td>
                      <TextFormat type="date" value={calendrierModule.dateControlContinu1} format={APP_DATE_FORMAT} />
                    </td>
                    <td>
                      <TextFormat type="date" value={calendrierModule.dateControlContinu2} format={APP_DATE_FORMAT} />
                    </td>
                    <td>
                      {calendrierModule.module ? (
                        <Link to={`module/${calendrierModule.module.id}`}>{calendrierModule.module.nomModule}</Link>
                      ) : (
                        ''
                      )}
                    </td>
                    <td>{calendrierModule.programme}</td>
                    <td>
                      {calendrierModule.anneeInscription ? (
                        <Link to={`annee-inscription/${calendrierModule.anneeInscription.id}`}>
                          {calendrierModule.anneeInscription.annee}
                        </Link>
                      ) : (
                        ''
                      )}
                    </td>
                    <td className="text-right">
                      <div className="btn-group flex-btn-group-container">
                        <Button tag={Link} to={`${match.url}/${calendrierModule.id}`} color="info" size="sm">
                          <FontAwesomeIcon icon="eye" />{' '}
                          <span className="d-none d-md-inline">
                            <Translate contentKey="entity.action.view">View</Translate>
                          </span>
                        </Button>
                        <Button tag={Link} to={`${match.url}/${calendrierModule.id}/edit`} color="primary" size="sm">
                          <FontAwesomeIcon icon="pencil-alt" />{' '}
                          <span className="d-none d-md-inline">
                            <Translate contentKey="entity.action.edit">Edit</Translate>
                          </span>
                        </Button>
                        <Button tag={Link} to={`${match.url}/${calendrierModule.id}/delete`} color="danger" size="sm">
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
              <Translate contentKey="pfumApp.calendrierModule.home.notFound">No Calendrier Modules found</Translate>
            </div>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ calendrierModule, module }: IRootState) => ({
  calendrierModuleList: calendrierModule.entities,
  modules: module.entities
});

const mapDispatchToProps = {
  getSearchEntities,
  getEntities,
  getEntitiesByModule,
  getModules,
  getEntitiesByProgramme
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CalendrierModule);
