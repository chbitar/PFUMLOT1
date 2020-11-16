import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, InputGroup, Col, Row, Table } from 'reactstrap';
import { AvForm, AvGroup, AvInput } from 'availity-reactstrap-validation';
// tslint:disable-next-line:no-unused-variable
import { openFile, byteSize, Translate, translate, ICrudSearchAction, ICrudGetAllAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getSearchEntities, getEntities } from './etablissement.reducer';
import { IEtablissement } from 'app/shared/model/etablissement.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IEtablissementProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export interface IEtablissementState {
  search: string;
}

export class Etablissement extends React.Component<IEtablissementProps, IEtablissementState> {
  state: IEtablissementState = {
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
    const { etablissementList, match } = this.props;
    return (
      <div>
        {/*  <h2 id="etablissement-heading">
          <Translate contentKey="pfumApp.etablissement.home.title">Etablissements</Translate>
          <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
            <FontAwesomeIcon icon="plus" />
            &nbsp;
            <Translate contentKey="pfumApp.etablissement.home.createLabel">Create new Etablissement</Translate>
          </Link>
        </h2> */}

        <div className="table-responsive" style={{ marginLeft: '10px', paddingRight: '20px' }}>
          {etablissementList && etablissementList.length > 0 ? (
            <Table responsive>
              <thead>
                <tr>
                  <th>
                    <Translate contentKey="pfumApp.etablissement.nomEcole">Nom Ecole</Translate>
                  </th>
                  <th>
                    <Translate contentKey="pfumApp.etablissement.adresse">Adresse</Translate>
                  </th>
                  <th>
                    <Translate contentKey="pfumApp.etablissement.rc">Rc</Translate>
                  </th>
                  <th>
                    <Translate contentKey="pfumApp.etablissement.ice">Ice</Translate>
                  </th>
                  <th>
                    <Translate contentKey="pfumApp.etablissement.tp">Tp</Translate>
                  </th>
                  <th>
                    <Translate contentKey="pfumApp.etablissement.identiteFiche">Identite Fiche</Translate>
                  </th>
                  <th>
                    <Translate contentKey="pfumApp.etablissement.logo">Logo</Translate>
                  </th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {etablissementList.map((etablissement, i) => (
                  <tr key={`entity-${i}`}>
                    <td>{etablissement.nomEcole}</td>
                    <td>{etablissement.adresse}</td>
                    <td>{etablissement.rc}</td>
                    <td>{etablissement.ice}</td>
                    <td>{etablissement.tp}</td>
                    <td>{etablissement.identiteFiche}</td>
                    <td>
                      {etablissement.logo ? (
                        <div>
                          <a onClick={openFile(etablissement.logoContentType, etablissement.logo)}>
                            <img src={`data:${etablissement.logoContentType};base64,${etablissement.logo}`} style={{ maxHeight: '30px' }} />
                            &nbsp;
                          </a>
                          <span>
                            {etablissement.logoContentType}, {byteSize(etablissement.logo)}
                          </span>
                        </div>
                      ) : null}
                    </td>
                    <td className="text-right">
                      <div className="btn-group flex-btn-group-container">
                        <Button tag={Link} to={`${match.url}/${etablissement.id}`} color="info" size="sm">
                          <FontAwesomeIcon icon="eye" />{' '}
                          <span className="d-none d-md-inline">
                            <Translate contentKey="entity.action.view">View</Translate>
                          </span>
                        </Button>
                        <Button tag={Link} to={`${match.url}/${etablissement.id}/edit`} color="primary" size="sm">
                          <FontAwesomeIcon icon="pencil-alt" />{' '}
                          <span className="d-none d-md-inline">
                            <Translate contentKey="entity.action.edit">Edit</Translate>
                          </span>
                        </Button>
                        {/*    <Button tag={Link} to={`${match.url}/${etablissement.id}/delete`} color="danger" size="sm">
                          <FontAwesomeIcon icon="trash" />{' '}
                          <span className="d-none d-md-inline">
                            <Translate contentKey="entity.action.delete">Delete</Translate>
                          </span>
                        </Button> */}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          ) : (
            <div className="alert alert-warning">
              <Translate contentKey="pfumApp.etablissement.home.notFound">No Etablissements found</Translate>
            </div>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ etablissement }: IRootState) => ({
  etablissementList: etablissement.entities
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
)(Etablissement);
