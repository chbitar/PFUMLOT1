import axios from 'axios';
import fileDownload from 'react-file-download';
import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, ICrudGetAction, openFile, byteSize, TextFormat, translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';
import { getEntity, envoyerMail } from './etudiants-licence.reducer';
import { IEtudiantsLicence } from 'app/shared/model/etudiants-licence.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT, AUTHORITIES } from 'app/config/constants';
import { hasAnyAuthority } from 'app/shared/auth/private-route';
import { getDocumentByTypeDocument as getDocuments } from 'app/entities/document/document.reducer';

export interface IEtudiantsLicenceDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class EtudiantsLicenceDetail extends React.Component<IEtudiantsLicenceDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
    this.props.getDocuments('LICENCE');
  }

  genererAttestationInscription = () => () => {
    const requestUrl = `/api/attestation/${this.props.match.params.id}/PDF/LICENCE`;
    axios
      .get(requestUrl, {
        responseType: 'blob'
      })
      .then(res => {
        fileDownload(res.data, 'attestation.pdf');
      });
  };
  genererBadge = () => () => {
    const requestUrl = `/api/badge/etudiant/${this.props.match.params.id}/PDF/LICENCE`;
    axios
      .get(requestUrl, {
        responseType: 'blob'
      })
      .then(res => {
        fileDownload(res.data, 'badge.pdf');
      });
  };

  handleEnvoyerMail = (event, values) => {
    this.props.envoyerMail(values.objet, values.sujet);
  };

  render() {
    const { etudiantsLicenceEntity, isUser, isRespFin, isAdmin, documentList } = this.props;

    return (
      <div>
        <div>
          <br />
          <Row>
            <Col md="6">
              <div style={{ float: 'right', display: 'inline-block' }}>
                {(isAdmin || isUser) && (
                  <dd>
                    <Button color="info" onClick={this.genererAttestationInscription()}>
                      Attestation d'inscription{' '}
                    </Button>
                  </dd>
                )}
              </div>

              <div style={{ float: 'right', display: 'inline-block', marginRight: '10px' }}>
                {(isAdmin || isUser) && (
                  <dd>
                    <Button color="info" onClick={this.genererBadge()}>
                      Badge
                    </Button>
                  </dd>
                )}
              </div>
            </Col>
          </Row>

          <br />
          <Row>
            <Col md="10">
              <section className="fieldset">
                <h1>Informations personnelles:</h1>
                <br />
                <Row>
                  <Col md="4">
                    <h6 style={{ marginLeft: '-30px' }}>
                      N° Etudiant : [<b>{etudiantsLicenceEntity.suffixe}</b>]
                    </h6>
                  </Col>
                  <Col md="4">
                    <h6 style={{ marginLeft: '-30px' }}>
                      Niveau d'inscription : [
                      <b>
                        <Translate contentKey={`pfumApp.Niveau.${etudiantsLicenceEntity.niveau}`} />
                        -BAC+3
                      </b>
                      ]
                    </h6>
                  </Col>
                  <Col md="4">
                    <h6 style={{ marginLeft: '-30px', marginTop: '-8px' }}>
                      Status: &nbsp; &nbsp;&nbsp; &nbsp;
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
                            src={`data:${etudiantsLicenceEntity.testAdmissionContentType};base64,${etudiantsLicenceEntity.testAdmission}`}
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
          </Row>
          <Row>
            <Col md="10">
              <section className="fieldset">
                <h1>Envoi Demande</h1>
                <br />

                <dl className="jh-entity-details" style={{ marginLeft: '85px' }}>
                  <AvForm onValidSubmit={this.handleEnvoyerMail}>
                    <AvGroup>
                      <Label id="sujetLabel" for="etudiants-executif-sujet">
                        Objet :
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
          <Row>
            <Col md="6">
              <div style={{ float: 'right', display: 'inline-block' }}>
                <Button tag={Link} to="/entity/etudiants-executif" replace color="info">
                  <FontAwesomeIcon icon="arrow-left" />{' '}
                  <span className="d-none d-md-inline">
                    <Translate contentKey="entity.action.back">Back</Translate>
                  </span>
                </Button>
                &nbsp;
                {(isAdmin || isUser) && (
                  <Button tag={Link} to={`/entity/etudiants-executif/${etudiantsLicenceEntity.id}/edit`} replace color="primary">
                    <FontAwesomeIcon icon="pencil-alt" />{' '}
                    <span className="d-none d-md-inline">
                      <Translate contentKey="entity.action.edit">Edit</Translate>
                    </span>
                  </Button>
                )}
              </div>
            </Col>
          </Row>
          <br />
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ etudiantsLicence, authentication, document }: IRootState) => ({
  etudiantsLicenceEntity: etudiantsLicence.entity,
  isAdmin: hasAnyAuthority(authentication.account.authorities, [AUTHORITIES.ADMIN]),
  isUser: hasAnyAuthority(authentication.account.authorities, [AUTHORITIES.USER]),
  isRespFin: hasAnyAuthority(authentication.account.authorities, [AUTHORITIES.ROLE_RESP_FINANCE]),
  documentList: document.entities
});

const mapDispatchToProps = { getEntity, envoyerMail, getDocuments };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EtudiantsLicenceDetail);
