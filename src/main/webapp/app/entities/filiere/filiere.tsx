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
import '../../../static/assets/css/dataTables.bootstrap.css';
import '../../../static/assets/js/datatable/jquery.dataTables.min.js';
import '../../../static/assets/js/datatable/ZeroClipboard.js';
import '../../../static/assets/js/datatable/dataTables.tableTools.min.js';
import '../../../static/assets/js/datatable/dataTables.bootstrap.min.js';
import '../../../static/assets/js/datatable/datatables-init.js';

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

    InitiateSimpleDataTable.init();
    InitiateEditableDataTable.init();
    InitiateExpandableDataTable.init();
    InitiateSearchableDataTable.init();
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
        <div className="col-xs-12 col-md-12">
          <div className="widget">
            <div className="widget-header ">
              <span className="widget-caption">Editable DataTable</span>
              <div className="widget-buttons">
                <a href="#" data-toggle="maximize">
                  <i className="fa fa-expand" />
                </a>
                <a href="#" data-toggle="collapse">
                  <i className="fa fa-minus" />
                </a>
                <a href="#" data-toggle="dispose">
                  <i className="fa fa-times" />
                </a>
              </div>
            </div>
            <div className="widget-body">
              <div className="table-toolbar">
                <a id="editabledatatable_new" href="javascript:void(0);" className="btn btn-default">
                  Add New User
                </a>
                <div className="btn-group pull-right">
                  <a className="btn btn-default" href="javascript:void(0);">
                    Tools
                  </a>
                  <a className="btn btn-default dropdown-toggle" data-toggle="dropdown" href="javascript:void(0);">
                    <i className="fa fa-angle-down" />
                  </a>
                  <ul className="dropdown-menu dropdown-default">
                    <li>
                      <a href="javascript:void(0);">Action</a>
                    </li>
                    <li>
                      <a href="javascript:void(0);">Another action</a>
                    </li>
                    <li>
                      <a href="javascript:void(0);">Something else here</a>
                    </li>
                    <li className="divider" />
                    <li>
                      <a href="javascript:void(0);">Separated link</a>
                    </li>
                  </ul>
                </div>
              </div>
              <table className="table table-striped table-hover table-bordered" id="editabledatatable">
                <thead>
                  <tr role="row">
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
                      <td>
                        <a href="#" className="btn btn-info btn-xs edit">
                          <i className="fa fa-edit" /> Edit
                        </a>
                        <a href="#" className="btn btn-danger btn-xs delete">
                          <i className="fa fa-trash-o" /> Delete
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
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
