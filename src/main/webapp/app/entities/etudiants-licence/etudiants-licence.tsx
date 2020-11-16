import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, InputGroup, Col, Row, Table, Label } from 'reactstrap';
import { AvForm, AvGroup, AvInput } from 'availity-reactstrap-validation';
// tslint:disable-next-line:no-unused-variable
import { openFile, byteSize, Translate, translate, ICrudSearchAction, ICrudGetAllAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';

import {
  getSearchEntities,
  getEntities,
  updateEntity,
  getEntitiesByFiliere,
  getEntitiesByUserId,
  getEntitiesByEtudiantNameOrPrenom,
  getEntitiesByEtudiantNiveau
} from './etudiants-licence.reducer';
import { IEtudiantsLicence } from 'app/shared/model/etudiants-licence.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT, AUTHORITIES } from 'app/config/constants';
import { getEntities as getEtablissements } from 'app/entities/etablissement/etablissement.reducer';
import { getEntities as getFilieres, getEntitiesByEtab } from 'app/entities/filiere/filiere.reducer';
import { hasAnyAuthority } from 'app/shared/auth/private-route';

export interface IEtudiantsLicenceProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export interface IEtudiantsLicenceState {
  search: string;
}

export class EtudiantsLicence extends React.Component<IEtudiantsLicenceProps, IEtudiantsLicenceState> {
  state: IEtudiantsLicenceState = {
    search: ''
  };

  componentDidMount() {
    /* this.props.getEntities(); */
    this.props.getEtablissements();
    this.props.getFilieres();
    this.props.getEntitiesByUserId();
  }

  search = () => {
    if (this.state.search) {
      this.props.getSearchEntities(this.state.search);
    }
  };

  clear = () => {
    this.setState({ search: '' }, () => {
      /* this.props.getEntities(); */
      this.props.getEntitiesByUserId();
    });
  };

  handleSearch = event => this.setState({ search: event.target.value });

  toggleActive = etudiantsExecutif => () => {
    this.props.updateEntity({
      ...etudiantsExecutif,
      inscriptionvalide: !etudiantsExecutif.inscriptionvalide
    });
  };

  filtrerListFiliereEtab = e => {
    this.props.getEntitiesByEtab(e.target.value);
  };

  filtrerListEtudiantByFiliere = e => {
    this.props.history.push('/entity/etudiants-licence');
    if (e.target.value === '') this.props.getEntities();
    else this.props.getEntitiesByFiliere(e.target.value);
  };

  filtrerListEtudiantByName = e => {
    if (e.target.value === '') this.props.getEntities();
    else this.props.getEntitiesByEtudiantNameOrPrenom(e.target.value);
  };

  filtrerEtudiantByNiveau = e => {
    if (e.target.value === '') this.props.getEntities();
    else this.props.getEntitiesByEtudiantNiveau(e.target.value);
  };

  render() {
    const { etudiantsLicenceList, match, etablissements, filieres, isAdmin, isUser, isRespFin, isEtudiant } = this.props;
    return (
      <div>
        <br />
        {(isAdmin || isUser) && (
          <h2 id="etudiants-licence-heading">
            &nbsp; Liste des inscrits : BAC+3
            <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
              <FontAwesomeIcon icon="plus" />
              &nbsp; Ajouter un nouvel étudiant
            </Link>
          </h2>
        )}
        {isEtudiant && <h2 id="etudiants-executif-heading">Détail Inscription Etudiant</h2>}
        <br />
        <Row>
          {(isAdmin || isUser) && (
            <>
              <Col>
                <div>
                  <select onChange={this.filtrerListEtudiantByFiliere} placeholder="Filtrer par Filière">
                    <option value="" key="0">
                      &nbsp;&nbsp;Filtrer par Filière
                    </option>
                    {filieres
                      ? filieres.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.nomfiliere}
                          </option>
                        ))
                      : null}
                  </select>
                </div>
              </Col>
              <Col>
                <div>
                  <input
                    type="text"
                    onChange={this.filtrerListEtudiantByName}
                    placeholder="Chercher par N° Etdiant, Nom/Prénom"
                    style={{ width: '300px' }}
                  />
                </div>
              </Col>
              <Col>
                <div>
                  <select onChange={this.filtrerEtudiantByNiveau}>
                    <option value=""> &nbsp; Filtrer par Niveau Inscription </option>
                    <option value="PREMIER">Première année</option>
                    <option value="DEUXIEME">Deuxième année</option>
                    <option value="TROISIEME">Troisième année</option>
                  </select>
                </div>
              </Col>
            </>
          )}
        </Row>
        <br />
        <div className="table-responsive" style={{ marginLeft: '10px', paddingRight: '20px' }}>
          {etudiantsLicenceList && etudiantsLicenceList.length > 0 ? (
            <Table responsive>
              <thead>
                <tr>
                  <th>N° etudiant</th>
                  <th>
                    <Translate contentKey="pfumApp.etudiantsLicence.nom">Nom</Translate>
                  </th>
                  <th>
                    <Translate contentKey="pfumApp.etudiantsLicence.prenom">Prenom</Translate>
                  </th>

                  <th>
                    <Translate contentKey="pfumApp.etudiantsLicence.photo">Photo</Translate>
                  </th>

                  {(isAdmin || isRespFin) && <th>Validité</th>}

                  <th>
                    <Translate contentKey="pfumApp.etudiantsLicence.filiere">Filiere</Translate>
                  </th>
                  <th>Année scolaire</th>

                  <th />
                </tr>
              </thead>
              <tbody>
                {etudiantsLicenceList.map((etudiantsLicence, i) => (
                  <tr key={`entity-${i}`}>
                    <td>{etudiantsLicence.suffixe}</td>
                    <td>{etudiantsLicence.nom}</td>
                    <td>{etudiantsLicence.prenom}</td>
                    <td>
                      {etudiantsLicence.photo ? (
                        <div>
                          <a onClick={openFile(etudiantsLicence.photoContentType, etudiantsLicence.photo)}>
                            <img
                              src={`data:${etudiantsLicence.photoContentType};base64,${etudiantsLicence.photo}`}
                              style={{ maxHeight: '70px' }}
                            />
                            &nbsp;
                          </a>
                        </div>
                      ) : null}
                    </td>
                    {(isAdmin || isRespFin) && (
                      <td>
                        {etudiantsLicence.inscriptionvalide ? (
                          <Button color="success" onClick={this.toggleActive(etudiantsLicence)}>
                            Validé
                          </Button>
                        ) : (
                          <Button color="danger" onClick={this.toggleActive(etudiantsLicence)}>
                            En attente
                          </Button>
                        )}
                      </td>
                    )}
                    <td>
                      {etudiantsLicence.filiere ? (
                        <Link to={`filiere/${etudiantsLicence.filiere.id}`}>{etudiantsLicence.filiere.nomfiliere}</Link>
                      ) : (
                        ''
                      )}
                    </td>
                    <td>
                      {etudiantsLicence.anneeInscription ? (
                        <Link to={`annee-inscription/${etudiantsLicence.anneeInscription.id}`}>
                          {etudiantsLicence.anneeInscription.annee}
                        </Link>
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
                        {(isAdmin || isUser) && (
                          <>
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
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          ) : (
            <div className="alert alert-warning">
              <Translate contentKey="pfumApp.etudiantsLicence.home.notFound">No Etudiants Licences found</Translate>
            </div>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (storeState: IRootState) => ({
  etudiantsLicenceList: storeState.etudiantsLicence.entities,
  etablissements: storeState.etablissement.entities,
  filieres: storeState.filiere.entities,
  isAdmin: hasAnyAuthority(storeState.authentication.account.authorities, [AUTHORITIES.ADMIN]),
  isUser: hasAnyAuthority(storeState.authentication.account.authorities, [AUTHORITIES.USER]),
  isRespFin: hasAnyAuthority(storeState.authentication.account.authorities, [AUTHORITIES.ROLE_RESP_FINANCE]),
  isEtudiant: hasAnyAuthority(storeState.authentication.account.authorities, [AUTHORITIES.ROLE_ETUDIANT_EXECUTIF])
});

const mapDispatchToProps = {
  getSearchEntities,
  getEntities,
  updateEntity,
  getEtablissements,
  getFilieres,
  getEntitiesByEtab,
  getEntitiesByFiliere,
  getEntitiesByUserId,
  getEntitiesByEtudiantNameOrPrenom,
  getEntitiesByEtudiantNiveau
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EtudiantsLicence);
