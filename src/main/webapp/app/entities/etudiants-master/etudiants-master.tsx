import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, InputGroup, Col, Row, Table } from 'reactstrap';
import { AvForm, AvGroup, AvInput } from 'availity-reactstrap-validation';
// tslint:disable-next-line:no-unused-variable
import { openFile, byteSize, Translate, translate, ICrudSearchAction, ICrudGetAllAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getSearchEntities, getEntities } from './etudiants-master.reducer';
import { IEtudiantsMaster } from 'app/shared/model/etudiants-master.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IEtudiantsMasterProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export interface IEtudiantsMasterState {
  search: string;
}

export class EtudiantsMaster extends React.Component<IEtudiantsMasterProps, IEtudiantsMasterState> {
  state: IEtudiantsMasterState = {
    search: ''
  };

  componentDidMount() {
    this.props.getEntities();
  }

  search = () => {
    if (this.state.search) {
      this.props.getSearchEntities(this.state.search);
    }
  };

  clear = () => {
    this.setState({ search: '' }, () => {
      this.props.getEntities();
    });
  };

  handleSearch = event => this.setState({ search: event.target.value });

  render() {
    const { etudiantsMasterList, match } = this.props;
    return (
      <div>
        <h2 id="etudiants-master-heading">
          <Translate contentKey="pfumv10App.etudiantsMaster.home.title">Etudiants Masters</Translate>
          <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
            <FontAwesomeIcon icon="plus" />
            &nbsp;
            <Translate contentKey="pfumv10App.etudiantsMaster.home.createLabel">Create new Etudiants Master</Translate>
          </Link>
        </h2>
        <Row>
          <Col sm="12">
            <AvForm onSubmit={this.search}>
              <AvGroup>
                <InputGroup>
                  <AvInput
                    type="text"
                    name="search"
                    value={this.state.search}
                    onChange={this.handleSearch}
                    placeholder={translate('pfumv10App.etudiantsMaster.home.search')}
                  />
                  <Button className="input-group-addon">
                    <FontAwesomeIcon icon="search" />
                  </Button>
                  <Button type="reset" className="input-group-addon" onClick={this.clear}>
                    <FontAwesomeIcon icon="trash" />
                  </Button>
                </InputGroup>
              </AvGroup>
            </AvForm>
          </Col>
        </Row>
        <div className="table-responsive">
          {etudiantsMasterList && etudiantsMasterList.length > 0 ? (
            <Table responsive>
              <thead>
                <tr>
                  <th>
                    <Translate contentKey="global.field.id">ID</Translate>
                  </th>
                  <th>
                    <Translate contentKey="pfumv10App.etudiantsMaster.suffixe">Suffixe</Translate>
                  </th>
                  <th>
                    <Translate contentKey="pfumv10App.etudiantsMaster.nom">Nom</Translate>
                  </th>
                  <th>
                    <Translate contentKey="pfumv10App.etudiantsMaster.prenom">Prenom</Translate>
                  </th>
                  <th>
                    <Translate contentKey="pfumv10App.etudiantsMaster.dateNaissance">Date Naissance</Translate>
                  </th>
                  <th>
                    <Translate contentKey="pfumv10App.etudiantsMaster.adresseContact">Adresse Contact</Translate>
                  </th>
                  <th>
                    <Translate contentKey="pfumv10App.etudiantsMaster.ville">Ville</Translate>
                  </th>
                  <th>
                    <Translate contentKey="pfumv10App.etudiantsMaster.email">Email</Translate>
                  </th>
                  <th>
                    <Translate contentKey="pfumv10App.etudiantsMaster.typeBac">Type Bac</Translate>
                  </th>
                  <th>
                    <Translate contentKey="pfumv10App.etudiantsMaster.mention">Mention</Translate>
                  </th>
                  <th>
                    <Translate contentKey="pfumv10App.etudiantsMaster.anneOtention">Anne Otention</Translate>
                  </th>
                  <th>
                    <Translate contentKey="pfumv10App.etudiantsMaster.cinPass">Cin Pass</Translate>
                  </th>
                  <th>
                    <Translate contentKey="pfumv10App.etudiantsMaster.paysNationalite">Pays Nationalite</Translate>
                  </th>
                  <th>
                    <Translate contentKey="pfumv10App.etudiantsMaster.paysResidence">Pays Residence</Translate>
                  </th>
                  <th>
                    <Translate contentKey="pfumv10App.etudiantsMaster.codepostal">Codepostal</Translate>
                  </th>
                  <th>
                    <Translate contentKey="pfumv10App.etudiantsMaster.province">Province</Translate>
                  </th>
                  <th>
                    <Translate contentKey="pfumv10App.etudiantsMaster.tel">Tel</Translate>
                  </th>
                  <th>
                    <Translate contentKey="pfumv10App.etudiantsMaster.deuxiemeTel">Deuxieme Tel</Translate>
                  </th>
                  <th>
                    <Translate contentKey="pfumv10App.etudiantsMaster.photo">Photo</Translate>
                  </th>
                  <th>
                    <Translate contentKey="pfumv10App.etudiantsMaster.extraitActeNaissance">Extrait Acte Naissance</Translate>
                  </th>
                  <th>
                    <Translate contentKey="pfumv10App.etudiantsMaster.bacalaureat">Bacalaureat</Translate>
                  </th>
                  <th>
                    <Translate contentKey="pfumv10App.etudiantsMaster.cinPassport">Cin Passport</Translate>
                  </th>
                  <th>
                    <Translate contentKey="pfumv10App.etudiantsMaster.diplome">Diplome</Translate>
                  </th>
                  <th>
                    <Translate contentKey="pfumv10App.etudiantsMaster.inscriptionvalide">Inscriptionvalide</Translate>
                  </th>
                  <th>
                    <Translate contentKey="pfumv10App.etudiantsMaster.absent">Absent</Translate>
                  </th>
                  <th>
                    <Translate contentKey="pfumv10App.etudiantsMaster.user">User</Translate>
                  </th>
                  <th>
                    <Translate contentKey="pfumv10App.etudiantsMaster.filiere">Filiere</Translate>
                  </th>
                  <th>
                    <Translate contentKey="pfumv10App.etudiantsMaster.anneeInscription">Annee Inscription</Translate>
                  </th>
                  <th>
                    <Translate contentKey="pfumv10App.etudiantsMaster.modalite">Modalite</Translate>
                  </th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {etudiantsMasterList.map((etudiantsMaster, i) => (
                  <tr key={`entity-${i}`}>
                    <td>
                      <Button tag={Link} to={`${match.url}/${etudiantsMaster.id}`} color="link" size="sm">
                        {etudiantsMaster.id}
                      </Button>
                    </td>
                    <td>{etudiantsMaster.suffixe}</td>
                    <td>{etudiantsMaster.nom}</td>
                    <td>{etudiantsMaster.prenom}</td>
                    <td>
                      <TextFormat type="date" value={etudiantsMaster.dateNaissance} format={APP_DATE_FORMAT} />
                    </td>
                    <td>{etudiantsMaster.adresseContact}</td>
                    <td>{etudiantsMaster.ville}</td>
                    <td>{etudiantsMaster.email}</td>
                    <td>
                      <Translate contentKey={`pfumv10App.DiplomeBac.${etudiantsMaster.typeBac}`} />
                    </td>
                    <td>
                      <Translate contentKey={`pfumv10App.Mention.${etudiantsMaster.mention}`} />
                    </td>
                    <td>{etudiantsMaster.anneOtention}</td>
                    <td>{etudiantsMaster.cinPass}</td>
                    <td>{etudiantsMaster.paysNationalite}</td>
                    <td>{etudiantsMaster.paysResidence}</td>
                    <td>{etudiantsMaster.codepostal}</td>
                    <td>{etudiantsMaster.province}</td>
                    <td>{etudiantsMaster.tel}</td>
                    <td>{etudiantsMaster.deuxiemeTel}</td>
                    <td>
                      {etudiantsMaster.photo ? (
                        <div>
                          <a onClick={openFile(etudiantsMaster.photoContentType, etudiantsMaster.photo)}>
                            <img
                              src={`data:${etudiantsMaster.photoContentType};base64,${etudiantsMaster.photo}`}
                              style={{ maxHeight: '30px' }}
                            />
                            &nbsp;
                          </a>
                          <span>
                            {etudiantsMaster.photoContentType}, {byteSize(etudiantsMaster.photo)}
                          </span>
                        </div>
                      ) : null}
                    </td>
                    <td>
                      {etudiantsMaster.extraitActeNaissance ? (
                        <div>
                          <a onClick={openFile(etudiantsMaster.extraitActeNaissanceContentType, etudiantsMaster.extraitActeNaissance)}>
                            <img
                              src={`data:${etudiantsMaster.extraitActeNaissanceContentType};base64,${etudiantsMaster.extraitActeNaissance}`}
                              style={{ maxHeight: '30px' }}
                            />
                            &nbsp;
                          </a>
                          <span>
                            {etudiantsMaster.extraitActeNaissanceContentType}, {byteSize(etudiantsMaster.extraitActeNaissance)}
                          </span>
                        </div>
                      ) : null}
                    </td>
                    <td>
                      {etudiantsMaster.bacalaureat ? (
                        <div>
                          <a onClick={openFile(etudiantsMaster.bacalaureatContentType, etudiantsMaster.bacalaureat)}>
                            <img
                              src={`data:${etudiantsMaster.bacalaureatContentType};base64,${etudiantsMaster.bacalaureat}`}
                              style={{ maxHeight: '30px' }}
                            />
                            &nbsp;
                          </a>
                          <span>
                            {etudiantsMaster.bacalaureatContentType}, {byteSize(etudiantsMaster.bacalaureat)}
                          </span>
                        </div>
                      ) : null}
                    </td>
                    <td>
                      {etudiantsMaster.cinPassport ? (
                        <div>
                          <a onClick={openFile(etudiantsMaster.cinPassportContentType, etudiantsMaster.cinPassport)}>
                            <img
                              src={`data:${etudiantsMaster.cinPassportContentType};base64,${etudiantsMaster.cinPassport}`}
                              style={{ maxHeight: '30px' }}
                            />
                            &nbsp;
                          </a>
                          <span>
                            {etudiantsMaster.cinPassportContentType}, {byteSize(etudiantsMaster.cinPassport)}
                          </span>
                        </div>
                      ) : null}
                    </td>
                    <td>
                      {etudiantsMaster.diplome ? (
                        <div>
                          <a onClick={openFile(etudiantsMaster.diplomeContentType, etudiantsMaster.diplome)}>
                            <img
                              src={`data:${etudiantsMaster.diplomeContentType};base64,${etudiantsMaster.diplome}`}
                              style={{ maxHeight: '30px' }}
                            />
                            &nbsp;
                          </a>
                          <span>
                            {etudiantsMaster.diplomeContentType}, {byteSize(etudiantsMaster.diplome)}
                          </span>
                        </div>
                      ) : null}
                    </td>
                    <td>{etudiantsMaster.inscriptionvalide ? 'true' : 'false'}</td>
                    <td>{etudiantsMaster.absent ? 'true' : 'false'}</td>
                    <td>{etudiantsMaster.user ? etudiantsMaster.user.id : ''}</td>
                    <td>
                      {etudiantsMaster.filiere ? (
                        <Link to={`filiere/${etudiantsMaster.filiere.id}`}>{etudiantsMaster.filiere.id}</Link>
                      ) : (
                        ''
                      )}
                    </td>
                    <td>
                      {etudiantsMaster.anneeInscription ? (
                        <Link to={`annee-inscription/${etudiantsMaster.anneeInscription.id}`}>{etudiantsMaster.anneeInscription.id}</Link>
                      ) : (
                        ''
                      )}
                    </td>
                    <td>
                      {etudiantsMaster.modalite ? (
                        <Link to={`modalite-paiement/${etudiantsMaster.modalite.id}`}>{etudiantsMaster.modalite.id}</Link>
                      ) : (
                        ''
                      )}
                    </td>
                    <td className="text-right">
                      <div className="btn-group flex-btn-group-container">
                        <Button tag={Link} to={`${match.url}/${etudiantsMaster.id}`} color="info" size="sm">
                          <FontAwesomeIcon icon="eye" />{' '}
                          <span className="d-none d-md-inline">
                            <Translate contentKey="entity.action.view">View</Translate>
                          </span>
                        </Button>
                        <Button tag={Link} to={`${match.url}/${etudiantsMaster.id}/edit`} color="primary" size="sm">
                          <FontAwesomeIcon icon="pencil-alt" />{' '}
                          <span className="d-none d-md-inline">
                            <Translate contentKey="entity.action.edit">Edit</Translate>
                          </span>
                        </Button>
                        <Button tag={Link} to={`${match.url}/${etudiantsMaster.id}/delete`} color="danger" size="sm">
                          <FontAwesomeIcon icon="trash" />{' '}
                          <span className="d-none d-md-inline">
                            <Translate contentKey="entity.action.delete">Delete</Translate>
                          </span>
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          ) : (
            <div className="alert alert-warning">
              <Translate contentKey="pfumv10App.etudiantsMaster.home.notFound">No Etudiants Masters found</Translate>
            </div>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ etudiantsMaster }: IRootState) => ({
  etudiantsMasterList: etudiantsMaster.entities
});

const mapDispatchToProps = {
  getSearchEntities,
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EtudiantsMaster);
