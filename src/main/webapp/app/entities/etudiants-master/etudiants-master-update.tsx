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
import { getEntity, updateEntity, createEntity, setBlob, reset, createExtendedEntity } from './etudiants-master.reducer';
import { IEtudiantsMaster } from 'app/shared/model/etudiants-master.model';
// tslint:disable-next-line:no-unused-variable
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';
import Filiere from '../filiere/filiere';
import Professeur from '../professeur/professeur';
import { Etablissement } from '../etablissement/etablissement';

export interface IetudiantsMasterUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface IetudiantsMasterUpdateState {
  isNew: boolean;
  userId: string;
  filiereId: string;
  anneeInscriptionId: string;
  modaliteId: string;
}

export class etudiantsMasterUpdate extends React.Component<IetudiantsMasterUpdateProps, IetudiantsMasterUpdateState> {
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
      const { etudiantsMasterEntity } = this.props;
      const entity = {
        ...etudiantsMasterEntity,
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
    this.props.history.push('/entity/etudiants-master');
  };

  render() {
    const { etudiantsMasterEntity, users, filieres, anneeInscriptions, modalitePaiements, loading, updating, pays } = this.props;
    const { isNew } = this.state;

    const {
      photo,
      photoContentType,
      testAdmission,
      testAdmissionContentType,
      relevesNotes,
      relevesNotesContentType,
      bacalaureat,
      bacalaureatContentType,
      cinPassport,
      cinPassportContentType,
      diplome,
      diplomeContentType
    } = etudiantsMasterEntity;

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
                  <AvForm model={isNew ? {} : etudiantsMasterEntity} onSubmit={this.saveEntity}>
                    <div className="card border-primary">
                      <div className="card-header">Informations personnelles</div>
                      <div className="card-body">
                        <Row style={{ marginLeft: '-80px' }}>
                          <Col dm="4">
                            <AvGroup>
                              <AvGroup>
                                <b>Photo : </b>
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
                                <Translate contentKey="pfumApp.etudiantsMaster.nom">Nom</Translate>
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
                                <Translate contentKey="pfumApp.etudiantsMaster.cinPass">Cin Pass</Translate>
                              </Label>
                              <AvField
                                style={{ maxHeight: '100px', maxWidth: '200px' }}
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
                                value={isNew ? null : convertDateTimeFromServer(this.props.etudiantsMasterEntity.dateNaissance)}
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
                              <Label id="niveau" for="etudiants-licence-niveau">
                                Niveau{' '}
                              </Label>
                              <AvInput
                                style={{ maxHeight: '100px', maxWidth: '200px' }}
                                id="etudiants-licence-niveau"
                                type="select"
                                className="form-control"
                                name="niveau"
                                value={(!isNew && etudiantsMasterEntity.niveau) || 'PREMIER'}
                                validate={{
                                  required: { value: true, errorMessage: translate('entity.validation.required') }
                                }}
                              >
                                <option value="PREMIER">{translate('pfumApp.Niveau.PREMIER')}</option>
                                <option value="DEUXIEME">{translate('pfumApp.Niveau.DEUXIEME')}</option>
                                {/* <option value="TROISIEME">{translate('pfumApp.Niveau.TROISIEME')}</option> */}
                              </AvInput>
                            </AvGroup>
                          </Col>
                          <Col md="3">
                            <AvGroup>
                              <Label id="emailLabel" for="etudiants-licence-email">
                                <Translate contentKey="pfumApp.etudiantsMaster.email">Email</Translate>
                              </Label>
                              <AvField
                                style={{ maxHeight: '100px', maxWidth: '200px' }}
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
                          <Col md="3">
                            <AvGroup>
                              <Label id="telLabel" for="etudiants-licence-tel">
                                Téléphone
                              </Label>
                              <AvField
                                style={{ maxHeight: '100px', maxWidth: '200px' }}
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
                          <Col md="3">
                            <AvGroup>
                              <Label id="deuxiemeTelLabel" for="etudiants-licence-deuxiemeTel">
                                <Translate contentKey="pfumApp.etudiantsMaster.deuxiemeTel">Deuxieme Tel</Translate>
                              </Label>
                              <AvField
                                style={{ maxHeight: '100px', maxWidth: '200px' }}
                                id="etudiants-licence-deuxiemeTel"
                                type="string"
                                className="form-control"
                                name="deuxiemeTel"
                              />
                            </AvGroup>
                          </Col>
                        </Row>
                        <br />
                        <Row>
                          <Col>
                            <AvGroup>
                              <Label id="adresseContactLabel" for="etudiants-licence-adresseContact">
                                <Translate contentKey="pfumApp.etudiantsMaster.adresseContact">Adresse Contact</Translate>
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
                                <Translate contentKey="pfumApp.etudiantsMaster.ville">Ville</Translate>
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
                                <Translate contentKey="pfumApp.etudiantsMaster.codepostal">Codepostal</Translate>
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
                                <Translate contentKey="pfumApp.etudiantsMaster.province">Province</Translate>
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
                                <Translate contentKey="pfumApp.etudiantsMaster.paysNationalite">Pays Nationalite</Translate>
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
                                <Translate contentKey="pfumApp.etudiantsMaster.paysResidence">Pays Residence</Translate>
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
                        <Row />
                        <Row />
                      </div>
                    </div>
                    <div>
                      <div className="card border-primary">
                        <div className="card-header">Filiére</div>
                        <div className="card-body">
                          <AvGroup>
                            <Label id="typeBacLabel" for="etudiants-master-typeBac">
                              <Translate contentKey="pfumApp.etudiantsMaster.typeBac">Type Bac</Translate>
                            </Label>
                            <AvInput
                              id="etudiants-master-typeBac"
                              type="select"
                              className="form-control"
                              name="typeBac"
                              value={(!isNew && etudiantsMasterEntity.typeBac) || 'Sciences_De_La_Vie_Et_De_La_Terre'}
                            >
                              <option value="Sciences_De_La_Vie_Et_De_La_Terre">
                                {translate('pfumApp.DiplomeBac.Sciences_De_La_Vie_Et_De_La_Terre')}
                              </option>
                              <option value="Sciences_Physiques_Et_Chimiques">
                                {translate('pfumApp.DiplomeBac.Sciences_Physiques_Et_Chimiques')}
                              </option>
                              <option value="Sciences_Physiques_Et_Chimiques">
                                {translate('pfumApp.DiplomeBac.Sciences_Physiques_Et_Chimiques')}
                              </option>
                              <option value="Sciences_Maths_A">{translate('pfumApp.DiplomeBac.Sciences_Maths_A')}</option>
                              <option value="Sciences_Maths_B">{translate('pfumApp.DiplomeBac.Sciences_Maths_B')}</option>
                              <option value="Sciences_Economiques">{translate('pfumApp.DiplomeBac.Sciences_Economiques')}</option>
                              <option value="Techniques_De_Gestion_Et_Comptabilite">
                                {translate('pfumApp.DiplomeBac.Techniques_De_Gestion_Et_Comptabilite')}
                              </option>
                              <option value="Sciences_agronomiques">{translate('pfumApp.DiplomeBac.Sciences_agronomiques')}</option>
                              <option value="Sciences_Et_Technologies_Electriques">
                                {translate('pfumApp.DiplomeBac.Sciences_Et_Technologies_Electriques')}
                              </option>
                              <option value="Sciences_Et_Technologies_Mecaniques">
                                {translate('pfumApp.DiplomeBac.Sciences_Et_Technologies_Mecaniques')}
                              </option>
                              <option value="Arts_Appliques">{translate('pfumApp.DiplomeBac.Arts_Appliques')}</option>
                              <option value="Sciences_Humaines">{translate('pfumApp.DiplomeBac.Sciences_Humaines')}</option>
                              <option value="Sciences_de_la_Chariaa">{translate('pfumApp.DiplomeBac.Sciences_de_la_Chariaa')}</option>
                              <option value="Sciences_de_Langue_Arabe">{translate('pfumApp.DiplomeBac.Sciences_de_Langue_Arabe')}</option>
                              <option value="Autre">{translate('pfumApp.DiplomeBac.Autre')}</option>
                            </AvInput>
                          </AvGroup>
                          <AvGroup>
                            <Label id="mentionLabel" for="etudiants-master-mention">
                              <Translate contentKey="pfumApp.etudiantsMaster.mention">Mention</Translate>
                            </Label>
                            <AvInput
                              id="etudiants-master-mention"
                              type="select"
                              className="form-control"
                              name="mention"
                              value={(!isNew && etudiantsMasterEntity.mention) || 'Passable'}
                            >
                              <option value="Passable">{translate('pfumApp.Mention.Passable')}</option>
                              <option value="Assez_bien">{translate('pfumApp.Mention.Assez_bien')}</option>
                              <option value="Bien">{translate('pfumApp.Mention.Bien')}</option>
                              <option value="Tres_bien">{translate('pfumApp.Mention.Tres_bien')}</option>
                            </AvInput>
                          </AvGroup>
                          <AvGroup>
                            <Label id="anneOtentionLabel" for="etudiants-master-anneOtention">
                              <Translate contentKey="pfumApp.etudiantsMaster.anneOtention">Année d'obtention</Translate>
                            </Label>
                            <AvField id="etudiants-master-anneOtention" type="text" name="anneeObtention" />
                          </AvGroup>
                          <AvGroup>
                            <Label id="licenceLabel" for="etudiants-master-licence">
                              Licence
                            </Label>
                            <AvField
                              id="etudiants-master-anneOtention"
                              type="text"
                              name="licence"
                              validate={{
                                required: { value: true, errorMessage: translate('entity.validation.required') }
                              }}
                            />
                          </AvGroup>
                          <AvGroup>
                            <Label id="anneeObtentionLicenceLabel" for="etudiants-master-anneeObtentionLicence">
                              Année d'obtention Licence
                            </Label>
                            <AvField id="etudiants-master-anneeObtentionLicence" type="text" name="anneeObtentionLicence" />
                          </AvGroup>
                          <AvGroup>
                            <Label id="etablissementObtentionLicenceLabel" for="etudiants-master-etablissementObtentionLicence">
                              Etablissement d'obtention Licence
                            </Label>
                            <AvField id="etudiants-master-etablissementObtentionLicence" type="text" name="etablissementObtentionLicence" />
                          </AvGroup>

                          <AvGroup>
                            <Label for="etudiants-master-filiere">
                              <Translate contentKey="pfumApp.etudiantsMaster.filiere">Filiere</Translate>
                            </Label>
                            <AvInput
                              id="etudiants-master-filiere"
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
                            <Label for="etudiants-master-anneeInscription">
                              <Translate contentKey="pfumApp.etudiantsMaster.anneeInscription">Annee Inscription</Translate>
                            </Label>
                            <AvInput
                              id="etudiants-master-anneeInscription"
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
                    </div>

                    <div>
                      <div className="card border-primary">
                        <div className="card-header">Pièces jointes</div>
                        <div className="card-body">
                          <AvGroup>
                            <AvGroup>
                              <Label id="bacalaureatLabel" for="bacalaureat">
                                <Translate contentKey="pfumApp.etudiantsMaster.bacalaureat">Bacalaureat</Translate>
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
                              <input id="file_bacalaureat" type="file" onChange={this.onBlobChange(true, 'bacalaureat')} accept="image/*" />
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
                              <Label id="testAdmissionLabel" for="testAdmission">
                                Test Admission
                              </Label>
                              <br />
                              {testAdmission ? (
                                <div>
                                  <a onClick={openFile(testAdmissionContentType, testAdmission)}>
                                    <img src={`data:${testAdmissionContentType};base64,${testAdmission}`} style={{ maxHeight: '100px' }} />
                                  </a>
                                  <br />
                                  <Row>
                                    <Col md="11">
                                      <span>
                                        {testAdmissionContentType}, {byteSize(testAdmission)}
                                      </span>
                                    </Col>
                                    <Col md="1">
                                      <Button color="danger" onClick={this.clearBlob('testAdmission')}>
                                        <FontAwesomeIcon icon="times-circle" />
                                      </Button>
                                    </Col>
                                  </Row>
                                </div>
                              ) : null}
                              <input
                                id="file_testAdmission"
                                type="file"
                                onChange={this.onBlobChange(true, 'testAdmission')}
                                accept="image/*"
                              />
                              <AvInput type="hidden" name="testAdmission" value={testAdmission} />
                            </AvGroup>
                          </AvGroup>
                          <AvGroup>
                            <AvGroup>
                              <Label id="relevesNotesLabel" for="relevesNotes">
                                Releves Notes
                              </Label>
                              <br />
                              {relevesNotes ? (
                                <div>
                                  <a onClick={openFile(relevesNotesContentType, relevesNotes)}>
                                    <img src={`data:${relevesNotesContentType};base64,${relevesNotes}`} style={{ maxHeight: '100px' }} />
                                  </a>
                                  <br />
                                  <Row>
                                    <Col md="11">
                                      <span>
                                        {relevesNotesContentType}, {byteSize(relevesNotes)}
                                      </span>
                                    </Col>
                                    <Col md="1">
                                      <Button color="danger" onClick={this.clearBlob('relevesNotes')}>
                                        <FontAwesomeIcon icon="times-circle" />
                                      </Button>
                                    </Col>
                                  </Row>
                                </div>
                              ) : null}
                              <input
                                id="file_relevesNotes"
                                type="file"
                                onChange={this.onBlobChange(true, 'relevesNotes')}
                                accept="image/*"
                              />
                              <AvInput type="hidden" name="relevesNotes" value={relevesNotes} />
                            </AvGroup>
                          </AvGroup>
                          <AvGroup>
                            <AvGroup>
                              <Label id="cinPassportLabel" for="cinPassport">
                                <Translate contentKey="pfumApp.etudiantsMaster.cinPassport">Cin Passport</Translate>
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
                              <input id="file_cinPassport" type="file" onChange={this.onBlobChange(true, 'cinPassport')} accept="image/*" />
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
                                <Translate contentKey="pfumApp.etudiantsMaster.diplome">Diplome</Translate>
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
                              <AvInput
                                type="hidden"
                                name="diplome"
                                value={diplome}
                                validate={{
                                  required: { value: true, errorMessage: translate('entity.validation.required') }
                                }}
                              />
                            </AvGroup>
                          </AvGroup>
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
                                  <Translate contentKey="pfumApp.etudiantsMaster.modalite">Modalite</Translate>
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
  etudiantsMasterEntity: storeState.etudiantsMaster.entity,
  loading: storeState.etudiantsMaster.loading,
  updating: storeState.etudiantsMaster.updating,
  updateSuccess: storeState.etudiantsMaster.updateSuccess,
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
)(etudiantsMasterUpdate);
