import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './filiere.reducer';
import { IFiliere } from 'app/shared/model/filiere.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IFiliereDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class FiliereDetail extends React.Component<IFiliereDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { filiereEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            <Translate contentKey="pfumv10App.filiere.detail.title">Filiere</Translate> [<b>{filiereEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="nomfiliere">
                <Translate contentKey="pfumv10App.filiere.nomfiliere">Nomfiliere</Translate>
              </span>
            </dt>
            <dd>{filiereEntity.nomfiliere}</dd>
            <dt>
              <span id="responsable">
                <Translate contentKey="pfumv10App.filiere.responsable">Responsable</Translate>
              </span>
            </dt>
            <dd>{filiereEntity.responsable}</dd>
            <dt>
              <span id="accreditaion">
                <Translate contentKey="pfumv10App.filiere.accreditaion">Accreditaion</Translate>
              </span>
            </dt>
            <dd>{filiereEntity.accreditaion}</dd>
            <dt>
              <span id="programme">
                <Translate contentKey="pfumv10App.filiere.programme">Programme</Translate>
              </span>
            </dt>
            <dd>{filiereEntity.programme}</dd>
            <dt>
              <Translate contentKey="pfumv10App.filiere.etablissement">Etablissement</Translate>
            </dt>
            <dd>{filiereEntity.etablissement ? filiereEntity.etablissement.id : ''}</dd>
          </dl>
          <Button tag={Link} to="/entity/filiere" replace color="info">
            <FontAwesomeIcon icon="arrow-left" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.back">Back</Translate>
            </span>
          </Button>
          &nbsp;
          <Button tag={Link} to={`/entity/filiere/${filiereEntity.id}/edit`} replace color="primary">
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

const mapStateToProps = ({ filiere }: IRootState) => ({
  filiereEntity: filiere.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FiliereDetail);
