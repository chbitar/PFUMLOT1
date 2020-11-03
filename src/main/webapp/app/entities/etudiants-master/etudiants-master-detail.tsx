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
import { getEntity, envoyerMail } from './etudiants-master.reducer';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT, AUTHORITIES } from 'app/config/constants';
import { hasAnyAuthority } from 'app/shared/auth/private-route';
import { getDocumentByTypeDocument as getDocuments } from 'app/entities/document/document.reducer';

export interface IEtudiantsMasterDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class EtudiantsMasterDetail extends React.Component<IEtudiantsMasterDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
    this.props.getDocuments('MASTER');
  }

  genererAttestationInscription = () => () => {
    const requestUrl = `/api/attestation/${this.props.match.params.id}/PDF/MASTER`;

    axios
      .get(requestUrl, {
        responseType: 'blob'
      })
      .then(res => {
        fileDownload(res.data, 'attestation.pdf');
      });
  };
  genererBadge = () => () => {
    const requestUrl = `/api/badge/etudiant/${this.props.match.params.id}/PDF/MASTER`;

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
    const { etudiantsMasterEntity, isUser, isRespFin, isAdmin, documentList } = this.props;

    return (
      <div>
        <Row>
          <div>
            <Row>
              <Col md="6">
                <span className="badge badge-warning">Informations personnelles</span>
                <h2>
                  N° Etudiant : [<b>{etudiantsMasterEntity.suffixe}</b>]
                </h2>
                <dl className="jh-entity-details">
                  <dt>
                    <span id="nom">
                      <Translate contentKey="pfumApp.etudiantsMaster.nom">Nom</Translate>
                    </span>
                  </dt>
                  <dd>{etudiantsMasterEntity.nom}</dd>
                  <dt>
                    <span id="prenom">
                      <Translate contentKey="pfumApp.etudiantsMaster.prenom">Prenom</Translate>
                    </span>
                  </dt>
                  <dd>{etudiantsMasterEntity.prenom}</dd>
                  <dt>
                    <span id="dateNaissance">
                      <Translate contentKey="pfumApp.etudiantsMaster.dateNaissance">Date Naissance</Translate>
                    </span>
                  </dt>
                  <dd>
                    <TextFormat value={etudiantsMasterEntity.dateNaissance} type="date" format={APP_DATE_FORMAT} />
                  </dd>
                  <dt>
                    <span id="adresseContact">
                      <Translate contentKey="pfumApp.etudiantsMaster.adresseContact">Adresse Contact</Translate>
                    </span>
                  </dt>
                  <dd>{etudiantsMasterEntity.adresseContact}</dd>
                  <dt>
                    <span id="ville">
                      <Translate contentKey="pfumApp.etudiantsMaster.ville">Ville</Translate>
                    </span>
                  </dt>
                  <dd>{etudiantsMasterEntity.ville}</dd>
                  <dt>
                    <span id="email">
                      <Translate contentKey="pfumApp.etudiantsMaster.email">Email</Translate>
                    </span>
                  </dt>
                  <dd>{etudiantsMasterEntity.email}</dd>
                  <dt>
                    <span id="cinPass">
                      <Translate contentKey="pfumApp.etudiantsMaster.cinPass">Cin Pass</Translate>
                    </span>
                  </dt>
                  <dd>{etudiantsMasterEntity.cinPass}</dd>
                  <dt>
                    <span id="codepostal">
                      <Translate contentKey="pfumApp.etudiantsMaster.codepostal">Codepostal</Translate>
                    </span>
                  </dt>
                  <dd>{etudiantsMasterEntity.codepostal}</dd>
                </dl>
              </Col>
              <Col md="6">
                <span className="badge badge-warning">Informations filiére</span>
                <dt>
                  <span id="photo">
                    <Translate contentKey="pfumApp.etudiantsMaster.photo">Photo</Translate>
                  </span>
                </dt>
                <dd>
                  {etudiantsMasterEntity.photo ? (
                    <div>
                      <a onClick={openFile(etudiantsMasterEntity.photoContentType, etudiantsMasterEntity.photo)}>
                        <img
                          src={`data:${etudiantsMasterEntity.photoContentType};base64,${etudiantsMasterEntity.photo}`}
                          style={{ maxHeight: '200px' }}
                        />
                      </a>
                    </div>
                  ) : null}
                </dd>
                <dt>
                  <span id="pjBac">Intitulé d'un bac :</span>
                </dt>
                <dd>{etudiantsMasterEntity.typeBac}</dd>
                <dt>
                  <span id="mention">
                    <Translate contentKey="pfumApp.etudiantsMaster.mention">Mention</Translate>
                  </span>
                </dt>
                <dd>{etudiantsMasterEntity.mention}</dd>
                <dt>
                  <span id="anneOtention">
                    <Translate contentKey="pfumApp.etudiantsMaster.anneOtention">Année Obtention</Translate>
                  </span>
                </dt>
                <dd>{etudiantsMasterEntity.anneeObtention}</dd>
                <dt>
                  <Translate contentKey="pfumApp.etudiantsMaster.filiere">Filiere</Translate>
                </dt>
                <dd>{etudiantsMasterEntity.filiere ? etudiantsMasterEntity.filiere.nomfiliere : ''}</dd>
                <dt>
                  <span id="paysResidence">
                    <Translate contentKey="pfumApp.etudiantsMaster.paysResidence">Pays Residence</Translate>
                  </span>
                </dt>
                <dd>{etudiantsMasterEntity.paysResidence}</dd>

                <dt>
                  <span id="province">
                    <Translate contentKey="pfumApp.etudiantsMaster.province">Province</Translate>
                  </span>
                </dt>
                <dd>{etudiantsMasterEntity.province}</dd>
                <dt>
                  <span id="tel">
                    <Translate contentKey="pfumApp.etudiantsMaster.tel">Tel</Translate>
                  </span>
                </dt>
                <dd>{etudiantsMasterEntity.tel}</dd>
                <dt>
                  <span id="deuxiemeTel">
                    <Translate contentKey="pfumApp.etudiantsMaster.deuxiemeTel">Deuxieme Tel</Translate>
                  </span>
                </dt>
                <dd>{etudiantsMasterEntity.deuxiemeTel}</dd>
              </Col>
            </Row>
          </div>
          <div>
            <Row>
              <Col>
                <span className="badge badge-warning">Piéces jointes</span>
                <dt>
                  <span id="extraitActeNaissance">
                    <Translate contentKey="pfumApp.etudiantsMaster.extraitActeNaissance">Extrait Acte Naissance</Translate>
                  </span>
                </dt>

                <dt>
                  <span id="bacalaureat">
                    <Translate contentKey="pfumApp.etudiantsMaster.bacalaureat">Bacalaureat</Translate>
                  </span>
                </dt>
                <dd>
                  {etudiantsMasterEntity.bacalaureat ? (
                    <div>
                      <a onClick={openFile(etudiantsMasterEntity.bacalaureatContentType, etudiantsMasterEntity.bacalaureat)}>
                        <img
                          src={`data:${etudiantsMasterEntity.bacalaureatContentType};base64,${etudiantsMasterEntity.bacalaureat}`}
                          style={{ maxHeight: '30px' }}
                        />
                      </a>
                      <span>
                        {etudiantsMasterEntity.bacalaureatContentType}, {byteSize(etudiantsMasterEntity.bacalaureat)}
                      </span>
                    </div>
                  ) : null}
                </dd>
                <dt>
                  <span id="testAdmission">
                    <Translate contentKey="pfumApp.etudiantsMaster.testAdmission">Test Admission</Translate>
                  </span>
                </dt>
                <dd>
                  {etudiantsMasterEntity.testAdmission ? (
                    <div>
                      <a onClick={openFile(etudiantsMasterEntity.testAdmissionContentType, etudiantsMasterEntity.testAdmission)}>
                        <img
                          src={`data:${etudiantsMasterEntity.testAdmissionContentType};base64,${etudiantsMasterEntity.testAdmission}`}
                          style={{ maxHeight: '30px' }}
                        />
                      </a>
                      <span>
                        {etudiantsMasterEntity.testAdmissionContentType}, {byteSize(etudiantsMasterEntity.testAdmission)}
                      </span>
                    </div>
                  ) : null}
                </dd>
                <dt>
                  <span id="relevesNotes">
                    <Translate contentKey="pfumApp.etudiantsMaster.relevesNotes">Releves Notes</Translate>
                  </span>
                </dt>
                <dd>
                  {etudiantsMasterEntity.relevesNotes ? (
                    <div>
                      <a onClick={openFile(etudiantsMasterEntity.relevesNotesContentType, etudiantsMasterEntity.relevesNotes)}>
                        <img
                          src={`data:${etudiantsMasterEntity.relevesNotesContentType};base64,${etudiantsMasterEntity.relevesNotes}`}
                          style={{ maxHeight: '30px' }}
                        />
                      </a>
                      <span>
                        {etudiantsMasterEntity.relevesNotesContentType}, {byteSize(etudiantsMasterEntity.relevesNotes)}
                      </span>
                    </div>
                  ) : null}
                </dd>
                <dt>
                  <span id="cinPassport">
                    <Translate contentKey="pfumApp.etudiantsMaster.cinPassport">Cin Passport</Translate>
                  </span>
                </dt>
                <dd>
                  {etudiantsMasterEntity.cinPassport ? (
                    <div>
                      <a onClick={openFile(etudiantsMasterEntity.cinPassportContentType, etudiantsMasterEntity.cinPassport)}>
                        <img
                          src={`data:${etudiantsMasterEntity.cinPassportContentType};base64,${etudiantsMasterEntity.cinPassport}`}
                          style={{ maxHeight: '30px' }}
                        />
                      </a>
                      <span>
                        {etudiantsMasterEntity.cinPassportContentType}, {byteSize(etudiantsMasterEntity.cinPassport)}
                      </span>
                    </div>
                  ) : null}
                </dd>
              </Col>
            </Row>
          </div>
          <div>
            <Row>
              <Col>
                <span className="badge badge-warning">Status d'inscription</span>
                <dt>
                  <span id="inscriptionniveau">Niveau d'inscription</span>
                </dt>
                <dd>
                  <Translate contentKey={`pfumApp.Niveau.${etudiantsMasterEntity.niveau}`} />
                </dd>
                <dt>
                  <span id="inscriptionvalide">Status</span>
                </dt>
                <dd>
                  {etudiantsMasterEntity.inscriptionvalide ? (
                    <Button color="success">Validé</Button>
                  ) : (
                    <Button color="danger">En attente</Button>
                  )}
                </dd>
                <dt>
                  <Translate contentKey="pfumApp.etudiantsMaster.modalite">Modalite</Translate>
                </dt>
                <dd>{etudiantsMasterEntity.modalite ? etudiantsMasterEntity.modalite.modalite : ''}</dd>
                {(isAdmin || isUser) && (
                  <dd>
                    <Button color="info" onClick={this.genererAttestationInscription()}>
                      Attestation d'inscription{' '}
                    </Button>
                  </dd>
                )}
                {(isAdmin || isUser) && (
                  <dd>
                    <Button color="info" onClick={this.genererBadge()}>
                      Badge
                    </Button>
                  </dd>
                )}
                <br />
                <br />
                <Button tag={Link} to="/entity/etudiants-master" replace color="info">
                  <FontAwesomeIcon icon="arrow-left" />{' '}
                  <span className="d-none d-md-inline">
                    <Translate contentKey="entity.action.back">Back</Translate>
                  </span>
                </Button>
                &nbsp;
                {(isAdmin || isUser) && (
                  <Button tag={Link} to={`/entity/etudiants-master/${etudiantsMasterEntity.id}/edit`} replace color="primary">
                    <FontAwesomeIcon icon="pencil-alt" />{' '}
                    <span className="d-none d-md-inline">
                      <Translate contentKey="entity.action.edit">Edit</Translate>
                    </span>
                  </Button>
                )}
              </Col>

              <Col md="6">
                <span className="badge badge-warning">Emploi du temps et Avis</span>
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
                              <span id={document.titre} />
                            </div>
                          ) : null}
                        </div>
                      </dd>
                    </>
                  ))}
              </Col>
            </Row>
          </div>
          <div>
            <Row>
              <Col>
                <dt />
                <dd>
                  <span className="badge badge-warning">Envoi Demande</span>

                  <div className="card border-primary">
                    <div className="card-header">Envoyer un E-mail</div>
                    <div className="card-body">
                      <AvForm onValidSubmit={this.handleEnvoyerMail}>
                        <AvGroup>
                          <Label id="objectLabel" for="etudiants-master-object">
                            Object :
                          </Label>
                          <AvField
                            id="etudiants-master-objet"
                            type="text"
                            name="objet"
                            validate={{
                              required: { value: true, errorMessage: translate('entity.validation.required') }
                            }}
                          />
                        </AvGroup>
                        <AvGroup>
                          <Label id="observationsLabel" for="suivi-module-observations">
                            Sujet :{' '}
                          </Label>
                          <AvInput
                            id="suivi-module-observations"
                            type="textarea"
                            name="sujet"
                            validate={{
                              required: { value: true, errorMessage: translate('entity.validation.required') }
                            }}
                          />
                        </AvGroup>
                        <Button color="success" type="submit">
                          <Translate contentKey="password.form.button">Save</Translate>
                        </Button>
                      </AvForm>
                    </div>
                  </div>
                </dd>
              </Col>
            </Row>
          </div>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = ({ etudiantsMaster, authentication, document }: IRootState) => ({
  etudiantsMasterEntity: etudiantsMaster.entity,
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
)(EtudiantsMasterDetail);
