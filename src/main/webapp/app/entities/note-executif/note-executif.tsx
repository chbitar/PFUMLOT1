import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, InputGroup, Col, Row, Table } from 'reactstrap';
import { AvForm, AvGroup, AvInput } from 'availity-reactstrap-validation';
// tslint:disable-next-line:no-unused-variable
import { Translate, translate, ICrudSearchAction, ICrudGetAllAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getSearchEntities, getEntities } from './note-executif.reducer';
import { INoteExecutif } from 'app/shared/model/note-executif.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface INoteExecutifProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export interface INoteExecutifState {
  search: string;
}

export class NoteExecutif extends React.Component<INoteExecutifProps, INoteExecutifState> {
  state: INoteExecutifState = {
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
    const { noteExecutifList, match } = this.props;
    return (
      <div>
        <h2 id="note-executif-heading">
          <Translate contentKey="pfumApp.noteExecutif.home.title">Note Executifs</Translate>
          <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
            <FontAwesomeIcon icon="plus" />
            &nbsp;
            <Translate contentKey="pfumApp.noteExecutif.home.createLabel">Create new Note Executif</Translate>
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
                    placeholder={translate('pfumApp.noteExecutif.home.search')}
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
          {noteExecutifList && noteExecutifList.length > 0 ? (
            <Table responsive>
              <thead>
                <tr>
                  <th>
                    <Translate contentKey="global.field.id">ID</Translate>
                  </th>
                  <th>
                    <Translate contentKey="pfumApp.noteExecutif.semestre">Semestre</Translate>
                  </th>
                  <th>
                    <Translate contentKey="pfumApp.noteExecutif.noteCC1">Note CC 1</Translate>
                  </th>
                  <th>
                    <Translate contentKey="pfumApp.noteExecutif.noteCC2">Note CC 2</Translate>
                  </th>
                  <th>
                    <Translate contentKey="pfumApp.noteExecutif.noteFinal">Note Final</Translate>
                  </th>
                  <th>
                    <Translate contentKey="pfumApp.noteExecutif.date">Date</Translate>
                  </th>
                  <th>
                    <Translate contentKey="pfumApp.noteExecutif.user">User</Translate>
                  </th>
                  <th>
                    <Translate contentKey="pfumApp.noteExecutif.module">Module</Translate>
                  </th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {noteExecutifList.map((noteExecutif, i) => (
                  <tr key={`entity-${i}`}>
                    <td>
                      <Button tag={Link} to={`${match.url}/${noteExecutif.id}`} color="link" size="sm">
                        {noteExecutif.id}
                      </Button>
                    </td>
                    <td>
                      <Translate contentKey={`pfumApp.Semestre.${noteExecutif.semestre}`} />
                    </td>
                    <td>{noteExecutif.noteCC1}</td>
                    <td>{noteExecutif.noteCC2}</td>
                    <td>{noteExecutif.noteFinal}</td>
                    <td>
                      <TextFormat type="date" value={noteExecutif.date} format={APP_DATE_FORMAT} />
                    </td>
                    <td>{noteExecutif.user ? noteExecutif.user.id : ''}</td>
                    <td>{noteExecutif.module ? <Link to={`module/${noteExecutif.module.id}`}>{noteExecutif.module.id}</Link> : ''}</td>
                    <td className="text-right">
                      <div className="btn-group flex-btn-group-container">
                        <Button tag={Link} to={`${match.url}/${noteExecutif.id}`} color="info" size="sm">
                          <FontAwesomeIcon icon="eye" />{' '}
                          <span className="d-none d-md-inline">
                            <Translate contentKey="entity.action.view">View</Translate>
                          </span>
                        </Button>
                        <Button tag={Link} to={`${match.url}/${noteExecutif.id}/edit`} color="primary" size="sm">
                          <FontAwesomeIcon icon="pencil-alt" />{' '}
                          <span className="d-none d-md-inline">
                            <Translate contentKey="entity.action.edit">Edit</Translate>
                          </span>
                        </Button>
                        <Button tag={Link} to={`${match.url}/${noteExecutif.id}/delete`} color="danger" size="sm">
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
              <Translate contentKey="pfumApp.noteExecutif.home.notFound">No Note Executifs found</Translate>
            </div>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ noteExecutif }: IRootState) => ({
  noteExecutifList: noteExecutif.entities
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
)(NoteExecutif);
