import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, InputGroup, Col, Row, Table } from 'reactstrap';
import { AvForm, AvGroup, AvInput } from 'availity-reactstrap-validation';
// tslint:disable-next-line:no-unused-variable
import { Translate, translate, ICrudSearchAction, ICrudGetAllAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getSearchEntities, getEntities } from './professeur.reducer';
import { IProfesseur } from 'app/shared/model/professeur.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IProfesseurProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export interface IProfesseurState {
  search: string;
}

export class Professeur extends React.Component<IProfesseurProps, IProfesseurState> {
  state: IProfesseurState = {
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
    const { professeurList, match } = this.props;
    return (
      <div>
        <h2 id="professeur-heading">
          Liste des professeurs
          <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
            <FontAwesomeIcon icon="plus" />
            &nbsp;
            <Translate contentKey="pfumv10App.professeur.home.createLabel">Create new Professeur</Translate>
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
                    placeholder={translate('pfumv10App.professeur.home.search')}
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
          {professeurList && professeurList.length > 0 ? (
            <Table responsive>
              <thead>
                <tr>
                  <th>
                    <Translate contentKey="pfumv10App.professeur.nom">Nom</Translate>
                  </th>
                  <th>
                    <Translate contentKey="pfumv10App.professeur.prenom">Prenom</Translate>
                  </th>
                  <th>
                    <Translate contentKey="pfumv10App.professeur.etablissement">Etablissement</Translate>
                  </th>
                  <th>
                    <Translate contentKey="pfumv10App.professeur.grade">Grade</Translate>
                  </th>
                  <th>
                    <Translate contentKey="pfumv10App.professeur.diplome">Diplome</Translate>
                  </th>
                  <th>
                    <Translate contentKey="pfumv10App.professeur.cin">Cin</Translate>
                  </th>
                  <th>
                    <Translate contentKey="pfumv10App.professeur.rib">Rib</Translate>
                  </th>
                  <th>
                    <Translate contentKey="pfumv10App.professeur.email">Email</Translate>
                  </th>

                  <th />
                </tr>
              </thead>
              <tbody>
                {professeurList.map((professeur, i) => (
                  <tr key={`entity-${i}`}>
                    <td>{professeur.nom}</td>
                    <td>{professeur.prenom}</td>
                    <td>{professeur.etablissement}</td>
                    <td>{professeur.grade}</td>
                    <td>{professeur.diplome}</td>
                    <td>{professeur.cin}</td>
                    <td>{professeur.rib}</td>
                    <td>{professeur.email}</td>
                    <td className="text-right">
                      <div className="btn-group flex-btn-group-container">
                        <Button tag={Link} to={`${match.url}/${professeur.id}/edit`} color="primary" size="sm">
                          <FontAwesomeIcon icon="pencil-alt" />{' '}
                          <span className="d-none d-md-inline">
                            <Translate contentKey="entity.action.edit">Edit</Translate>
                          </span>
                        </Button>
                        <Button tag={Link} to={`${match.url}/${professeur.id}/delete`} color="danger" size="sm">
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
              <Translate contentKey="pfumv10App.professeur.home.notFound">No Professeurs found</Translate>
            </div>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ professeur }: IRootState) => ({
  professeurList: professeur.entities
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
)(Professeur);
