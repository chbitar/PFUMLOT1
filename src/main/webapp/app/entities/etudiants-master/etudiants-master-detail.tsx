import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAction, openFile, byteSize, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './etudiants-master.reducer';
import { IEtudiantsMaster } from 'app/shared/model/etudiants-master.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IEtudiantsMasterDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class EtudiantsMasterDetail extends React.Component<IEtudiantsMasterDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { etudiantsMasterEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            <Translate contentKey="pfumv10App.etudiantsMaster.detail.title">EtudiantsMaster</Translate> [<b>{etudiantsMasterEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="suffixe">
                <Translate contentKey="pfumv10App.etudiantsMaster.suffixe">Suffixe</Translate>
              </span>
            </dt>
            <dd>{etudiantsMasterEntity.suffixe}</dd>
            <dt>
              <span id="nom">
                <Translate contentKey="pfumv10App.etudiantsMaster.nom">Nom</Translate>
              </span>
            </dt>
            <dd>{etudiantsMasterEntity.nom}</dd>
            <dt>
              <span id="prenom">
                <Translate contentKey="pfumv10App.etudiantsMaster.prenom">Prenom</Translate>
              </span>
            </dt>
            <dd>{etudiantsMasterEntity.prenom}</dd>
            <dt>
              <span id="dateNaissance">
                <Translate contentKey="pfumv10App.etudiantsMaster.dateNaissance">Date Naissance</Translate>
              </span>
            </dt>
            <dd>
              <TextFormat value={etudiantsMasterEntity.dateNaissance} type="date" format={APP_DATE_FORMAT} />
            </dd>
            <dt>
              <span id="adresseContact">
                <Translate contentKey="pfumv10App.etudiantsMaster.adresseContact">Adresse Contact</Translate>
              </span>
            </dt>
            <dd>{etudiantsMasterEntity.adresseContact}</dd>
            <dt>
              <span id="ville">
                <Translate contentKey="pfumv10App.etudiantsMaster.ville">Ville</Translate>
              </span>
            </dt>
            <dd>{etudiantsMasterEntity.ville}</dd>
            <dt>
              <span id="email">
                <Translate contentKey="pfumv10App.etudiantsMaster.email">Email</Translate>
              </span>
            </dt>
            <dd>{etudiantsMasterEntity.email}</dd>
            <dt>
              <span id="typeBac">
                <Translate contentKey="pfumv10App.etudiantsMaster.typeBac">Type Bac</Translate>
              </span>
            </dt>
            <dd>{etudiantsMasterEntity.typeBac}</dd>
            <dt>
              <span id="mention">
                <Translate contentKey="pfumv10App.etudiantsMaster.mention">Mention</Translate>
              </span>
            </dt>
            <dd>{etudiantsMasterEntity.mention}</dd>
            <dt>
              <span id="anneeObtentionBac">
                <Translate contentKey="pfumv10App.etudiantsMaster.anneeObtentionBac">Annee Obtention Bac</Translate>
              </span>
            </dt>
            <dd>{etudiantsMasterEntity.anneeObtentionBac}</dd>
            <dt>
              <span id="releveeNoteBac">
                <Translate contentKey="pfumv10App.etudiantsMaster.releveeNoteBac">Relevee Note Bac</Translate>
              </span>
            </dt>
            <dd>
              {etudiantsMasterEntity.releveeNoteBac ? (
                <div>
                  <a onClick={openFile(etudiantsMasterEntity.releveeNoteBacContentType, etudiantsMasterEntity.releveeNoteBac)}>
                    <img
                      src={`data:${etudiantsMasterEntity.releveeNoteBacContentType};base64,${etudiantsMasterEntity.releveeNoteBac}`}
                      style={{ maxHeight: '30px' }}
                    />
                  </a>
                  <span>
                    {etudiantsMasterEntity.releveeNoteBacContentType}, {byteSize(etudiantsMasterEntity.releveeNoteBac)}
                  </span>
                </div>
              ) : null}
            </dd>
            <dt>
              <span id="cinPass">
                <Translate contentKey="pfumv10App.etudiantsMaster.cinPass">Cin Pass</Translate>
              </span>
            </dt>
            <dd>{etudiantsMasterEntity.cinPass}</dd>
            <dt>
              <span id="paysNationalite">
                <Translate contentKey="pfumv10App.etudiantsMaster.paysNationalite">Pays Nationalite</Translate>
              </span>
            </dt>
            <dd>{etudiantsMasterEntity.paysNationalite}</dd>
            <dt>
              <span id="paysResidence">
                <Translate contentKey="pfumv10App.etudiantsMaster.paysResidence">Pays Residence</Translate>
              </span>
            </dt>
            <dd>{etudiantsMasterEntity.paysResidence}</dd>
            <dt>
              <span id="codepostal">
                <Translate contentKey="pfumv10App.etudiantsMaster.codepostal">Codepostal</Translate>
              </span>
            </dt>
            <dd>{etudiantsMasterEntity.codepostal}</dd>
            <dt>
              <span id="province">
                <Translate contentKey="pfumv10App.etudiantsMaster.province">Province</Translate>
              </span>
            </dt>
            <dd>{etudiantsMasterEntity.province}</dd>
            <dt>
              <span id="tel">
                <Translate contentKey="pfumv10App.etudiantsMaster.tel">Tel</Translate>
              </span>
            </dt>
            <dd>{etudiantsMasterEntity.tel}</dd>
            <dt>
              <span id="deuxiemetel">
                <Translate contentKey="pfumv10App.etudiantsMaster.deuxiemetel">Deuxiemetel</Translate>
              </span>
            </dt>
            <dd>{etudiantsMasterEntity.deuxiemetel}</dd>
            <dt>
              <span id="photo">
                <Translate contentKey="pfumv10App.etudiantsMaster.photo">Photo</Translate>
              </span>
            </dt>
            <dd>
              {etudiantsMasterEntity.photo ? (
                <div>
                  <a onClick={openFile(etudiantsMasterEntity.photoContentType, etudiantsMasterEntity.photo)}>
                    <img
                      src={`data:${etudiantsMasterEntity.photoContentType};base64,${etudiantsMasterEntity.photo}`}
                      style={{ maxHeight: '30px' }}
                    />
                  </a>
                  <span>
                    {etudiantsMasterEntity.photoContentType}, {byteSize(etudiantsMasterEntity.photo)}
                  </span>
                </div>
              ) : null}
            </dd>
            <dt>
              <span id="tesAdmission">
                <Translate contentKey="pfumv10App.etudiantsMaster.tesAdmission">Tes Admission</Translate>
              </span>
            </dt>
            <dd>
              {etudiantsMasterEntity.tesAdmission ? (
                <div>
                  <a onClick={openFile(etudiantsMasterEntity.tesAdmissionContentType, etudiantsMasterEntity.tesAdmission)}>
                    <img
                      src={`data:${etudiantsMasterEntity.tesAdmissionContentType};base64,${etudiantsMasterEntity.tesAdmission}`}
                      style={{ maxHeight: '30px' }}
                    />
                  </a>
                  <span>
                    {etudiantsMasterEntity.tesAdmissionContentType}, {byteSize(etudiantsMasterEntity.tesAdmission)}
                  </span>
                </div>
              ) : null}
            </dd>
            <dt>
              <span id="bacalaureat">
                <Translate contentKey="pfumv10App.etudiantsMaster.bacalaureat">Bacalaureat</Translate>
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
              <span id="cinPassport">
                <Translate contentKey="pfumv10App.etudiantsMaster.cinPassport">Cin Passport</Translate>
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
            <dt>
              <span id="diplome">
                <Translate contentKey="pfumv10App.etudiantsMaster.diplome">Diplome</Translate>
              </span>
            </dt>
            <dd>
              {etudiantsMasterEntity.diplome ? (
                <div>
                  <a onClick={openFile(etudiantsMasterEntity.diplomeContentType, etudiantsMasterEntity.diplome)}>
                    <img
                      src={`data:${etudiantsMasterEntity.diplomeContentType};base64,${etudiantsMasterEntity.diplome}`}
                      style={{ maxHeight: '30px' }}
                    />
                  </a>
                  <span>
                    {etudiantsMasterEntity.diplomeContentType}, {byteSize(etudiantsMasterEntity.diplome)}
                  </span>
                </div>
              ) : null}
            </dd>
            <dt>
              <span id="anneeObtentionLicence">
                <Translate contentKey="pfumv10App.etudiantsMaster.anneeObtentionLicence">Annee Obtention Licence</Translate>
              </span>
            </dt>
            <dd>{etudiantsMasterEntity.anneeObtentionLicence}</dd>
            <dt>
              <span id="releveeNoteLicence">
                <Translate contentKey="pfumv10App.etudiantsMaster.releveeNoteLicence">Relevee Note Licence</Translate>
              </span>
            </dt>
            <dd>
              {etudiantsMasterEntity.releveeNoteLicence ? (
                <div>
                  <a onClick={openFile(etudiantsMasterEntity.releveeNoteLicenceContentType, etudiantsMasterEntity.releveeNoteLicence)}>
                    <img
                      src={`data:${etudiantsMasterEntity.releveeNoteLicenceContentType};base64,${etudiantsMasterEntity.releveeNoteLicence}`}
                      style={{ maxHeight: '30px' }}
                    />
                  </a>
                  <span>
                    {etudiantsMasterEntity.releveeNoteLicenceContentType}, {byteSize(etudiantsMasterEntity.releveeNoteLicence)}
                  </span>
                </div>
              ) : null}
            </dd>
            <dt>
              <span id="etablissementObtention">
                <Translate contentKey="pfumv10App.etudiantsMaster.etablissementObtention">Etablissement Obtention</Translate>
              </span>
            </dt>
            <dd>{etudiantsMasterEntity.etablissementObtention}</dd>
            <dt>
              <span id="inscriptionvalide">
                <Translate contentKey="pfumv10App.etudiantsMaster.inscriptionvalide">Inscriptionvalide</Translate>
              </span>
            </dt>
            <dd>{etudiantsMasterEntity.inscriptionvalide ? 'true' : 'false'}</dd>
            <dt>
              <span id="absent">
                <Translate contentKey="pfumv10App.etudiantsMaster.absent">Absent</Translate>
              </span>
            </dt>
            <dd>{etudiantsMasterEntity.absent ? 'true' : 'false'}</dd>
            <dt>
              <Translate contentKey="pfumv10App.etudiantsMaster.user">User</Translate>
            </dt>
            <dd>{etudiantsMasterEntity.user ? etudiantsMasterEntity.user.id : ''}</dd>
            <dt>
              <Translate contentKey="pfumv10App.etudiantsMaster.filiere">Filiere</Translate>
            </dt>
            <dd>{etudiantsMasterEntity.filiere ? etudiantsMasterEntity.filiere.id : ''}</dd>
            <dt>
              <Translate contentKey="pfumv10App.etudiantsMaster.anneeInscription">Annee Inscription</Translate>
            </dt>
            <dd>{etudiantsMasterEntity.anneeInscription ? etudiantsMasterEntity.anneeInscription.id : ''}</dd>
            <dt>
              <Translate contentKey="pfumv10App.etudiantsMaster.modalite">Modalite</Translate>
            </dt>
            <dd>{etudiantsMasterEntity.modalite ? etudiantsMasterEntity.modalite.id : ''}</dd>
          </dl>
          <Button tag={Link} to="/entity/etudiants-master" replace color="info">
            <FontAwesomeIcon icon="arrow-left" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.back">Back</Translate>
            </span>
          </Button>
          &nbsp;
          <Button tag={Link} to={`/entity/etudiants-master/${etudiantsMasterEntity.id}/edit`} replace color="primary">
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

const mapStateToProps = ({ etudiantsMaster }: IRootState) => ({
  etudiantsMasterEntity: etudiantsMaster.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EtudiantsMasterDetail);
