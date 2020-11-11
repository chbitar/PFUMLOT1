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
import { getEntity, envoyerMail } from './etudiants-executif.reducer';
import { getDocumentByTypeDocument as getDocuments } from 'app/entities/document/document.reducer';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT, AUTHORITIES } from 'app/config/constants';
import { hasAnyAuthority } from 'app/shared/auth/private-route';
import value from '*.json';
import { relative } from 'path';

export interface IEtudiantsExecutifDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class EtudiantsExecutifDetail extends React.Component<IEtudiantsExecutifDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
    this.props.getDocuments('MASTER_EXECUTIF');
  }

  genererAttestationInscription = () => () => {
    const requestUrl = `/api/attestation/${this.props.match.params.id}/PDF/MASTER_EXECUTIF`;
    axios
      .get(requestUrl, {
        responseType: 'blob'
      })
      .then(res => {
        fileDownload(res.data, 'attestation.pdf');
      });
  };
  genererBadge = () => () => {
    const requestUrl = `/api/badge/etudiant/${this.props.match.params.id}/PDF/MASTER_EXECUTIF`;
    axios
      .get(requestUrl, {
        responseType: 'blob'
      })
      .then(res => {
        fileDownload(res.data, 'badge.pdf');
      });
  };

  handleEnvoyerMail = (event, values) => {
    this.props.envoyerMail(values.sujet, values.corps);
  };

  render() {
    const { etudiantsExecutifEntity, isUser, isRespFin, isAdmin, documentList } = this.props;
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
                    <h6>
                      N° Etudiant : [<b>{etudiantsExecutifEntity.suffixe}</b>]
                    </h6>
                  </Col>
                  <Col md="4">
                    <h6>
                      Niveau d'inscription : [
                      <b>
                        <Translate contentKey={`pfumApp.Niveau.${etudiantsExecutifEntity.niveau}`} />
                        -Master Exécutif
                      </b>
                      ]
                    </h6>
                  </Col>
                  <Col md="4">
                    <h6 style={{ marginLeft: '-30px', marginTop: '-8px' }}>
                      Status: &nbsp; &nbsp;&nbsp; &nbsp;
                      {etudiantsExecutifEntity.inscriptionvalide ? (
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
                          <dd>{etudiantsExecutifEntity.nom}</dd>
                        </Col>
                        <Col ms="4">
                          {' '}
                          <dt>
                            <span id="prenom">
                              <Translate contentKey="pfumApp.etudiantsExecutif.prenom">Prenom</Translate>
                            </span>
                          </dt>
                          <dd>{etudiantsExecutifEntity.prenom}</dd>
                        </Col>
                        <Col ms="4">
                          <dt>
                            <span id="dateNaissance">
                              <Translate contentKey="pfumApp.etudiantsExecutif.dateNaissance">Date Naissance</Translate>
                            </span>
                          </dt>
                          <dd>
                            <TextFormat value={etudiantsExecutifEntity.dateNaissance} type="date" format={APP_DATE_FORMAT} />
                          </dd>
                        </Col>
                      </Row>
                    </Col>

                    <Col ms="8">
                      <dt>
                        <span id="photo" />
                      </dt>
                      <dd>
                        {etudiantsExecutifEntity.photo ? (
                          <div>
                            <a onClick={openFile(etudiantsExecutifEntity.photoContentType, etudiantsExecutifEntity.photo)}>
                              <img
                                src={`data:${etudiantsExecutifEntity.photoContentType};base64,${etudiantsExecutifEntity.photo}`}
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
                      <dd>{etudiantsExecutifEntity.adresseContact}</dd>
                      <dt>
                        <span id="ville">
                          <Translate contentKey="pfumApp.etudiantsExecutif.ville">Ville</Translate>
                        </span>
                      </dt>
                      <dd>{etudiantsExecutifEntity.ville}</dd>
                      <dt>
                        <span id="email">
                          <Translate contentKey="pfumApp.etudiantsExecutif.email">Email</Translate>
                        </span>
                      </dt>
                      <dd>{etudiantsExecutifEntity.email}</dd>

                      <dt>
                        <span id="cinPass">
                          <Translate contentKey="pfumApp.etudiantsExecutif.cinPass">Cin Pass</Translate>
                        </span>
                      </dt>
                      <dd>{etudiantsExecutifEntity.cinPass}</dd>
                      <dt>
                        <span id="paysNationalite">
                          <Translate contentKey="pfumApp.etudiantsExecutif.paysNationalite">Pays Nationalite</Translate>
                        </span>
                      </dt>
                      <dd>{etudiantsExecutifEntity.paysNationalite}</dd>
                    </Col>
                    <Col md="4">
                      <dt>
                        <span id="paysResidence">
                          <Translate contentKey="pfumApp.etudiantsExecutif.paysResidence">Pays Residence</Translate>
                        </span>
                      </dt>
                      <dd>{etudiantsExecutifEntity.paysResidence}</dd>
                      <dt>
                        <span id="codepostal">
                          <Translate contentKey="pfumApp.etudiantsExecutif.codepostal">Codepostal</Translate>
                        </span>
                      </dt>
                      <dd>{etudiantsExecutifEntity.codepostal}</dd>
                      <dt>
                        <span id="province">
                          <Translate contentKey="pfumApp.etudiantsExecutif.province">Province</Translate>
                        </span>
                      </dt>
                      <dd>{etudiantsExecutifEntity.province}</dd>
                      <dt>
                        <span id="tel">
                          <Translate contentKey="pfumApp.etudiantsExecutif.tel">Tel</Translate>
                        </span>
                      </dt>
                      <dd>{etudiantsExecutifEntity.tel}</dd>
                      <dt>
                        <span id="deuxiemeTel">
                          <Translate contentKey="pfumApp.etudiantsExecutif.deuxiemeTel">Deuxieme Tel</Translate>
                        </span>
                      </dt>
                      <dd>{etudiantsExecutifEntity.deuxiemeTel}</dd>
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
                  <dd>{etudiantsExecutifEntity.pjBac}</dd>
                  <dt>
                    <span id="mention">
                      <Translate contentKey="pfumApp.etudiantsExecutif.mention">Mention</Translate>
                    </span>
                  </dt>
                  <dd>{etudiantsExecutifEntity.mention}</dd>
                  <dt>
                    <span id="anneOtention">
                      <Translate contentKey="pfumApp.etudiantsExecutif.anneOtention">Année d'obtention</Translate>
                    </span>
                  </dt>
                  <dd>{etudiantsExecutifEntity.anneeObtention}</dd>
                  <dt>
                    <Translate contentKey="pfumApp.etudiantsExecutif.filiere">Filiere</Translate>
                  </dt>
                  <dd>{etudiantsExecutifEntity.filiere ? etudiantsExecutifEntity.filiere.nomfiliere : ''}</dd>
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
                    <span id="cv">
                      <Translate contentKey="pfumApp.etudiantsExecutif.cv">Cv</Translate>
                    </span>
                  </dt>
                  <dd>
                    {etudiantsExecutifEntity.cv ? (
                      <div>
                        <a onClick={openFile(etudiantsExecutifEntity.cvContentType, etudiantsExecutifEntity.cv)}>
                          <img
                            src={`data:${etudiantsExecutifEntity.cvContentType};base64,${etudiantsExecutifEntity.cv}`}
                            style={{ maxHeight: '30px' }}
                          />
                        </a>
                        <span>
                          {etudiantsExecutifEntity.cvContentType}, {byteSize(etudiantsExecutifEntity.cv)}
                        </span>
                      </div>
                    ) : null}
                  </dd>
                  <dt>
                    <span id="autreDocument">
                      <Translate contentKey="pfumApp.etudiantsExecutif.autreDocument">Autre Document</Translate>
                    </span>
                  </dt>
                  <dd>
                    {etudiantsExecutifEntity.autreDocument ? (
                      <div>
                        <a onClick={openFile(etudiantsExecutifEntity.autreDocumentContentType, etudiantsExecutifEntity.autreDocument)}>
                          <Translate contentKey="entity.action.open">Open</Translate>&nbsp;
                        </a>
                        <span>
                          {etudiantsExecutifEntity.autreDocumentContentType}, {byteSize(etudiantsExecutifEntity.autreDocument)}
                        </span>
                      </div>
                    ) : null}
                  </dd>
                  <dt>
                    <span id="attestationDeTravail">
                      <Translate contentKey="pfumApp.etudiantsExecutif.attestationDeTravail">Attestation De Travail</Translate>
                    </span>
                  </dt>
                  <dd>
                    {etudiantsExecutifEntity.attestationDeTravail ? (
                      <div>
                        <a
                          onClick={openFile(
                            etudiantsExecutifEntity.attestationDeTravailContentType,
                            etudiantsExecutifEntity.attestationDeTravail
                          )}
                        >
                          <img
                            src={`data:${etudiantsExecutifEntity.attestationDeTravailContentType};base64,${
                              etudiantsExecutifEntity.attestationDeTravail
                            }`}
                            style={{ maxHeight: '30px' }}
                          />
                        </a>
                        <span>
                          {etudiantsExecutifEntity.attestationDeTravailContentType},{' '}
                          {byteSize(etudiantsExecutifEntity.attestationDeTravail)}
                        </span>
                      </div>
                    ) : null}
                  </dd>
                  <dt>
                    <span id="bacalaureat">
                      <Translate contentKey="pfumApp.etudiantsExecutif.bacalaureat">Bacalaureat</Translate>
                    </span>
                  </dt>
                  <dd>
                    {etudiantsExecutifEntity.bacalaureat ? (
                      <div>
                        <a onClick={openFile(etudiantsExecutifEntity.bacalaureatContentType, etudiantsExecutifEntity.bacalaureat)}>
                          <img
                            src={`data:${etudiantsExecutifEntity.bacalaureatContentType};base64,${etudiantsExecutifEntity.bacalaureat}`}
                            style={{ maxHeight: '30px' }}
                          />
                        </a>
                        <span>
                          {etudiantsExecutifEntity.bacalaureatContentType}, {byteSize(etudiantsExecutifEntity.bacalaureat)}
                        </span>
                      </div>
                    ) : null}
                  </dd>
                  <dt>
                    <span id="cinPassport">
                      <Translate contentKey="pfumApp.etudiantsExecutif.cinPassport">Cin Passport</Translate>
                    </span>
                  </dt>
                  <dd>
                    {etudiantsExecutifEntity.cinPassport ? (
                      <div>
                        <a onClick={openFile(etudiantsExecutifEntity.cinPassportContentType, etudiantsExecutifEntity.cinPassport)}>
                          <img
                            src={`data:${etudiantsExecutifEntity.cinPassportContentType};base64,${etudiantsExecutifEntity.cinPassport}`}
                            style={{ maxHeight: '30px' }}
                          />
                        </a>
                        <span>
                          {etudiantsExecutifEntity.cinPassportContentType}, {byteSize(etudiantsExecutifEntity.cinPassport)}
                        </span>
                      </div>
                    ) : null}
                  </dd>
                  <dt>
                    <span id="diplome">
                      <Translate contentKey="pfumApp.etudiantsExecutif.diplome">Diplome</Translate>
                    </span>
                  </dt>
                  <dd>
                    {etudiantsExecutifEntity.diplome ? (
                      <div>
                        <a onClick={openFile(etudiantsExecutifEntity.diplomeContentType, etudiantsExecutifEntity.diplome)}>
                          <img
                            src={`data:${etudiantsExecutifEntity.diplomeContentType};base64,${etudiantsExecutifEntity.diplome}`}
                            style={{ maxHeight: '30px' }}
                          />
                        </a>
                        <span>
                          {etudiantsExecutifEntity.diplomeContentType}, {byteSize(etudiantsExecutifEntity.diplome)}
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
                  <Button tag={Link} to={`/entity/etudiants-executif/${etudiantsExecutifEntity.id}/edit`} replace color="primary">
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

const mapStateToProps = ({ etudiantsExecutif, authentication, document }: IRootState) => ({
  etudiantsExecutifEntity: etudiantsExecutif.entity,
  isAdmin: hasAnyAuthority(authentication.account.authorities, [AUTHORITIES.ADMIN]),
  isUser: hasAnyAuthority(authentication.account.authorities, [AUTHORITIES.USER]),
  isRespFin: hasAnyAuthority(authentication.account.authorities, [AUTHORITIES.ROLE_RESP_FINANCE]),
  documentList: document.entities
});

const mapDispatchToProps = { getEntity, getDocuments, envoyerMail };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EtudiantsExecutifDetail);
