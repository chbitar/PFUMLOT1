import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './modalite-paiement.reducer';
import { IModalitePaiement } from 'app/shared/model/modalite-paiement.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IModalitePaiementDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class ModalitePaiementDetail extends React.Component<IModalitePaiementDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { modalitePaiementEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            <Translate contentKey="pfumv10App.modalitePaiement.detail.title">ModalitePaiement</Translate> [
            <b>{modalitePaiementEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="modalite">
                <Translate contentKey="pfumv10App.modalitePaiement.modalite">Modalite</Translate>
              </span>
            </dt>
            <dd>{modalitePaiementEntity.modalite}</dd>
            <dt>
              <span id="coutProgrammettc">
                <Translate contentKey="pfumv10App.modalitePaiement.coutProgrammettc">Cout Programmettc</Translate>
              </span>
            </dt>
            <dd>{modalitePaiementEntity.coutProgrammettc}</dd>
            <dt>
              <span id="coutProgrammettcDevise">
                <Translate contentKey="pfumv10App.modalitePaiement.coutProgrammettcDevise">Cout Programmettc Devise</Translate>
              </span>
            </dt>
            <dd>{modalitePaiementEntity.coutProgrammettcDevise}</dd>
            <dt>
              <span id="remiseNiveau1">
                <Translate contentKey="pfumv10App.modalitePaiement.remiseNiveau1">Remise Niveau 1</Translate>
              </span>
            </dt>
            <dd>{modalitePaiementEntity.remiseNiveau1}</dd>
            <dt>
              <span id="remiseNiveau2">
                <Translate contentKey="pfumv10App.modalitePaiement.remiseNiveau2">Remise Niveau 2</Translate>
              </span>
            </dt>
            <dd>{modalitePaiementEntity.remiseNiveau2}</dd>
            <dt>
              <span id="devise">
                <Translate contentKey="pfumv10App.modalitePaiement.devise">Devise</Translate>
              </span>
            </dt>
            <dd>{modalitePaiementEntity.devise}</dd>
          </dl>
          <Button tag={Link} to="/entity/modalite-paiement" replace color="info">
            <FontAwesomeIcon icon="arrow-left" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.back">Back</Translate>
            </span>
          </Button>
          &nbsp;
          <Button tag={Link} to={`/entity/modalite-paiement/${modalitePaiementEntity.id}/edit`} replace color="primary">
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

const mapStateToProps = ({ modalitePaiement }: IRootState) => ({
  modalitePaiementEntity: modalitePaiement.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ModalitePaiementDetail);
