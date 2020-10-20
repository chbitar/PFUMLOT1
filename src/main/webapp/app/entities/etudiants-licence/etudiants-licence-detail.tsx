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

  render() {
    const { etudiantsLicenceEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            <Translate contentKey="pfumv10App.etudiantsLicence.detail.title">EtudiantsLicence</Translate> [
            <b>{etudiantsLicenceEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="suffixe">
                <Translate contentKey="pfumv10App.etudiantsLicence.suffixe">Suffixe</Translate>
              </span>
            </dt>
            <dd>{etudiantsLicenceEntity.suffixe}</dd>
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
              <span id="pjBac">
                <Translate contentKey="pfumv10App.etudiantsLicence.pjBac">Pj Bac</Translate>
              </span>
            </dt>
            <dd>{etudiantsLicenceEntity.pjBac}</dd>
            <dt>
              <span id="mention">
                <Translate contentKey="pfumv10App.etudiantsLicence.mention">Mention</Translate>
              </span>
            </dt>
            <dd>{etudiantsLicenceEntity.mention}</dd>
            <dt>
              <span id="anneOtention">
                <Translate contentKey="pfumv10App.etudiantsLicence.anneOtention">Anne Otention</Translate>
              </span>
            </dt>
            <dd>{etudiantsLicenceEntity.anneOtention}</dd>
            <dt>
              <span id="cinPass">
                <Translate contentKey="pfumv10App.etudiantsLicence.cinPass">Cin Pass</Translate>
              </span>
            </dt>
            <dd>{etudiantsLicenceEntity.cinPass}</dd>
            <dt>
              <span id="paysNationalite">
                <Translate contentKey="pfumv10App.etudiantsLicence.paysNationalite">Pays Nationalite</Translate>
              </span>
            </dt>
            <dd>{etudiantsLicenceEntity.paysNationalite}</dd>
            <dt>
              <span id="paysResidence">
                <Translate contentKey="pfumv10App.etudiantsLicence.paysResidence">Pays Residence</Translate>
              </span>
            </dt>
            <dd>{etudiantsLicenceEntity.paysResidence}</dd>
            <dt>
              <span id="codepostal">
                <Translate contentKey="pfumv10App.etudiantsLicence.codepostal">Codepostal</Translate>
              </span>
            </dt>
            <dd>{etudiantsLicenceEntity.codepostal}</dd>
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
            <dt>
              <span id="deuxiemeTel">
                <Translate contentKey="pfumv10App.etudiantsLicence.deuxiemeTel">Deuxieme Tel</Translate>
              </span>
            </dt>
            <dd>{etudiantsLicenceEntity.deuxiemeTel}</dd>
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
                      style={{ maxHeight: '30px' }}
                    />
                  </a>
                  <span>
                    {etudiantsLicenceEntity.photoContentType}, {byteSize(etudiantsLicenceEntity.photo)}
                  </span>
                </div>
              ) : null}
            </dd>
            <dt>
              <span id="extraitActeNaissance">
                <Translate contentKey="pfumv10App.etudiantsLicence.extraitActeNaissance">Extrait Acte Naissance</Translate>
              </span>
            </dt>
            <dd>
              {etudiantsLicenceEntity.extraitActeNaissance ? (
                <div>
                  <a
                    onClick={openFile(etudiantsLicenceEntity.extraitActeNaissanceContentType, etudiantsLicenceEntity.extraitActeNaissance)}
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
            <dt>
              <span id="inscriptionvalide">
                <Translate contentKey="pfumv10App.etudiantsLicence.inscriptionvalide">Inscriptionvalide</Translate>
              </span>
            </dt>
            <dd>{etudiantsLicenceEntity.inscriptionvalide ? 'true' : 'false'}</dd>
            <dt>
              <span id="absent">
                <Translate contentKey="pfumv10App.etudiantsLicence.absent">Absent</Translate>
              </span>
            </dt>
            <dd>{etudiantsLicenceEntity.absent ? 'true' : 'false'}</dd>
            <dt>
              <Translate contentKey="pfumv10App.etudiantsLicence.user">User</Translate>
            </dt>
            <dd>{etudiantsLicenceEntity.user ? etudiantsLicenceEntity.user.id : ''}</dd>
            <dt>
              <Translate contentKey="pfumv10App.etudiantsLicence.filiere">Filiere</Translate>
            </dt>
            <dd>{etudiantsLicenceEntity.filiere ? etudiantsLicenceEntity.filiere.id : ''}</dd>
            <dt>
              <Translate contentKey="pfumv10App.etudiantsLicence.anneeInscription">Annee Inscription</Translate>
            </dt>
            <dd>{etudiantsLicenceEntity.anneeInscription ? etudiantsLicenceEntity.anneeInscription.id : ''}</dd>
            <dt>
              <Translate contentKey="pfumv10App.etudiantsLicence.modalite">Modalite</Translate>
            </dt>
            <dd>{etudiantsLicenceEntity.modalite ? etudiantsLicenceEntity.modalite.id : ''}</dd>
          </dl>
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
