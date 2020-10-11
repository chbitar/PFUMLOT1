import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, InputGroup, Col, Row, Table } from 'reactstrap';
import { AvForm, AvGroup, AvInput } from 'availity-reactstrap-validation';
// tslint:disable-next-line:no-unused-variable
import { Translate, translate, ICrudSearchAction, ICrudGetAllAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getSearchEntities, getEntities } from './note-licence.reducer';
import { INoteLicence } from 'app/shared/model/note-licence.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface INoteLicenceProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export interface INoteLicenceState {
  search: string;
}

export class NoteLicence extends React.Component<INoteLicenceProps, INoteLicenceState> {
  state: INoteLicenceState = {
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
    const { noteLicenceList, match } = this.props;
    return (
      <div>
        <h2 id="note-licence-heading">
          <Translate contentKey="pfumv10App.noteLicence.home.title">Note Licences</Translate>
          <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
            <FontAwesomeIcon icon="plus" />
            &nbsp;
            <Translate contentKey="pfumv10App.noteLicence.home.createLabel">Create new Note Licence</Translate>
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
                    placeholder={translate('pfumv10App.noteLicence.home.search')}
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
          {noteLicenceList && noteLicenceList.length > 0 ? (
            <Table responsive>
              <thead>
                <tr>
                  <th>
                    <Translate contentKey="global.field.id">ID</Translate>
                  </th>
                  <th>
                    <Translate contentKey="pfumv10App.noteLicence.semestre">Semestre</Translate>
                  </th>
                  <th>
                    <Translate contentKey="pfumv10App.noteLicence.noteCC1">Note CC 1</Translate>
                  </th>
                  <th>
                    <Translate contentKey="pfumv10App.noteLicence.noteCC2">Note CC 2</Translate>
                  </th>
                  <th>
                    <Translate contentKey="pfumv10App.noteLicence.noteFinal">Note Final</Translate>
                  </th>
                  <th>
                    <Translate contentKey="pfumv10App.noteLicence.date">Date</Translate>
                  </th>
                  <th>
                    <Translate contentKey="pfumv10App.noteLicence.user">User</Translate>
                  </th>
                  <th>
                    <Translate contentKey="pfumv10App.noteLicence.module">Module</Translate>
                  </th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {noteLicenceList.map((noteLicence, i) => (
                  <tr key={`entity-${i}`}>
                    <td>
                      <Button tag={Link} to={`${match.url}/${noteLicence.id}`} color="link" size="sm">
                        {noteLicence.id}
                      </Button>
                    </td>
                    <td>
                      <Translate contentKey={`pfumv10App.Semestre.${noteLicence.semestre}`} />
                    </td>
                    <td>{noteLicence.noteCC1}</td>
                    <td>{noteLicence.noteCC2}</td>
                    <td>{noteLicence.noteFinal}</td>
                    <td>
                      <TextFormat type="date" value={noteLicence.date} format={APP_DATE_FORMAT} />
                    </td>
                    <td>{noteLicence.user ? noteLicence.user.id : ''}</td>
                    <td>{noteLicence.module ? <Link to={`module/${noteLicence.module.id}`}>{noteLicence.module.id}</Link> : ''}</td>
                    <td className="text-right">
                      <div className="btn-group flex-btn-group-container">
                        <Button tag={Link} to={`${match.url}/${noteLicence.id}`} color="info" size="sm">
                          <FontAwesomeIcon icon="eye" />{' '}
                          <span className="d-none d-md-inline">
                            <Translate contentKey="entity.action.view">View</Translate>
                          </span>
                        </Button>
                        <Button tag={Link} to={`${match.url}/${noteLicence.id}/edit`} color="primary" size="sm">
                          <FontAwesomeIcon icon="pencil-alt" />{' '}
                          <span className="d-none d-md-inline">
                            <Translate contentKey="entity.action.edit">Edit</Translate>
                          </span>
                        </Button>
                        <Button tag={Link} to={`${match.url}/${noteLicence.id}/delete`} color="danger" size="sm">
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
              <Translate contentKey="pfumv10App.noteLicence.home.notFound">No Note Licences found</Translate>
            </div>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ noteLicence }: IRootState) => ({
  noteLicenceList: noteLicence.entities
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
)(NoteLicence);
