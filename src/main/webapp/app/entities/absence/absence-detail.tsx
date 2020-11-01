import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Table } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './absence.reducer';
import { IAbsence } from 'app/shared/model/absence.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { getEntities as getEtudiantsExecutifs } from 'app/entities/etudiants-executif/etudiants-executif.reducer';

export interface IAbsenceDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class AbsenceDetail extends React.Component<IAbsenceDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
    this.props.getEtudiantsExecutifs();
  }

  render() {
    const { absenceEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            <Translate contentKey="pfumApp.absence.detail.title">Absence</Translate> [<b>{absenceEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="absent">
                <Translate contentKey="pfumApp.absence.absent">Absent</Translate>
              </span>
            </dt>
            <dd>{absenceEntity.absent ? 'true' : 'false'}</dd>
            <dt>
              <span id="dateSeance">
                <Translate contentKey="pfumApp.absence.dateSeance">Date Seance</Translate>
              </span>
            </dt>
            <dd>
              <TextFormat value={absenceEntity.dateSeance} type="date" format={APP_DATE_FORMAT} />
            </dd>
            <dt>
              <Translate contentKey="pfumApp.absence.user">User</Translate>
            </dt>
            <dd>{absenceEntity.user ? absenceEntity.user.firstName + ' ' + absenceEntity.user.lastName : ''}</dd>
            <dt>
              <Translate contentKey="pfumApp.absence.module">Module</Translate>
            </dt>
            <dd>{absenceEntity.module ? absenceEntity.module.nomModule : ''}</dd>
            <dt>
              Etudiants
              {absenceEntity.etudiantsLicence ? ' Licence' : ''}
              {absenceEntity.etudiantsMaster ? ' Master' : ''}
              {absenceEntity.etudiantsExecutif ? ' Master Exécutif' : ''}
            </dt>
            <dd>
              {absenceEntity.etudiantsLicence ? absenceEntity.etudiantsLicence.nom + ' ' + absenceEntity.etudiantsLicence.prenom : ''}
            </dd>

            <dd>{absenceEntity.etudiantsMaster ? absenceEntity.etudiantsMaster.nom + ' ' + absenceEntity.etudiantsMaster.prenom : ''}</dd>

            <dd>
              {absenceEntity.etudiantsExecutif ? absenceEntity.etudiantsExecutif.nom + ' ' + absenceEntity.etudiantsExecutif.prenom : ''}
            </dd>
          </dl>
          <Button tag={Link} to="/entity/absence" replace color="info">
            <FontAwesomeIcon icon="arrow-left" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.back">Back</Translate>
            </span>
          </Button>
          &nbsp;
          <Button tag={Link} to={`/entity/absence/${absenceEntity.id}/edit`} replace color="primary">
            <FontAwesomeIcon icon="pencil-alt" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.edit">Edit</Translate>
            </span>
          </Button>
          {this.props.etudiantsExecutifs.length}
          {this.props.etudiantsExecutifs && this.props.etudiantsExecutifs.length === 0 ? (
            <Table responsive>
              <thead>
                <tr>
                  <th>
                    <Translate contentKey="pfumApp.etudiantsLicence.nom">Nom</Translate>
                  </th>
                  <th>
                    <Translate contentKey="pfumApp.etudiantsLicence.prenom">Prenom</Translate>
                  </th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {this.props.etudiantsExecutifs.map(function(etudiant, i) {
                  <tr key={`entity-${i}`}>
                    <td>{etudiant.nom}</td>
                    <td>{etudiant.prenom}</td>
                    <td>
                      <input className="form-check-control" type="checkbox" name="absent" value={etudiant.id} checked />
                    </td>
                  </tr>;
                })}
              </tbody>
            </Table>
          ) : (
            <div className="alert alert-warning">
              <Translate contentKey="pfumApp.filiere.home.notFound">No Filieres found</Translate>
            </div>
          )}
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = (storeState: IRootState) => ({
  absenceEntity: storeState.absence.entity,
  etudiantsExecutifs: storeState.etudiantsExecutif.entities
});

const mapDispatchToProps = { getEntity, getEtudiantsExecutifs };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AbsenceDetail);
