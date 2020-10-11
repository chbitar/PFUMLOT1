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
import { IFiliere } from 'app/shared/model/filiere.model';
import { getEntities as getFilieres } from 'app/entities/filiere/filiere.reducer';
import { IAnneeInscription } from 'app/shared/model/annee-inscription.model';
import { getEntities as getAnneeInscriptions } from 'app/entities/annee-inscription/annee-inscription.reducer';
import { IModalitePaiement } from 'app/shared/model/modalite-paiement.model';
import { getEntities as getModalitePaiements } from 'app/entities/modalite-paiement/modalite-paiement.reducer';
import { getEntity, updateEntity, createEntity, setBlob, reset } from './etudiants-master.reducer';
import { IEtudiantsMaster } from 'app/shared/model/etudiants-master.model';
// tslint:disable-next-line:no-unused-variable
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IEtudiantsMasterUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface IEtudiantsMasterUpdateState {
  isNew: boolean;
  userId: string;
  filiereId: string;
  anneeInscriptionId: string;
  modaliteId: string;
}

export class EtudiantsMasterUpdate extends React.Component<IEtudiantsMasterUpdateProps, IEtudiantsMasterUpdateState> {
  constructor(props) {
    super(props);
    this.state = {
      userId: '0',
      filiereId: '0',
      anneeInscriptionId: '0',
      modaliteId: '0',
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
    this.props.getFilieres();
    this.props.getAnneeInscriptions();
    this.props.getModalitePaiements();
  }

  onBlobChange = (isAnImage, name) => event => {
    setFileData(event, (contentType, data) => this.props.setBlob(name, data, contentType), isAnImage);
  };

  clearBlob = name => () => {
    this.props.setBlob(name, undefined, undefined);
  };

  saveEntity = (event, errors, values) => {
    values.dateNaissance = convertDateTimeToServer(values.dateNaissance);

    if (errors.length === 0) {
      const { etudiantsMasterEntity } = this.props;
      const entity = {
        ...etudiantsMasterEntity,
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
    this.props.history.push('/entity/etudiants-master');
  };

  render() {
    const { etudiantsMasterEntity, users, filieres, anneeInscriptions, modalitePaiements, loading, updating } = this.props;
    const { isNew } = this.state;

    const {
      photo,
      photoContentType,
      extraitActeNaissance,
      extraitActeNaissanceContentType,
      bacalaureat,
      bacalaureatContentType,
      cinPassport,
      cinPassportContentType,
      diplome,
      diplomeContentType
    } = etudiantsMasterEntity;

    return (
      <div>
        <Row>
          <Col md="8">
            <Col md="auto">
              <span className="badge badge-pill badge-info">Nouvelle inscription</span>
            </Col>
          </Col>
        </Row>
        <Row>
          <Row>
            <Col>
              <Row>
                {loading ? (
                  <p>Loading...</p>
                ) : (
                  <AvForm model={isNew ? {} : etudiantsMasterEntity} onSubmit={this.saveEntity}>
                    <div className="card border-primary">
                      <div className="card-header">Informations personnelles</div>
                      <div className="card-body">
                        <Row>
                          <Row>
                            <Col sm="6">
                              <AvGroup>
                                <AvGroup>
                                  <Label id="photoLabel" for="photo">
                                    <Translate contentKey="pfumv10App.etudiantsMaster.photo">Photo</Translate>
                                  </Label>
                                  <br />
                                  {photo ? (
                                    <div>
                                      <a onClick={openFile(photoContentType, photo)}>
                                        <img src={`data:${photoContentType};base64,${photo}`} style={{ maxHeight: '100px' }} />
                                      </a>
                                      <br />
                                      <Row>
                                        <Col md="1">
                                          <Button color="danger" onClick={this.clearBlob('photo')}>
                                            <FontAwesomeIcon icon="times-circle" />
                                          </Button>
                                        </Col>
                                      </Row>
                                    </div>
                                  ) : null}
                                  <input id="file_photo" type="file" onChange={this.onBlobChange(true, 'photo')} accept="image/*" />
                                  <AvInput type="hidden" name="photo" value={photo} />
                                </AvGroup>
                              </AvGroup>
                            </Col>
                          </Row>
                          <Row>
                            <Col md="6">
                              {!isNew ? (
                                <AvGroup>
                                  <Label for="etudiants-master-id">
                                    <Translate contentKey="global.field.id">ID</Translate>
                                  </Label>
                                  <AvInput id="etudiants-master-id" type="text" className="form-control" name="id" required readOnly />
                                </AvGroup>
                              ) : null}
                              <AvGroup>
                                <Label id="nomLabel" for="etudiants-master-nom">
                                  <Translate contentKey="pfumv10App.etudiantsMaster.nom">Nom</Translate>
                                </Label>
                                <AvField
                                  id="etudiants-master-nom"
                                  type="text"
                                  name="nom"
                                  validate={{
                                    required: { value: true, errorMessage: translate('entity.validation.required') }
                                  }}
                                />
                              </AvGroup>
                              <AvGroup>
                                <Label id="prenomLabel" for="etudiants-master-prenom">
                                  <Translate contentKey="pfumv10App.etudiantsMaster.prenom">Prenom</Translate>
                                </Label>
                                <AvField
                                  id="etudiants-master-prenom"
                                  type="text"
                                  name="prenom"
                                  validate={{
                                    required: { value: true, errorMessage: translate('entity.validation.required') }
                                  }}
                                />
                              </AvGroup>
                              <AvGroup>
                                <Label id="dateNaissanceLabel" for="etudiants-master-dateNaissance">
                                  <Translate contentKey="pfumv10App.etudiantsMaster.dateNaissance">Date Naissance</Translate>
                                </Label>
                                <AvInput
                                  id="etudiants-master-dateNaissance"
                                  type="datetime-local"
                                  className="form-control"
                                  name="dateNaissance"
                                  placeholder={'YYYY-MM-DD HH:mm'}
                                  value={isNew ? null : convertDateTimeFromServer(this.props.etudiantsMasterEntity.dateNaissance)}
                                  validate={{
                                    required: { value: true, errorMessage: translate('entity.validation.required') }
                                  }}
                                />
                              </AvGroup>
                              <AvGroup>
                                <Label id="adresseContactLabel" for="etudiants-master-adresseContact">
                                  <Translate contentKey="pfumv10App.etudiantsMaster.adresseContact">Adresse Contact</Translate>
                                </Label>
                                <AvField
                                  id="etudiants-master-adresseContact"
                                  type="text"
                                  name="adresseContact"
                                  validate={{
                                    required: { value: true, errorMessage: translate('entity.validation.required') }
                                  }}
                                />
                              </AvGroup>
                              <AvGroup>
                                <Label id="villeLabel" for="etudiants-master-ville">
                                  <Translate contentKey="pfumv10App.etudiantsMaster.ville">Ville</Translate>
                                </Label>
                                <AvField id="etudiants-master-ville" type="text" name="ville" />
                              </AvGroup>
                              <AvGroup>
                                <Label id="emailLabel" for="etudiants-master-email">
                                  <Translate contentKey="pfumv10App.etudiantsMaster.email">Email</Translate>
                                </Label>
                                <AvField
                                  id="etudiants-master-email"
                                  type="text"
                                  name="email"
                                  validate={{
                                    required: { value: true, errorMessage: translate('entity.validation.required') }
                                  }}
                                />
                              </AvGroup>
                            </Col>
                            <Col md="6">
                              <AvGroup>
                                <Label id="cinPassLabel" for="etudiants-master-cinPass">
                                  <Translate contentKey="pfumv10App.etudiantsMaster.cinPass">Cin Pass</Translate>
                                </Label>
                                <AvField
                                  id="etudiants-master-cinPass"
                                  type="text"
                                  name="cinPass"
                                  validate={{
                                    required: { value: true, errorMessage: translate('entity.validation.required') }
                                  }}
                                />
                              </AvGroup>
                              <AvGroup>
                                <Label id="paysNationaliteLabel" for="etudiants-master-paysNationalite">
                                  <Translate contentKey="pfumv10App.etudiantsMaster.paysNationalite">Pays Nationalite</Translate>
                                </Label>
                                <AvField id="etudiants-master-paysNationalite" type="text" name="paysNationalite" />
                              </AvGroup>
                              <AvGroup>
                                <Label id="paysResidenceLabel" for="etudiants-master-paysResidence">
                                  <Translate contentKey="pfumv10App.etudiantsMaster.paysResidence">Pays Residence</Translate>
                                </Label>
                                <AvField id="etudiants-master-paysResidence" type="text" name="paysResidence" />
                              </AvGroup>
                              <AvGroup>
                                <Label id="codepostalLabel" for="etudiants-master-codepostal">
                                  <Translate contentKey="pfumv10App.etudiantsMaster.codepostal">Codepostal</Translate>
                                </Label>
                                <AvField id="etudiants-master-codepostal" type="text" name="codepostal" />
                              </AvGroup>
                              <AvGroup>
                                <Label id="provinceLabel" for="etudiants-master-province">
                                  <Translate contentKey="pfumv10App.etudiantsMaster.province">Province</Translate>
                                </Label>
                                <AvField id="etudiants-master-province" type="text" name="province" />
                              </AvGroup>
                              <AvGroup>
                                <Label id="telLabel" for="etudiants-master-tel">
                                  <Translate contentKey="pfumv10App.etudiantsMaster.tel">Tel</Translate>
                                </Label>
                                <AvField id="etudiants-master-tel" type="string" className="form-control" name="tel" />
                              </AvGroup>
                            </Col>
                          </Row>
                        </Row>
                      </div>
                    </div>
                    <div>
                      <Row>
                        <Col>
                          <div className="card border-primary">
                            <div className="card-header">Filiére</div>
                            <div className="card-body">
                              <AvGroup>
                                <Label id="typeBacLabel" for="etudiants-master-typeBac">
                                  <Translate contentKey="pfumv10App.etudiantsMaster.typeBac">Type Bac</Translate>
                                </Label>
                                <AvInput
                                  id="etudiants-master-typeBac"
                                  type="select"
                                  className="form-control"
                                  name="typeBac"
                                  value={(!isNew && etudiantsMasterEntity.typeBac) || 'Sciences_De_La_Vie_Et_De_La_Terre'}
                                >
                                  <option value="Sciences_De_La_Vie_Et_De_La_Terre">
                                    {translate('pfumv10App.DiplomeBac.Sciences_De_La_Vie_Et_De_La_Terre')}
                                  </option>
                                  <option value="Sciences_Physiques_Et_Chimiques">
                                    {translate('pfumv10App.DiplomeBac.Sciences_Physiques_Et_Chimiques')}
                                  </option>
                                  <option value="Sciences_Economiques">{translate('pfumv10App.DiplomeBac.Sciences_Economiques')}</option>
                                  <option value="Techniques_De_Gestion_Et_Comptabilite">
                                    {translate('pfumv10App.DiplomeBac.Techniques_De_Gestion_Et_Comptabilite')}
                                  </option>
                                </AvInput>
                              </AvGroup>
                              <AvGroup>
                                <Label id="mentionLabel" for="etudiants-master-mention">
                                  <Translate contentKey="pfumv10App.etudiantsMaster.mention">Mention</Translate>
                                </Label>
                                <AvInput
                                  id="etudiants-master-mention"
                                  type="select"
                                  className="form-control"
                                  name="mention"
                                  value={(!isNew && etudiantsMasterEntity.mention) || 'Passable'}
                                >
                                  <option value="Passable">{translate('pfumv10App.Mention.Passable')}</option>
                                  <option value="Assez_bien">{translate('pfumv10App.Mention.Assez_bien')}</option>
                                  <option value="Bien">{translate('pfumv10App.Mention.Bien')}</option>
                                  <option value="Tres_bien">{translate('pfumv10App.Mention.Tres_bien')}</option>
                                </AvInput>
                              </AvGroup>
                              <AvGroup>
                                <Label for="etudiants-master-filiere">
                                  <Translate contentKey="pfumv10App.etudiantsMaster.filiere">Filiere</Translate>
                                </Label>
                                <AvInput id="etudiants-master-filiere" type="select" className="form-control" name="filiere.id">
                                  <option value="" key="0" />
                                  {filieres
                                    ? filieres.map(otherEntity => (
                                        <option value={otherEntity.id} key={otherEntity.id}>
                                          {otherEntity.nomfiliere}
                                        </option>
                                      ))
                                    : null}
                                </AvInput>
                              </AvGroup>
                              <AvGroup>
                                <Label for="etudiants-master-anneeInscription">
                                  <Translate contentKey="pfumv10App.etudiantsMaster.anneeInscription">Annee Inscription</Translate>
                                </Label>
                                <AvInput
                                  id="etudiants-master-anneeInscription"
                                  type="select"
                                  className="form-control"
                                  name="anneeInscription.id"
                                >
                                  <option value="" key="0" />
                                  {anneeInscriptions
                                    ? anneeInscriptions.map(otherEntity => (
                                        <option value={otherEntity.id} key={otherEntity.id}>
                                          {otherEntity.annee}
                                        </option>
                                      ))
                                    : null}
                                </AvInput>
                              </AvGroup>
                            </div>
                          </div>
                        </Col>
                      </Row>
                    </div>
                    <div>
                      <Row>
                        <Col>
                          <div className="card border-primary">
                            <div className="card-header">Pièces jointes</div>
                            <div className="card-body">
                              <AvGroup>
                                <AvGroup>
                                  <Label id="extraitActeNaissanceLabel" for="extraitActeNaissance">
                                    <Translate contentKey="pfumv10App.etudiantsMaster.extraitActeNaissance">
                                      Extrait Acte Naissance
                                    </Translate>
                                  </Label>
                                  <br />
                                  {extraitActeNaissance ? (
                                    <div>
                                      <a onClick={openFile(extraitActeNaissanceContentType, extraitActeNaissance)}>
                                        <img
                                          src={`data:${extraitActeNaissanceContentType};base64,${extraitActeNaissance}`}
                                          style={{ maxHeight: '100px' }}
                                        />
                                      </a>
                                      <br />
                                      <Row>
                                        <Col md="11">
                                          <span>
                                            {extraitActeNaissanceContentType}, {byteSize(extraitActeNaissance)}
                                          </span>
                                        </Col>
                                        <Col md="1">
                                          <Button color="danger" onClick={this.clearBlob('extraitActeNaissance')}>
                                            <FontAwesomeIcon icon="times-circle" />
                                          </Button>
                                        </Col>
                                      </Row>
                                    </div>
                                  ) : null}
                                  <input
                                    id="file_extraitActeNaissance"
                                    type="file"
                                    onChange={this.onBlobChange(true, 'extraitActeNaissance')}
                                    accept="image/*"
                                  />
                                  <AvInput type="hidden" name="extraitActeNaissance" value={extraitActeNaissance} />
                                </AvGroup>
                              </AvGroup>
                              <AvGroup>
                                <AvGroup>
                                  <Label id="bacalaureatLabel" for="bacalaureat">
                                    <Translate contentKey="pfumv10App.etudiantsMaster.bacalaureat">Bacalaureat</Translate>
                                  </Label>
                                  <br />
                                  {bacalaureat ? (
                                    <div>
                                      <a onClick={openFile(bacalaureatContentType, bacalaureat)}>
                                        <img src={`data:${bacalaureatContentType};base64,${bacalaureat}`} style={{ maxHeight: '100px' }} />
                                      </a>
                                      <br />
                                      <Row>
                                        <Col md="11">
                                          <span>
                                            {bacalaureatContentType}, {byteSize(bacalaureat)}
                                          </span>
                                        </Col>
                                        <Col md="1">
                                          <Button color="danger" onClick={this.clearBlob('bacalaureat')}>
                                            <FontAwesomeIcon icon="times-circle" />
                                          </Button>
                                        </Col>
                                      </Row>
                                    </div>
                                  ) : null}
                                  <input
                                    id="file_bacalaureat"
                                    type="file"
                                    onChange={this.onBlobChange(true, 'bacalaureat')}
                                    accept="image/*"
                                  />
                                  <AvInput type="hidden" name="bacalaureat" value={bacalaureat} />
                                </AvGroup>
                              </AvGroup>
                              <AvGroup>
                                <AvGroup>
                                  <Label id="cinPassportLabel" for="cinPassport">
                                    <Translate contentKey="pfumv10App.etudiantsMaster.cinPassport">Cin Passport</Translate>
                                  </Label>
                                  <br />
                                  {cinPassport ? (
                                    <div>
                                      <a onClick={openFile(cinPassportContentType, cinPassport)}>
                                        <img src={`data:${cinPassportContentType};base64,${cinPassport}`} style={{ maxHeight: '100px' }} />
                                      </a>
                                      <br />
                                      <Row>
                                        <Col md="11">
                                          <span>
                                            {cinPassportContentType}, {byteSize(cinPassport)}
                                          </span>
                                        </Col>
                                        <Col md="1">
                                          <Button color="danger" onClick={this.clearBlob('cinPassport')}>
                                            <FontAwesomeIcon icon="times-circle" />
                                          </Button>
                                        </Col>
                                      </Row>
                                    </div>
                                  ) : null}
                                  <input
                                    id="file_cinPassport"
                                    type="file"
                                    onChange={this.onBlobChange(true, 'cinPassport')}
                                    accept="image/*"
                                  />
                                  <AvInput type="hidden" name="cinPassport" value={cinPassport} />
                                </AvGroup>
                              </AvGroup>
                              <AvGroup>
                                <AvGroup>
                                  <Label id="diplomeLabel" for="diplome">
                                    <Translate contentKey="pfumv10App.etudiantsMaster.diplome">Diplome</Translate>
                                  </Label>
                                  <br />
                                  {diplome ? (
                                    <div>
                                      <a onClick={openFile(diplomeContentType, diplome)}>
                                        <img src={`data:${diplomeContentType};base64,${diplome}`} style={{ maxHeight: '100px' }} />
                                      </a>
                                      <br />
                                      <Row>
                                        <Col md="11">
                                          <span>
                                            {diplomeContentType}, {byteSize(diplome)}
                                          </span>
                                        </Col>
                                        <Col md="1">
                                          <Button color="danger" onClick={this.clearBlob('diplome')}>
                                            <FontAwesomeIcon icon="times-circle" />
                                          </Button>
                                        </Col>
                                      </Row>
                                    </div>
                                  ) : null}
                                  <input id="file_diplome" type="file" onChange={this.onBlobChange(true, 'diplome')} accept="image/*" />
                                  <AvInput type="hidden" name="diplome" value={diplome} />
                                </AvGroup>
                              </AvGroup>
                            </div>
                          </div>
                        </Col>
                      </Row>
                    </div>

                    <div>
                      <Row>
                        <Col>
                          <div className="card border-primary">
                            <div className="card-header">Modalité paiement</div>
                            <div className="card-body">
                              <AvGroup>
                                <Label for="etudiants-master-modalite">
                                  <Translate contentKey="pfumv10App.etudiantsMaster.modalite">Modalite</Translate>
                                </Label>
                                <AvInput id="etudiants-master-modalite" type="select" className="form-control" name="modalite.id">
                                  <option value="" key="0" />
                                  {modalitePaiements
                                    ? modalitePaiements.map(otherEntity => (
                                        <option value={otherEntity.id} key={otherEntity.id}>
                                          {otherEntity.modalite}
                                        </option>
                                      ))
                                    : null}
                                </AvInput>
                              </AvGroup>
                            </div>
                          </div>
                        </Col>
                      </Row>
                    </div>
                    <Row>
                      <Col>
                        <Button tag={Link} id="cancel-save" to="/entity/etudiants-master" replace color="info">
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
                      </Col>
                    </Row>
                  </AvForm>
                )}
              </Row>
            </Col>
          </Row>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = (storeState: IRootState) => ({
  users: storeState.userManagement.users,
  filieres: storeState.filiere.entities,
  anneeInscriptions: storeState.anneeInscription.entities,
  modalitePaiements: storeState.modalitePaiement.entities,
  etudiantsMasterEntity: storeState.etudiantsMaster.entity,
  loading: storeState.etudiantsMaster.loading,
  updating: storeState.etudiantsMaster.updating,
  updateSuccess: storeState.etudiantsMaster.updateSuccess
});

const mapDispatchToProps = {
  getUsers,
  getFilieres,
  getAnneeInscriptions,
  getModalitePaiements,
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
)(EtudiantsMasterUpdate);
