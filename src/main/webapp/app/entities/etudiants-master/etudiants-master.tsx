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
} from './etudiants-master.reducer';
import { IEtudiantsMaster } from 'app/shared/model/etudiants-master.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT, AUTHORITIES } from 'app/config/constants';

import { getEntities as getEtablissements } from 'app/entities/etablissement/etablissement.reducer';
import { getEntities as getFilieres, getEntitiesByEtab } from 'app/entities/filiere/filiere.reducer';
import { hasAnyAuthority } from 'app/shared/auth/private-route';

export interface IEtudiantsMasterProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export interface IEtudiantsMasterState {
  search: string;
}

export class EtudiantsMaster extends React.Component<IEtudiantsMasterProps, IEtudiantsMasterState> {
  state: IEtudiantsMasterState = {
    search: ''
  };

  componentDidMount() {
    /* this.props.getEntities(); */
    this.props.getEntitiesByUserId();
    this.props.getEtablissements();
    this.props.getFilieres();
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

  toggleActive = etudiantsMaster => () => {
    this.props.updateEntity({
      ...etudiantsMaster,
      inscriptionvalide: !etudiantsMaster.inscriptionvalide
    });
  };

  filtrerListFiliereEtab = e => {
    this.props.getEntitiesByEtab(e.target.value);
  };

  filtrerListEtudiantByFiliere = e => {
    this.props.history.push('/entity/etudiants-master');
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
    const { etudiantsMasterList, match, etablissements, filieres, isAdmin, isUser, isRespFin, isEtudiant } = this.props;
    return (
      <div>
        {(isAdmin || isUser) && (
          <h2 id="etudiants-master-heading">
            Liste inscrits : MASTER ACADEMIQUE
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
                    {/* <option value="TROISIEME">Troisième année</option> */}
                  </select>
                </div>
              </Col>
            </>
          )}
        </Row>
        <br />
        <div className="table-responsive" style={{ marginLeft: '10px', paddingRight: '20px' }}>
          {etudiantsMasterList && etudiantsMasterList.length > 0 ? (
            <Table responsive>
              <thead>
                <tr>
                  <th>N° étudiant</th>
                  <th>
                    <Translate contentKey="pfumApp.etudiantsMaster.nom">Nom</Translate>
                  </th>
                  <th>
                    <Translate contentKey="pfumApp.etudiantsMaster.prenom">Prenom</Translate>
                  </th>

                  <th>
                    <Translate contentKey="pfumApp.etudiantsMaster.photo">Photo</Translate>
                  </th>

                  {(isAdmin || isRespFin) && <th>Validité</th>}

                  <th>
                    <Translate contentKey="pfumApp.etudiantsMaster.filiere">Filiere</Translate>
                  </th>
                  <th>Année scolaire</th>

                  <th />
                </tr>
              </thead>
              <tbody>
                {etudiantsMasterList.map((etudiantsMaster, i) => (
                  <tr key={`entity-${i}`}>
                    <td>{etudiantsMaster.suffixe}</td>
                    <td>{etudiantsMaster.nom}</td>
                    <td>{etudiantsMaster.prenom}</td>

                    <td>
                      {etudiantsMaster.photo ? (
                        <div>
                          <a onClick={openFile(etudiantsMaster.photoContentType, etudiantsMaster.photo)}>
                            <img
                              src={`data:${etudiantsMaster.photoContentType};base64,${etudiantsMaster.photo}`}
                              style={{ maxHeight: '70px' }}
                            />
                            &nbsp;
                          </a>
                        </div>
                      ) : null}
                    </td>
                    {(isAdmin || isRespFin) && (
                      <td>
                        {/*        {etudiantsMaster.inscriptionvalide ? (
                          <Button color="success" onClick={this.toggleActive(etudiantsMaster)}>
                            Validé
                          </Button>
                        ) : (
                          <Button color="danger" onClick={this.toggleActive(etudiantsMaster)}>
                            En attente
                          </Button>
                        )} */}
                        <Button color="success">Validé</Button>
                      </td>
                    )}
                    <td>
                      {etudiantsMaster.filiere ? (
                        <Link to={`filiere/${etudiantsMaster.filiere.id}`}>{etudiantsMaster.filiere.nomfiliere}</Link>
                      ) : (
                        ''
                      )}
                    </td>
                    <td>
                      {etudiantsMaster.anneeInscription ? (
                        <Link to={`annee-inscription/${etudiantsMaster.anneeInscription.id}`}>
                          {etudiantsMaster.anneeInscription.annee}
                        </Link>
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
                        {(isAdmin || isUser) && (
                          <>
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
              <Translate contentKey="pfumApp.etudiantsMaster.home.notFound">No Etudiants Masters found</Translate>
            </div>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (storeState: IRootState) => ({
  etudiantsMasterList: storeState.etudiantsMaster.entities,
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
  getEntitiesByFiliere,
  getEtablissements,
  getFilieres,
  getEntitiesByEtab,
  getEntitiesByUserId,
  getEntitiesByEtudiantNameOrPrenom,
  getEntitiesByEtudiantNiveau
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EtudiantsMaster);
