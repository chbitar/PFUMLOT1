import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label, Table } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput } from 'availity-reactstrap-validation';
// tslint:disable-next-line:no-unused-variable
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';
import { getUsers } from 'app/modules/administration/user-management/user-management.reducer';
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
import { IFicheAbsence, Programme } from 'app/shared/model/fiche-absence.model';
import { createEntity as createFicheAbsenceEntity } from 'app/entities/fiche-absence/fiche-absence.reducer';

export interface IAbsenceUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface IAbsenceUpdateState {
  isNew: boolean;
  userId: string;
  moduleId: string;
  etudiantsLicenceId: string;
  etudiantListLicence: any[];
}

export class AbsenceUpdate extends React.Component<IAbsenceUpdateProps, IAbsenceUpdateState> {
  constructor(props) {
    super(props);
    this.state = {
      userId: '0',
      moduleId: '0',
      etudiantsLicenceId: '0',
      etudiantListLicence: [],

      isNew: !this.props.match.params || !this.props.match.params.id
    };

    this.handleInputChangeLicence = this.handleInputChangeLicence.bind(this);
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
  }

  handleInputChangeLicence(event) {
    const target = event.target;
    const value = target.value;

    if (target.checked) {
      this.state.etudiantListLicence[value] = value;
    } else {
      this.state.etudiantListLicence.splice(value, 1);
    }
  }

  saveEntity = (event, errors, values) => {
    values.dateSeance = convertDateTimeToServer(values.dateSeance);
    if (errors.length === 0) {
      const { absenceEntity } = this.props;
      const entity = {
        ...absenceEntity,
        ...values
      };

      const absences = [];

      this.state.etudiantListLicence.map(item => {
        const absence: IAbsence = {
          dateSeance: entity.dateSeance,
          user: entity.user,
          module: entity.module,
          etudiantsLicence: {
            id: item
          }
        };
        absences.push(absence);
        /* this.props.createEntity(absence); */
      });

      const ficheAbsence: IFicheAbsence = {
        dateSeance: entity.dateSeance,
        /* user: entity.user, */
        module: entity.module,
        programme: Programme.LICENCE,
        absences: absences
      };

      this.props.createFicheAbsenceEntity(ficheAbsence);
    }
  };

  handleClose = () => {
    this.props.history.push('/entity/fiche-absence');
  };

  render() {
    const { absenceEntity, users, modules, etudiantsLicences, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="pfumApp.absence.home.createOrEditLabel">Créer une fiche d'absence [Bac+3]</h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : absenceEntity} onSubmit={this.saveEntity}>
                <AvGroup>
                  <Label id="dateSeanceLabel" for="absence-dateSeance">
                    <Translate contentKey="pfumApp.absence.dateSeance">Date Seance</Translate>
                  </Label>
                  <AvInput
                    id="absence-dateSeance"
                    type="date"
                    className="form-control"
                    name="dateSeance"
                    placeholder={'YYYY-MM-DD'}
                    value={isNew ? null : convertDateTimeFromServer(this.props.absenceEntity.dateSeance)}
                    validate={{
                      required: { value: true, errorMessage: translate('entity.validation.required') }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label for="absence-module">
                    <Translate contentKey="pfumApp.absence.module">Module</Translate>
                  </Label>
                  <AvInput
                    id="absence-module"
                    type="select"
                    className="form-control"
                    name="module.id"
                    validate={{
                      required: { value: true, errorMessage: translate('entity.validation.required') }
                    }}
                  >
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
                <Label for="absence-module">Etudiants de Licence</Label>
                <Table responsive id="ListeEtudiantAbsences">
                  <thead>
                    <tr>
                      {/*  <th>
                            <Translate contentKey="global.field.id">ID</Translate>
                          </th> */}
                      <th>
                        <Translate contentKey="pfumApp.etudiantsLicence.nom">Nom</Translate>
                      </th>
                      <th>
                        <Translate contentKey="pfumApp.etudiantsLicence.prenom">Prenom</Translate>
                      </th>

                      <th />
                    </tr>
                  </thead>
                  {etudiantsLicences.map((etudiant, i) => (
                    <tbody>
                      <tr key={`entity-${i}`}>
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
                <div />
                <Button tag={Link} id="cancel-save" to="/entity/fiche-absence" replace color="info">
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
  absenceEntity: storeState.absence.entity,
  loading: storeState.absence.loading,
  updating: storeState.absence.updating,
  updateSuccess: storeState.ficheAbsence.updateSuccess
});

const mapDispatchToProps = {
  getUsers,
  getModules,
  getEtudiantsLicences,
  getEtudiantsMasters,
  getEntity,
  updateEntity,
  createEntity,
  createFicheAbsenceEntity,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AbsenceUpdate);
