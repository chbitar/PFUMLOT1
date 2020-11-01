import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, InputGroup, Col, Row, Table } from 'reactstrap';
import { AvForm, AvGroup, AvInput } from 'availity-reactstrap-validation';
// tslint:disable-next-line:no-unused-variable
import { Translate, translate, ICrudSearchAction, ICrudGetAllAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getSearchEntities, getEntities } from './filiere.reducer';
import { IFiliere } from 'app/shared/model/filiere.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IFiliereProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export interface IFiliereState {
  search: string;
}

export class Filiere extends React.Component<IFiliereProps, IFiliereState> {
  state: IFiliereState = {
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
    const { filiereList, match } = this.props;
    return (
      <div>
        <h2 id="filiere-heading">
          &nbsp; &nbsp; Liste des filières
          <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
            <FontAwesomeIcon icon="plus" />
            &nbsp; Ajouter une filière
          </Link>
        </h2>
        &nbsp; &nbsp;
        <div className="table-responsive">
          {filiereList && filiereList.length > 0 ? (
            <Table responsive>
              <thead>
                <tr>
                  <th>Nom Filière</th>
                  <th>Responsable</th>
                  <th>Accréditation</th>
                  <th>Programme</th>
                  <th>Etablissement</th>
                  <th>Année académique</th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {filiereList.map((filiere, i) => (
                  <tr key={`entity-${i}`}>
                    <td>{filiere.nomfiliere}</td>
                    <td>{filiere.responsable}</td>
                    <td>{filiere.accreditaion}</td>
                    <td>{filiere.programme}</td>
                    <td>
                      {filiere.etablissement ? (
                        <Link to={`etablissement/${filiere.etablissement.id}`}>{filiere.etablissement.nomEcole}</Link>
                      ) : (
                        ''
                      )}
                    </td>
                    <td>{filiere.anneeInscription ? filiere.anneeInscription.annee : ''}</td>
                    <td className="text-right">
                      <div className="btn-group flex-btn-group-container">
                        <Button tag={Link} to={`${match.url}/${filiere.id}`} color="info" size="sm">
                          <FontAwesomeIcon icon="eye" />{' '}
                          <span className="d-none d-md-inline">
                            <Translate contentKey="entity.action.view">View</Translate>
                          </span>
                        </Button>
                        <Button tag={Link} to={`${match.url}/${filiere.id}/edit`} color="primary" size="sm">
                          <FontAwesomeIcon icon="pencil-alt" />{' '}
                          <span className="d-none d-md-inline">
                            <Translate contentKey="entity.action.edit">Edit</Translate>
                          </span>
                        </Button>
                        <Button tag={Link} to={`${match.url}/${filiere.id}/delete`} color="danger" size="sm">
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
              <Translate contentKey="pfumApp.filiere.home.notFound">No Filieres found</Translate>
            </div>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ filiere }: IRootState) => ({
  filiereList: filiere.entities
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
)(Filiere);
