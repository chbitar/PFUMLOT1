import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, InputGroup, Col, Row, Table } from 'reactstrap';
import { AvForm, AvGroup, AvInput } from 'availity-reactstrap-validation';
// tslint:disable-next-line:no-unused-variable
import { Translate, translate, ICrudSearchAction, ICrudGetAllAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { getModulesAffectedToProf as getModules } from 'app/entities/module/module.reducer';
import { IRootState } from 'app/shared/reducers';
import { getSearchEntities, getEntities, getEntitiesByModule, getEntitiesByProgramme } from './fiche-absence.reducer';
import { IFicheAbsence } from 'app/shared/model/fiche-absence.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IFicheAbsenceProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export interface IFicheAbsenceState {
  search: string;
}

export class FicheAbsence extends React.Component<IFicheAbsenceProps, IFicheAbsenceState> {
  state: IFicheAbsenceState = {
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

  filtrerListByModule = e => {
    if (e.target.value === '') this.props.getEntities();
    else this.props.getEntitiesByModule(e.target.value);
  };

  filtrerListModuleByProgramme = e => {
    if (e.target.value === '') this.props.getEntities();
    else this.props.getEntitiesByProgramme(e.target.value);
  };

  handleSearch = event => this.setState({ search: event.target.value });

  render() {
    const { ficheAbsenceList, match, modules } = this.props;
    return (
      <div>
        <h2 id="fiche-absence-heading">
          &nbsp; &nbsp;<Translate contentKey="pfumApp.ficheAbsence.home.title">Fiche Absences</Translate>
        </h2>
        &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
        &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
        &nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
        &nbsp;&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; Créer une nouvelle Fiche d'absence : &nbsp;&nbsp;
        <Button tag={Link} to={`absence-licence/new`} color="info" size="sm" id="jh-create-entity-licence">
          <FontAwesomeIcon icon="plus" />
          <span className="d-none d-md-inline">
            &nbsp;&nbsp;
            [Bac+3]&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          </span>
        </Button>
        &nbsp;&nbsp;
        <Button tag={Link} to={`absence-master/new`} color="info" size="sm" id="jh-create-entity-licence">
          <FontAwesomeIcon icon="plus" />
          <span className="d-none d-md-inline">&nbsp;&nbsp; [Master Académique]</span>
        </Button>
        &nbsp;&nbsp;
        <Button tag={Link} to={`absence/new`} color="info" size="sm" id="jh-create-entity-licence">
          <FontAwesomeIcon icon="plus" />
          <span className="d-none d-md-inline">&nbsp;&nbsp; [Master Exécutif]&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
        </Button>
        <br />
        <br />
        <Row>
          <Col>
            <div>
              <select onChange={this.filtrerListByModule} placeholder="Filtrer par Module">
                <option value="">&nbsp;&nbsp;Filtrer par Module</option>
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
              <select onChange={this.filtrerListModuleByProgramme} placeholder="Filtrer par Programme">
                <option value="">&nbsp;&nbsp;Filtrer par Programme</option>
                <option value="LICENCE">{translate('pfumApp.Programme.LICENCE')}</option>
                <option value="MASTER">{translate('pfumApp.Programme.MASTER')}</option>
                <option value="MASTER_EXECUTIF">{translate('pfumApp.Programme.MASTER_EXECUTIF')}</option>
              </select>
            </div>
          </Col>
        </Row>
        <br />
        <br />
        <div className="table-responsive">
          {ficheAbsenceList && ficheAbsenceList.length > 0 ? (
            <Table responsive>
              <thead>
                <tr>
                  <th>
                    <Translate contentKey="pfumApp.ficheAbsence.dateSeance">Date de Séance</Translate>
                  </th>
                  <th>
                    <Translate contentKey="pfumApp.ficheAbsence.module">Module</Translate>
                  </th>
                  <th>
                    <Translate contentKey="pfumApp.ficheAbsence.programme">Programme</Translate>
                  </th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {ficheAbsenceList.map((ficheAbsence, i) => (
                  <tr key={`entity-${i}`}>
                    <td>
                      <TextFormat type="date" value={ficheAbsence.dateSeance} format={APP_LOCAL_DATE_FORMAT} />
                    </td>
                    <td>
                      {ficheAbsence.module ? <Link to={`module/${ficheAbsence.module.id}`}>{ficheAbsence.module.nomModule}</Link> : ''}
                    </td>
                    <td>{ficheAbsence.programme}</td>
                    <td className="text-right">
                      <div className="btn-group flex-btn-group-container">
                        <Button tag={Link} to={`${match.url}/${ficheAbsence.id}`} color="info" size="sm">
                          <FontAwesomeIcon icon="eye" />{' '}
                          <span className="d-none d-md-inline">
                            <Translate contentKey="entity.action.view">View</Translate>
                          </span>
                        </Button>
                        <Button tag={Link} to={`${match.url}/${ficheAbsence.id}/delete`} color="danger" size="sm">
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
              <Translate contentKey="pfumApp.ficheAbsence.home.notFound">No Fiche Absences found</Translate>
            </div>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (storeState: IRootState) => ({
  ficheAbsenceList: storeState.ficheAbsence.entities,
  modules: storeState.module.entities
});

const mapDispatchToProps = {
  getSearchEntities,
  getEntities,
  getModules,
  getEntitiesByModule,
  getEntitiesByProgramme
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FicheAbsence);
