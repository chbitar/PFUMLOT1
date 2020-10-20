import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, InputGroup, Col, Row, Table } from 'reactstrap';
import { AvForm, AvGroup, AvInput } from 'availity-reactstrap-validation';
// tslint:disable-next-line:no-unused-variable
import { openFile, byteSize, Translate, translate, ICrudSearchAction, ICrudGetAllAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getSearchEntities, getEntities } from './espace-etudiant.reducer';
import { IEspaceEtudiant } from 'app/shared/model/espace-etudiant.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IEspaceEtudiantProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export interface IEspaceEtudiantState {
  search: string;
}

export class EspaceEtudiant extends React.Component<IEspaceEtudiantProps, IEspaceEtudiantState> {
  state: IEspaceEtudiantState = {
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
    const { espaceEtudiantList, match } = this.props;
    return (
      <div>
        <h2 id="espace-etudiant-heading">
          <Translate contentKey="pfumv10App.espaceEtudiant.home.title">Espace Etudiants</Translate>
          <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
            <FontAwesomeIcon icon="plus" />
            &nbsp;
            <Translate contentKey="pfumv10App.espaceEtudiant.home.createLabel">Create new Espace Etudiant</Translate>
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
                    placeholder={translate('pfumv10App.espaceEtudiant.home.search')}
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
          {espaceEtudiantList && espaceEtudiantList.length > 0 ? (
            <Table responsive>
              <thead>
                <tr>
                  <th>
                    <Translate contentKey="global.field.id">ID</Translate>
                  </th>
                  <th>
                    <Translate contentKey="pfumv10App.espaceEtudiant.emploiDuTemps">Emploi Du Temps</Translate>
                  </th>
                  <th>
                    <Translate contentKey="pfumv10App.espaceEtudiant.user">User</Translate>
                  </th>
                  <th>
                    <Translate contentKey="pfumv10App.espaceEtudiant.etudiantLicence">Etudiant Licence</Translate>
                  </th>
                  <th>
                    <Translate contentKey="pfumv10App.espaceEtudiant.etudiantMaster">Etudiant Master</Translate>
                  </th>
                  <th>
                    <Translate contentKey="pfumv10App.espaceEtudiant.etudiantExecutif">Etudiant Executif</Translate>
                  </th>
                  <th>
                    <Translate contentKey="pfumv10App.espaceEtudiant.calendrier">Calendrier</Translate>
                  </th>
                  <th>
                    <Translate contentKey="pfumv10App.espaceEtudiant.absence">Absence</Translate>
                  </th>
                  <th>
                    <Translate contentKey="pfumv10App.espaceEtudiant.annonce">Annonce</Translate>
                  </th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {espaceEtudiantList.map((espaceEtudiant, i) => (
                  <tr key={`entity-${i}`}>
                    <td>
                      <Button tag={Link} to={`${match.url}/${espaceEtudiant.id}`} color="link" size="sm">
                        {espaceEtudiant.id}
                      </Button>
                    </td>
                    <td>
                      {espaceEtudiant.emploiDuTemps ? (
                        <div>
                          <a onClick={openFile(espaceEtudiant.emploiDuTempsContentType, espaceEtudiant.emploiDuTemps)}>
                            <img
                              src={`data:${espaceEtudiant.emploiDuTempsContentType};base64,${espaceEtudiant.emploiDuTemps}`}
                              style={{ maxHeight: '30px' }}
                            />
                            &nbsp;
                          </a>
                          <span>
                            {espaceEtudiant.emploiDuTempsContentType}, {byteSize(espaceEtudiant.emploiDuTemps)}
                          </span>
                        </div>
                      ) : null}
                    </td>
                    <td>{espaceEtudiant.user ? espaceEtudiant.user.id : ''}</td>
                    <td>
                      {espaceEtudiant.etudiantLicence ? (
                        <Link to={`etudiants-licence/${espaceEtudiant.etudiantLicence.id}`}>{espaceEtudiant.etudiantLicence.id}</Link>
                      ) : (
                        ''
                      )}
                    </td>
                    <td>
                      {espaceEtudiant.etudiantMaster ? (
                        <Link to={`etudiants-master/${espaceEtudiant.etudiantMaster.id}`}>{espaceEtudiant.etudiantMaster.id}</Link>
                      ) : (
                        ''
                      )}
                    </td>
                    <td>
                      {espaceEtudiant.etudiantExecutif ? (
                        <Link to={`etudiants-executif/${espaceEtudiant.etudiantExecutif.id}`}>{espaceEtudiant.etudiantExecutif.id}</Link>
                      ) : (
                        ''
                      )}
                    </td>
                    <td>
                      {espaceEtudiant.calendrier ? (
                        <Link to={`calendrier-module/${espaceEtudiant.calendrier.id}`}>{espaceEtudiant.calendrier.id}</Link>
                      ) : (
                        ''
                      )}
                    </td>
                    <td>
                      {espaceEtudiant.absence ? <Link to={`absence/${espaceEtudiant.absence.id}`}>{espaceEtudiant.absence.id}</Link> : ''}
                    </td>
                    <td>
                      {espaceEtudiant.annonce ? <Link to={`annonce/${espaceEtudiant.annonce.id}`}>{espaceEtudiant.annonce.id}</Link> : ''}
                    </td>
                    <td className="text-right">
                      <div className="btn-group flex-btn-group-container">
                        <Button tag={Link} to={`${match.url}/${espaceEtudiant.id}`} color="info" size="sm">
                          <FontAwesomeIcon icon="eye" />{' '}
                          <span className="d-none d-md-inline">
                            <Translate contentKey="entity.action.view">View</Translate>
                          </span>
                        </Button>
                        <Button tag={Link} to={`${match.url}/${espaceEtudiant.id}/edit`} color="primary" size="sm">
                          <FontAwesomeIcon icon="pencil-alt" />{' '}
                          <span className="d-none d-md-inline">
                            <Translate contentKey="entity.action.edit">Edit</Translate>
                          </span>
                        </Button>
                        <Button tag={Link} to={`${match.url}/${espaceEtudiant.id}/delete`} color="danger" size="sm">
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
              <Translate contentKey="pfumv10App.espaceEtudiant.home.notFound">No Espace Etudiants found</Translate>
            </div>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ espaceEtudiant }: IRootState) => ({
  espaceEtudiantList: espaceEtudiant.entities
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
)(EspaceEtudiant);
