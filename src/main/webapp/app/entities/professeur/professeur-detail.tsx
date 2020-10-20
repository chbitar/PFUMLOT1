import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './professeur.reducer';
import { IProfesseur } from 'app/shared/model/professeur.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IProfesseurDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class ProfesseurDetail extends React.Component<IProfesseurDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { professeurEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            <Translate contentKey="pfumv10App.professeur.detail.title">Professeur</Translate> [<b>{professeurEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="nom">
                <Translate contentKey="pfumv10App.professeur.nom">Nom</Translate>
              </span>
            </dt>
            <dd>{professeurEntity.nom}</dd>
            <dt>
              <span id="prenom">
                <Translate contentKey="pfumv10App.professeur.prenom">Prenom</Translate>
              </span>
            </dt>
            <dd>{professeurEntity.prenom}</dd>
            <dt>
              <span id="etablissement">
                <Translate contentKey="pfumv10App.professeur.etablissement">Etablissement</Translate>
              </span>
            </dt>
            <dd>{professeurEntity.etablissement}</dd>
            <dt>
              <span id="grade">
                <Translate contentKey="pfumv10App.professeur.grade">Grade</Translate>
              </span>
            </dt>
            <dd>{professeurEntity.grade}</dd>
            <dt>
              <span id="diplome">
                <Translate contentKey="pfumv10App.professeur.diplome">Diplome</Translate>
              </span>
            </dt>
            <dd>{professeurEntity.diplome}</dd>
            <dt>
              <span id="cin">
                <Translate contentKey="pfumv10App.professeur.cin">Cin</Translate>
              </span>
            </dt>
            <dd>{professeurEntity.cin}</dd>
            <dt>
              <span id="rib">
                <Translate contentKey="pfumv10App.professeur.rib">Rib</Translate>
              </span>
            </dt>
            <dd>{professeurEntity.rib}</dd>
            <dt>
              <span id="email">
                <Translate contentKey="pfumv10App.professeur.email">Email</Translate>
              </span>
            </dt>
            <dd>{professeurEntity.email}</dd>
            <dt>
              <Translate contentKey="pfumv10App.professeur.user">User</Translate>
            </dt>
            <dd>{professeurEntity.user ? professeurEntity.user.id : ''}</dd>
          </dl>
          <Button tag={Link} to="/entity/professeur" replace color="info">
            <FontAwesomeIcon icon="arrow-left" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.back">Back</Translate>
            </span>
          </Button>
          &nbsp;
          <Button tag={Link} to={`/entity/professeur/${professeurEntity.id}/edit`} replace color="primary">
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

const mapStateToProps = ({ professeur }: IRootState) => ({
  professeurEntity: professeur.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProfesseurDetail);
