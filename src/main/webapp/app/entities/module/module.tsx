import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, InputGroup, Col, Row, Table } from 'reactstrap';
import { AvForm, AvGroup, AvInput } from 'availity-reactstrap-validation';
// tslint:disable-next-line:no-unused-variable
import { Translate, translate, ICrudSearchAction, ICrudGetAllAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';
import { getSearchEntities, getEntities, getEntitiesBySemestre, getEntitiesByFiliere, getEntitiesOrdredBySemestre } from './module.reducer';
import { IModule } from 'app/shared/model/module.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IModuleProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export interface IModuleState {
  search: string;
}

export class Module extends React.Component<IModuleProps, IModuleState> {
  state: IModuleState = {
    search: ''
  };

  componentDidMount() {
    this.props.getEntitiesOrdredBySemestre();
  }

  search = () => {
    if (this.state.search) {
      this.props.getSearchEntities(this.state.search);
    }
  };

  clear = () => {
    this.setState({ search: '' }, () => {
      this.props.getEntitiesOrdredBySemestre();
    });
  };

  handleSearch = event => this.setState({ search: event.target.value });

  filtrerListModuleBySemestre = e => {
    this.props.history.push('/entity/module');

    if (e.target.value === '') this.props.getEntitiesOrdredBySemestre();
    else this.props.getEntitiesBySemestre(e.target.value);
  };

  filtrerListModuleByFiliere = e => {
    this.props.history.push('/entity/module');

    if (e.target.value === '') this.props.getEntitiesOrdredBySemestre();
    else this.props.getEntitiesByFiliere(e.target.value);
  };

  render() {
    const { moduleList, match } = this.props;
    return (
      <div>
        <h2 id="module-heading">
          &nbsp; &nbsp; Liste des modules
          <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
            <FontAwesomeIcon icon="plus" />
            &nbsp;Ajouter un nouveau module
          </Link>
        </h2>
        <br />
        <br />
        <Row>
          <Col sm="12">
            <div>
              Filtrer par Semestre : &nbsp;
              <select onChange={this.filtrerListModuleBySemestre}>
                <option value="" />
                <option value="S1">Semestre 1</option>
                <option value="S2">Semestre 2</option>
                <option value="S3">Semestre 3</option>
                <option value="S4">Semestre 4</option>
                <option value="S5">Semestre 5</option>
                <option value="S6">Semestre 6</option>
              </select>
            </div>
          </Col>
        </Row>
        <br />
        <br />
        <div className="table-responsive" style={{ marginLeft: '10px', paddingRight: '20px' }}>
          {moduleList && moduleList.length > 0 ? (
            <Table responsive>
              <thead>
                <tr>
                  <th>
                    <Translate contentKey="pfumApp.module.nomModule">Nom Module</Translate>
                  </th>
                  <th>
                    <Translate contentKey="pfumApp.module.volumeHoraire">Volume Horaire</Translate>(en Heure)
                  </th>
                  <th>
                    <Translate contentKey="pfumApp.module.semestre">Semestre</Translate>
                  </th>
                  <th>Filière</th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {moduleList.map((module, i) => (
                  <tr key={`entity-${i}`}>
                    <td>{module.nomModule}</td>
                    <td>{module.volumeHoraire}</td>
                    <td>
                      <Translate contentKey={`pfumApp.Semestre.${module.semestre}`} />
                    </td>
                    <td>{module.filiere ? <Link to={`filiere/${module.filiere.id}`}>{module.filiere.nomfiliere}</Link> : ''}</td>
                    <td className="text-right">
                      <div className="btn-group flex-btn-group-container">
                        <Button tag={Link} to={`${match.url}/${module.id}`} color="info" size="sm">
                          <FontAwesomeIcon icon="eye" />{' '}
                          <span className="d-none d-md-inline">
                            <Translate contentKey="entity.action.view">View</Translate>
                          </span>
                        </Button>
                        <Button tag={Link} to={`${match.url}/${module.id}/edit`} color="primary" size="sm">
                          <FontAwesomeIcon icon="pencil-alt" />{' '}
                          <span className="d-none d-md-inline">
                            <Translate contentKey="entity.action.edit">Edit</Translate>
                          </span>
                        </Button>
                        <Button tag={Link} to={`${match.url}/${module.id}/delete`} color="danger" size="sm">
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
              <Translate contentKey="pfumApp.module.home.notFound">No Modules found</Translate>
            </div>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ module }: IRootState) => ({
  moduleList: module.entities
});

const mapDispatchToProps = {
  getSearchEntities,
  getEntities,
  getEntitiesOrdredBySemestre,
  getEntitiesBySemestre,
  getEntitiesByFiliere
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Module);
