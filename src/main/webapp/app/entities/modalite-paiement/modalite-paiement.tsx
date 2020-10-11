import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, InputGroup, Col, Row, Table } from 'reactstrap';
import { AvForm, AvGroup, AvInput } from 'availity-reactstrap-validation';
// tslint:disable-next-line:no-unused-variable
import { Translate, translate, ICrudSearchAction, ICrudGetAllAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getSearchEntities, getEntities } from './modalite-paiement.reducer';
import { IModalitePaiement } from 'app/shared/model/modalite-paiement.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IModalitePaiementProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export interface IModalitePaiementState {
  search: string;
}

export class ModalitePaiement extends React.Component<IModalitePaiementProps, IModalitePaiementState> {
  state: IModalitePaiementState = {
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
    const { modalitePaiementList, match } = this.props;
    return (
      <div>
        <h2 id="modalite-paiement-heading">
          <Translate contentKey="pfumv10App.modalitePaiement.home.title">Modalite Paiements</Translate>
          <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
            <FontAwesomeIcon icon="plus" />
            &nbsp;
            <Translate contentKey="pfumv10App.modalitePaiement.home.createLabel">Create new Modalite Paiement</Translate>
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
                    placeholder={translate('pfumv10App.modalitePaiement.home.search')}
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
          {modalitePaiementList && modalitePaiementList.length > 0 ? (
            <Table responsive>
              <thead>
                <tr>
                  <th>
                    <Translate contentKey="global.field.id">ID</Translate>
                  </th>
                  <th>
                    <Translate contentKey="pfumv10App.modalitePaiement.modalite">Modalite</Translate>
                  </th>
                  <th>
                    <Translate contentKey="pfumv10App.modalitePaiement.coutProgrammettc">Cout Programmettc</Translate>
                  </th>
                  <th>
                    <Translate contentKey="pfumv10App.modalitePaiement.coutProgrammettcDevise">Cout Programmettc Devise</Translate>
                  </th>
                  <th>
                    <Translate contentKey="pfumv10App.modalitePaiement.remiseNiveau1">Remise Niveau 1</Translate>
                  </th>
                  <th>
                    <Translate contentKey="pfumv10App.modalitePaiement.remiseNiveau2">Remise Niveau 2</Translate>
                  </th>
                  <th>
                    <Translate contentKey="pfumv10App.modalitePaiement.devise">Devise</Translate>
                  </th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {modalitePaiementList.map((modalitePaiement, i) => (
                  <tr key={`entity-${i}`}>
                    <td>
                      <Button tag={Link} to={`${match.url}/${modalitePaiement.id}`} color="link" size="sm">
                        {modalitePaiement.id}
                      </Button>
                    </td>
                    <td>{modalitePaiement.modalite}</td>
                    <td>{modalitePaiement.coutProgrammettc}</td>
                    <td>{modalitePaiement.coutProgrammettcDevise}</td>
                    <td>{modalitePaiement.remiseNiveau1}</td>
                    <td>{modalitePaiement.remiseNiveau2}</td>
                    <td>
                      <Translate contentKey={`pfumv10App.Devise.${modalitePaiement.devise}`} />
                    </td>
                    <td className="text-right">
                      <div className="btn-group flex-btn-group-container">
                        <Button tag={Link} to={`${match.url}/${modalitePaiement.id}`} color="info" size="sm">
                          <FontAwesomeIcon icon="eye" />{' '}
                          <span className="d-none d-md-inline">
                            <Translate contentKey="entity.action.view">View</Translate>
                          </span>
                        </Button>
                        <Button tag={Link} to={`${match.url}/${modalitePaiement.id}/edit`} color="primary" size="sm">
                          <FontAwesomeIcon icon="pencil-alt" />{' '}
                          <span className="d-none d-md-inline">
                            <Translate contentKey="entity.action.edit">Edit</Translate>
                          </span>
                        </Button>
                        <Button tag={Link} to={`${match.url}/${modalitePaiement.id}/delete`} color="danger" size="sm">
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
              <Translate contentKey="pfumv10App.modalitePaiement.home.notFound">No Modalite Paiements found</Translate>
            </div>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ modalitePaiement }: IRootState) => ({
  modalitePaiementList: modalitePaiement.entities
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
)(ModalitePaiement);
