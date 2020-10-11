import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAction, byteSize } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './annonce.reducer';
import { IAnnonce } from 'app/shared/model/annonce.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IAnnonceDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class AnnonceDetail extends React.Component<IAnnonceDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { annonceEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            <Translate contentKey="pfumv10App.annonce.detail.title">Annonce</Translate> [<b>{annonceEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="annonce">
                <Translate contentKey="pfumv10App.annonce.annonce">Annonce</Translate>
              </span>
            </dt>
            <dd>{annonceEntity.annonce}</dd>
            <dt>
              <span id="commentaire">
                <Translate contentKey="pfumv10App.annonce.commentaire">Commentaire</Translate>
              </span>
            </dt>
            <dd>{annonceEntity.commentaire}</dd>
          </dl>
          <Button tag={Link} to="/entity/annonce" replace color="info">
            <FontAwesomeIcon icon="arrow-left" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.back">Back</Translate>
            </span>
          </Button>
          &nbsp;
          <Button tag={Link} to={`/entity/annonce/${annonceEntity.id}/edit`} replace color="primary">
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

const mapStateToProps = ({ annonce }: IRootState) => ({
  annonceEntity: annonce.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AnnonceDetail);
