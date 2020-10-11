import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
// tslint:disable-next-line:no-unused-variable
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { getEntity, updateEntity, createEntity, reset } from './modalite-paiement.reducer';
import { IModalitePaiement } from 'app/shared/model/modalite-paiement.model';
// tslint:disable-next-line:no-unused-variable
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IModalitePaiementUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface IModalitePaiementUpdateState {
  isNew: boolean;
}

export class ModalitePaiementUpdate extends React.Component<IModalitePaiementUpdateProps, IModalitePaiementUpdateState> {
  constructor(props) {
    super(props);
    this.state = {
      isNew: !this.props.match.params || !this.props.match.params.id
    };
  }

  componentWillUpdate(nextProps, nextState) {
    if (nextProps.updateSuccess !== this.props.updateSuccess && nextProps.updateSuccess) {
      this.handleClose();
    }
  }

  componentDidMount() {
    if (this.state.isNew) {
      this.props.reset();
    } else {
      this.props.getEntity(this.props.match.params.id);
    }
  }

  saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const { modalitePaiementEntity } = this.props;
      const entity = {
        ...modalitePaiementEntity,
        ...values
      };

      if (this.state.isNew) {
        this.props.createEntity(entity);
      } else {
        this.props.updateEntity(entity);
      }
    }
  };

  handleClose = () => {
    this.props.history.push('/entity/modalite-paiement');
  };

  render() {
    const { modalitePaiementEntity, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="pfumv10App.modalitePaiement.home.createOrEditLabel">
              <Translate contentKey="pfumv10App.modalitePaiement.home.createOrEditLabel">Create or edit a ModalitePaiement</Translate>
            </h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : modalitePaiementEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="modalite-paiement-id">
                      <Translate contentKey="global.field.id">ID</Translate>
                    </Label>
                    <AvInput id="modalite-paiement-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="modaliteLabel" for="modalite-paiement-modalite">
                    <Translate contentKey="pfumv10App.modalitePaiement.modalite">Modalite</Translate>
                  </Label>
                  <AvField id="modalite-paiement-modalite" type="text" name="modalite" />
                </AvGroup>
                <AvGroup>
                  <Label id="coutProgrammettcLabel" for="modalite-paiement-coutProgrammettc">
                    <Translate contentKey="pfumv10App.modalitePaiement.coutProgrammettc">Cout Programmettc</Translate>
                  </Label>
                  <AvField id="modalite-paiement-coutProgrammettc" type="string" className="form-control" name="coutProgrammettc" />
                </AvGroup>
                <AvGroup>
                  <Label id="coutProgrammettcDeviseLabel" for="modalite-paiement-coutProgrammettcDevise">
                    <Translate contentKey="pfumv10App.modalitePaiement.coutProgrammettcDevise">Cout Programmettc Devise</Translate>
                  </Label>
                  <AvField
                    id="modalite-paiement-coutProgrammettcDevise"
                    type="string"
                    className="form-control"
                    name="coutProgrammettcDevise"
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="remiseNiveau1Label" for="modalite-paiement-remiseNiveau1">
                    <Translate contentKey="pfumv10App.modalitePaiement.remiseNiveau1">Remise Niveau 1</Translate>
                  </Label>
                  <AvField id="modalite-paiement-remiseNiveau1" type="string" className="form-control" name="remiseNiveau1" />
                </AvGroup>
                <AvGroup>
                  <Label id="remiseNiveau2Label" for="modalite-paiement-remiseNiveau2">
                    <Translate contentKey="pfumv10App.modalitePaiement.remiseNiveau2">Remise Niveau 2</Translate>
                  </Label>
                  <AvField id="modalite-paiement-remiseNiveau2" type="string" className="form-control" name="remiseNiveau2" />
                </AvGroup>
                <AvGroup>
                  <Label id="deviseLabel" for="modalite-paiement-devise">
                    <Translate contentKey="pfumv10App.modalitePaiement.devise">Devise</Translate>
                  </Label>
                  <AvInput
                    id="modalite-paiement-devise"
                    type="select"
                    className="form-control"
                    name="devise"
                    value={(!isNew && modalitePaiementEntity.devise) || 'MAD'}
                  >
                    <option value="MAD">{translate('pfumv10App.Devise.MAD')}</option>
                    <option value="USD">{translate('pfumv10App.Devise.USD')}</option>
                  </AvInput>
                </AvGroup>
                <Button tag={Link} id="cancel-save" to="/entity/modalite-paiement" replace color="info">
                  <FontAwesomeIcon icon="arrow-left" />
                  &nbsp;
                  <span className="d-none d-md-inline">
                    <Translate contentKey="entity.action.back">Back</Translate>
                  </span>
                </Button>
                &nbsp;
                <Button color="primary" id="save-entity" type="submit" disabled={updating}>
                  <FontAwesomeIcon icon="save" />
                  &nbsp;
                  <Translate contentKey="entity.action.save">Save</Translate>
                </Button>
              </AvForm>
            )}
          </Col>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = (storeState: IRootState) => ({
  modalitePaiementEntity: storeState.modalitePaiement.entity,
  loading: storeState.modalitePaiement.loading,
  updating: storeState.modalitePaiement.updating,
  updateSuccess: storeState.modalitePaiement.updateSuccess
});

const mapDispatchToProps = {
  getEntity,
  updateEntity,
  createEntity,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ModalitePaiementUpdate);
