import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './affectation-module.reducer';
import { IAffectationModule } from 'app/shared/model/affectation-module.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IAffectationModuleDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class AffectationModuleDetail extends React.Component<IAffectationModuleDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { affectationModuleEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            <Translate contentKey="pfumv10App.affectationModule.detail.title">AffectationModule</Translate> [
            <b>{affectationModuleEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="annee">
                <Translate contentKey="pfumv10App.affectationModule.annee">Annee</Translate>
              </span>
            </dt>
            <dd>{affectationModuleEntity.annee}</dd>
            <dt>
              <span id="semestre">
                <Translate contentKey="pfumv10App.affectationModule.semestre">Semestre</Translate>
              </span>
            </dt>
            <dd>{affectationModuleEntity.semestre}</dd>
            <dt>
              <Translate contentKey="pfumv10App.affectationModule.module">Module</Translate>
            </dt>
            <dd>{affectationModuleEntity.module ? affectationModuleEntity.module.id : ''}</dd>
            <dt>
              <Translate contentKey="pfumv10App.affectationModule.professeur">Professeur</Translate>
            </dt>
            <dd>{affectationModuleEntity.professeur ? affectationModuleEntity.professeur.id : ''}</dd>
          </dl>
          <Button tag={Link} to="/entity/affectation-module" replace color="info">
            <FontAwesomeIcon icon="arrow-left" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.back">Back</Translate>
            </span>
          </Button>
          &nbsp;
          <Button tag={Link} to={`/entity/affectation-module/${affectationModuleEntity.id}/edit`} replace color="primary">
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

const mapStateToProps = ({ affectationModule }: IRootState) => ({
  affectationModuleEntity: affectationModule.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AffectationModuleDetail);
