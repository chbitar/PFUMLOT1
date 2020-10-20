import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './absence.reducer';
import { IAbsence } from 'app/shared/model/absence.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IAbsenceDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class AbsenceDetail extends React.Component<IAbsenceDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { absenceEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            <Translate contentKey="pfumv10App.absence.detail.title">Absence</Translate> [<b>{absenceEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="absent">
                <Translate contentKey="pfumv10App.absence.absent">Absent</Translate>
              </span>
            </dt>
            <dd>{absenceEntity.absent ? 'true' : 'false'}</dd>
            <dt>
              <span id="dateSeance">
                <Translate contentKey="pfumv10App.absence.dateSeance">Date Seance</Translate>
              </span>
            </dt>
            <dd>
              <TextFormat value={absenceEntity.dateSeance} type="date" format={APP_DATE_FORMAT} />
            </dd>
            <dt>
              <Translate contentKey="pfumv10App.absence.user">User</Translate>
            </dt>
            <dd>{absenceEntity.user ? absenceEntity.user.id : ''}</dd>
            <dt>
              <Translate contentKey="pfumv10App.absence.module">Module</Translate>
            </dt>
            <dd>{absenceEntity.module ? absenceEntity.module.id : ''}</dd>
            <dt>
              <Translate contentKey="pfumv10App.absence.etudiantsLicence">Etudiants Licence</Translate>
            </dt>
            <dd>{absenceEntity.etudiantsLicence ? absenceEntity.etudiantsLicence.id : ''}</dd>
            <dt>
              <Translate contentKey="pfumv10App.absence.etudiantsMaster">Etudiants Master</Translate>
            </dt>
            <dd>{absenceEntity.etudiantsMaster ? absenceEntity.etudiantsMaster.id : ''}</dd>
            <dt>
              <Translate contentKey="pfumv10App.absence.etudiantsExecutif">Etudiants Executif</Translate>
            </dt>
            <dd>{absenceEntity.etudiantsExecutif ? absenceEntity.etudiantsExecutif.id : ''}</dd>
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
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = ({ absence }: IRootState) => ({
  absenceEntity: absence.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AbsenceDetail);
