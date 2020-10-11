

import axios from 'axios';
import fileDownload from 'react-file-download';
import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAction, openFile, byteSize, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './etudiants-licence.reducer';
import { IEtudiantsLicence } from 'app/shared/model/etudiants-licence.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IEtudiantsLicenceDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class EtudiantsLicenceDetail extends React.Component<IEtudiantsLicenceDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  handlePaymentSelect = () => () => {
    const requestUrl = `/api/orders/${this.props.match.params.id}/PDF`;
    axios.get(requestUrl, {
      responseType: 'blob',
    }).then(res => {
      fileDownload(res.data, "attestation.pdf");
    }); 
  
    };
    
  render() {
    const { etudiantsLicenceEntity } = this.props;
    return (
      <div>
        <Row>
          <div>
            <Row>
              <Col md="6">
                <span className="badge badge-warning">Informations personnelles</span>
                <h2>
                  N° Etudiant : [<b>{etudiantsLicenceEntity.suffixe}</b>]
                </h2>
                <dl className="jh-entity-details">
                  <dt>
                    <span id="nom">
                      <Translate contentKey="pfumv10App.etudiantsLicence.nom">Nom</Translate>
                    </span>
                  </dt>
                  <dd>{etudiantsLicenceEntity.nom}</dd>
                  <dt>
                    <span id="prenom">
                      <Translate contentKey="pfumv10App.etudiantsLicence.prenom">Prenom</Translate>
                    </span>
                  </dt>
                  <dd>{etudiantsLicenceEntity.prenom}</dd>
                  <dt>
                    <span id="dateNaissance">
                      <Translate contentKey="pfumv10App.etudiantsLicence.dateNaissance">Date Naissance</Translate>
                    </span>
                  </dt>
                  <dd>
                    <TextFormat value={etudiantsLicenceEntity.dateNaissance} type="date" format={APP_DATE_FORMAT} />
                  </dd>
                  <dt>
                    <span id="adresseContact">
                      <Translate contentKey="pfumv10App.etudiantsLicence.adresseContact">Adresse Contact</Translate>
                    </span>
                  </dt>
                  <dd>{etudiantsLicenceEntity.adresseContact}</dd>
                  <dt>
                    <span id="ville">
                      <Translate contentKey="pfumv10App.etudiantsLicence.ville">Ville</Translate>
                    </span>
                  </dt>
                  <dd>{etudiantsLicenceEntity.ville}</dd>
                  <dt>
                    <span id="email">
                      <Translate contentKey="pfumv10App.etudiantsLicence.email">Email</Translate>
                    </span>
                  </dt>
                  <dd>{etudiantsLicenceEntity.email}</dd>
                  <dt>
                    <span id="cinPass">
                      <Translate contentKey="pfumv10App.etudiantsLicence.cinPass">Cin Pass</Translate>
                    </span>
                  </dt>
                  <dd>{etudiantsLicenceEntity.cinPass}</dd>
                  <dt>
                    <span id="codepostal">
                      <Translate contentKey="pfumv10App.etudiantsLicence.codepostal">Codepostal</Translate>
                    </span>
                  </dt>
                  <dd>{etudiantsLicenceEntity.codepostal}</dd>
                </dl>
              </Col>
              <Col md="6">
                <span className="badge badge-warning">Informations filiére</span>
                <dt>
                  <span id="photo">
                    <Translate contentKey="pfumv10App.etudiantsLicence.photo">Photo</Translate>
                  </span>
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
                <dt>
                  <Translate contentKey="pfumv10App.etudiantsLicence.anneeInscription">Annee Inscription</Translate>
                </dt>
                <dd>{etudiantsLicenceEntity.anneeInscription ? etudiantsLicenceEntity.anneeInscription.annee : ''}</dd>
                <dt>
                  <span id="pjBac">Intitulé d'un bac :</span>
                </dt>
                <dd>{etudiantsLicenceEntity.pjBac}</dd>
                <dt>
                  <span id="mention">
                    <Translate contentKey="pfumv10App.etudiantsLicence.mention">Mention</Translate>
                  </span>
                </dt>
                <dd>{etudiantsLicenceEntity.mention}</dd>
                <dt>
                  <Translate contentKey="pfumv10App.etudiantsLicence.filiere">Filiere</Translate>
                </dt>
                <dd>{etudiantsLicenceEntity.filiere ? etudiantsLicenceEntity.filiere.nomfiliere : ''}</dd>
                <dt>
                  <span id="paysResidence">
                    <Translate contentKey="pfumv10App.etudiantsLicence.paysResidence">Pays Residence</Translate>
                  </span>
                </dt>
                <dd>{etudiantsLicenceEntity.paysResidence}</dd>

                <dt>
                  <span id="province">
                    <Translate contentKey="pfumv10App.etudiantsLicence.province">Province</Translate>
                  </span>
                </dt>
                <dd>{etudiantsLicenceEntity.province}</dd>
                <dt>
                  <span id="tel">
                    <Translate contentKey="pfumv10App.etudiantsLicence.tel">Tel</Translate>
                  </span>
                </dt>
                <dd>{etudiantsLicenceEntity.tel}</dd>
              </Col>
            </Row>
          </div>
          <div>
            <Row>
              <Col>
                <span className="badge badge-warning">Piéces jointes</span>
                <dt>
                  <span id="extraitActeNaissance">
                    <Translate contentKey="pfumv10App.etudiantsLicence.extraitActeNaissance">Extrait Acte Naissance</Translate>
                  </span>
                </dt>
                <dd>
                  {etudiantsLicenceEntity.extraitActeNaissance ? (
                    <div>
                      <a
                        onClick={openFile(
                          etudiantsLicenceEntity.extraitActeNaissanceContentType,
                          etudiantsLicenceEntity.extraitActeNaissance
                        )}
                      >
                        <img
                          src={`data:${etudiantsLicenceEntity.extraitActeNaissanceContentType};base64,${
                            etudiantsLicenceEntity.extraitActeNaissance
                          }`}
                          style={{ maxHeight: '30px' }}
                        />
                      </a>
                      <span>
                        {etudiantsLicenceEntity.extraitActeNaissanceContentType}, {byteSize(etudiantsLicenceEntity.extraitActeNaissance)}
                      </span>
                    </div>
                  ) : null}
                </dd>
                <dt>
                  <span id="bacalaureat">
                    <Translate contentKey="pfumv10App.etudiantsLicence.bacalaureat">Bacalaureat</Translate>
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
                  <span id="cinPassport">
                    <Translate contentKey="pfumv10App.etudiantsLicence.cinPassport">Cin Passport</Translate>
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
              </Col>
            </Row>
          </div>
          <div>
            <Row>
              <Col>
                <span className="badge badge-warning">Status d'inscription</span>
                <dt>
                  <span id="inscriptionvalide">
                    <Translate contentKey="pfumv10App.etudiantsLicence.inscriptionvalide">Inscriptionvalide</Translate>
                  </span>
                </dt>
                <dd>
                  {etudiantsLicenceEntity.inscriptionvalide ? (
                    <Button color="success">Validé</Button>
                  ) : (
                    <Button color="danger">En attente</Button>
                  )}
                </dd>
                <dt>
                  <Translate contentKey="pfumv10App.etudiantsLicence.modalite">Modalite</Translate>
                </dt>
                <dd>{etudiantsLicenceEntity.modalite ? etudiantsLicenceEntity.modalite.modalite : ''}</dd>

                <dd>
                  <Button color="info" onClick={this.handlePaymentSelect()}>Attestation d'inscription </Button>

                </dd>
                <dd>
                  <Button color="info">Badge</Button>
                </dd>
              </Col>
            </Row>
          </div>
          <div>
            <Row>
              &nbsp;
              <Col>
                <Button tag={Link} to="/entity/etudiants-licence" replace color="info">
                  <FontAwesomeIcon icon="arrow-left" />{' '}
                  <span className="d-none d-md-inline">
                    <Translate contentKey="entity.action.back">Back</Translate>
                  </span>
                </Button>
                &nbsp;
                <Button tag={Link} to={`/entity/etudiants-licence/${etudiantsLicenceEntity.id}/edit`} replace color="primary">
                  <FontAwesomeIcon icon="pencil-alt" />{' '}
                  <span className="d-none d-md-inline">
                    <Translate contentKey="entity.action.edit">Edit</Translate>
                  </span>
                </Button>
              </Col>
            </Row>
          </div>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = ({ etudiantsLicence }: IRootState) => ({
  etudiantsLicenceEntity: etudiantsLicence.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EtudiantsLicenceDetail);
