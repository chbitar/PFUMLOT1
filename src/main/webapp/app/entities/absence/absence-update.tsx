import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label, Table } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput } from 'availity-reactstrap-validation';
// tslint:disable-next-line:no-unused-variable
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IUser } from 'app/shared/model/user.model';
import { getUsers } from 'app/modules/administration/user-management/user-management.reducer';
import { IModule } from 'app/shared/model/module.model';
//import { getEntities as getModules } from 'app/entities/module/module.reducer';
import { getModulesAffectedToProf as getModules } from 'app/entities/module/module.reducer';

import { IEtudiantsLicence } from 'app/shared/model/etudiants-licence.model';
import { getEntities as getEtudiantsLicences } from 'app/entities/etudiants-licence/etudiants-licence.reducer';
import { IEtudiantsMaster } from 'app/shared/model/etudiants-master.model';
import { getEntities as getEtudiantsMasters } from 'app/entities/etudiants-master/etudiants-master.reducer';
import { IEtudiantsExecutif } from 'app/shared/model/etudiants-executif.model';
import { getEntities as getEtudiantsExecutifs } from 'app/entities/etudiants-executif/etudiants-executif.reducer';
import { getEntity, updateEntity, createEntity, reset } from './absence.reducer';
import { IAbsence } from 'app/shared/model/absence.model';
// tslint:disable-next-line:no-unused-variable
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';
import { Console } from 'console';
import { Absence } from './absence';
import { isEmpty, isInteger, isNumber } from 'lodash';

export interface IAbsenceUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface IAbsenceUpdateState {
  isNew: boolean;
  userId: string;
  moduleId: string;
  etudiantsLicenceId: string;
  etudiantsMasterId: string;
  etudiantsExecutifId: string;
  etudiantListLicence: any[];
  etudiantListMaster: any[];
  etudiantListExecutif: any[];
  isEtudiantExecutifActive: boolean;
  isEtudiantMasterActive: boolean;
  isEtudiantLicenceActive: boolean;
}

export class AbsenceUpdate extends React.Component<IAbsenceUpdateProps, IAbsenceUpdateState> {
  constructor(props) {
    super(props);
    this.state = {
      userId: '0',
      moduleId: '0',
      etudiantsLicenceId: '0',
      etudiantsMasterId: '0',
      etudiantsExecutifId: '0',
      etudiantListLicence: [],
      etudiantListMaster: [],
      etudiantListExecutif: [],
      isEtudiantExecutifActive: true,
      isEtudiantMasterActive: false,
      isEtudiantLicenceActive: false,

      isNew: !this.props.match.params || !this.props.match.params.id
    };

    this.handleInputChangeExecutif = this.handleInputChangeExecutif.bind(this);
    this.handleInputChangeLicence = this.handleInputChangeLicence.bind(this);
    this.handleInputChangeMaster = this.handleInputChangeMaster.bind(this);
  }

  componentWillUpdate(nextProps, nextState) {
    if (nextProps.updateSuccess !== this.props.updateSuccess && nextProps.updateSuccess) {
      this.handleClose();
    }
  }

  componentDidMount() {
    if (this.state.isNew) {
      this.props.reset();
    } else {
      this.props.getEntity(this.props.match.params.id);
    }

    this.props.getUsers();
    this.props.getModules();
    this.props.getEtudiantsLicences();
    this.props.getEtudiantsMasters();
    this.props.getEtudiantsExecutifs();
  }

  handleInputChangeExecutif(event) {
    const target = event.target;
    var value = target.value;

    if (target.checked) {
      this.state.etudiantListExecutif[value] = value;
    } else {
      this.state.etudiantListExecutif.splice(value, 1);
    }
  }
  handleInputChangeLicence(event) {
    const target = event.target;
    var value = target.value;

    if (target.checked) {
      this.state.etudiantListLicence[value] = value;
    } else {
      this.state.etudiantListLicence.splice(value, 1);
    }
  }

  handleInputChangeMaster(event) {
    const target = event.target;
    var value = target.value;

    if (target.checked) {
      this.state.etudiantListMaster[value] = value;
    } else {
      this.state.etudiantListMaster.splice(value, 1);
    }
  }

  saveEntity = (event, errors, values) => {
    values.dateSeance = convertDateTimeToServer(values.dateSeance);

    console.log(this.state.etudiantListLicence);
    console.log(this.state.etudiantListMaster);
    console.log(this.state.etudiantListExecutif);

    if (errors.length === 0) {
      const { absenceEntity } = this.props;
      const entity = {
        ...absenceEntity,
        ...values
      };

      this.state.etudiantListMaster.map(item => {
        const absence: IAbsence = {
          dateSeance: entity.dateSeance,
          user: entity.user,
          module: entity.module,
          etudiantsMaster: {
            id: item
          }
        };
        this.props.createEntity(absence);
      });
      this.state.etudiantListLicence.map(item => {
        const absence: IAbsence = {
          dateSeance: entity.dateSeance,
          user: entity.user,
          module: entity.module,
          etudiantsLicence: {
            id: item
          }
        };
        this.props.createEntity(absence);
      });
      this.state.etudiantListExecutif.map(item => {
        const absence: IAbsence = {
          dateSeance: entity.dateSeance,
          user: entity.user,
          module: entity.module,
          etudiantsExecutif: {
            id: item
          }
        };
        this.props.createEntity(absence);
      });
    }
  };

  handleClose = () => {
    this.props.history.push('/entity/absence');
  };

  handleEtudiantExecutif = () => {
    this.setState({
      isEtudiantExecutifActive: true,
      isEtudiantLicenceActive: false,
      isEtudiantMasterActive: false
    });
  };

  handleEtudiantLicence = () => {
    this.setState({
      isEtudiantExecutifActive: false,
      isEtudiantLicenceActive: true,
      isEtudiantMasterActive: false
    });
  };

  handleEtudiantMaster = () => {
    this.setState({
      isEtudiantExecutifActive: false,
      isEtudiantLicenceActive: false,
      isEtudiantMasterActive: true
    });
  };

  render() {
    const { absenceEntity, users, modules, etudiantsLicences, etudiantsMasters, etudiantsExecutifs, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="pfumv10App.absence.home.createOrEditLabel">
              <Translate contentKey="pfumv10App.absence.home.createOrEditLabel">Create or edit a Absence</Translate>
            </h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : absenceEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="absence-id">
                      <Translate contentKey="global.field.id">ID</Translate>
                    </Label>
                    <AvInput id="absence-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="dateSeanceLabel" for="absence-dateSeance">
                    <Translate contentKey="pfumv10App.absence.dateSeance">Date Seance</Translate>
                  </Label>
                  <AvInput
                    id="absence-dateSeance"
                    type="datetime-local"
                    className="form-control"
                    name="dateSeance"
                    placeholder={'YYYY-MM-DD HH:mm'}
                    value={isNew ? null : convertDateTimeFromServer(this.props.absenceEntity.dateSeance)}
                  />
                </AvGroup>
                <AvGroup>
                  <Label for="absence-module">
                    <Translate contentKey="pfumv10App.absence.module">Module</Translate>
                  </Label>
                  <AvInput id="absence-module" type="select" className="form-control" name="module.id">
                    <option value="" key="0" />
                    {modules
                      ? modules.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.nomModule}
                          </option>
                        ))
                      : null}
                  </AvInput>
                </AvGroup>
                <input type="radio" name="etudiant" onClick={this.handleEtudiantLicence} value="Licence" />
                <input type="radio" name="etudiant" onClick={this.handleEtudiantMaster} value="Master" />
                <input type="radio" name="etudiant" onClick={this.handleEtudiantExecutif} value="Master Executif" />
                {this.state.isEtudiantLicenceActive && etudiantsLicences && etudiantsLicences.length > 0 ? (
                  <>
                    <Label for="absence-module">Etudiants de Licence</Label>
                    <Table responsive>
                      <thead>
                        <tr>
                          <th>
                            <Translate contentKey="global.field.id">ID</Translate>
                          </th>
                          <th>
                            <Translate contentKey="pfumv10App.etudiantsLicence.nom">Nom</Translate>
                          </th>
                          <th>
                            <Translate contentKey="pfumv10App.etudiantsLicence.prenom">Prenom</Translate>
                          </th>

                          <th />
                        </tr>
                      </thead>

                      {etudiantsLicences.map((etudiant, i) => (
                        <tbody>
                          <tr key={`entity-${i}`}>
                            <td>{etudiant.id}</td>
                            <td>{etudiant.nom}</td>
                            <td>{etudiant.prenom}</td>
                            <td>
                              <input
                                className="form-check-control"
                                type="checkbox"
                                name="absent"
                                value={etudiant.id}
                                onChange={this.handleInputChangeLicence}
                              />
                            </td>
                          </tr>
                        </tbody>
                      ))}
                    </Table>
                  </>
                ) : (
                  <div className="alert alert-warning" />
                )}
                {this.state.isEtudiantExecutifActive && etudiantsExecutifs && etudiantsExecutifs.length > 0 ? (
                  <>
                    <Label for="absence-module">Etudiants de Master exécutif </Label>
                    <Table responsive>
                      <thead>
                        <tr>
                          <th>
                            <Translate contentKey="global.field.id">ID</Translate>
                          </th>
                          <th>
                            <Translate contentKey="pfumv10App.etudiantsLicence.nom">Nom</Translate>
                          </th>
                          <th>
                            <Translate contentKey="pfumv10App.etudiantsLicence.prenom">Prenom</Translate>
                          </th>

                          <th />
                        </tr>
                      </thead>

                      {etudiantsExecutifs.map((etudiant, i) => (
                        <tbody>
                          <tr key={`entity-${i}`}>
                            <td>{etudiant.id}</td>
                            <td>{etudiant.nom}</td>
                            <td>{etudiant.prenom}</td>
                            <td>
                              <input
                                className="form-check-control"
                                type="checkbox"
                                name="absent"
                                value={etudiant.id}
                                onChange={this.handleInputChangeExecutif}
                              />
                            </td>
                          </tr>
                        </tbody>
                      ))}
                    </Table>
                  </>
                ) : (
                  <div className="alert alert-warning" />
                )}
                {this.state.isEtudiantMasterActive && etudiantsMasters && etudiantsMasters.length > 0 ? (
                  <>
                    <Label for="absence-module">Etudiants de Master </Label>
                    <Table responsive>
                      <thead>
                        <tr>
                          <th>
                            <Translate contentKey="global.field.id">ID</Translate>
                          </th>
                          <th>
                            <Translate contentKey="pfumv10App.etudiantsLicence.nom">Nom</Translate>
                          </th>
                          <th>
                            <Translate contentKey="pfumv10App.etudiantsLicence.prenom">Prenom</Translate>
                          </th>

                          <th />
                        </tr>
                      </thead>

                      {etudiantsMasters.map((etudiant, i) => (
                        <tbody>
                          <tr key={`entity-${i}`}>
                            <td>{etudiant.id}</td>
                            <td>{etudiant.nom}</td>
                            <td>{etudiant.prenom}</td>
                            <td>
                              <input
                                className="form-check-control"
                                type="checkbox"
                                name="absent"
                                value={etudiant.id}
                                onChange={this.handleInputChangeMaster}
                              />
                            </td>
                          </tr>
                        </tbody>
                      ))}
                    </Table>
                  </>
                ) : (
                  <div className="alert alert-warning" />
                )}
                <Button tag={Link} id="cancel-save" to="/entity/absence" replace color="info">
                  <FontAwesomeIcon icon="arrow-left" />
                  &nbsp;
                  <span className="d-none d-md-inline">
                    <Translate contentKey="entity.action.back">Back</Translate>
                  </span>
                </Button>
                &nbsp;
                <Button color="primary" id="save-entity" type="submit" disabled={updating}>
                  <FontAwesomeIcon icon="save" />
                  &nbsp;
                  <Translate contentKey="entity.action.save">Save</Translate>
                </Button>
              </AvForm>
            )}
          </Col>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = (storeState: IRootState) => ({
  users: storeState.userManagement.users,
  modules: storeState.module.entities,
  etudiantsLicences: storeState.etudiantsLicence.entities,
  etudiantsMasters: storeState.etudiantsMaster.entities,
  etudiantsExecutifs: storeState.etudiantsExecutif.entities,
  absenceEntity: storeState.absence.entity,
  loading: storeState.absence.loading,
  updating: storeState.absence.updating,
  updateSuccess: storeState.absence.updateSuccess
});

const mapDispatchToProps = {
  getUsers,
  getModules,
  getEtudiantsLicences,
  getEtudiantsMasters,
  getEtudiantsExecutifs,
  getEntity,
  updateEntity,
  createEntity,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AbsenceUpdate);
