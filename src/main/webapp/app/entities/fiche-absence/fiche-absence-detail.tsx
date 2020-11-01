import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label, Table } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput } from 'availity-reactstrap-validation';
// tslint:disable-next-line:no-unused-variable
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';
import { getUsers } from 'app/modules/administration/user-management/user-management.reducer';
import { getModulesAffectedToProf as getModules } from 'app/entities/module/module.reducer';
import { IEtudiantsLicence } from 'app/shared/model/etudiants-licence.model';
import { getEntities as getEtudiantsLicences } from 'app/entities/etudiants-licence/etudiants-licence.reducer';
import { IEtudiantsMaster } from 'app/shared/model/etudiants-master.model';
import { getEntities as getEtudiantsMasters } from 'app/entities/etudiants-master/etudiants-master.reducer';
import { IEtudiantsExecutif } from 'app/shared/model/etudiants-executif.model';
import { getEntities as getEtudiantsExecutifs } from 'app/entities/etudiants-executif/etudiants-executif.reducer';
import { getEntities as getEtudiantsMaster } from 'app/entities/etudiants-master/etudiants-master.reducer';
import { getEntities as getEtudiantsLicence } from 'app/entities/etudiants-licence/etudiants-licence.reducer';
import { getEntity } from './fiche-absence.reducer';
import { APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { Programme } from 'app/shared/model/fiche-absence.model';

export interface IFicheAbsenceDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface IFicheAbsenceDetailState {}

export class FicheAbsenceDetail extends React.Component<IFicheAbsenceDetailProps, IFicheAbsenceDetailState> {
  constructor(props) {
    super(props);
    this.estAbsent = this.estAbsent.bind(this);
  }

  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
    this.props.getEtudiantsExecutifs();
    this.props.getEtudiantsMaster();
    this.props.getEtudiantsLicence();
  }

  estAbsent = id => {
    console.log(this.props.ficheAbsenceEntity.absences.length);

    if (this.props.ficheAbsenceEntity.absences.length === 0) {
      return false;
    }
    for (var i = 0; i < this.props.ficheAbsenceEntity.absences.length; i++) {
      if (this.props.ficheAbsenceEntity.programme === Programme.LICENCE) {
        if (this.props.ficheAbsenceEntity.absences[i].etudiantsLicence.id === id) return true;
      }
      if (this.props.ficheAbsenceEntity.programme === Programme.MASTER) {
        if (this.props.ficheAbsenceEntity.absences[i].etudiantsMaster.id === id) return true;
      }
      if (this.props.ficheAbsenceEntity.programme === Programme.MASTER_EXECUTIF) {
        if (this.props.ficheAbsenceEntity.absences[i].etudiantsExecutif.id === id) return true;
      }
    }

    return false;
  };

  render() {
    const { ficheAbsenceEntity, etudiantsExecutifs, etudiantsMaster, etudiantsLicence } = this.props;

    var listEtudiantMasterExecutif = this.props.etudiantsExecutifs
      .filter(etudiant => this.estAbsent(etudiant.id))
      .map((etudiant, i) => {
        return (
          <tr>
            <td>{etudiant.nom}</td>
            <td>{etudiant.prenom}</td>
            <td>
              <input className="form-check-control" type="checkbox" name="absent" value={etudiant.id} checked />
            </td>
          </tr>
        );
      });

    var listEtudiantMaster = this.props.etudiantsExecutifs
      .filter(etudiant => this.estAbsent(etudiant.id))
      .map((etudiant, i) => {
        return (
          <tr>
            <td>{etudiant.nom}</td>
            <td>{etudiant.prenom}</td>
            <td>
              <input className="form-check-control" type="checkbox" name="absent" value={etudiant.id} checked />
            </td>
          </tr>
        );
      });
    var listEtudiantLicence = this.props.etudiantsExecutifs
      .filter(etudiant => this.estAbsent(etudiant.id))
      .map((etudiant, i) => {
        return (
          <tr>
            <td>{etudiant.nom}</td>
            <td>{etudiant.prenom}</td>
            <td>
              <input className="form-check-control" type="checkbox" name="absent" value={etudiant.id} checked />
            </td>
          </tr>
        );
      });
    return (
      <Row>
        <Col md="8">
          <h2>
            {/*  <Translate contentKey="pfumApp.ficheAbsence.detail.title">FicheAbsence</Translate> [<b>{ficheAbsenceEntity.id}</b>] */}
            Détail du Fiche d'absence
            <br /> <br />
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="dateSeance">
                <Translate contentKey="pfumApp.ficheAbsence.dateSeance">Date Seance</Translate>
              </span>
            </dt>
            <dd>
              <TextFormat value={ficheAbsenceEntity.dateSeance} type="date" format={APP_LOCAL_DATE_FORMAT} />
            </dd>
            <dt>
              <Translate contentKey="pfumApp.ficheAbsence.module">Module</Translate>
            </dt>
            <dd>{ficheAbsenceEntity.module ? ficheAbsenceEntity.module.nomModule : ''}</dd>
            <dt>
              <Translate contentKey="pfumApp.ficheAbsence.programme">Programme</Translate>
            </dt>
            <dd>{ficheAbsenceEntity.module ? ficheAbsenceEntity.programme : ''}</dd>
          </dl>
          {ficheAbsenceEntity.programme === Programme.MASTER_EXECUTIF && etudiantsExecutifs && etudiantsExecutifs.length > 0 ? (
            <>
              <Label for="absence-module">Etudiants du Master exécutif </Label>
              <Table responsive>
                <thead>
                  <tr>
                    <th>
                      <Translate contentKey="pfumApp.etudiantsLicence.nom">Nom </Translate>
                    </th>
                    <th>
                      <Translate contentKey="pfumApp.etudiantsLicence.prenom">Prenom</Translate>
                    </th>
                    <th />
                  </tr>
                </thead>
                <tbody>{listEtudiantMasterExecutif}</tbody>
              </Table>
            </>
          ) : (
            ''
          )}
          {ficheAbsenceEntity.programme === Programme.LICENCE && etudiantsLicence && etudiantsLicence.length > 0 ? (
            <>
              <Label for="absence-module">Etudiants Bac+3 </Label>
              <Table responsive>
                <thead>
                  <tr>
                    <th>
                      <Translate contentKey="pfumApp.etudiantsLicence.nom">Nom </Translate>
                    </th>
                    <th>
                      <Translate contentKey="pfumApp.etudiantsLicence.prenom">Prenom</Translate>
                    </th>
                    <th />
                  </tr>
                </thead>
                <tbody>{listEtudiantLicence}</tbody>
              </Table>
            </>
          ) : (
            ''
          )}
          {ficheAbsenceEntity.programme === Programme.MASTER && etudiantsMaster && etudiantsMaster.length > 0 ? (
            <>
              <Label for="absence-module">Etudiants du Master académique </Label>
              <Table responsive>
                <thead>
                  <tr>
                    <th>
                      <Translate contentKey="pfumApp.etudiantsLicence.nom">Nom </Translate>
                    </th>
                    <th>
                      <Translate contentKey="pfumApp.etudiantsLicence.prenom">Prenom</Translate>
                    </th>
                    <th />
                  </tr>
                </thead>
                <tbody>{listEtudiantMaster}</tbody>
              </Table>
            </>
          ) : (
            ''
          )}
          <Button tag={Link} to="/entity/fiche-absence" replace color="info">
            <FontAwesomeIcon icon="arrow-left" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.back">Back</Translate>
            </span>
          </Button>
          &nbsp; &nbsp;
          <Button tag={Link} to={`entity/fiche-absence/${ficheAbsenceEntity.id}/delete`} color="danger">
            <FontAwesomeIcon icon="trash" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.delete">Delete</Translate>
            </span>
          </Button>
          <br /> <br />
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = (storeState: IRootState) => ({
  ficheAbsenceEntity: storeState.ficheAbsence.entity,
  etudiantsExecutifs: storeState.etudiantsExecutif.entities,
  etudiantsMaster: storeState.etudiantsMaster.entities,
  etudiantsLicence: storeState.etudiantsLicence.entities
});

const mapDispatchToProps = { getEntity, getEtudiantsExecutifs, getEtudiantsMaster, getEtudiantsLicence };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FicheAbsenceDetail);
