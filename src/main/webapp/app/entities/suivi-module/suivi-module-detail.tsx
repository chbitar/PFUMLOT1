import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAction, byteSize, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './suivi-module.reducer';
import { ISuiviModule } from 'app/shared/model/suivi-module.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface ISuiviModuleDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class SuiviModuleDetail extends React.Component<ISuiviModuleDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { suiviModuleEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            <Translate contentKey="pfumv10App.suiviModule.detail.title">SuiviModule</Translate> [<b>{suiviModuleEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="semestre">
                <Translate contentKey="pfumv10App.suiviModule.semestre">Semestre</Translate>
              </span>
            </dt>
            <dd>{suiviModuleEntity.semestre}</dd>
            <dt>
              <span id="descriptif">
                <Translate contentKey="pfumv10App.suiviModule.descriptif">Descriptif</Translate>
              </span>
            </dt>
            <dd>{suiviModuleEntity.descriptif}</dd>
            <dt>
              <span id="observations">
                <Translate contentKey="pfumv10App.suiviModule.observations">Observations</Translate>
              </span>
            </dt>
            <dd>{suiviModuleEntity.observations}</dd>
            <dt>
              <span id="date">
                <Translate contentKey="pfumv10App.suiviModule.date">Date</Translate>
              </span>
            </dt>
            <dd>
              <TextFormat value={suiviModuleEntity.date} type="date" format={APP_DATE_FORMAT} />
            </dd>
            <dt>
              <span id="debutCreneau">
                <Translate contentKey="pfumv10App.suiviModule.debutCreneau">Debut Creneau</Translate>
              </span>
            </dt>
            <dd>
              <TextFormat value={suiviModuleEntity.debutCreneau} type="date" format={APP_DATE_FORMAT} />
            </dd>
            <dt>
              <span id="finCreneau">
                <Translate contentKey="pfumv10App.suiviModule.finCreneau">Fin Creneau</Translate>
              </span>
            </dt>
            <dd>
              <TextFormat value={suiviModuleEntity.finCreneau} type="date" format={APP_DATE_FORMAT} />
            </dd>
            <dt>
              <span id="duree">
                <Translate contentKey="pfumv10App.suiviModule.duree">Duree</Translate>
              </span>
            </dt>
            <dd>{suiviModuleEntity.duree}</dd>
            <dt>
              <Translate contentKey="pfumv10App.suiviModule.user">User</Translate>
            </dt>
            <dd>{suiviModuleEntity.user ? suiviModuleEntity.user.id : ''}</dd>
            <dt>
              <Translate contentKey="pfumv10App.suiviModule.module">Module</Translate>
            </dt>
            <dd>{suiviModuleEntity.module ? suiviModuleEntity.module.id : ''}</dd>
          </dl>
          <Button tag={Link} to="/entity/suivi-module" replace color="info">
            <FontAwesomeIcon icon="arrow-left" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.back">Back</Translate>
            </span>
          </Button>
          &nbsp;
          <Button tag={Link} to={`/entity/suivi-module/${suiviModuleEntity.id}/edit`} replace color="primary">
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

const mapStateToProps = ({ suiviModule }: IRootState) => ({
  suiviModuleEntity: suiviModule.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SuiviModuleDetail);
