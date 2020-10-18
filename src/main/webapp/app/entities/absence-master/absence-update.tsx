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

export interface IAbsenceUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface IAbsenceUpdateState {
  isNew: boolean;
  userId: string;
  moduleId: string;
  etudiantsMasterId: string;
  etudiantListMaster: any[];
}

export class AbsenceUpdate extends React.Component<IAbsenceUpdateProps, IAbsenceUpdateState> {
  constructor(props) {
    super(props);
    this.state = {
      userId: '0',
      moduleId: '0',
      etudiantListMaster: [],
      etudiantsMasterId: '0',
      isNew: !this.props.match.params || !this.props.match.params.id
    };

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
    this.props.getEtudiantsMasters();
  }

  handleInputChangeMaster(event) {
    const target = event.target;
    const value = target.value;

    if (target.checked) {
      this.state.etudiantListMaster[value] = value;
    } else {
      this.state.etudiantListMaster.splice(value, 1);
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
    }
  };

  handleClose = () => {
    this.props.history.push('/entity/absence-master');
  };

  render() {
    const { absenceEntity, users, modules, etudiantsMasters, loading, updating } = this.props;
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
                <Label for="absence-module">Etudiants de Master </Label>
                <Table responsive>
                  <thead>
                    <tr>
                      {/*       <th>
                            <Translate contentKey="global.field.id">ID</Translate>
                          </th> */}
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
                        {/*                             <td>{etudiant.id}</td>
                         */}{' '}
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
                <Button tag={Link} id="cancel-save" to="/entity/absence-master" replace color="info">
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
  etudiantsMasters: storeState.etudiantsMaster.entities,
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
