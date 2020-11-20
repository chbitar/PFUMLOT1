import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
// tslint:disable-next-line:no-unused-variable
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, setFileData, openFile, byteSize, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';
import { getEntities as getPays } from 'app/entities/pays/pays.reducer';
import { IUser } from 'app/shared/model/user.model';
import { getUsers } from 'app/modules/administration/user-management/user-management.reducer';
import { IFiliere } from 'app/shared/model/filiere.model';
import { getEntities as getFilieres } from 'app/entities/filiere/filiere.reducer';
import { IAnneeInscription } from 'app/shared/model/annee-inscription.model';
import { getEntities as getAnneeInscriptions } from 'app/entities/annee-inscription/annee-inscription.reducer';
import { IModalitePaiement } from 'app/shared/model/modalite-paiement.model';
import { getEntities as getModalitePaiements } from 'app/entities/modalite-paiement/modalite-paiement.reducer';
import { getEntity, updateEntity, createEntity, setBlob, reset, createExtendedEntity } from './etudiants-executif.reducer';
import { IEtudiantsExecutif } from 'app/shared/model/etudiants-executif.model';
// tslint:disable-next-line:no-unused-variable
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';
import Filiere from '../filiere/filiere';
import Professeur from '../professeur/professeur';
import { Etablissement } from '../etablissement/etablissement';

export interface IetudiantsExecutifUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface IetudiantsExecutifUpdateState {
  isNew: boolean;
  userId: string;
  filiereId: string;
  anneeInscriptionId: string;
  modaliteId: string;
}

export class etudiantsExecutifUpdate extends React.Component<IetudiantsExecutifUpdateProps, IetudiantsExecutifUpdateState> {
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
    this.props.getPays();
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
      const { etudiantsExecutifEntity } = this.props;
      const entity = {
        ...etudiantsExecutifEntity,
        ...values
      };

      if (this.state.isNew) {
        this.props.createExtendedEntity(entity);
      } else {
        this.props.updateEntity(entity);
      }
    }
  };

  handleClose = () => {
    this.props.history.push('/entity/etudiants-licence');
  };

  render() {
    const { etudiantsExecutifEntity, users, filieres, anneeInscriptions, modalitePaiements, loading, updating, pays } = this.props;
    const { isNew } = this.state;

    const {
      photo,
      photoContentType,
      cv,
      cvContentType,
      autreDocument,
      autreDocumentContentType,
      attestationDeTravail,
      attestationDeTravailContentType,
      bacalaureat,
      bacalaureatContentType,
      cinPassport,
      cinPassportContentType,
      diplome,
      diplomeContentType
    } = etudiantsExecutifEntity;

    return (
      <div>
        <br />
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
                  <AvForm model={isNew ? {} : etudiantsExecutifEntity} onSubmit={this.saveEntity}>
                    <div className="card border-primary">
                      <div className="card-header">Informations personnelles</div>
                      <div className="card-body">
                        <Row style={{ marginLeft: '-80px' }}>
                          <Col dm="4">
                            <AvGroup>
                              <AvGroup>
                                <b>Photo</b>
                                {photo ? (
                                  <div>
                                    <a onClick={openFile(photoContentType, photo)}>
                                      <img
                                        src={`data:${photoContentType};base64,${photo}`}
                                        style={{ maxHeight: '100px', maxWidth: '100px' }}
                                      />
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
                                <AvInput
                                  type="hidden"
                                  name="photo"
                                  value={photo}
                                  validate={{
                                    required: { value: true, errorMessage: translate('entity.validation.required') }
                                  }}
                                />
                              </AvGroup>
                            </AvGroup>
                            <br />
                          </Col>
                        </Row>
                        <Row>
                          <Col md="3">
                            <AvGroup>
                              <Label id="nomLabel" for="etudiants-licence-nom">
                                <Translate contentKey="pfumApp.etudiantsExecutif.nom">Nom</Translate>
                              </Label>
                              <AvField
                                style={{ maxHeight: '100px', maxWidth: '200px' }}
                                id="etudiants-licence-nom"
                                type="text"
                                name="nom"
                                validate={{
                                  required: { value: true, errorMessage: translate('entity.validation.required') }
                                }}
                              />
                            </AvGroup>
                          </Col>{' '}
                          <Col md="3">
                            <AvGroup>
                              <Label id="prenomLabel" for="etudiants-licence-prenom">
                                Prénom
                              </Label>
                              <AvField
                                style={{ maxHeight: '100px', maxWidth: '200px' }}
                                id="etudiants-licence-prenom"
                                type="text"
                                name="prenom"
                                validate={{
                                  required: { value: true, errorMessage: translate('entity.validation.required') }
                                }}
                              />
                            </AvGroup>
                          </Col>
                          <Col md="3">
                            <AvGroup>
                              <Label id="cinPassLabel" for="etudiants-licence-cinPass">
                                <Translate contentKey="pfumApp.etudiantsExecutif.cinPass">Cin Pass</Translate>
                              </Label>
                              <AvField
                                style={{ maxHeight: '100px', maxWidth: '130px' }}
                                id="etudiants-licence-cinPass"
                                type="text"
                                name="cinPass"
                                validate={{
                                  required: { value: true, errorMessage: translate('entity.validation.required') }
                                }}
                              />
                            </AvGroup>
                          </Col>
                          <Col md="3">
                            <AvGroup>
                              <Label id="dateNaissanceLabel" for="etudiants-licence-dateNaissance">
                                D.Naissance{' '}
                              </Label>
                              <AvInput
                                id="etudiants-licence-dateNaissance"
                                type="date"
                                className="form-control"
                                name="dateNaissance"
                                placeholder={'YYYY-MM-DD'}
                                value={isNew ? null : convertDateTimeFromServer(this.props.etudiantsExecutifEntity.dateNaissance)}
                                validate={{
                                  required: { value: true, errorMessage: translate('entity.validation.required') }
                                }}
                              />
                            </AvGroup>
                          </Col>
                        </Row>
                        <Row>
                          <Col>
                            <AvGroup>
                              <Label id="adresseContactLabel" for="etudiants-licence-adresseContact">
                                <Translate contentKey="pfumApp.etudiantsExecutif.adresseContact">Adresse Contact</Translate>
                              </Label>
                              <AvField
                                rows="3"
                                id="etudiants-licence-adresseContact"
                                type="textarea"
                                name="adresseContact"
                                validate={{
                                  required: { value: true, errorMessage: translate('entity.validation.required') }
                                }}
                              />
                            </AvGroup>
                          </Col>
                        </Row>
                        <Row>
                          <Col md="3">
                            <AvGroup>
                              <Label id="villeLabel" for="etudiants-licence-ville">
                                <Translate contentKey="pfumApp.etudiantsExecutif.ville">Ville</Translate>
                              </Label>
                              <AvField
                                id="etudiants-licence-ville"
                                type="text"
                                name="ville"
                                style={{ maxHeight: '100px', maxWidth: '200px' }}
                              />
                            </AvGroup>
                          </Col>
                          <Col md="3">
                            <AvGroup>
                              <Label id="codepostalLabel" for="etudiants-licence-codepostal">
                                <Translate contentKey="pfumApp.etudiantsExecutif.codepostal">Codepostal</Translate>
                              </Label>
                              <AvField
                                id="etudiants-licence-codepostal"
                                type="text"
                                name="codepostal"
                                style={{ maxHeight: '100px', maxWidth: '200px' }}
                              />
                            </AvGroup>
                          </Col>
                          <Col md="3">
                            <AvGroup>
                              <Label id="provinceLabel" for="etudiants-licence-province">
                                <Translate contentKey="pfumApp.etudiantsExecutif.province">Province</Translate>
                              </Label>
                              <AvField
                                id="etudiants-licence-province"
                                type="text"
                                name="province"
                                style={{ maxHeight: '100px', maxWidth: '200px' }}
                              />
                            </AvGroup>
                          </Col>
                        </Row>
                        <Row>
                          <Col md="4">
                            <AvGroup>
                              <Label id="paysNationaliteLabel" for="etudiants-licence-paysNationalite">
                                <Translate contentKey="pfumApp.etudiantsExecutif.paysNationalite">Pays Nationalite</Translate>
                              </Label>
                              <AvInput
                                style={{ maxHeight: '100px', maxWidth: '180px' }}
                                id="etudiants-licence-paysResidence"
                                type="select"
                                className="form-control"
                                name="paysNationalite"
                              >
                                <option value="" key="0" />
                                {pays
                                  ? pays.map(pays => (
                                      <option value={pays.nom_fr_fr} key={pays.nom_fr_fr}>
                                        {pays.nom_fr_fr}
                                      </option>
                                    ))
                                  : null}
                              </AvInput>
                            </AvGroup>
                          </Col>
                          <Col md="4">
                            <AvGroup>
                              <Label id="paysResidenceLabel" for="etudiants-licence-paysResidence">
                                <Translate contentKey="pfumApp.etudiantsExecutif.paysResidence">Pays Residence</Translate>
                              </Label>
                              <AvInput
                                style={{ maxHeight: '100px', maxWidth: '180px' }}
                                id="etudiants-licence-paysResidence"
                                type="select"
                                className="form-control"
                                name="paysResidence"
                              >
                                <option value="" key="0" />
                                {pays
                                  ? pays.map(pays => (
                                      <option value={pays.nom_fr_fr} key={pays.nom_fr_fr}>
                                        {pays.nom_fr_fr}
                                      </option>
                                    ))
                                  : null}
                              </AvInput>
                            </AvGroup>
                          </Col>
                        </Row>
                        <Row>
                          <Col md="4">
                            <AvGroup>
                              <Label id="emailLabel" for="etudiants-licence-email">
                                <Translate contentKey="pfumApp.etudiantsExecutif.email">Email</Translate>
                              </Label>
                              <AvField
                                id="etudiants-licence-email"
                                type="text"
                                name="email"
                                validate={{
                                  required: { value: true, errorMessage: translate('entity.validation.required') },
                                  email: { value: true, errorMessage: translate('entity.validation.email') }
                                }}
                              />
                            </AvGroup>
                          </Col>{' '}
                          <Col md="4">
                            <AvGroup>
                              <Label id="telLabel" for="etudiants-licence-tel">
                                <Translate contentKey="pfumApp.etudiantsExecutif.tel">Tel</Translate>
                              </Label>
                              <AvField
                                id="etudiants-licence-tel"
                                type="string"
                                className="form-control"
                                name="tel"
                                validate={{
                                  required: { value: true, errorMessage: translate('entity.validation.required') },
                                  maxLength: { value: 30, errorMessage: 'Le numéro de téléphone saisie dépasse la taille autorisée' }
                                }}
                              />
                            </AvGroup>
                          </Col>{' '}
                          <Col md="4">
                            <AvGroup>
                              <Label id="deuxiemeTelLabel" for="etudiants-licence-deuxiemeTel">
                                <Translate contentKey="pfumApp.etudiantsExecutif.deuxiemeTel">Deuxieme Tel</Translate>
                              </Label>
                              <AvField id="etudiants-licence-deuxiemeTel" type="string" className="form-control" name="deuxiemeTel" />
                            </AvGroup>
                          </Col>
                        </Row>
                        <Row />
                      </div>
                    </div>
                    <div>
                      <div className="card border-primary">
                        <div className="card-header">Filiére</div>
                        <div className="card-body">
                          <AvGroup>
                            <Label id="pjBacLabel" for="etudiants-executif-pjBac">
                              Type Bac
                            </Label>
                            <AvInput
                              id="etudiants-executif-pjBac"
                              type="select"
                              className="form-control"
                              name="pjBac"
                              value={(!isNew && etudiantsExecutifEntity.pjBac) || 'Sciences_De_La_Vie_Et_De_La_Terre'}
                            >
                              <option value="Sciences_De_La_Vie_Et_De_La_Terre">
                                {translate('pfumApp.DiplomeBac.Sciences_De_La_Vie_Et_De_La_Terre')}
                              </option>
                              <option value="Sciences_Physiques_Et_Chimiques">
                                {translate('pfumApp.DiplomeBac.Sciences_Physiques_Et_Chimiques')}
                              </option>
                              <option value="Sciences_Economiques">{translate('pfumApp.DiplomeBac.Sciences_Economiques')}</option>
                              <option value="Techniques_De_Gestion_Et_Comptabilite">
                                {translate('pfumApp.DiplomeBac.Techniques_De_Gestion_Et_Comptabilite')}
                              </option>
                            </AvInput>
                          </AvGroup>
                          <AvGroup>
                            <Label id="mentionLabel" for="etudiants-executif-mention">
                              <Translate contentKey="pfumApp.etudiantsExecutif.mention">Mention</Translate>
                            </Label>
                            <AvInput
                              id="etudiants-executif-mention"
                              type="select"
                              className="form-control"
                              name="mention"
                              value={(!isNew && etudiantsExecutifEntity.mention) || 'Passable'}
                            >
                              <option value="Passable">{translate('pfumApp.Mention.Passable')}</option>
                              <option value="Assez_bien">{translate('pfumApp.Mention.Assez_bien')}</option>
                              <option value="Bien">{translate('pfumApp.Mention.Bien')}</option>
                              <option value="Tres_bien">{translate('pfumApp.Mention.Tres_bien')}</option>
                            </AvInput>
                          </AvGroup>
                          <AvGroup>
                            <Label id="anneOtentionLabel" for="etudiants-licence-anneOtention">
                              <Translate contentKey="pfumApp.etudiantsLicence.anneOtention">Anne Otention</Translate>
                            </Label>
                            <AvField id="etudiants-licence-anneOtention" type="text" name="anneeObtention" />
                          </AvGroup>
                          <AvGroup>
                            <Label for="etudiants-executif-filiere">
                              <Translate contentKey="pfumApp.etudiantsExecutif.filiere">Filiere</Translate>
                            </Label>
                            <AvInput
                              id="etudiants-executif-filiere"
                              type="select"
                              className="form-control"
                              name="filiere.id"
                              validate={{
                                required: { value: true, errorMessage: translate('entity.validation.required') }
                              }}
                            >
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
                            <Label for="etudiants-executif-anneeInscription">
                              <Translate contentKey="pfumApp.etudiantsExecutif.anneeInscription">Annee Inscription</Translate>
                            </Label>
                            <AvInput
                              id="etudiants-executif-anneeInscription"
                              type="select"
                              className="form-control"
                              name="anneeInscription.id"
                              validate={{
                                required: { value: true, errorMessage: translate('entity.validation.required') }
                              }}
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

                      <div>
                        <div className="card border-primary">
                          <div className="card-header">Pièces jointes</div>
                          <div className="card-body">
                            <AvGroup>
                              <AvGroup>
                                <Label id="bacalaureatLabel" for="bacalaureat">
                                  <Translate contentKey="pfumApp.etudiantsExecutif.bacalaureat">Bacalaureat</Translate>
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
                                <AvInput
                                  type="hidden"
                                  name="bacalaureat"
                                  value={bacalaureat}
                                  validate={{
                                    required: { value: true, errorMessage: translate('entity.validation.required') }
                                  }}
                                />
                              </AvGroup>
                            </AvGroup>
                            <AvGroup>
                              <AvGroup>
                                <Label id="cvLabel" for="cv">
                                  CV
                                </Label>
                                <br />
                                {cv ? (
                                  <div>
                                    <a onClick={openFile(cvContentType, cv)}>
                                      <img src={`data:${cvContentType};base64,${cv}`} style={{ maxHeight: '100px' }} />
                                    </a>
                                    <br />
                                    <Row>
                                      <Col md="11">
                                        <span>
                                          {cvContentType}, {byteSize(cv)}
                                        </span>
                                      </Col>
                                      <Col md="1">
                                        <Button color="danger" onClick={this.clearBlob('cv')}>
                                          <FontAwesomeIcon icon="times-circle" />
                                        </Button>
                                      </Col>
                                    </Row>
                                  </div>
                                ) : null}
                                <input id="file_cv" type="file" onChange={this.onBlobChange(true, 'cv')} accept="image/*" />
                                <AvInput type="hidden" name="cv" value={cv} />
                              </AvGroup>
                            </AvGroup>
                            <AvGroup>
                              <AvGroup>
                                <Label id="autreDocumentLabel" for="autreDocument">
                                  Autre Document
                                </Label>
                                <br />
                                {autreDocument ? (
                                  <div>
                                    <a onClick={openFile(autreDocumentContentType, autreDocument)}>
                                      <Translate contentKey="entity.action.open">Open</Translate>
                                    </a>
                                    <br />
                                    <Row>
                                      <Col md="11">
                                        <span>
                                          {autreDocumentContentType}, {byteSize(autreDocument)}
                                        </span>
                                      </Col>
                                      <Col md="1">
                                        <Button color="danger" onClick={this.clearBlob('autreDocument')}>
                                          <FontAwesomeIcon icon="times-circle" />
                                        </Button>
                                      </Col>
                                    </Row>
                                  </div>
                                ) : null}
                                <input id="file_autreDocument" type="file" onChange={this.onBlobChange(false, 'autreDocument')} />
                                <AvInput type="hidden" name="autreDocument" value={autreDocument} />
                              </AvGroup>
                            </AvGroup>
                            <AvGroup>
                              <AvGroup>
                                <Label id="attestationDeTravailLabel" for="attestationDeTravail">
                                  Attestation De Travail
                                </Label>
                                <br />
                                {attestationDeTravail ? (
                                  <div>
                                    <a onClick={openFile(attestationDeTravailContentType, attestationDeTravail)}>
                                      <img
                                        src={`data:${attestationDeTravailContentType};base64,${attestationDeTravail}`}
                                        style={{ maxHeight: '100px' }}
                                      />
                                    </a>
                                    <br />
                                    <Row>
                                      <Col md="11">
                                        <span>
                                          {attestationDeTravailContentType}, {byteSize(attestationDeTravail)}
                                        </span>
                                      </Col>
                                      <Col md="1">
                                        <Button color="danger" onClick={this.clearBlob('attestationDeTravail')}>
                                          <FontAwesomeIcon icon="times-circle" />
                                        </Button>
                                      </Col>
                                    </Row>
                                  </div>
                                ) : null}
                                <input
                                  id="file_attestationDeTravail"
                                  type="file"
                                  onChange={this.onBlobChange(true, 'attestationDeTravail')}
                                  accept="image/*"
                                />
                                <AvInput type="hidden" name="attestationDeTravail" value={attestationDeTravail} />
                              </AvGroup>
                            </AvGroup>
                            <AvGroup>
                              <AvGroup>
                                <Label id="cinPassportLabel" for="cinPassport">
                                  <Translate contentKey="pfumApp.etudiantsExecutif.cinPassport">Cin Passport</Translate>
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
                                <AvInput
                                  type="hidden"
                                  name="cinPassport"
                                  value={cinPassport}
                                  validate={{
                                    required: { value: true, errorMessage: translate('entity.validation.required') }
                                  }}
                                />
                              </AvGroup>
                            </AvGroup>
                            <AvGroup>
                              <AvGroup>
                                <Label id="diplomeLabel" for="diplome">
                                  <Translate contentKey="pfumApp.etudiantsExecutif.diplome">Diplome</Translate>
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
                      </div>
                    </div>
                    <div>
                      <div className="card border-primary">
                        <div className="card-header">Modalité paiement</div>
                        <div className="card-body">
                          <Row>
                            <Col>
                              <AvGroup>
                                <Label for="etudiants-licence-modalite">
                                  <Translate contentKey="pfumApp.etudiantsExecutif.modalite">Modalite</Translate>
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
                              </AvGroup>{' '}
                            </Col>
                          </Row>
                        </div>
                      </div>
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
                          &nbsp; Valider
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
  etudiantsExecutifEntity: storeState.etudiantsExecutif.entity,
  loading: storeState.etudiantsExecutif.loading,
  updating: storeState.etudiantsExecutif.updating,
  updateSuccess: storeState.etudiantsExecutif.updateSuccess,
  pays: storeState.pays.entities
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
  reset,
  createExtendedEntity,
  getPays
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(etudiantsExecutifUpdate);
