import axios from 'axios';
import fileDownload from 'react-file-download';
import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAction, openFile, byteSize, TextFormat, translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { IRootState } from 'app/shared/reducers';
import { getEntity, envoyerMail, getEntityDetail } from '../etudiants-licence/etudiants-licence.reducer';
import { getDocumentByTypeDocument as getDocuments } from 'app/entities/document/document.reducer';
import { getCalendrierExamenByProgramme as getCalendrierExamens } from 'app/entities/calendrier-module/calendrier-module.reducer';

// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT, AUTHORITIES } from 'app/config/constants';
import { hasAnyAuthority } from 'app/shared/auth/private-route';
import value from '*.json';
import { relative } from 'path';

export interface IEspaceEtudiantsLicenceProps extends StateProps, DispatchProps, RouteComponentProps<{ bloc: string }> {}

export class EspaceEtudiantsLicence extends React.Component<IEspaceEtudiantsLicenceProps> {
  componentDidMount() {
    this.props.getEntityDetail();
    this.props.getDocuments('MASTER_LICENCE');
    this.props.getCalendrierExamens('MASTER_LICENCE');
  }

  handleEnvoyerMail = (event, values) => {
    this.props.envoyerMail(values.sujet, values.corps);
  };

  render() {
    const { etudiantsLicenceEntity, documentList, calendrierExamens } = this.props;
    return (
      <div>
        <div>
          <br />
          {this.props.match.params.bloc == 'profil' && (
            <>
              <Row>
                <Col md="10">
                  <section className="fieldset">
                    <h1>Informations personnelles:</h1>
                    <br />
                    <Row>
                      <Col md="4">
                        <h6>
                          N° Etudiant : [<b>{etudiantsLicenceEntity.suffixe}</b>]
                        </h6>
                      </Col>
                      <Col md="4">
                        <h6>
                          Niveau d'inscription : [
                          <b>
                            <Translate contentKey={`pfumApp.Niveau.${etudiantsLicenceEntity.niveau}`} />
                            -Master Exécutif
                          </b>
                          ]
                        </h6>
                      </Col>
                      <Col md="4">
                        <h6 style={{ marginLeft: '-30px', marginTop: '-8px' }}>
                          Status: &nbsp; &nbsp; &nbsp; &nbsp;
                          {etudiantsLicenceEntity.inscriptionvalide ? (
                            <Button color="success">Validé</Button>
                          ) : (
                            <Button color="danger">En attente</Button>
                          )}
                        </h6>
                      </Col>
                    </Row>

                    <br />
                    <dl className="jh-entity-details" style={{ marginLeft: '15px' }}>
                      <Row>
                        <Col md="8">
                          <Row>
                            <Col ms="4">
                              <dt>
                                <span id="nom">
                                  <Translate contentKey="pfumApp.etudiantsExecutif.nom">Nom</Translate>
                                </span>
                              </dt>
                              <dd>{etudiantsLicenceEntity.nom}</dd>
                            </Col>
                            <Col ms="4">
                              {' '}
                              <dt>
                                <span id="prenom">
                                  <Translate contentKey="pfumApp.etudiantsExecutif.prenom">Prenom</Translate>
                                </span>
                              </dt>
                              <dd>{etudiantsLicenceEntity.prenom}</dd>
                            </Col>
                            <Col ms="4">
                              <dt>
                                <span id="dateNaissance">
                                  <Translate contentKey="pfumApp.etudiantsExecutif.dateNaissance">Date Naissance</Translate>
                                </span>
                              </dt>
                              <dd>
                                <TextFormat value={etudiantsLicenceEntity.dateNaissance} type="date" format={APP_DATE_FORMAT} />
                              </dd>
                            </Col>
                          </Row>
                        </Col>

                        <Col ms="8">
                          <dt>
                            <span id="photo" />
                          </dt>
                          <dd>
                            {etudiantsLicenceEntity.photo ? (
                              <div>
                                <a onClick={openFile(etudiantsLicenceEntity.photoContentType, etudiantsLicenceEntity.photo)}>
                                  <img
                                    src={`data:${etudiantsLicenceEntity.photoContentType};base64,${etudiantsLicenceEntity.photo}`}
                                    style={{ maxHeight: '200px' }}
                                  />
                                </a>
                              </div>
                            ) : null}
                          </dd>
                        </Col>
                      </Row>
                      <Row style={{ marginTop: '-100px' }}>
                        <Col md="4">
                          <dt>
                            <span id="adresseContact">
                              <Translate contentKey="pfumApp.etudiantsExecutif.adresseContact">Adresse Contact</Translate>
                            </span>
                          </dt>
                          <dd>{etudiantsLicenceEntity.adresseContact}</dd>
                          <dt>
                            <span id="ville">
                              <Translate contentKey="pfumApp.etudiantsExecutif.ville">Ville</Translate>
                            </span>
                          </dt>
                          <dd>{etudiantsLicenceEntity.ville}</dd>
                          <dt>
                            <span id="email">
                              <Translate contentKey="pfumApp.etudiantsExecutif.email">Email</Translate>
                            </span>
                          </dt>
                          <dd>{etudiantsLicenceEntity.email}</dd>

                          <dt>
                            <span id="cinPass">
                              <Translate contentKey="pfumApp.etudiantsExecutif.cinPass">Cin Pass</Translate>
                            </span>
                          </dt>
                          <dd>{etudiantsLicenceEntity.cinPass}</dd>
                          <dt>
                            <span id="paysNationalite">
                              <Translate contentKey="pfumApp.etudiantsExecutif.paysNationalite">Pays Nationalite</Translate>
                            </span>
                          </dt>
                          <dd>{etudiantsLicenceEntity.paysNationalite}</dd>
                        </Col>
                        <Col md="4">
                          <dt>
                            <span id="paysResidence">
                              <Translate contentKey="pfumApp.etudiantsExecutif.paysResidence">Pays Residence</Translate>
                            </span>
                          </dt>
                          <dd>{etudiantsLicenceEntity.paysResidence}</dd>
                          <dt>
                            <span id="codepostal">
                              <Translate contentKey="pfumApp.etudiantsExecutif.codepostal">Codepostal</Translate>
                            </span>
                          </dt>
                          <dd>{etudiantsLicenceEntity.codepostal}</dd>
                          <dt>
                            <span id="province">
                              <Translate contentKey="pfumApp.etudiantsExecutif.province">Province</Translate>
                            </span>
                          </dt>
                          <dd>{etudiantsLicenceEntity.province}</dd>
                          <dt>
                            <span id="tel">
                              <Translate contentKey="pfumApp.etudiantsExecutif.tel">Tel</Translate>
                            </span>
                          </dt>
                          <dd>{etudiantsLicenceEntity.tel}</dd>
                          <dt>
                            <span id="deuxiemeTel">
                              <Translate contentKey="pfumApp.etudiantsExecutif.deuxiemeTel">Deuxieme Tel</Translate>
                            </span>
                          </dt>
                          <dd>{etudiantsLicenceEntity.deuxiemeTel}</dd>
                        </Col>
                      </Row>
                    </dl>
                  </section>
                </Col>
              </Row>
            </>
          )}
          {this.props.match.params.bloc == 'inscription' && (
            <>
              {' '}
              <Row>
                <Col md="10">
                  <section className="fieldset">
                    <h1>Informations filiére</h1>
                    <br />
                    <dl className="jh-entity-details" style={{ marginLeft: '85px' }}>
                      <dt>
                        <span id="pjBac">Intitulé d'un bac :</span>
                      </dt>
                      <dd>{etudiantsLicenceEntity.pjBac}</dd>
                      <dt>
                        <span id="mention">
                          <Translate contentKey="pfumApp.etudiantsLicence.mention">Mention</Translate>
                        </span>
                      </dt>
                      <dd>{etudiantsLicenceEntity.mention}</dd>
                      <dt>
                        <span id="anneOtention">
                          <Translate contentKey="pfumApp.etudiantsLicence.anneOtention">Année d'otention</Translate>
                        </span>
                      </dt>
                      <dd>{etudiantsLicenceEntity.anneeObtention}</dd>
                      <dt>
                        <Translate contentKey="pfumApp.etudiantsLicence.filiere">Filiere</Translate>
                      </dt>
                      <dd>{etudiantsLicenceEntity.filiere ? etudiantsLicenceEntity.filiere.nomfiliere : ''}</dd>
                    </dl>
                  </section>
                </Col>
              </Row>
            </>
          )}

          {this.props.match.params.bloc == 'mesresultats' && (
            <>
              {' '}
              <Row>
                <Col md="10">
                  <section className="fieldset">
                    <h1>Mes résultats</h1>
                    <br />
                    <dl className="jh-entity-details" style={{ marginLeft: '85px' }} />
                    <div style={{ textAlign: 'center' }}>
                      {' '}
                      <b>Ce contenu sera disponible ultérieurement</b>
                    </div>
                  </section>
                </Col>
              </Row>
            </>
          )}
          {this.props.match.params.bloc == 'calendrierexamen' && (
            <>
              {' '}
              <Row>
                <Col md="10">
                  <section className="fieldset">
                    <h1>Mon calendrier examens</h1>
                    <br />
                    <dl className="jh-entity-details" style={{ marginLeft: '85px' }}>
                      {calendrierExamens &&
                        calendrierExamens.length > 0 &&
                        calendrierExamens.map((calendrier, i) => (
                          <>
                            <dt>
                              <span id="module">Module :</span>
                            </dt>
                            <dd>{calendrier.module.nomModule}</dd>
                            <dt>
                              <span id="pjBac">Date de contrôle continu 1:</span>
                            </dt>
                            <dd>
                              <TextFormat value={calendrier.dateControlContinu1} type="date" format={APP_DATE_FORMAT} />
                            </dd>
                            <dt>
                              <span id="pjBac">Date de contrôle continu 2:</span>
                            </dt>
                            <dd>
                              <TextFormat value={calendrier.dateControlContinu2} type="date" format={APP_DATE_FORMAT} />
                            </dd>

                            <b>
                              <hr />
                            </b>
                          </>
                        ))}
                    </dl>
                  </section>
                </Col>
              </Row>
            </>
          )}
          {this.props.match.params.bloc == 'inscription' && (
            <>
              <Row>
                <Col md="10">
                  <section className="fieldset">
                    <h1>Piéces jointes</h1>
                    <br />

                    <dl className="jh-entity-details" style={{ marginLeft: '85px' }}>
                      <dt>
                        <span id="bacalaureat">
                          <Translate contentKey="pfumApp.etudiantsLicence.bacalaureat">Bacalaureat</Translate>
                        </span>
                      </dt>
                      <dd>
                        {etudiantsLicenceEntity.bacalaureat ? (
                          <div>
                            <a onClick={openFile(etudiantsLicenceEntity.bacalaureatContentType, etudiantsLicenceEntity.bacalaureat)}>
                              <img
                                src={`data:${etudiantsLicenceEntity.bacalaureatContentType};base64,${etudiantsLicenceEntity.bacalaureat}`}
                                style={{ maxHeight: '30px' }}
                              />
                            </a>
                            <span>
                              {etudiantsLicenceEntity.bacalaureatContentType}, {byteSize(etudiantsLicenceEntity.bacalaureat)}
                            </span>
                          </div>
                        ) : null}
                      </dd>
                      <dt>
                        <span id="testAdmission">Test d'admission</span>
                      </dt>
                      <dd>
                        {etudiantsLicenceEntity.testAdmission ? (
                          <div>
                            <a onClick={openFile(etudiantsLicenceEntity.testAdmissionContentType, etudiantsLicenceEntity.testAdmission)}>
                              <img
                                src={`data:${etudiantsLicenceEntity.testAdmissionContentType};base64,${
                                  etudiantsLicenceEntity.testAdmission
                                }`}
                                style={{ maxHeight: '30px' }}
                              />
                            </a>
                            <span>
                              {etudiantsLicenceEntity.testAdmissionContentType}, {byteSize(etudiantsLicenceEntity.testAdmission)}
                            </span>
                          </div>
                        ) : null}
                      </dd>
                      <dt>
                        <span id="relevesNotes">Relevé des Notes</span>
                      </dt>
                      <dd>
                        {etudiantsLicenceEntity.relevesNotes ? (
                          <div>
                            <a onClick={openFile(etudiantsLicenceEntity.relevesNotesContentType, etudiantsLicenceEntity.relevesNotes)}>
                              <img
                                src={`data:${etudiantsLicenceEntity.relevesNotesContentType};base64,${etudiantsLicenceEntity.relevesNotes}`}
                                style={{ maxHeight: '30px' }}
                              />
                            </a>
                            <span>
                              {etudiantsLicenceEntity.relevesNotesContentType}, {byteSize(etudiantsLicenceEntity.relevesNotes)}
                            </span>
                          </div>
                        ) : null}
                      </dd>
                      <dt>
                        <span id="cinPassport">
                          <Translate contentKey="pfumApp.etudiantsLicence.cinPassport">Cin Passport</Translate>
                        </span>
                      </dt>
                      <dd>
                        {etudiantsLicenceEntity.cinPassport ? (
                          <div>
                            <a onClick={openFile(etudiantsLicenceEntity.cinPassportContentType, etudiantsLicenceEntity.cinPassport)}>
                              <img
                                src={`data:${etudiantsLicenceEntity.cinPassportContentType};base64,${etudiantsLicenceEntity.cinPassport}`}
                                style={{ maxHeight: '30px' }}
                              />
                            </a>
                            <span>
                              {etudiantsLicenceEntity.cinPassportContentType}, {byteSize(etudiantsLicenceEntity.cinPassport)}
                            </span>
                          </div>
                        ) : null}
                      </dd>
                    </dl>
                  </section>
                </Col>
              </Row>
            </>
          )}
          {this.props.match.params.bloc == 'emploidutemps' && (
            <>
              <Row>
                <Col md="10">
                  <section className="fieldset">
                    <h1>Emploi de temps et Avis</h1>
                    <br />
                    <dl className="jh-entity-details" style={{ marginLeft: '85px' }}>
                      {documentList &&
                        documentList.length > 0 &&
                        documentList.map((document, i) => (
                          <>
                            <dt>
                              <span id={document.titre} />
                            </dt>
                            <dd>
                              <div key={`entity-${i}`}>
                                {document.data ? (
                                  <div>
                                    <a onClick={openFile(document.dataContentType, document.data)}>
                                      <FontAwesomeIcon icon="file-pdf" />
                                      {document.titre}
                                      &nbsp;
                                    </a>
                                    <span id={document.titre}>
                                      {document.dataContentType}, {byteSize(document.data)}
                                    </span>
                                  </div>
                                ) : null}
                              </div>
                            </dd>
                          </>
                        ))}
                    </dl>
                  </section>
                </Col>
              </Row>{' '}
            </>
          )}
          {this.props.match.params.bloc == 'envoiedemande' && (
            <>
              <Row>
                <Col md="10">
                  <section className="fieldset">
                    <h1>Envoi Demande</h1>
                    <br />

                    <dl className="jh-entity-details" style={{ marginLeft: '85px' }}>
                      <AvForm onValidSubmit={this.handleEnvoyerMail}>
                        <AvGroup>
                          <Label id="sujetLabel" for="etudiants-executif-sujet">
                            Objet:
                          </Label>
                          <AvField
                            id="etudiants-executif-sujet"
                            type="text"
                            name="sujet"
                            validate={{
                              required: { value: true, errorMessage: translate('entity.validation.required') }
                            }}
                          />
                        </AvGroup>
                        <AvGroup>
                          <Label id="corpsLabel" for="suivi-module-corps">
                            Contenu :{' '}
                          </Label>
                          <AvInput
                            rows="10"
                            id="suivi-module-corps"
                            type="textarea"
                            name="corps"
                            validate={{
                              required: { value: true, errorMessage: translate('entity.validation.required') }
                            }}
                          />
                        </AvGroup>
                        <Button color="success" type="submit">
                          Envoyer
                        </Button>
                      </AvForm>
                    </dl>
                  </section>
                </Col>
              </Row>
            </>
          )}
          <Row>
            <Col md="6">
              <div style={{ float: 'right', display: 'inline-block' }}>
                <Button tag={Link} to="/entity/espace-etudiant/licence/profil" replace color="info">
                  <FontAwesomeIcon icon="arrow-left" />{' '}
                  <span className="d-none d-md-inline">
                    <Translate contentKey="entity.action.back">Back</Translate>
                  </span>
                </Button>
              </div>
            </Col>
          </Row>
          <br />
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ etudiantsLicence, authentication, document, calendrierModule }: IRootState) => ({
  etudiantsLicenceEntity: etudiantsLicence.entity,
  documentList: document.entities,
  calendrierExamens: calendrierModule.entities
});

const mapDispatchToProps = { getDocuments, envoyerMail, getEntityDetail, getCalendrierExamens };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EspaceEtudiantsLicence);
