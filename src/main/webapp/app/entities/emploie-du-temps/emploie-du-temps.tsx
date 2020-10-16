import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, InputGroup, Col, Row, Table } from 'reactstrap';
import { AvForm, AvGroup, AvInput } from 'availity-reactstrap-validation';
// tslint:disable-next-line:no-unused-variable
import { openFile, byteSize, Translate, translate, ICrudSearchAction, ICrudGetAllAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getSearchEntities, getEntities } from './emploie-du-temps.reducer';
import { IEmploieDuTemps } from 'app/shared/model/emploie-du-temps.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IEmploieDuTempsProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export interface IEmploieDuTempsState {
  search: string;
}

export class EmploieDuTemps extends React.Component<IEmploieDuTempsProps, IEmploieDuTempsState> {
  state: IEmploieDuTempsState = {
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
    const { emploieDuTempsList, match } = this.props;
    return (
      <div>
        <h2 id="emploie-du-temps-heading">
          <Translate contentKey="pfumv10App.emploieDuTemps.home.title">Emploie Du Temps</Translate>
          <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
            <FontAwesomeIcon icon="plus" />
            &nbsp;
            <Translate contentKey="pfumv10App.emploieDuTemps.home.createLabel">Create new Emploie Du Temps</Translate>
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
                    placeholder={translate('pfumv10App.emploieDuTemps.home.search')}
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
          {emploieDuTempsList && emploieDuTempsList.length > 0 ? (
            <Table responsive>
              <thead>
                <tr>
                  <th>
                    <Translate contentKey="global.field.id">ID</Translate>
                  </th>
                  <th>
                    <Translate contentKey="pfumv10App.emploieDuTemps.emploieDuTemps">Emploie Du Temps</Translate>
                  </th>
                  <th>
                    <Translate contentKey="pfumv10App.emploieDuTemps.programme">Programme</Translate>
                  </th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {emploieDuTempsList.map((emploieDuTemps, i) => (
                  <tr key={`entity-${i}`}>
                    <td>
                      <Button tag={Link} to={`${match.url}/${emploieDuTemps.id}`} color="link" size="sm">
                        {emploieDuTemps.id}
                      </Button>
                    </td>
                    <td>
                      {emploieDuTemps.emploieDuTemps ? (
                        <div>
                          <a onClick={openFile(emploieDuTemps.emploieDuTempsContentType, emploieDuTemps.emploieDuTemps)}>
                            <Translate contentKey="entity.action.open">Open</Translate>
                            &nbsp;
                          </a>
                          <span>
                            {emploieDuTemps.emploieDuTempsContentType}, {byteSize(emploieDuTemps.emploieDuTemps)}
                          </span>
                        </div>
                      ) : null}
                    </td>
                    <td>
                      <Translate contentKey={`pfumv10App.Programme.${emploieDuTemps.programme}`} />
                    </td>
                    <td className="text-right">
                      <div className="btn-group flex-btn-group-container">
                        <Button tag={Link} to={`${match.url}/${emploieDuTemps.id}`} color="info" size="sm">
                          <FontAwesomeIcon icon="eye" />{' '}
                          <span className="d-none d-md-inline">
                            <Translate contentKey="entity.action.view">View</Translate>
                          </span>
                        </Button>
                        <Button tag={Link} to={`${match.url}/${emploieDuTemps.id}/edit`} color="primary" size="sm">
                          <FontAwesomeIcon icon="pencil-alt" />{' '}
                          <span className="d-none d-md-inline">
                            <Translate contentKey="entity.action.edit">Edit</Translate>
                          </span>
                        </Button>
                        <Button tag={Link} to={`${match.url}/${emploieDuTemps.id}/delete`} color="danger" size="sm">
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
              <Translate contentKey="pfumv10App.emploieDuTemps.home.notFound">No Emploie Du Temps found</Translate>
            </div>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ emploieDuTemps }: IRootState) => ({
  emploieDuTempsList: emploieDuTemps.entities
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
)(EmploieDuTemps);
