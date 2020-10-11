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
import { getEntity, updateEntity, createEntity, setBlob, reset } from './etudiants-licence.reducer';
import { IEtudiantsLicence } from 'app/shared/model/etudiants-licence.model';
// tslint:disable-next-line:no-unused-variable
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IEtudiantsLicenceUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface IEtudiantsLicenceUpdateState {
  isNew: boolean;
  userId: string;
  filiereId: string;
  anneeInscriptionId: string;
  modaliteId: string;
}

export class EtudiantsLicenceUpdate extends React.Component<IEtudiantsLicenceUpdateProps, IEtudiantsLicenceUpdateState> {
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
      const { etudiantsLicenceEntity } = this.props;
      const entity = {
        ...etudiantsLicenceEntity,
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
    this.props.history.push('/entity/etudiants-licence');
  };

  render() {
    const { etudiantsLicenceEntity, users, filieres, anneeInscriptions, modalitePaiements, loading, updating } = this.props;
    const { isNew } = this.state;

    const {
      photo,
      photoContentType,
      extraitActeNaissance,
      extraitActeNaissanceContentType,
      bacalaureat,
      bacalaureatContentType,
      cinPassport,
      cinPassportContentType
    } = etudiantsLicenceEntity;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="auto">
            <span className="badge badge-pill badge-info">Nouvelle inscription</span>
          </Col>
        </Row>
        <Row>
          <Row>
            <Col>
              <Row>
                {loading ? (
                  <p>Loading...</p>
                ) : (
                  <AvForm model={isNew ? {} : etudiantsLicenceEntity} onSubmit={this.saveEntity}>
                    <div className="card border-primary">
                      <div className="card-header">Informations personnelles</div>
                      <div className="card-body">
                        <Row>
                          <Row>
                            <Col sm="6">
                              <AvGroup>
                                <AvGroup>
                                  <Label id="photoLabel" for="photo">
                                    <Translate contentKey="pfumv10App.etudiantsLicence.photo">Photo</Translate>
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
                                  <Label for="etudiants-licence-id">
                                    <Translate contentKey="global.field.id">ID</Translate>
                                  </Label>
                                  <AvInput id="etudiants-licence-id" type="text" className="form-control" name="id" required readOnly />
                                </AvGroup>
                              ) : null}
                              <AvGroup>
                                <Label id="nomLabel" for="etudiants-licence-nom">
                                  <Translate contentKey="pfumv10App.etudiantsLicence.nom">Nom</Translate>
                                </Label>
                                <AvField
                                  id="etudiants-licence-nom"
                                  type="text"
                                  name="nom"
                                  validate={{
                                    required: { value: true, errorMessage: translate('entity.validation.required') }
                                  }}
                                />
                              </AvGroup>
                              <AvGroup>
                                <Label id="prenomLabel" for="etudiants-licence-prenom">
                                  <Translate contentKey="pfumv10App.etudiantsLicence.prenom">Prenom</Translate>
                                </Label>
                                <AvField
                                  id="etudiants-licence-prenom"
                                  type="text"
                                  name="prenom"
                                  validate={{
                                    required: { value: true, errorMessage: translate('entity.validation.required') }
                                  }}
                                />
                              </AvGroup>
                              <AvGroup>
                                <Label id="dateNaissanceLabel" for="etudiants-licence-dateNaissance">
                                  <Translate contentKey="pfumv10App.etudiantsLicence.dateNaissance">Date Naissance</Translate>
                                </Label>
                                <AvInput
                                  id="etudiants-licence-dateNaissance"
                                  type="datetime-local"
                                  className="form-control"
                                  name="dateNaissance"
                                  placeholder={'YYYY-MM-DD HH:mm'}
                                  value={isNew ? null : convertDateTimeFromServer(this.props.etudiantsLicenceEntity.dateNaissance)}
                                  validate={{
                                    required: { value: true, errorMessage: translate('entity.validation.required') }
                                  }}
                                />
                              </AvGroup>
                              <AvGroup>
                                <Label id="adresseContactLabel" for="etudiants-licence-adresseContact">
                                  <Translate contentKey="pfumv10App.etudiantsLicence.adresseContact">Adresse Contact</Translate>
                                </Label>
                                <AvField
                                  id="etudiants-licence-adresseContact"
                                  type="text"
                                  name="adresseContact"
                                  validate={{
                                    required: { value: true, errorMessage: translate('entity.validation.required') }
                                  }}
                                />
                              </AvGroup>
                              <AvGroup>
                                <Label id="villeLabel" for="etudiants-licence-ville">
                                  <Translate contentKey="pfumv10App.etudiantsLicence.ville">Ville</Translate>
                                </Label>
                                <AvField id="etudiants-licence-ville" type="text" name="ville" />
                              </AvGroup>
                            </Col>
                            <Col md="6">
                              <AvGroup>
                                <Label id="emailLabel" for="etudiants-licence-email">
                                  <Translate contentKey="pfumv10App.etudiantsLicence.email">Email</Translate>
                                </Label>
                                <AvField
                                  id="etudiants-licence-email"
                                  type="text"
                                  name="email"
                                  validate={{
                                    required: { value: true, errorMessage: translate('entity.validation.required') }
                                  }}
                                />
                              </AvGroup>
                              <AvGroup>
                                <Label id="cinPassLabel" for="etudiants-licence-cinPass">
                                  <Translate contentKey="pfumv10App.etudiantsLicence.cinPass">Cin Pass</Translate>
                                </Label>
                                <AvField
                                  id="etudiants-licence-cinPass"
                                  type="text"
                                  name="cinPass"
                                  validate={{
                                    required: { value: true, errorMessage: translate('entity.validation.required') }
                                  }}
                                />
                              </AvGroup>
                              <AvGroup>
                                <Label id="paysNationaliteLabel" for="etudiants-licence-paysNationalite">
                                  <Translate contentKey="pfumv10App.etudiantsLicence.paysNationalite">Pays Nationalite</Translate>
                                </Label>
                                <AvField id="etudiants-licence-paysNationalite" type="text" name="paysNationalite" />
                              </AvGroup>
                              <AvGroup>
                                <Label id="paysResidenceLabel" for="etudiants-licence-paysResidence">
                                  <Translate contentKey="pfumv10App.etudiantsLicence.paysResidence">Pays Residence</Translate>
                                </Label>
                                <AvField id="etudiants-licence-paysResidence" type="text" name="paysResidence" />
                              </AvGroup>
                              <AvGroup>
                                <Label id="codepostalLabel" for="etudiants-licence-codepostal">
                                  <Translate contentKey="pfumv10App.etudiantsLicence.codepostal">Codepostal</Translate>
                                </Label>
                                <AvField id="etudiants-licence-codepostal" type="text" name="codepostal" />
                              </AvGroup>
                              <AvGroup>
                                <Label id="provinceLabel" for="etudiants-licence-province">
                                  <Translate contentKey="pfumv10App.etudiantsLicence.province">Province</Translate>
                                </Label>
                                <AvField id="etudiants-licence-province" type="text" name="province" />
                              </AvGroup>
                              <AvGroup>
                                <Label id="telLabel" for="etudiants-licence-tel">
                                  <Translate contentKey="pfumv10App.etudiantsLicence.tel">Tel</Translate>
                                </Label>
                                <AvField id="etudiants-licence-tel" type="string" className="form-control" name="tel" />
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
                                <Label id="pjBacLabel" for="etudiants-licence-pjBac">
                                  Type Bac
                                </Label>
                                <AvInput
                                  id="etudiants-licence-pjBac"
                                  type="select"
                                  className="form-control"
                                  name="pjBac"
                                  value={(!isNew && etudiantsLicenceEntity.pjBac) || 'Sciences_De_La_Vie_Et_De_La_Terre'}
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
                                <Label id="mentionLabel" for="etudiants-licence-mention">
                                  <Translate contentKey="pfumv10App.etudiantsLicence.mention">Mention</Translate>
                                </Label>
                                <AvInput
                                  id="etudiants-licence-mention"
                                  type="select"
                                  className="form-control"
                                  name="mention"
                                  value={(!isNew && etudiantsLicenceEntity.mention) || 'Passable'}
                                >
                                  <option value="Passable">{translate('pfumv10App.Mention.Passable')}</option>
                                  <option value="Assez_bien">{translate('pfumv10App.Mention.Assez_bien')}</option>
                                  <option value="Bien">{translate('pfumv10App.Mention.Bien')}</option>
                                  <option value="Tres_bien">{translate('pfumv10App.Mention.Tres_bien')}</option>
                                </AvInput>
                              </AvGroup>
                              <AvGroup>
                                <Label for="etudiants-licence-filiere">
                                  <Translate contentKey="pfumv10App.etudiantsLicence.filiere">Filiere</Translate>
                                </Label>
                                <AvInput id="etudiants-licence-filiere" type="select" className="form-control" name="filiere.id">
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
                                <Label for="etudiants-licence-anneeInscription">
                                  <Translate contentKey="pfumv10App.etudiantsLicence.anneeInscription">Annee Inscription</Translate>
                                </Label>
                                <AvInput
                                  id="etudiants-licence-anneeInscription"
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
                        <Col md="6">
                          <div className="card border-primary">
                            <div className="card-header">Pièces jointes</div>
                            <div className="card-body">
                              <AvGroup>
                                <AvGroup>
                                  <Label id="extraitActeNaissanceLabel" for="extraitActeNaissance">
                                    <Translate contentKey="pfumv10App.etudiantsLicence.extraitActeNaissance">
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
                                    <Translate contentKey="pfumv10App.etudiantsLicence.bacalaureat">Bacalaureat</Translate>
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
                                    <Translate contentKey="pfumv10App.etudiantsLicence.cinPassport">Cin Passport</Translate>
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
                                <Label for="etudiants-licence-modalite">
                                  <Translate contentKey="pfumv10App.etudiantsLicence.modalite">Modalite</Translate>
                                </Label>
                                <AvInput id="etudiants-licence-modalite" type="select" className="form-control" name="modalite.id">
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
                        <Button tag={Link} id="cancel-save" to="/entity/etudiants-licence" replace color="info">
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
  etudiantsLicenceEntity: storeState.etudiantsLicence.entity,
  loading: storeState.etudiantsLicence.loading,
  updating: storeState.etudiantsLicence.updating,
  updateSuccess: storeState.etudiantsLicence.updateSuccess
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
)(EtudiantsLicenceUpdate);
