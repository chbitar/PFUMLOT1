import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, InputGroup, Col, Row, Table } from 'reactstrap';
import { AvForm, AvGroup, AvInput } from 'availity-reactstrap-validation';
// tslint:disable-next-line:no-unused-variable
import { Translate, translate, ICrudSearchAction, ICrudGetAllAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getSearchEntities, getEntities } from './note-master.reducer';
import { INoteMaster } from 'app/shared/model/note-master.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface INoteMasterProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export interface INoteMasterState {
  search: string;
}

export class NoteMaster extends React.Component<INoteMasterProps, INoteMasterState> {
  state: INoteMasterState = {
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
    const { noteMasterList, match } = this.props;
    return (
      <div>
        <h2 id="note-master-heading">
          <Translate contentKey="pfumv10App.noteMaster.home.title">Note Masters</Translate>
          <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
            <FontAwesomeIcon icon="plus" />
            &nbsp;
            <Translate contentKey="pfumv10App.noteMaster.home.createLabel">Create new Note Master</Translate>
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
                    placeholder={translate('pfumv10App.noteMaster.home.search')}
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
          {noteMasterList && noteMasterList.length > 0 ? (
            <Table responsive>
              <thead>
                <tr>
                  <th>
                    <Translate contentKey="global.field.id">ID</Translate>
                  </th>
                  <th>
                    <Translate contentKey="pfumv10App.noteMaster.semestre">Semestre</Translate>
                  </th>
                  <th>
                    <Translate contentKey="pfumv10App.noteMaster.noteCC1">Note CC 1</Translate>
                  </th>
                  <th>
                    <Translate contentKey="pfumv10App.noteMaster.noteCC2">Note CC 2</Translate>
                  </th>
                  <th>
                    <Translate contentKey="pfumv10App.noteMaster.noteFinal">Note Final</Translate>
                  </th>
                  <th>
                    <Translate contentKey="pfumv10App.noteMaster.date">Date</Translate>
                  </th>
                  <th>
                    <Translate contentKey="pfumv10App.noteMaster.user">User</Translate>
                  </th>
                  <th>
                    <Translate contentKey="pfumv10App.noteMaster.module">Module</Translate>
                  </th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {noteMasterList.map((noteMaster, i) => (
                  <tr key={`entity-${i}`}>
                    <td>
                      <Button tag={Link} to={`${match.url}/${noteMaster.id}`} color="link" size="sm">
                        {noteMaster.id}
                      </Button>
                    </td>
                    <td>
                      <Translate contentKey={`pfumv10App.Semestre.${noteMaster.semestre}`} />
                    </td>
                    <td>{noteMaster.noteCC1}</td>
                    <td>{noteMaster.noteCC2}</td>
                    <td>{noteMaster.noteFinal}</td>
                    <td>
                      <TextFormat type="date" value={noteMaster.date} format={APP_DATE_FORMAT} />
                    </td>
                    <td>{noteMaster.user ? noteMaster.user.id : ''}</td>
                    <td>{noteMaster.module ? <Link to={`module/${noteMaster.module.id}`}>{noteMaster.module.id}</Link> : ''}</td>
                    <td className="text-right">
                      <div className="btn-group flex-btn-group-container">
                        <Button tag={Link} to={`${match.url}/${noteMaster.id}`} color="info" size="sm">
                          <FontAwesomeIcon icon="eye" />{' '}
                          <span className="d-none d-md-inline">
                            <Translate contentKey="entity.action.view">View</Translate>
                          </span>
                        </Button>
                        <Button tag={Link} to={`${match.url}/${noteMaster.id}/edit`} color="primary" size="sm">
                          <FontAwesomeIcon icon="pencil-alt" />{' '}
                          <span className="d-none d-md-inline">
                            <Translate contentKey="entity.action.edit">Edit</Translate>
                          </span>
                        </Button>
                        <Button tag={Link} to={`${match.url}/${noteMaster.id}/delete`} color="danger" size="sm">
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
              <Translate contentKey="pfumv10App.noteMaster.home.notFound">No Note Masters found</Translate>
            </div>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ noteMaster }: IRootState) => ({
  noteMasterList: noteMaster.entities
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
)(NoteMaster);
