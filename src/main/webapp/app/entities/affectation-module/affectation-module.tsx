import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, InputGroup, Col, Row, Table } from 'reactstrap';
import { AvForm, AvGroup, AvInput } from 'availity-reactstrap-validation';
// tslint:disable-next-line:no-unused-variable
import { Translate, translate, ICrudSearchAction, ICrudGetAllAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getSearchEntities, getEntities } from './affectation-module.reducer';
import { IAffectationModule } from 'app/shared/model/affectation-module.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IAffectationModuleProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export interface IAffectationModuleState {
  search: string;
}

export class AffectationModule extends React.Component<IAffectationModuleProps, IAffectationModuleState> {
  state: IAffectationModuleState = {
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
    const { affectationModuleList, match } = this.props;
    return (
      <div>
        <h2 id="affectation-module-heading">
          <Translate contentKey="pfumv10App.affectationModule.home.title">Affectation Modules</Translate>
          <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
            <FontAwesomeIcon icon="plus" />
            &nbsp;
            <Translate contentKey="pfumv10App.affectationModule.home.createLabel">Create new Affectation Module</Translate>
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
                    placeholder={translate('pfumv10App.affectationModule.home.search')}
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
          {affectationModuleList && affectationModuleList.length > 0 ? (
            <Table responsive>
              <thead>
                <tr>
                  <th>
                    <Translate contentKey="global.field.id">ID</Translate>
                  </th>
                  <th>
                    <Translate contentKey="pfumv10App.affectationModule.annee">Annee</Translate>
                  </th>
                  <th>
                    <Translate contentKey="pfumv10App.affectationModule.semestre">Semestre</Translate>
                  </th>
                  <th>
                    <Translate contentKey="pfumv10App.affectationModule.module">Module</Translate>
                  </th>
                  <th>
                    <Translate contentKey="pfumv10App.affectationModule.professeur">Professeur</Translate>
                  </th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {affectationModuleList.map((affectationModule, i) => (
                  <tr key={`entity-${i}`}>
                    <td>
                      <Button tag={Link} to={`${match.url}/${affectationModule.id}`} color="link" size="sm">
                        {affectationModule.id}
                      </Button>
                    </td>
                    <td>{affectationModule.annee}</td>
                    <td>
                      <Translate contentKey={`pfumv10App.Semestre.${affectationModule.semestre}`} />
                    </td>
                    <td>
                      {affectationModule.module ? (
                        <Link to={`module/${affectationModule.module.id}`}>{affectationModule.module.id}</Link>
                      ) : (
                        ''
                      )}
                    </td>
                    <td>
                      {affectationModule.professeur ? (
                        <Link to={`professeur/${affectationModule.professeur.id}`}>{affectationModule.professeur.id}</Link>
                      ) : (
                        ''
                      )}
                    </td>
                    <td className="text-right">
                      <div className="btn-group flex-btn-group-container">
                        <Button tag={Link} to={`${match.url}/${affectationModule.id}`} color="info" size="sm">
                          <FontAwesomeIcon icon="eye" />{' '}
                          <span className="d-none d-md-inline">
                            <Translate contentKey="entity.action.view">View</Translate>
                          </span>
                        </Button>
                        <Button tag={Link} to={`${match.url}/${affectationModule.id}/edit`} color="primary" size="sm">
                          <FontAwesomeIcon icon="pencil-alt" />{' '}
                          <span className="d-none d-md-inline">
                            <Translate contentKey="entity.action.edit">Edit</Translate>
                          </span>
                        </Button>
                        <Button tag={Link} to={`${match.url}/${affectationModule.id}/delete`} color="danger" size="sm">
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
              <Translate contentKey="pfumv10App.affectationModule.home.notFound">No Affectation Modules found</Translate>
            </div>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ affectationModule }: IRootState) => ({
  affectationModuleList: affectationModule.entities
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
)(AffectationModule);
