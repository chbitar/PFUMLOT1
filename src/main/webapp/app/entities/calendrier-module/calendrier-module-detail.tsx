import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './calendrier-module.reducer';
import { ICalendrierModule } from 'app/shared/model/calendrier-module.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface ICalendrierModuleDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class CalendrierModuleDetail extends React.Component<ICalendrierModuleDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { calendrierModuleEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            <Translate contentKey="pfumv10App.calendrierModule.detail.title">CalendrierModule</Translate> [
            <b>{calendrierModuleEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="libelle">
                <Translate contentKey="pfumv10App.calendrierModule.libelle">Libelle</Translate>
              </span>
            </dt>
            <dd>{calendrierModuleEntity.libelle}</dd>
            <dt>
              <span id="dateControlContinu1">
                <Translate contentKey="pfumv10App.calendrierModule.dateControlContinu1">Date Control Continu 1</Translate>
              </span>
            </dt>
            <dd>
              <TextFormat value={calendrierModuleEntity.dateControlContinu1} type="date" format={APP_DATE_FORMAT} />
            </dd>
            <dt>
              <span id="dateControlContinu2">
                <Translate contentKey="pfumv10App.calendrierModule.dateControlContinu2">Date Control Continu 2</Translate>
              </span>
            </dt>
            <dd>
              <TextFormat value={calendrierModuleEntity.dateControlContinu2} type="date" format={APP_DATE_FORMAT} />
            </dd>
            <dt>
              <Translate contentKey="pfumv10App.calendrierModule.module">Module</Translate>
            </dt>
            <dd>{calendrierModuleEntity.module ? calendrierModuleEntity.module.id : ''}</dd>
            <dt>
              <Translate contentKey="pfumv10App.calendrierModule.anneeInscription">Annee Inscription</Translate>
            </dt>
            <dd>{calendrierModuleEntity.anneeInscription ? calendrierModuleEntity.anneeInscription.id : ''}</dd>
          </dl>
          <Button tag={Link} to="/entity/calendrier-module" replace color="info">
            <FontAwesomeIcon icon="arrow-left" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.back">Back</Translate>
            </span>
          </Button>
          &nbsp;
          <Button tag={Link} to={`/entity/calendrier-module/${calendrierModuleEntity.id}/edit`} replace color="primary">
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

const mapStateToProps = ({ calendrierModule }: IRootState) => ({
  calendrierModuleEntity: calendrierModule.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CalendrierModuleDetail);
