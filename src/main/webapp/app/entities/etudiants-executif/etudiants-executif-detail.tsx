
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
import { getEntity } from './etudiants-executif.reducer';
import { IEtudiantsExecutif } from 'app/shared/model/etudiants-executif.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IEtudiantsExecutifDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class EtudiantsExecutifDetail extends React.Component<IEtudiantsExecutifDetailProps> {
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
    const { etudiantsExecutifEntity } = this.props;
    return (
      <div>
        <Row>
          <div>
            <Row>
              <Col md="6">
                <span className="badge badge-warning">Informations personnelles</span>
                <h2>
                  N° Etudiant : [<b>{etudiantsExecutifEntity.suffixe}</b>]
                </h2>
                <dl className="jh-entity-details">
                  <dt>
                    <span id="nom">
                      <Translate contentKey="pfumv10App.etudiantsExecutif.nom">Nom</Translate>
                    </span>
                  </dt>
                  <dd>{etudiantsExecutifEntity.nom}</dd>
                  <dt>
                    <span id="prenom">
                      <Translate contentKey="pfumv10App.etudiantsExecutif.prenom">Prenom</Translate>
                    </span>
                  </dt>
                  <dd>{etudiantsExecutifEntity.prenom}</dd>
                  <dt>
                    <span id="dateNaissance">
                      <Translate contentKey="pfumv10App.etudiantsExecutif.dateNaissance">Date Naissance</Translate>
                    </span>
                  </dt>
                  <dd>
                    <TextFormat value={etudiantsExecutifEntity.dateNaissance} type="date" format={APP_DATE_FORMAT} />
                  </dd>
                  <dt>
                    <span id="adresseContact">
                      <Translate contentKey="pfumv10App.etudiantsExecutif.adresseContact">Adresse Contact</Translate>
                    </span>
                  </dt>
                  <dd>{etudiantsExecutifEntity.adresseContact}</dd>
                  <dt>
                    <span id="ville">
                      <Translate contentKey="pfumv10App.etudiantsExecutif.ville">Ville</Translate>
                    </span>
                  </dt>
                  <dd>{etudiantsExecutifEntity.ville}</dd>
                  <dt>
                    <span id="email">
                      <Translate contentKey="pfumv10App.etudiantsExecutif.email">Email</Translate>
                    </span>
                  </dt>
                  <dd>{etudiantsExecutifEntity.email}</dd>

                  <dt>
                    <span id="cinPass">
                      <Translate contentKey="pfumv10App.etudiantsExecutif.cinPass">Cin Pass</Translate>
                    </span>
                  </dt>
                  <dd>{etudiantsExecutifEntity.cinPass}</dd>
                  <dt>
                    <span id="paysNationalite">
                      <Translate contentKey="pfumv10App.etudiantsExecutif.paysNationalite">Pays Nationalite</Translate>
                    </span>
                  </dt>
                  <dd>{etudiantsExecutifEntity.paysNationalite}</dd>
                </dl>
              </Col>
              <Col md="6">
                <span className="badge badge-warning">Informations filiére</span>
                <dt>
                  <span id="photo">
                    <Translate contentKey="pfumv10App.etudiantsExecutif.photo">Photo</Translate>
                  </span>
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
                <dt>
                  <Translate contentKey="pfumv10App.etudiantsExecutif.anneeInscription">Annee Inscription</Translate>
                </dt>
                <dd>{etudiantsExecutifEntity.anneeInscription ? etudiantsExecutifEntity.anneeInscription.annee : ''}</dd>
                <dt>
                  <span id="pjBac">Intitulé d'un bac :</span>
                </dt>
                <dd>{etudiantsExecutifEntity.pjBac}</dd>
                <dt>
                  <span id="mention">
                    <Translate contentKey="pfumv10App.etudiantsExecutif.mention">Mention</Translate>
                  </span>
                </dt>
                <dd>{etudiantsExecutifEntity.mention}</dd>
                <dt>
                  <Translate contentKey="pfumv10App.etudiantsExecutif.filiere">Filiere</Translate>
                </dt>
                <dd>{etudiantsExecutifEntity.filiere ? etudiantsExecutifEntity.filiere.nomfiliere : ''}</dd>

                <dt>
                  <span id="paysResidence">
                    <Translate contentKey="pfumv10App.etudiantsExecutif.paysResidence">Pays Residence</Translate>
                  </span>
                </dt>
                <dd>{etudiantsExecutifEntity.paysResidence}</dd>
                <dt>
                  <span id="codepostal">
                    <Translate contentKey="pfumv10App.etudiantsExecutif.codepostal">Codepostal</Translate>
                  </span>
                </dt>
                <dd>{etudiantsExecutifEntity.codepostal}</dd>
                <dt>
                  <span id="province">
                    <Translate contentKey="pfumv10App.etudiantsExecutif.province">Province</Translate>
                  </span>
                </dt>
                <dd>{etudiantsExecutifEntity.province}</dd>
                <dt>
                  <span id="tel">
                    <Translate contentKey="pfumv10App.etudiantsExecutif.tel">Tel</Translate>
                  </span>
                </dt>
                <dd>{etudiantsExecutifEntity.tel}</dd>
              </Col>
            </Row>
          </div>
          <div>
            <Row>
              <Col>
                <span className="badge badge-warning">Piéces jointes</span>
                <dt>
                  <span id="extraitActeNaissance">
                    <Translate contentKey="pfumv10App.etudiantsExecutif.extraitActeNaissance">Extrait Acte Naissance</Translate>
                  </span>
                </dt>
                <dd>
                  {etudiantsExecutifEntity.extraitActeNaissance ? (
                    <div>
                      <a
                        onClick={openFile(
                          etudiantsExecutifEntity.extraitActeNaissanceContentType,
                          etudiantsExecutifEntity.extraitActeNaissance
                        )}
                      >
                        <img
                          src={`data:${etudiantsExecutifEntity.extraitActeNaissanceContentType};base64,${
                            etudiantsExecutifEntity.extraitActeNaissance
                          }`}
                          style={{ maxHeight: '30px' }}
                        />
                      </a>
                      <span>
                        {etudiantsExecutifEntity.extraitActeNaissanceContentType}, {byteSize(etudiantsExecutifEntity.extraitActeNaissance)}
                      </span>
                    </div>
                  ) : null}
                </dd>
                <dt>
                  <span id="bacalaureat">
                    <Translate contentKey="pfumv10App.etudiantsExecutif.bacalaureat">Bacalaureat</Translate>
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
                    <Translate contentKey="pfumv10App.etudiantsExecutif.cinPassport">Cin Passport</Translate>
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
                    <Translate contentKey="pfumv10App.etudiantsExecutif.diplome">Diplome</Translate>
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
              </Col>
            </Row>
          </div>
          <div>
            <Row>
              <Col>
                <span className="badge badge-warning">Status d'inscription</span>
                <dt>
                  <span id="inscriptionvalide">Validation inscription</span>
                </dt>
                <dd>
                  {etudiantsExecutifEntity.inscriptionvalide ? (
                    <Button color="success">Validé</Button>
                  ) : (
                    <Button color="danger">En attente</Button>
                  )}
                </dd>
                <dt>
                  <Translate contentKey="pfumv10App.etudiantsExecutif.modalite">Modalite</Translate>
                </dt>
                <dd>{etudiantsExecutifEntity.modalite ? etudiantsExecutifEntity.modalite.modalite : ''}</dd>
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
                <Button tag={Link} to="/entity/etudiants-executif" replace color="info">
                  <FontAwesomeIcon icon="arrow-left" />{' '}
                  <span className="d-none d-md-inline">
                    <Translate contentKey="entity.action.back">Back</Translate>
                  </span>
                </Button>
                &nbsp;
                <Button tag={Link} to={`/entity/etudiants-executif/${etudiantsExecutifEntity.id}/edit`} replace color="primary">
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

const mapStateToProps = ({ etudiantsExecutif }: IRootState) => ({
  etudiantsExecutifEntity: etudiantsExecutif.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EtudiantsExecutifDetail);
