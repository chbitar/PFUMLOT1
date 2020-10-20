import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput } from 'availity-reactstrap-validation';
// tslint:disable-next-line:no-unused-variable
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IUser } from 'app/shared/model/user.model';
import { getUsers } from 'app/modules/administration/user-management/user-management.reducer';
import { IModule } from 'app/shared/model/module.model';
import { getEntities as getModules } from 'app/entities/module/module.reducer';
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

export interface IAbsenceUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface IAbsenceUpdateState {
  isNew: boolean;
  userId: string;
  moduleId: string;
  etudiantsLicenceId: string;
  etudiantsMasterId: string;
  etudiantsExecutifId: string;
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
      isNew: !this.props.match.params || !this.props.match.params.id
    };
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

  saveEntity = (event, errors, values) => {
    values.dateSeance = convertDateTimeToServer(values.dateSeance);

    if (errors.length === 0) {
      const { absenceEntity } = this.props;
      const entity = {
        ...absenceEntity,
        ...values
      };

      if (this.state.isNew) {
        this.props.createEntity(entity);
      } else {
        this.props.updateEntity(entity);
      }
    }
  };

  handleClose = () => {
    this.props.history.push('/entity/absence');
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
                  <Label id="absentLabel" check>
                    <AvInput id="absence-absent" type="checkbox" className="form-control" name="absent" />
                    <Translate contentKey="pfumv10App.absence.absent">Absent</Translate>
                  </Label>
                </AvGroup>
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
                  <Label for="absence-user">
                    <Translate contentKey="pfumv10App.absence.user">User</Translate>
                  </Label>
                  <AvInput id="absence-user" type="select" className="form-control" name="user.id">
                    <option value="" key="0" />
                    {users
                      ? users.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.id}
                          </option>
                        ))
                      : null}
                  </AvInput>
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
                            {otherEntity.id}
                          </option>
                        ))
                      : null}
                  </AvInput>
                </AvGroup>
                <AvGroup>
                  <Label for="absence-etudiantsLicence">
                    <Translate contentKey="pfumv10App.absence.etudiantsLicence">Etudiants Licence</Translate>
                  </Label>
                  <AvInput id="absence-etudiantsLicence" type="select" className="form-control" name="etudiantsLicence.id">
                    <option value="" key="0" />
                    {etudiantsLicences
                      ? etudiantsLicences.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.id}
                          </option>
                        ))
                      : null}
                  </AvInput>
                </AvGroup>
                <AvGroup>
                  <Label for="absence-etudiantsMaster">
                    <Translate contentKey="pfumv10App.absence.etudiantsMaster">Etudiants Master</Translate>
                  </Label>
                  <AvInput id="absence-etudiantsMaster" type="select" className="form-control" name="etudiantsMaster.id">
                    <option value="" key="0" />
                    {etudiantsMasters
                      ? etudiantsMasters.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.id}
                          </option>
                        ))
                      : null}
                  </AvInput>
                </AvGroup>
                <AvGroup>
                  <Label for="absence-etudiantsExecutif">
                    <Translate contentKey="pfumv10App.absence.etudiantsExecutif">Etudiants Executif</Translate>
                  </Label>
                  <AvInput id="absence-etudiantsExecutif" type="select" className="form-control" name="etudiantsExecutif.id">
                    <option value="" key="0" />
                    {etudiantsExecutifs
                      ? etudiantsExecutifs.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.id}
                          </option>
                        ))
                      : null}
                  </AvInput>
                </AvGroup>
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
