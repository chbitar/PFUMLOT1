import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, InputGroup, Col, Row, Table } from 'reactstrap';
import { AvForm, AvGroup, AvInput } from 'availity-reactstrap-validation';
// tslint:disable-next-line:no-unused-variable
import { openFile, byteSize, Translate, translate, ICrudSearchAction, ICrudGetAllAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getSearchEntities, getEntities } from './document.reducer';
import { IDocument } from 'app/shared/model/document.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IDocumentProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export interface IDocumentState {
  search: string;
}

export class Document extends React.Component<IDocumentProps, IDocumentState> {
  state: IDocumentState = {
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
    const { documentList, match } = this.props;
    return (
      <div>
        <h2 id="document-heading">
          &nbsp; &nbsp; Liste des documents
          <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
            <FontAwesomeIcon icon="plus" />
            &nbsp; Charger un nouveau document
          </Link>
        </h2>
        <br />
        <div className="table-responsive" style={{ marginLeft: '10px', paddingRight: '20px' }}>
          {documentList && documentList.length > 0 ? (
            <Table responsive>
              <thead>
                <tr>
                  <th>
                    <Translate contentKey="pfumApp.document.titre">Titre</Translate>
                  </th>
                  {/*    <th>
                    <Translate contentKey="pfumApp.document.data">Data</Translate>
                  </th> */}
                  <th>Source Document</th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {documentList.map((document, i) => (
                  <tr key={`entity-${i}`}>
                    <td>
                      {document.titre}[
                      {document.data ? (
                        <>
                          <a onClick={openFile(document.dataContentType, document.data)}>Télécharger &nbsp;</a>
                          <span />
                        </>
                      ) : null}
                      ]
                    </td>
                    <td>
                      <Translate contentKey={`pfumApp.TypeDocument.${document.typeDocument}`} />
                    </td>
                    <td className="text-right">
                      <div className="btn-group flex-btn-group-container">
                        <Button tag={Link} to={`${match.url}/${document.id}`} color="info" size="sm">
                          <FontAwesomeIcon icon="eye" />{' '}
                          <span className="d-none d-md-inline">
                            <Translate contentKey="entity.action.view">View</Translate>
                          </span>
                        </Button>
                        <Button tag={Link} to={`${match.url}/${document.id}/edit`} color="primary" size="sm">
                          <FontAwesomeIcon icon="pencil-alt" />{' '}
                          <span className="d-none d-md-inline">
                            <Translate contentKey="entity.action.edit">Edit</Translate>
                          </span>
                        </Button>
                        <Button tag={Link} to={`${match.url}/${document.id}/delete`} color="danger" size="sm">
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
              <Translate contentKey="pfumApp.document.home.notFound">No Documents found</Translate>
            </div>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ document }: IRootState) => ({
  documentList: document.entities
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
)(Document);
