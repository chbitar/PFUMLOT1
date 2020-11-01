import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './module.reducer';
import { IModule } from 'app/shared/model/module.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IModuleDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class ModuleDetail extends React.Component<IModuleDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { moduleEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            [<b>{moduleEntity.nomModule}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="volumeHoraire">
                <Translate contentKey="pfumApp.module.volumeHoraire">Volume Horaire</Translate>
              </span>
            </dt>
            <dd>{moduleEntity.volumeHoraire}</dd>
            <dt>
              <span id="semestre">
                <Translate contentKey="pfumApp.module.semestre">Semestre</Translate>
              </span>
            </dt>
            <dd>
              <Translate contentKey={`pfumApp.Semestre.${moduleEntity.semestre}`} />
            </dd>
            <dt>
              <Translate contentKey="pfumApp.module.filiere">Filiere</Translate>
            </dt>
            <dd>{moduleEntity.filiere ? moduleEntity.filiere.nomfiliere : ''}</dd>
          </dl>
          <Button tag={Link} to="/entity/module" replace color="info">
            <FontAwesomeIcon icon="arrow-left" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.back">Back</Translate>
            </span>
          </Button>
          &nbsp;
          <Button tag={Link} to={`/entity/module/${moduleEntity.id}/edit`} replace color="primary">
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

const mapStateToProps = ({ module }: IRootState) => ({
  moduleEntity: module.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ModuleDetail);
