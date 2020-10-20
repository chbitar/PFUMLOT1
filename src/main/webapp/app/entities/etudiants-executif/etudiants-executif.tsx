import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, InputGroup, Col, Row, Table } from 'reactstrap';
import { AvForm, AvGroup, AvInput } from 'availity-reactstrap-validation';
// tslint:disable-next-line:no-unused-variable
import { openFile, byteSize, Translate, translate, ICrudSearchAction, ICrudGetAllAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getSearchEntities, getEntities } from './etudiants-executif.reducer';
import { IEtudiantsExecutif } from 'app/shared/model/etudiants-executif.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IEtudiantsExecutifProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export interface IEtudiantsExecutifState {
  search: string;
}

export class EtudiantsExecutif extends React.Component<IEtudiantsExecutifProps, IEtudiantsExecutifState> {
  state: IEtudiantsExecutifState = {
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
    const { etudiantsExecutifList, match } = this.props;
    return (
      <div>
        <h2 id="etudiants-executif-heading">
          <Translate contentKey="pfumv10App.etudiantsExecutif.home.title">Etudiants Executifs</Translate>
          <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
            <FontAwesomeIcon icon="plus" />
            &nbsp;
            <Translate contentKey="pfumv10App.etudiantsExecutif.home.createLabel">Create new Etudiants Executif</Translate>
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
                    placeholder={translate('pfumv10App.etudiantsExecutif.home.search')}
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
          {etudiantsExecutifList && etudiantsExecutifList.length > 0 ? (
            <Table responsive>
              <thead>
                <tr>
                  <th>
                    <Translate contentKey="global.field.id">ID</Translate>
                  </th>
                  <th>
                    <Translate contentKey="pfumv10App.etudiantsExecutif.suffixe">Suffixe</Translate>
                  </th>
                  <th>
                    <Translate contentKey="pfumv10App.etudiantsExecutif.nom">Nom</Translate>
                  </th>
                  <th>
                    <Translate contentKey="pfumv10App.etudiantsExecutif.prenom">Prenom</Translate>
                  </th>
                  <th>
                    <Translate contentKey="pfumv10App.etudiantsExecutif.dateNaissance">Date Naissance</Translate>
                  </th>
                  <th>
                    <Translate contentKey="pfumv10App.etudiantsExecutif.adresseContact">Adresse Contact</Translate>
                  </th>
                  <th>
                    <Translate contentKey="pfumv10App.etudiantsExecutif.ville">Ville</Translate>
                  </th>
                  <th>
                    <Translate contentKey="pfumv10App.etudiantsExecutif.email">Email</Translate>
                  </th>
                  <th>
                    <Translate contentKey="pfumv10App.etudiantsExecutif.pjBac">Pj Bac</Translate>
                  </th>
                  <th>
                    <Translate contentKey="pfumv10App.etudiantsExecutif.mention">Mention</Translate>
                  </th>
                  <th>
                    <Translate contentKey="pfumv10App.etudiantsExecutif.anneOtention">Anne Otention</Translate>
                  </th>
                  <th>
                    <Translate contentKey="pfumv10App.etudiantsExecutif.cinPass">Cin Pass</Translate>
                  </th>
                  <th>
                    <Translate contentKey="pfumv10App.etudiantsExecutif.paysNationalite">Pays Nationalite</Translate>
                  </th>
                  <th>
                    <Translate contentKey="pfumv10App.etudiantsExecutif.paysResidence">Pays Residence</Translate>
                  </th>
                  <th>
                    <Translate contentKey="pfumv10App.etudiantsExecutif.codepostal">Codepostal</Translate>
                  </th>
                  <th>
                    <Translate contentKey="pfumv10App.etudiantsExecutif.province">Province</Translate>
                  </th>
                  <th>
                    <Translate contentKey="pfumv10App.etudiantsExecutif.tel">Tel</Translate>
                  </th>
                  <th>
                    <Translate contentKey="pfumv10App.etudiantsExecutif.deuxiemeTel">Deuxieme Tel</Translate>
                  </th>
                  <th>
                    <Translate contentKey="pfumv10App.etudiantsExecutif.photo">Photo</Translate>
                  </th>
                  <th>
                    <Translate contentKey="pfumv10App.etudiantsExecutif.extraitActeNaissance">Extrait Acte Naissance</Translate>
                  </th>
                  <th>
                    <Translate contentKey="pfumv10App.etudiantsExecutif.bacalaureat">Bacalaureat</Translate>
                  </th>
                  <th>
                    <Translate contentKey="pfumv10App.etudiantsExecutif.cinPassport">Cin Passport</Translate>
                  </th>
                  <th>
                    <Translate contentKey="pfumv10App.etudiantsExecutif.diplome">Diplome</Translate>
                  </th>
                  <th>
                    <Translate contentKey="pfumv10App.etudiantsExecutif.inscriptionvalide">Inscriptionvalide</Translate>
                  </th>
                  <th>
                    <Translate contentKey="pfumv10App.etudiantsExecutif.absent">Absent</Translate>
                  </th>
                  <th>
                    <Translate contentKey="pfumv10App.etudiantsExecutif.user">User</Translate>
                  </th>
                  <th>
                    <Translate contentKey="pfumv10App.etudiantsExecutif.filiere">Filiere</Translate>
                  </th>
                  <th>
                    <Translate contentKey="pfumv10App.etudiantsExecutif.anneeInscription">Annee Inscription</Translate>
                  </th>
                  <th>
                    <Translate contentKey="pfumv10App.etudiantsExecutif.modalite">Modalite</Translate>
                  </th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {etudiantsExecutifList.map((etudiantsExecutif, i) => (
                  <tr key={`entity-${i}`}>
                    <td>
                      <Button tag={Link} to={`${match.url}/${etudiantsExecutif.id}`} color="link" size="sm">
                        {etudiantsExecutif.id}
                      </Button>
                    </td>
                    <td>{etudiantsExecutif.suffixe}</td>
                    <td>{etudiantsExecutif.nom}</td>
                    <td>{etudiantsExecutif.prenom}</td>
                    <td>
                      <TextFormat type="date" value={etudiantsExecutif.dateNaissance} format={APP_DATE_FORMAT} />
                    </td>
                    <td>{etudiantsExecutif.adresseContact}</td>
                    <td>{etudiantsExecutif.ville}</td>
                    <td>{etudiantsExecutif.email}</td>
                    <td>
                      <Translate contentKey={`pfumv10App.DiplomeBac.${etudiantsExecutif.pjBac}`} />
                    </td>
                    <td>
                      <Translate contentKey={`pfumv10App.Mention.${etudiantsExecutif.mention}`} />
                    </td>
                    <td>{etudiantsExecutif.anneOtention}</td>
                    <td>{etudiantsExecutif.cinPass}</td>
                    <td>{etudiantsExecutif.paysNationalite}</td>
                    <td>{etudiantsExecutif.paysResidence}</td>
                    <td>{etudiantsExecutif.codepostal}</td>
                    <td>{etudiantsExecutif.province}</td>
                    <td>{etudiantsExecutif.tel}</td>
                    <td>{etudiantsExecutif.deuxiemeTel}</td>
                    <td>
                      {etudiantsExecutif.photo ? (
                        <div>
                          <a onClick={openFile(etudiantsExecutif.photoContentType, etudiantsExecutif.photo)}>
                            <img
                              src={`data:${etudiantsExecutif.photoContentType};base64,${etudiantsExecutif.photo}`}
                              style={{ maxHeight: '30px' }}
                            />
                            &nbsp;
                          </a>
                          <span>
                            {etudiantsExecutif.photoContentType}, {byteSize(etudiantsExecutif.photo)}
                          </span>
                        </div>
                      ) : null}
                    </td>
                    <td>
                      {etudiantsExecutif.extraitActeNaissance ? (
                        <div>
                          <a onClick={openFile(etudiantsExecutif.extraitActeNaissanceContentType, etudiantsExecutif.extraitActeNaissance)}>
                            <img
                              src={`data:${etudiantsExecutif.extraitActeNaissanceContentType};base64,${
                                etudiantsExecutif.extraitActeNaissance
                              }`}
                              style={{ maxHeight: '30px' }}
                            />
                            &nbsp;
                          </a>
                          <span>
                            {etudiantsExecutif.extraitActeNaissanceContentType}, {byteSize(etudiantsExecutif.extraitActeNaissance)}
                          </span>
                        </div>
                      ) : null}
                    </td>
                    <td>
                      {etudiantsExecutif.bacalaureat ? (
                        <div>
                          <a onClick={openFile(etudiantsExecutif.bacalaureatContentType, etudiantsExecutif.bacalaureat)}>
                            <img
                              src={`data:${etudiantsExecutif.bacalaureatContentType};base64,${etudiantsExecutif.bacalaureat}`}
                              style={{ maxHeight: '30px' }}
                            />
                            &nbsp;
                          </a>
                          <span>
                            {etudiantsExecutif.bacalaureatContentType}, {byteSize(etudiantsExecutif.bacalaureat)}
                          </span>
                        </div>
                      ) : null}
                    </td>
                    <td>
                      {etudiantsExecutif.cinPassport ? (
                        <div>
                          <a onClick={openFile(etudiantsExecutif.cinPassportContentType, etudiantsExecutif.cinPassport)}>
                            <img
                              src={`data:${etudiantsExecutif.cinPassportContentType};base64,${etudiantsExecutif.cinPassport}`}
                              style={{ maxHeight: '30px' }}
                            />
                            &nbsp;
                          </a>
                          <span>
                            {etudiantsExecutif.cinPassportContentType}, {byteSize(etudiantsExecutif.cinPassport)}
                          </span>
                        </div>
                      ) : null}
                    </td>
                    <td>
                      {etudiantsExecutif.diplome ? (
                        <div>
                          <a onClick={openFile(etudiantsExecutif.diplomeContentType, etudiantsExecutif.diplome)}>
                            <img
                              src={`data:${etudiantsExecutif.diplomeContentType};base64,${etudiantsExecutif.diplome}`}
                              style={{ maxHeight: '30px' }}
                            />
                            &nbsp;
                          </a>
                          <span>
                            {etudiantsExecutif.diplomeContentType}, {byteSize(etudiantsExecutif.diplome)}
                          </span>
                        </div>
                      ) : null}
                    </td>
                    <td>{etudiantsExecutif.inscriptionvalide ? 'true' : 'false'}</td>
                    <td>{etudiantsExecutif.absent ? 'true' : 'false'}</td>
                    <td>{etudiantsExecutif.user ? etudiantsExecutif.user.id : ''}</td>
                    <td>
                      {etudiantsExecutif.filiere ? (
                        <Link to={`filiere/${etudiantsExecutif.filiere.id}`}>{etudiantsExecutif.filiere.id}</Link>
                      ) : (
                        ''
                      )}
                    </td>
                    <td>
                      {etudiantsExecutif.anneeInscription ? (
                        <Link to={`annee-inscription/${etudiantsExecutif.anneeInscription.id}`}>
                          {etudiantsExecutif.anneeInscription.id}
                        </Link>
                      ) : (
                        ''
                      )}
                    </td>
                    <td>
                      {etudiantsExecutif.modalite ? (
                        <Link to={`modalite-paiement/${etudiantsExecutif.modalite.id}`}>{etudiantsExecutif.modalite.id}</Link>
                      ) : (
                        ''
                      )}
                    </td>
                    <td className="text-right">
                      <div className="btn-group flex-btn-group-container">
                        <Button tag={Link} to={`${match.url}/${etudiantsExecutif.id}`} color="info" size="sm">
                          <FontAwesomeIcon icon="eye" />{' '}
                          <span className="d-none d-md-inline">
                            <Translate contentKey="entity.action.view">View</Translate>
                          </span>
                        </Button>
                        <Button tag={Link} to={`${match.url}/${etudiantsExecutif.id}/edit`} color="primary" size="sm">
                          <FontAwesomeIcon icon="pencil-alt" />{' '}
                          <span className="d-none d-md-inline">
                            <Translate contentKey="entity.action.edit">Edit</Translate>
                          </span>
                        </Button>
                        <Button tag={Link} to={`${match.url}/${etudiantsExecutif.id}/delete`} color="danger" size="sm">
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
              <Translate contentKey="pfumv10App.etudiantsExecutif.home.notFound">No Etudiants Executifs found</Translate>
            </div>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ etudiantsExecutif }: IRootState) => ({
  etudiantsExecutifList: etudiantsExecutif.entities
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
)(EtudiantsExecutif);
