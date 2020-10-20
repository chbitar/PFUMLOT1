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

  render() {
    const { etudiantsExecutifEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            <Translate contentKey="pfumv10App.etudiantsExecutif.detail.title">EtudiantsExecutif</Translate> [
            <b>{etudiantsExecutifEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="suffixe">
                <Translate contentKey="pfumv10App.etudiantsExecutif.suffixe">Suffixe</Translate>
              </span>
            </dt>
            <dd>{etudiantsExecutifEntity.suffixe}</dd>
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
              <span id="pjBac">
                <Translate contentKey="pfumv10App.etudiantsExecutif.pjBac">Pj Bac</Translate>
              </span>
            </dt>
            <dd>{etudiantsExecutifEntity.pjBac}</dd>
            <dt>
              <span id="mention">
                <Translate contentKey="pfumv10App.etudiantsExecutif.mention">Mention</Translate>
              </span>
            </dt>
            <dd>{etudiantsExecutifEntity.mention}</dd>
            <dt>
              <span id="anneeObtention">
                <Translate contentKey="pfumv10App.etudiantsExecutif.anneeObtention">Annee Obtention</Translate>
              </span>
            </dt>
            <dd>{etudiantsExecutifEntity.anneeObtention}</dd>
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
            <dt>
              <span id="deuxiemetel">
                <Translate contentKey="pfumv10App.etudiantsExecutif.deuxiemetel">Deuxiemetel</Translate>
              </span>
            </dt>
            <dd>{etudiantsExecutifEntity.deuxiemetel}</dd>
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
                      style={{ maxHeight: '30px' }}
                    />
                  </a>
                  <span>
                    {etudiantsExecutifEntity.photoContentType}, {byteSize(etudiantsExecutifEntity.photo)}
                  </span>
                </div>
              ) : null}
            </dd>
            <dt>
              <span id="cv">
                <Translate contentKey="pfumv10App.etudiantsExecutif.cv">Cv</Translate>
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
              <span id="attestationTravail">
                <Translate contentKey="pfumv10App.etudiantsExecutif.attestationTravail">Attestation Travail</Translate>
              </span>
            </dt>
            <dd>
              {etudiantsExecutifEntity.attestationTravail ? (
                <div>
                  <a onClick={openFile(etudiantsExecutifEntity.attestationTravailContentType, etudiantsExecutifEntity.attestationTravail)}>
                    <img
                      src={`data:${etudiantsExecutifEntity.attestationTravailContentType};base64,${
                        etudiantsExecutifEntity.attestationTravail
                      }`}
                      style={{ maxHeight: '30px' }}
                    />
                  </a>
                  <span>
                    {etudiantsExecutifEntity.attestationTravailContentType}, {byteSize(etudiantsExecutifEntity.attestationTravail)}
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
            <dt>
              <span id="testAdmission">
                <Translate contentKey="pfumv10App.etudiantsExecutif.testAdmission">Test Admission</Translate>
              </span>
            </dt>
            <dd>
              {etudiantsExecutifEntity.testAdmission ? (
                <div>
                  <a onClick={openFile(etudiantsExecutifEntity.testAdmissionContentType, etudiantsExecutifEntity.testAdmission)}>
                    <img
                      src={`data:${etudiantsExecutifEntity.testAdmissionContentType};base64,${etudiantsExecutifEntity.testAdmission}`}
                      style={{ maxHeight: '30px' }}
                    />
                  </a>
                  <span>
                    {etudiantsExecutifEntity.testAdmissionContentType}, {byteSize(etudiantsExecutifEntity.testAdmission)}
                  </span>
                </div>
              ) : null}
            </dd>
            <dt>
              <span id="releveeNote">
                <Translate contentKey="pfumv10App.etudiantsExecutif.releveeNote">Relevee Note</Translate>
              </span>
            </dt>
            <dd>
              {etudiantsExecutifEntity.releveeNote ? (
                <div>
                  <a onClick={openFile(etudiantsExecutifEntity.releveeNoteContentType, etudiantsExecutifEntity.releveeNote)}>
                    <img
                      src={`data:${etudiantsExecutifEntity.releveeNoteContentType};base64,${etudiantsExecutifEntity.releveeNote}`}
                      style={{ maxHeight: '30px' }}
                    />
                  </a>
                  <span>
                    {etudiantsExecutifEntity.releveeNoteContentType}, {byteSize(etudiantsExecutifEntity.releveeNote)}
                  </span>
                </div>
              ) : null}
            </dd>
            <dt>
              <span id="inscriptionvalide">
                <Translate contentKey="pfumv10App.etudiantsExecutif.inscriptionvalide">Inscriptionvalide</Translate>
              </span>
            </dt>
            <dd>{etudiantsExecutifEntity.inscriptionvalide ? 'true' : 'false'}</dd>
            <dt>
              <span id="absent">
                <Translate contentKey="pfumv10App.etudiantsExecutif.absent">Absent</Translate>
              </span>
            </dt>
            <dd>{etudiantsExecutifEntity.absent ? 'true' : 'false'}</dd>
            <dt>
              <Translate contentKey="pfumv10App.etudiantsExecutif.user">User</Translate>
            </dt>
            <dd>{etudiantsExecutifEntity.user ? etudiantsExecutifEntity.user.id : ''}</dd>
            <dt>
              <Translate contentKey="pfumv10App.etudiantsExecutif.filiere">Filiere</Translate>
            </dt>
            <dd>{etudiantsExecutifEntity.filiere ? etudiantsExecutifEntity.filiere.id : ''}</dd>
            <dt>
              <Translate contentKey="pfumv10App.etudiantsExecutif.anneeInscription">Annee Inscription</Translate>
            </dt>
            <dd>{etudiantsExecutifEntity.anneeInscription ? etudiantsExecutifEntity.anneeInscription.id : ''}</dd>
            <dt>
              <Translate contentKey="pfumv10App.etudiantsExecutif.modalite">Modalite</Translate>
            </dt>
            <dd>{etudiantsExecutifEntity.modalite ? etudiantsExecutifEntity.modalite.id : ''}</dd>
          </dl>
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
