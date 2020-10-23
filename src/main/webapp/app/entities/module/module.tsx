import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, InputGroup, Col, Row, Table } from 'reactstrap';
import { AvForm, AvGroup, AvInput } from 'availity-reactstrap-validation';
// tslint:disable-next-line:no-unused-variable
import { Translate, translate, ICrudSearchAction, ICrudGetAllAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';
import { getSearchEntities, getEntities, getEntitiesBySemestre } from './module.reducer';
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

  filtrerListModuleBySemestre = e => {
    this.props.history.push('/entity/module');

    if (e.target.value === '') this.props.getEntities();
    else this.props.getEntitiesBySemestre(e.target.value);
  };

  render() {
    const { moduleList, match } = this.props;
    return (
      <div>
        <h2 id="module-heading">
          liste des modules
          <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
            <FontAwesomeIcon icon="plus" />
            &nbsp; Ajouter un nouveau module
          </Link>
        </h2>
        <Row>
          {/* <Col sm="12">
            <AvForm onSubmit={this.search}>
              <AvGroup>
                <InputGroup>
                  <AvInput
                    type="text"
                    name="search"
                    value={this.state.search}
                    onChange={this.handleSearch}
                    placeholder={translate('pfumv10App.module.home.search')}
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
          </Col> */}
          <Col sm="12">
            Filtrer par Semestre :
            <div>
              <select onChange={this.filtrerListModuleBySemestre}>
                <option value="" />
                <option value="S1">S1</option>
                <option value="S2">S2</option>
                <option value="S3">S3</option>
                <option value="S4">S4</option>
                <option value="S5">S5</option>
                <option value="S6">S6</option>
              </select>
            </div>
          </Col>
        </Row>

        <div className="table-responsive">
          {moduleList && moduleList.length > 0 ? (
            <Table responsive>
              <thead>
                <tr>
                  <th>
                    <Translate contentKey="pfumv10App.module.nomModule">Nom Module</Translate>
                  </th>
                  <th>
                    <Translate contentKey="pfumv10App.module.volumeHoraire">Volume Horaire</Translate>
                  </th>
                  <th>
                    <Translate contentKey="pfumv10App.module.semestre">Semestre</Translate>
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
                      <Translate contentKey={`pfumv10App.Semestre.${module.semestre}`} />
                    </td>
                    <td>{module.filiere ? <Link to={`filiere/${module.filiere.id}`}>{module.filiere.nomfiliere}</Link> : ''}</td>
                    <td className="text-right">
                      <div className="btn-group flex-btn-group-container">
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
              <Translate contentKey="pfumv10App.module.home.notFound">No Modules found</Translate>
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
  getEntitiesBySemestre
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Module);
