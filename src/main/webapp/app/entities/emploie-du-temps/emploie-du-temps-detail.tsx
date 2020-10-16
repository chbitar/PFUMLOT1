import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAction, openFile, byteSize } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './emploie-du-temps.reducer';
import { IEmploieDuTemps } from 'app/shared/model/emploie-du-temps.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IEmploieDuTempsDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class EmploieDuTempsDetail extends React.Component<IEmploieDuTempsDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { emploieDuTempsEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            <Translate contentKey="pfumv10App.emploieDuTemps.detail.title">EmploieDuTemps</Translate> [<b>{emploieDuTempsEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="emploieDuTemps">
                <Translate contentKey="pfumv10App.emploieDuTemps.emploieDuTemps">Emploie Du Temps</Translate>
              </span>
            </dt>
            <dd>
              {emploieDuTempsEntity.emploieDuTemps ? (
                <div>
                  <a onClick={openFile(emploieDuTempsEntity.emploieDuTempsContentType, emploieDuTempsEntity.emploieDuTemps)}>
                    <Translate contentKey="entity.action.open">Open</Translate>&nbsp;
                  </a>
                  <span>
                    {emploieDuTempsEntity.emploieDuTempsContentType}, {byteSize(emploieDuTempsEntity.emploieDuTemps)}
                  </span>
                </div>
              ) : null}
            </dd>
            <dt>
              <span id="programme">
                <Translate contentKey="pfumv10App.emploieDuTemps.programme">Programme</Translate>
              </span>
            </dt>
            <dd>{emploieDuTempsEntity.programme}</dd>
          </dl>
          <Button tag={Link} to="/entity/emploie-du-temps" replace color="info">
            <FontAwesomeIcon icon="arrow-left" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.back">Back</Translate>
            </span>
          </Button>
          &nbsp;
          <Button tag={Link} to={`/entity/emploie-du-temps/${emploieDuTempsEntity.id}/edit`} replace color="primary">
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

const mapStateToProps = ({ emploieDuTemps }: IRootState) => ({
  emploieDuTempsEntity: emploieDuTemps.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EmploieDuTempsDetail);
