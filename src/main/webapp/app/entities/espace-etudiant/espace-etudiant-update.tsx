import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
// tslint:disable-next-line:no-unused-variable
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, setFileData, openFile, byteSize, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IUser } from 'app/shared/model/user.model';
import { getUsers } from 'app/modules/administration/user-management/user-management.reducer';
import { IEtudiantsLicence } from 'app/shared/model/etudiants-licence.model';
import { getEntities as getEtudiantsLicences } from 'app/entities/etudiants-licence/etudiants-licence.reducer';
import { IEtudiantsMaster } from 'app/shared/model/etudiants-master.model';
import { getEntities as getEtudiantsMasters } from 'app/entities/etudiants-master/etudiants-master.reducer';
import { IEtudiantsExecutif } from 'app/shared/model/etudiants-executif.model';
import { getEntities as getEtudiantsExecutifs } from 'app/entities/etudiants-executif/etudiants-executif.reducer';
import { ICalendrierModule } from 'app/shared/model/calendrier-module.model';
import { getEntities as getCalendrierModules } from 'app/entities/calendrier-module/calendrier-module.reducer';
import { IAbsence } from 'app/shared/model/absence.model';
import { getEntities as getAbsences } from 'app/entities/absence/absence.reducer';
import { IAnnonce } from 'app/shared/model/annonce.model';
import { getEntities as getAnnonces } from 'app/entities/annonce/annonce.reducer';
import { getEntity, updateEntity, createEntity, setBlob, reset } from './espace-etudiant.reducer';
import { IEspaceEtudiant } from 'app/shared/model/espace-etudiant.model';
// tslint:disable-next-line:no-unused-variable
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IEspaceEtudiantUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface IEspaceEtudiantUpdateState {
  isNew: boolean;
  userId: string;
  etudiantLicenceId: string;
  etudiantMasterId: string;
  etudiantExecutifId: string;
  calendrierId: string;
  absenceId: string;
  annonceId: string;
}

export class EspaceEtudiantUpdate extends React.Component<IEspaceEtudiantUpdateProps, IEspaceEtudiantUpdateState> {
  constructor(props) {
    super(props);
    this.state = {
      userId: '0',
      etudiantLicenceId: '0',
      etudiantMasterId: '0',
      etudiantExecutifId: '0',
      calendrierId: '0',
      absenceId: '0',
      annonceId: '0',
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
    this.props.getEtudiantsLicences();
    this.props.getEtudiantsMasters();
    this.props.getEtudiantsExecutifs();
    this.props.getCalendrierModules();
    this.props.getAbsences();
    this.props.getAnnonces();
  }

  onBlobChange = (isAnImage, name) => event => {
    setFileData(event, (contentType, data) => this.props.setBlob(name, data, contentType), isAnImage);
  };

  clearBlob = name => () => {
    this.props.setBlob(name, undefined, undefined);
  };

  saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const { espaceEtudiantEntity } = this.props;
      const entity = {
        ...espaceEtudiantEntity,
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
    this.props.history.push('/entity/espace-etudiant');
  };

  render() {
    const {
      espaceEtudiantEntity,
      users,
      etudiantsLicences,
      etudiantsMasters,
      etudiantsExecutifs,
      calendrierModules,
      absences,
      annonces,
      loading,
      updating
    } = this.props;
    const { isNew } = this.state;

    const { emploiDuTemps, emploiDuTempsContentType } = espaceEtudiantEntity;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="pfumv10App.espaceEtudiant.home.createOrEditLabel">
              <Translate contentKey="pfumv10App.espaceEtudiant.home.createOrEditLabel">Create or edit a EspaceEtudiant</Translate>
            </h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : espaceEtudiantEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="espace-etudiant-id">
                      <Translate contentKey="global.field.id">ID</Translate>
                    </Label>
                    <AvInput id="espace-etudiant-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <AvGroup>
                    <Label id="emploiDuTempsLabel" for="emploiDuTemps">
                      <Translate contentKey="pfumv10App.espaceEtudiant.emploiDuTemps">Emploi Du Temps</Translate>
                    </Label>
                    <br />
                    {emploiDuTemps ? (
                      <div>
                        <a onClick={openFile(emploiDuTempsContentType, emploiDuTemps)}>
                          <img src={`data:${emploiDuTempsContentType};base64,${emploiDuTemps}`} style={{ maxHeight: '100px' }} />
                        </a>
                        <br />
                        <Row>
                          <Col md="11">
                            <span>
                              {emploiDuTempsContentType}, {byteSize(emploiDuTemps)}
                            </span>
                          </Col>
                          <Col md="1">
                            <Button color="danger" onClick={this.clearBlob('emploiDuTemps')}>
                              <FontAwesomeIcon icon="times-circle" />
                            </Button>
                          </Col>
                        </Row>
                      </div>
                    ) : null}
                    <input id="file_emploiDuTemps" type="file" onChange={this.onBlobChange(true, 'emploiDuTemps')} accept="image/*" />
                    <AvInput type="hidden" name="emploiDuTemps" value={emploiDuTemps} />
                  </AvGroup>
                </AvGroup>
                <AvGroup>
                  <Label for="espace-etudiant-user">
                    <Translate contentKey="pfumv10App.espaceEtudiant.user">User</Translate>
                  </Label>
                  <AvInput id="espace-etudiant-user" type="select" className="form-control" name="user.id">
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
                  <Label for="espace-etudiant-etudiantLicence">
                    <Translate contentKey="pfumv10App.espaceEtudiant.etudiantLicence">Etudiant Licence</Translate>
                  </Label>
                  <AvInput id="espace-etudiant-etudiantLicence" type="select" className="form-control" name="etudiantLicence.id">
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
                  <Label for="espace-etudiant-etudiantMaster">
                    <Translate contentKey="pfumv10App.espaceEtudiant.etudiantMaster">Etudiant Master</Translate>
                  </Label>
                  <AvInput id="espace-etudiant-etudiantMaster" type="select" className="form-control" name="etudiantMaster.id">
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
                  <Label for="espace-etudiant-etudiantExecutif">
                    <Translate contentKey="pfumv10App.espaceEtudiant.etudiantExecutif">Etudiant Executif</Translate>
                  </Label>
                  <AvInput id="espace-etudiant-etudiantExecutif" type="select" className="form-control" name="etudiantExecutif.id">
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
                <AvGroup>
                  <Label for="espace-etudiant-calendrier">
                    <Translate contentKey="pfumv10App.espaceEtudiant.calendrier">Calendrier</Translate>
                  </Label>
                  <AvInput id="espace-etudiant-calendrier" type="select" className="form-control" name="calendrier.id">
                    <option value="" key="0" />
                    {calendrierModules
                      ? calendrierModules.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.id}
                          </option>
                        ))
                      : null}
                  </AvInput>
                </AvGroup>
                <AvGroup>
                  <Label for="espace-etudiant-absence">
                    <Translate contentKey="pfumv10App.espaceEtudiant.absence">Absence</Translate>
                  </Label>
                  <AvInput id="espace-etudiant-absence" type="select" className="form-control" name="absence.id">
                    <option value="" key="0" />
                    {absences
                      ? absences.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.id}
                          </option>
                        ))
                      : null}
                  </AvInput>
                </AvGroup>
                <AvGroup>
                  <Label for="espace-etudiant-annonce">
                    <Translate contentKey="pfumv10App.espaceEtudiant.annonce">Annonce</Translate>
                  </Label>
                  <AvInput id="espace-etudiant-annonce" type="select" className="form-control" name="annonce.id">
                    <option value="" key="0" />
                    {annonces
                      ? annonces.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.id}
                          </option>
                        ))
                      : null}
                  </AvInput>
                </AvGroup>
                <Button tag={Link} id="cancel-save" to="/entity/espace-etudiant" replace color="info">
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
  etudiantsLicences: storeState.etudiantsLicence.entities,
  etudiantsMasters: storeState.etudiantsMaster.entities,
  etudiantsExecutifs: storeState.etudiantsExecutif.entities,
  calendrierModules: storeState.calendrierModule.entities,
  absences: storeState.absence.entities,
  annonces: storeState.annonce.entities,
  espaceEtudiantEntity: storeState.espaceEtudiant.entity,
  loading: storeState.espaceEtudiant.loading,
  updating: storeState.espaceEtudiant.updating,
  updateSuccess: storeState.espaceEtudiant.updateSuccess
});

const mapDispatchToProps = {
  getUsers,
  getEtudiantsLicences,
  getEtudiantsMasters,
  getEtudiantsExecutifs,
  getCalendrierModules,
  getAbsences,
  getAnnonces,
  getEntity,
  updateEntity,
  setBlob,
  createEntity,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EspaceEtudiantUpdate);
