import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, InputGroup, Col, Row, Table } from 'reactstrap';
import { AvForm, AvGroup, AvInput } from 'availity-reactstrap-validation';
// tslint:disable-next-line:no-unused-variable
import { openFile, byteSize, Translate, translate, ICrudSearchAction, ICrudGetAllAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getSearchEntities, getEntities } from './etudiants-licence.reducer';
import { IEtudiantsLicence } from 'app/shared/model/etudiants-licence.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IEtudiantsLicenceProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export interface IEtudiantsLicenceState {
  search: string;
}

export class EtudiantsLicence extends React.Component<IEtudiantsLicenceProps, IEtudiantsLicenceState> {
  state: IEtudiantsLicenceState = {
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
    const { etudiantsLicenceList, match } = this.props;
    return (
      <div>
        <h2 id="etudiants-licence-heading">
          <Translate contentKey="pfumv10App.etudiantsLicence.home.title">Etudiants Licences</Translate>
          <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
            <FontAwesomeIcon icon="plus" />
            &nbsp;
            <Translate contentKey="pfumv10App.etudiantsLicence.home.createLabel">Create new Etudiants Licence</Translate>
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
                    placeholder={translate('pfumv10App.etudiantsLicence.home.search')}
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
          {etudiantsLicenceList && etudiantsLicenceList.length > 0 ? (
            <Table responsive>
              <thead>
                <tr>
                  <th>
                    <Translate contentKey="global.field.id">ID</Translate>
                  </th>
                  <th>
                    <Translate contentKey="pfumv10App.etudiantsLicence.suffixe">Suffixe</Translate>
                  </th>
                  <th>
                    <Translate contentKey="pfumv10App.etudiantsLicence.nom">Nom</Translate>
                  </th>
                  <th>
                    <Translate contentKey="pfumv10App.etudiantsLicence.prenom">Prenom</Translate>
                  </th>
                  <th>
                    <Translate contentKey="pfumv10App.etudiantsLicence.dateNaissance">Date Naissance</Translate>
                  </th>
                  <th>
                    <Translate contentKey="pfumv10App.etudiantsLicence.adresseContact">Adresse Contact</Translate>
                  </th>
                  <th>
                    <Translate contentKey="pfumv10App.etudiantsLicence.ville">Ville</Translate>
                  </th>
                  <th>
                    <Translate contentKey="pfumv10App.etudiantsLicence.email">Email</Translate>
                  </th>
                  <th>
                    <Translate contentKey="pfumv10App.etudiantsLicence.pjBac">Pj Bac</Translate>
                  </th>
                  <th>
                    <Translate contentKey="pfumv10App.etudiantsLicence.mention">Mention</Translate>
                  </th>
                  <th>
                    <Translate contentKey="pfumv10App.etudiantsLicence.anneeObtention">Annee Obtention</Translate>
                  </th>
                  <th>
                    <Translate contentKey="pfumv10App.etudiantsLicence.releveeNote">Relevee Note</Translate>
                  </th>
                  <th>
                    <Translate contentKey="pfumv10App.etudiantsLicence.cinPass">Cin Pass</Translate>
                  </th>
                  <th>
                    <Translate contentKey="pfumv10App.etudiantsLicence.paysNationalite">Pays Nationalite</Translate>
                  </th>
                  <th>
                    <Translate contentKey="pfumv10App.etudiantsLicence.paysResidence">Pays Residence</Translate>
                  </th>
                  <th>
                    <Translate contentKey="pfumv10App.etudiantsLicence.codepostal">Codepostal</Translate>
                  </th>
                  <th>
                    <Translate contentKey="pfumv10App.etudiantsLicence.province">Province</Translate>
                  </th>
                  <th>
                    <Translate contentKey="pfumv10App.etudiantsLicence.tel">Tel</Translate>
                  </th>
                  <th>
                    <Translate contentKey="pfumv10App.etudiantsLicence.deuxiemeTel">Deuxieme Tel</Translate>
                  </th>
                  <th>
                    <Translate contentKey="pfumv10App.etudiantsLicence.photo">Photo</Translate>
                  </th>
                  <th>
                    <Translate contentKey="pfumv10App.etudiantsLicence.testAdmission">Test Admission</Translate>
                  </th>
                  <th>
                    <Translate contentKey="pfumv10App.etudiantsLicence.bacalaureat">Bacalaureat</Translate>
                  </th>
                  <th>
                    <Translate contentKey="pfumv10App.etudiantsLicence.cinPassport">Cin Passport</Translate>
                  </th>
                  <th>
                    <Translate contentKey="pfumv10App.etudiantsLicence.inscriptionvalide">Inscriptionvalide</Translate>
                  </th>
                  <th>
                    <Translate contentKey="pfumv10App.etudiantsLicence.absent">Absent</Translate>
                  </th>
                  <th>
                    <Translate contentKey="pfumv10App.etudiantsLicence.user">User</Translate>
                  </th>
                  <th>
                    <Translate contentKey="pfumv10App.etudiantsLicence.filiere">Filiere</Translate>
                  </th>
                  <th>
                    <Translate contentKey="pfumv10App.etudiantsLicence.anneeInscription">Annee Inscription</Translate>
                  </th>
                  <th>
                    <Translate contentKey="pfumv10App.etudiantsLicence.modalite">Modalite</Translate>
                  </th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {etudiantsLicenceList.map((etudiantsLicence, i) => (
                  <tr key={`entity-${i}`}>
                    <td>
                      <Button tag={Link} to={`${match.url}/${etudiantsLicence.id}`} color="link" size="sm">
                        {etudiantsLicence.id}
                      </Button>
                    </td>
                    <td>{etudiantsLicence.suffixe}</td>
                    <td>{etudiantsLicence.nom}</td>
                    <td>{etudiantsLicence.prenom}</td>
                    <td>
                      <TextFormat type="date" value={etudiantsLicence.dateNaissance} format={APP_DATE_FORMAT} />
                    </td>
                    <td>{etudiantsLicence.adresseContact}</td>
                    <td>{etudiantsLicence.ville}</td>
                    <td>{etudiantsLicence.email}</td>
                    <td>
                      <Translate contentKey={`pfumv10App.DiplomeBac.${etudiantsLicence.pjBac}`} />
                    </td>
                    <td>
                      <Translate contentKey={`pfumv10App.Mention.${etudiantsLicence.mention}`} />
                    </td>
                    <td>{etudiantsLicence.anneeObtention}</td>
                    <td>
                      {etudiantsLicence.releveeNote ? (
                        <div>
                          <a onClick={openFile(etudiantsLicence.releveeNoteContentType, etudiantsLicence.releveeNote)}>
                            <img
                              src={`data:${etudiantsLicence.releveeNoteContentType};base64,${etudiantsLicence.releveeNote}`}
                              style={{ maxHeight: '30px' }}
                            />
                            &nbsp;
                          </a>
                          <span>
                            {etudiantsLicence.releveeNoteContentType}, {byteSize(etudiantsLicence.releveeNote)}
                          </span>
                        </div>
                      ) : null}
                    </td>
                    <td>{etudiantsLicence.cinPass}</td>
                    <td>{etudiantsLicence.paysNationalite}</td>
                    <td>{etudiantsLicence.paysResidence}</td>
                    <td>{etudiantsLicence.codepostal}</td>
                    <td>{etudiantsLicence.province}</td>
                    <td>{etudiantsLicence.tel}</td>
                    <td>{etudiantsLicence.deuxiemeTel}</td>
                    <td>
                      {etudiantsLicence.photo ? (
                        <div>
                          <a onClick={openFile(etudiantsLicence.photoContentType, etudiantsLicence.photo)}>
                            <img
                              src={`data:${etudiantsLicence.photoContentType};base64,${etudiantsLicence.photo}`}
                              style={{ maxHeight: '30px' }}
                            />
                            &nbsp;
                          </a>
                          <span>
                            {etudiantsLicence.photoContentType}, {byteSize(etudiantsLicence.photo)}
                          </span>
                        </div>
                      ) : null}
                    </td>
                    <td>
                      {etudiantsLicence.testAdmission ? (
                        <div>
                          <a onClick={openFile(etudiantsLicence.testAdmissionContentType, etudiantsLicence.testAdmission)}>
                            <img
                              src={`data:${etudiantsLicence.testAdmissionContentType};base64,${etudiantsLicence.testAdmission}`}
                              style={{ maxHeight: '30px' }}
                            />
                            &nbsp;
                          </a>
                          <span>
                            {etudiantsLicence.testAdmissionContentType}, {byteSize(etudiantsLicence.testAdmission)}
                          </span>
                        </div>
                      ) : null}
                    </td>
                    <td>
                      {etudiantsLicence.bacalaureat ? (
                        <div>
                          <a onClick={openFile(etudiantsLicence.bacalaureatContentType, etudiantsLicence.bacalaureat)}>
                            <img
                              src={`data:${etudiantsLicence.bacalaureatContentType};base64,${etudiantsLicence.bacalaureat}`}
                              style={{ maxHeight: '30px' }}
                            />
                            &nbsp;
                          </a>
                          <span>
                            {etudiantsLicence.bacalaureatContentType}, {byteSize(etudiantsLicence.bacalaureat)}
                          </span>
                        </div>
                      ) : null}
                    </td>
                    <td>
                      {etudiantsLicence.cinPassport ? (
                        <div>
                          <a onClick={openFile(etudiantsLicence.cinPassportContentType, etudiantsLicence.cinPassport)}>
                            <img
                              src={`data:${etudiantsLicence.cinPassportContentType};base64,${etudiantsLicence.cinPassport}`}
                              style={{ maxHeight: '30px' }}
                            />
                            &nbsp;
                          </a>
                          <span>
                            {etudiantsLicence.cinPassportContentType}, {byteSize(etudiantsLicence.cinPassport)}
                          </span>
                        </div>
                      ) : null}
                    </td>
                    <td>{etudiantsLicence.inscriptionvalide ? 'true' : 'false'}</td>
                    <td>{etudiantsLicence.absent ? 'true' : 'false'}</td>
                    <td>{etudiantsLicence.user ? etudiantsLicence.user.id : ''}</td>
                    <td>
                      {etudiantsLicence.filiere ? (
                        <Link to={`filiere/${etudiantsLicence.filiere.id}`}>{etudiantsLicence.filiere.id}</Link>
                      ) : (
                        ''
                      )}
                    </td>
                    <td>
                      {etudiantsLicence.anneeInscription ? (
                        <Link to={`annee-inscription/${etudiantsLicence.anneeInscription.id}`}>{etudiantsLicence.anneeInscription.id}</Link>
                      ) : (
                        ''
                      )}
                    </td>
                    <td>
                      {etudiantsLicence.modalite ? (
                        <Link to={`modalite-paiement/${etudiantsLicence.modalite.id}`}>{etudiantsLicence.modalite.id}</Link>
                      ) : (
                        ''
                      )}
                    </td>
                    <td className="text-right">
                      <div className="btn-group flex-btn-group-container">
                        <Button tag={Link} to={`${match.url}/${etudiantsLicence.id}`} color="info" size="sm">
                          <FontAwesomeIcon icon="eye" />{' '}
                          <span className="d-none d-md-inline">
                            <Translate contentKey="entity.action.view">View</Translate>
                          </span>
                        </Button>
                        <Button tag={Link} to={`${match.url}/${etudiantsLicence.id}/edit`} color="primary" size="sm">
                          <FontAwesomeIcon icon="pencil-alt" />{' '}
                          <span className="d-none d-md-inline">
                            <Translate contentKey="entity.action.edit">Edit</Translate>
                          </span>
                        </Button>
                        <Button tag={Link} to={`${match.url}/${etudiantsLicence.id}/delete`} color="danger" size="sm">
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
              <Translate contentKey="pfumv10App.etudiantsLicence.home.notFound">No Etudiants Licences found</Translate>
            </div>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ etudiantsLicence }: IRootState) => ({
  etudiantsLicenceList: etudiantsLicence.entities
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
)(EtudiantsLicence);
