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
import { getEntity, updateEntity, createEntity, setBlob, reset } from './etudiants-executif.reducer';
import { IEtudiantsExecutif } from 'app/shared/model/etudiants-executif.model';
// tslint:disable-next-line:no-unused-variable
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IEtudiantsExecutifUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface IEtudiantsExecutifUpdateState {
  isNew: boolean;
  userId: string;
  filiereId: string;
  anneeInscriptionId: string;
  modaliteId: string;
}

export class EtudiantsExecutifUpdate extends React.Component<IEtudiantsExecutifUpdateProps, IEtudiantsExecutifUpdateState> {
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
      const { etudiantsExecutifEntity } = this.props;
      const entity = {
        ...etudiantsExecutifEntity,
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
    this.props.history.push('/entity/etudiants-executif');
  };

  render() {
    const { etudiantsExecutifEntity, users, filieres, anneeInscriptions, modalitePaiements, loading, updating } = this.props;
    const { isNew } = this.state;

    const {
      photo,
      photoContentType,
      cv,
      cvContentType,
      attestationTravail,
      attestationTravailContentType,
      bacalaureat,
      bacalaureatContentType,
      cinPassport,
      cinPassportContentType,
      diplome,
      diplomeContentType,
      testAdmission,
      testAdmissionContentType,
      releveeNote,
      releveeNoteContentType
    } = etudiantsExecutifEntity;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="pfumv10App.etudiantsExecutif.home.createOrEditLabel">
              <Translate contentKey="pfumv10App.etudiantsExecutif.home.createOrEditLabel">Create or edit a EtudiantsExecutif</Translate>
            </h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : etudiantsExecutifEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="etudiants-executif-id">
                      <Translate contentKey="global.field.id">ID</Translate>
                    </Label>
                    <AvInput id="etudiants-executif-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="suffixeLabel" for="etudiants-executif-suffixe">
                    <Translate contentKey="pfumv10App.etudiantsExecutif.suffixe">Suffixe</Translate>
                  </Label>
                  <AvField id="etudiants-executif-suffixe" type="text" name="suffixe" />
                </AvGroup>
                <AvGroup>
                  <Label id="nomLabel" for="etudiants-executif-nom">
                    <Translate contentKey="pfumv10App.etudiantsExecutif.nom">Nom</Translate>
                  </Label>
                  <AvField
                    id="etudiants-executif-nom"
                    type="text"
                    name="nom"
                    validate={{
                      required: { value: true, errorMessage: translate('entity.validation.required') }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="prenomLabel" for="etudiants-executif-prenom">
                    <Translate contentKey="pfumv10App.etudiantsExecutif.prenom">Prenom</Translate>
                  </Label>
                  <AvField
                    id="etudiants-executif-prenom"
                    type="text"
                    name="prenom"
                    validate={{
                      required: { value: true, errorMessage: translate('entity.validation.required') }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="dateNaissanceLabel" for="etudiants-executif-dateNaissance">
                    <Translate contentKey="pfumv10App.etudiantsExecutif.dateNaissance">Date Naissance</Translate>
                  </Label>
                  <AvInput
                    id="etudiants-executif-dateNaissance"
                    type="datetime-local"
                    className="form-control"
                    name="dateNaissance"
                    placeholder={'YYYY-MM-DD HH:mm'}
                    value={isNew ? null : convertDateTimeFromServer(this.props.etudiantsExecutifEntity.dateNaissance)}
                    validate={{
                      required: { value: true, errorMessage: translate('entity.validation.required') }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="adresseContactLabel" for="etudiants-executif-adresseContact">
                    <Translate contentKey="pfumv10App.etudiantsExecutif.adresseContact">Adresse Contact</Translate>
                  </Label>
                  <AvField
                    id="etudiants-executif-adresseContact"
                    type="text"
                    name="adresseContact"
                    validate={{
                      required: { value: true, errorMessage: translate('entity.validation.required') }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="villeLabel" for="etudiants-executif-ville">
                    <Translate contentKey="pfumv10App.etudiantsExecutif.ville">Ville</Translate>
                  </Label>
                  <AvField id="etudiants-executif-ville" type="text" name="ville" />
                </AvGroup>
                <AvGroup>
                  <Label id="emailLabel" for="etudiants-executif-email">
                    <Translate contentKey="pfumv10App.etudiantsExecutif.email">Email</Translate>
                  </Label>
                  <AvField
                    id="etudiants-executif-email"
                    type="text"
                    name="email"
                    validate={{
                      required: { value: true, errorMessage: translate('entity.validation.required') }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="pjBacLabel" for="etudiants-executif-pjBac">
                    <Translate contentKey="pfumv10App.etudiantsExecutif.pjBac">Pj Bac</Translate>
                  </Label>
                  <AvInput
                    id="etudiants-executif-pjBac"
                    type="select"
                    className="form-control"
                    name="pjBac"
                    value={(!isNew && etudiantsExecutifEntity.pjBac) || 'Sciences_De_La_Vie_Et_De_La_Terre'}
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
                  <Label id="mentionLabel" for="etudiants-executif-mention">
                    <Translate contentKey="pfumv10App.etudiantsExecutif.mention">Mention</Translate>
                  </Label>
                  <AvInput
                    id="etudiants-executif-mention"
                    type="select"
                    className="form-control"
                    name="mention"
                    value={(!isNew && etudiantsExecutifEntity.mention) || 'Passable'}
                  >
                    <option value="Passable">{translate('pfumv10App.Mention.Passable')}</option>
                    <option value="Assez_bien">{translate('pfumv10App.Mention.Assez_bien')}</option>
                    <option value="Bien">{translate('pfumv10App.Mention.Bien')}</option>
                    <option value="Tres_bien">{translate('pfumv10App.Mention.Tres_bien')}</option>
                  </AvInput>
                </AvGroup>
                <AvGroup>
                  <Label id="anneeObtentionLabel" for="etudiants-executif-anneeObtention">
                    <Translate contentKey="pfumv10App.etudiantsExecutif.anneeObtention">Annee Obtention</Translate>
                  </Label>
                  <AvField id="etudiants-executif-anneeObtention" type="text" name="anneeObtention" />
                </AvGroup>
                <AvGroup>
                  <Label id="cinPassLabel" for="etudiants-executif-cinPass">
                    <Translate contentKey="pfumv10App.etudiantsExecutif.cinPass">Cin Pass</Translate>
                  </Label>
                  <AvField
                    id="etudiants-executif-cinPass"
                    type="text"
                    name="cinPass"
                    validate={{
                      required: { value: true, errorMessage: translate('entity.validation.required') }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="paysNationaliteLabel" for="etudiants-executif-paysNationalite">
                    <Translate contentKey="pfumv10App.etudiantsExecutif.paysNationalite">Pays Nationalite</Translate>
                  </Label>
                  <AvField id="etudiants-executif-paysNationalite" type="text" name="paysNationalite" />
                </AvGroup>
                <AvGroup>
                  <Label id="paysResidenceLabel" for="etudiants-executif-paysResidence">
                    <Translate contentKey="pfumv10App.etudiantsExecutif.paysResidence">Pays Residence</Translate>
                  </Label>
                  <AvField id="etudiants-executif-paysResidence" type="text" name="paysResidence" />
                </AvGroup>
                <AvGroup>
                  <Label id="codepostalLabel" for="etudiants-executif-codepostal">
                    <Translate contentKey="pfumv10App.etudiantsExecutif.codepostal">Codepostal</Translate>
                  </Label>
                  <AvField id="etudiants-executif-codepostal" type="text" name="codepostal" />
                </AvGroup>
                <AvGroup>
                  <Label id="provinceLabel" for="etudiants-executif-province">
                    <Translate contentKey="pfumv10App.etudiantsExecutif.province">Province</Translate>
                  </Label>
                  <AvField id="etudiants-executif-province" type="text" name="province" />
                </AvGroup>
                <AvGroup>
                  <Label id="telLabel" for="etudiants-executif-tel">
                    <Translate contentKey="pfumv10App.etudiantsExecutif.tel">Tel</Translate>
                  </Label>
                  <AvField id="etudiants-executif-tel" type="string" className="form-control" name="tel" />
                </AvGroup>
                <AvGroup>
                  <Label id="deuxiemetelLabel" for="etudiants-executif-deuxiemetel">
                    <Translate contentKey="pfumv10App.etudiantsExecutif.deuxiemetel">Deuxiemetel</Translate>
                  </Label>
                  <AvField id="etudiants-executif-deuxiemetel" type="string" className="form-control" name="deuxiemetel" />
                </AvGroup>
                <AvGroup>
                  <AvGroup>
                    <Label id="photoLabel" for="photo">
                      <Translate contentKey="pfumv10App.etudiantsExecutif.photo">Photo</Translate>
                    </Label>
                    <br />
                    {photo ? (
                      <div>
                        <a onClick={openFile(photoContentType, photo)}>
                          <img src={`data:${photoContentType};base64,${photo}`} style={{ maxHeight: '100px' }} />
                        </a>
                        <br />
                        <Row>
                          <Col md="11">
                            <span>
                              {photoContentType}, {byteSize(photo)}
                            </span>
                          </Col>
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
                <AvGroup>
                  <AvGroup>
                    <Label id="cvLabel" for="cv">
                      <Translate contentKey="pfumv10App.etudiantsExecutif.cv">Cv</Translate>
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
                    <Label id="attestationTravailLabel" for="attestationTravail">
                      <Translate contentKey="pfumv10App.etudiantsExecutif.attestationTravail">Attestation Travail</Translate>
                    </Label>
                    <br />
                    {attestationTravail ? (
                      <div>
                        <a onClick={openFile(attestationTravailContentType, attestationTravail)}>
                          <img src={`data:${attestationTravailContentType};base64,${attestationTravail}`} style={{ maxHeight: '100px' }} />
                        </a>
                        <br />
                        <Row>
                          <Col md="11">
                            <span>
                              {attestationTravailContentType}, {byteSize(attestationTravail)}
                            </span>
                          </Col>
                          <Col md="1">
                            <Button color="danger" onClick={this.clearBlob('attestationTravail')}>
                              <FontAwesomeIcon icon="times-circle" />
                            </Button>
                          </Col>
                        </Row>
                      </div>
                    ) : null}
                    <input
                      id="file_attestationTravail"
                      type="file"
                      onChange={this.onBlobChange(true, 'attestationTravail')}
                      accept="image/*"
                    />
                    <AvInput type="hidden" name="attestationTravail" value={attestationTravail} />
                  </AvGroup>
                </AvGroup>
                <AvGroup>
                  <AvGroup>
                    <Label id="bacalaureatLabel" for="bacalaureat">
                      <Translate contentKey="pfumv10App.etudiantsExecutif.bacalaureat">Bacalaureat</Translate>
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
                    <Label id="cinPassportLabel" for="cinPassport">
                      <Translate contentKey="pfumv10App.etudiantsExecutif.cinPassport">Cin Passport</Translate>
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
                      <Translate contentKey="pfumv10App.etudiantsExecutif.diplome">Diplome</Translate>
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
                <AvGroup>
                  <AvGroup>
                    <Label id="testAdmissionLabel" for="testAdmission">
                      <Translate contentKey="pfumv10App.etudiantsExecutif.testAdmission">Test Admission</Translate>
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
                    <input id="file_testAdmission" type="file" onChange={this.onBlobChange(true, 'testAdmission')} accept="image/*" />
                    <AvInput type="hidden" name="testAdmission" value={testAdmission} />
                  </AvGroup>
                </AvGroup>
                <AvGroup>
                  <AvGroup>
                    <Label id="releveeNoteLabel" for="releveeNote">
                      <Translate contentKey="pfumv10App.etudiantsExecutif.releveeNote">Relevee Note</Translate>
                    </Label>
                    <br />
                    {releveeNote ? (
                      <div>
                        <a onClick={openFile(releveeNoteContentType, releveeNote)}>
                          <img src={`data:${releveeNoteContentType};base64,${releveeNote}`} style={{ maxHeight: '100px' }} />
                        </a>
                        <br />
                        <Row>
                          <Col md="11">
                            <span>
                              {releveeNoteContentType}, {byteSize(releveeNote)}
                            </span>
                          </Col>
                          <Col md="1">
                            <Button color="danger" onClick={this.clearBlob('releveeNote')}>
                              <FontAwesomeIcon icon="times-circle" />
                            </Button>
                          </Col>
                        </Row>
                      </div>
                    ) : null}
                    <input id="file_releveeNote" type="file" onChange={this.onBlobChange(true, 'releveeNote')} accept="image/*" />
                    <AvInput type="hidden" name="releveeNote" value={releveeNote} />
                  </AvGroup>
                </AvGroup>
                <AvGroup>
                  <Label id="inscriptionvalideLabel" check>
                    <AvInput id="etudiants-executif-inscriptionvalide" type="checkbox" className="form-control" name="inscriptionvalide" />
                    <Translate contentKey="pfumv10App.etudiantsExecutif.inscriptionvalide">Inscriptionvalide</Translate>
                  </Label>
                </AvGroup>
                <AvGroup>
                  <Label id="absentLabel" check>
                    <AvInput id="etudiants-executif-absent" type="checkbox" className="form-control" name="absent" />
                    <Translate contentKey="pfumv10App.etudiantsExecutif.absent">Absent</Translate>
                  </Label>
                </AvGroup>
                <AvGroup>
                  <Label for="etudiants-executif-user">
                    <Translate contentKey="pfumv10App.etudiantsExecutif.user">User</Translate>
                  </Label>
                  <AvInput id="etudiants-executif-user" type="select" className="form-control" name="user.id">
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
                  <Label for="etudiants-executif-filiere">
                    <Translate contentKey="pfumv10App.etudiantsExecutif.filiere">Filiere</Translate>
                  </Label>
                  <AvInput id="etudiants-executif-filiere" type="select" className="form-control" name="filiere.id">
                    <option value="" key="0" />
                    {filieres
                      ? filieres.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.id}
                          </option>
                        ))
                      : null}
                  </AvInput>
                </AvGroup>
                <AvGroup>
                  <Label for="etudiants-executif-anneeInscription">
                    <Translate contentKey="pfumv10App.etudiantsExecutif.anneeInscription">Annee Inscription</Translate>
                  </Label>
                  <AvInput id="etudiants-executif-anneeInscription" type="select" className="form-control" name="anneeInscription.id">
                    <option value="" key="0" />
                    {anneeInscriptions
                      ? anneeInscriptions.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.id}
                          </option>
                        ))
                      : null}
                  </AvInput>
                </AvGroup>
                <AvGroup>
                  <Label for="etudiants-executif-modalite">
                    <Translate contentKey="pfumv10App.etudiantsExecutif.modalite">Modalite</Translate>
                  </Label>
                  <AvInput id="etudiants-executif-modalite" type="select" className="form-control" name="modalite.id">
                    <option value="" key="0" />
                    {modalitePaiements
                      ? modalitePaiements.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.id}
                          </option>
                        ))
                      : null}
                  </AvInput>
                </AvGroup>
                <Button tag={Link} id="cancel-save" to="/entity/etudiants-executif" replace color="info">
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
  filieres: storeState.filiere.entities,
  anneeInscriptions: storeState.anneeInscription.entities,
  modalitePaiements: storeState.modalitePaiement.entities,
  etudiantsExecutifEntity: storeState.etudiantsExecutif.entity,
  loading: storeState.etudiantsExecutif.loading,
  updating: storeState.etudiantsExecutif.updating,
  updateSuccess: storeState.etudiantsExecutif.updateSuccess
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
)(EtudiantsExecutifUpdate);
