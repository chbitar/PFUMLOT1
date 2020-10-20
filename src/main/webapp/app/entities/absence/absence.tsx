import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, InputGroup, Col, Row, Table } from 'reactstrap';
import { AvForm, AvGroup, AvInput } from 'availity-reactstrap-validation';
// tslint:disable-next-line:no-unused-variable
import { Translate, translate, ICrudSearchAction, ICrudGetAllAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getSearchEntities, getEntities } from './absence.reducer';
import { IAbsence } from 'app/shared/model/absence.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IAbsenceProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export interface IAbsenceState {
  search: string;
}

export class Absence extends React.Component<IAbsenceProps, IAbsenceState> {
  state: IAbsenceState = {
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
    const { absenceList, match } = this.props;
    return (
      <div>
        <h2 id="absence-heading">
          {/*           <Translate contentKey="pfumv10App.absence.home.title">Absences</Translate>
           */}{' '}
          Liste des absences : Master Executif
          <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
            <FontAwesomeIcon icon="plus" />
            &nbsp; Marquer une nouvelle absence
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
                    placeholder={translate('pfumv10App.absence.home.search')}
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
          {absenceList && absenceList.length > 0 ? (
            <Table responsive>
              <thead>
                <tr>
                  {/*  <th>
                    <Translate contentKey="global.field.id">ID</Translate>
                  </th> */}
                  <th>
                    <Translate contentKey="pfumv10App.absence.absent">Absent</Translate>
                  </th>
                  <th>
                    <Translate contentKey="pfumv10App.absence.dateSeance">Date Seance</Translate>
                  </th>

                  <th>
                    <Translate contentKey="pfumv10App.absence.module">Module</Translate>
                  </th>
                  {/*    <th>
                    <Translate contentKey="pfumv10App.absence.etudiantsLicence">Etudiants Licence</Translate>
                  </th> */}
                  {/*  <th>
                    <Translate contentKey="pfumv10App.absence.etudiantsMaster">Etudiants Master</Translate>
                  </th>*/}
                  <th>Nom Etudiant</th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {absenceList
                  .filter(absence => absence.etudiantsExecutif != null)
                  .map((absence, i) => (
                    <tr key={`entity-${i}`}>
                      {/*  <td>
                      <Button tag={Link} to={`${match.url}/${absence.id}`} color="link" size="sm">
                        {absence.id}
                      </Button>
                    </td> */}
                      <td>{absence.absent ? <Button color="success">Présent</Button> : <Button color="danger">Absent</Button>}</td>
                      <td>
                        <TextFormat type="date" value={absence.dateSeance} format={APP_DATE_FORMAT} />
                      </td>
                      <td>{absence.module ? <Link to={`module/${absence.module.id}`}>{absence.module.nomModule}</Link> : ''}</td>
                      {/* <td>
                      {absence.etudiantsLicence ? (
                        <Link to={`etudiants-licence/${absence.etudiantsLicence.id}`}>
                          {absence.etudiantsLicence.nom + ' ' + absence.etudiantsLicence.prenom}
                        </Link>
                      ) : (
                        ''
                      )}
                    </td> */}
                      {/*   <td>
                      {absence.etudiantsMaster ? (
                        <Link to={`etudiants-master/${absence.etudiantsMaster.id}`}>
                          {absence.etudiantsMaster.nom + ' ' + absence.etudiantsMaster.prenom}
                        </Link>
                      ) : (
                        ''
                      )}
                    </td>*/}
                      <td>
                        {absence.etudiantsExecutif ? (
                          <Link to={`etudiants-executif/${absence.etudiantsExecutif.id}`}>
                            {absence.etudiantsExecutif.nom + ' ' + absence.etudiantsExecutif.prenom}
                          </Link>
                        ) : (
                          ''
                        )}
                      </td>
                      <td className="text-right">
                        <div className="btn-group flex-btn-group-container">
                          <Button tag={Link} to={`${match.url}/${absence.id}`} color="info" size="sm">
                            <FontAwesomeIcon icon="eye" />{' '}
                            <span className="d-none d-md-inline">
                              <Translate contentKey="entity.action.view">View</Translate>
                            </span>
                          </Button>

                          <Button tag={Link} to={`${match.url}/${absence.id}/delete`} color="danger" size="sm">
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
              <Translate contentKey="pfumv10App.absence.home.notFound">No Absences found</Translate>
            </div>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ absence }: IRootState) => ({
  absenceList: absence.entities
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
)(Absence);
