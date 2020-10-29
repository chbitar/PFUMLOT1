import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, InputGroup, Col, Row, Table } from 'reactstrap';
import { AvForm, AvGroup, AvInput } from 'availity-reactstrap-validation';
// tslint:disable-next-line:no-unused-variable
import { Translate, translate, ICrudSearchAction, ICrudGetAllAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getSearchEntities, getEntities } from './filiere.reducer';
import { IFiliere } from 'app/shared/model/filiere.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IFiliereProps extends StateProps, DispatchProps {}

export interface IFiliereState {
  search: string;
}

export class Filiere extends React.Component<IFiliereProps, IFiliereState> {
  state: IFiliereState = {
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
    const { filiereList } = this.props;
    return (
      <div className="row">
        <div className="col-xs-12 col-md-6">
          <div className="well with-header  with-footer">
            <div className="header bg-blue">Simple Table With Hover</div>
            <table className="table table-hover">
              <thead className="bordered-darkorange">
                <tr>
                  <th>Nom filière</th>

                  <th>
                    <Translate contentKey="pfumv10App.filiere.responsable">Responsable</Translate>
                  </th>
                  <th>
                    <Translate contentKey="pfumv10App.filiere.accreditaion">Accreditation</Translate>
                  </th>
                  <th>
                    <Translate contentKey="pfumv10App.filiere.programme">Programme</Translate>
                  </th>
                  <th>
                    <Translate contentKey="pfumv10App.filiere.etablissement">Etablissement</Translate>
                  </th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {filiereList.map((filiere, i) => (
                  <tr key={`entity-${i}`}>
                    <td>{filiere.nomfiliere}</td>
                    <td>{filiere.responsable}</td>
                    <td>{filiere.accreditaion}</td>
                    <td>
                      <Translate contentKey={`pfumv10App.Programme.${filiere.programme}`} />
                    </td>
                    <td>
                      {filiere.etablissement ? (
                        <Link to={`etablissement/${filiere.etablissement.id}`}>{filiere.etablissement.nomEcole}</Link>
                      ) : (
                        ''
                      )}
                    </td>
                    <td className="text-right">
                      <div className="btn-group flex-btn-group-container" />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="footer">
              <code>class="table table-hover"</code>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ filiere }: IRootState) => ({
  filiereList: filiere.entities
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
)(Filiere);
