import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
// tslint:disable-next-line:no-unused-variable
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IFiliere } from 'app/shared/model/filiere.model';
import { getEntities as getFilieres } from 'app/entities/filiere/filiere.reducer';
import { getEntity, updateEntity, createEntity, reset } from './module.reducer';
import { IModule } from 'app/shared/model/module.model';
// tslint:disable-next-line:no-unused-variable
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IModuleUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface IModuleUpdateState {
  isNew: boolean;
  filiereId: string;
}

export class ModuleUpdate extends React.Component<IModuleUpdateProps, IModuleUpdateState> {
  constructor(props) {
    super(props);
    this.state = {
      filiereId: '0',
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

    this.props.getFilieres();
  }

  saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const { moduleEntity } = this.props;
      const entity = {
        ...moduleEntity,
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
    this.props.history.push('/entity/module');
  };

  render() {
    const { moduleEntity, filieres, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="pfumv10App.module.home.createOrEditLabel">
              <Translate contentKey="pfumv10App.module.home.createOrEditLabel">Create or edit a Module</Translate>
            </h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : moduleEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="module-id">
                      <Translate contentKey="global.field.id">ID</Translate>
                    </Label>
                    <AvInput id="module-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="nomModuleLabel" for="module-nomModule">
                    <Translate contentKey="pfumv10App.module.nomModule">Nom Module</Translate>
                  </Label>
                  <AvField id="module-nomModule" type="text" name="nomModule" />
                </AvGroup>
                <AvGroup>
                  <Label id="volumeHoraireLabel" for="module-volumeHoraire">
                    <Translate contentKey="pfumv10App.module.volumeHoraire">Volume Horaire</Translate>
                  </Label>
                  <AvField id="module-volumeHoraire" type="string" className="form-control" name="volumeHoraire" />
                </AvGroup>
                <AvGroup>
                  <Label id="semestreLabel" for="module-semestre">
                    <Translate contentKey="pfumv10App.module.semestre">Semestre</Translate>
                  </Label>
                  <AvInput
                    id="module-semestre"
                    type="select"
                    className="form-control"
                    name="semestre"
                    value={(!isNew && moduleEntity.semestre) || 'S1'}
                  >
                    <option value="S1">{translate('pfumv10App.Semestre.S1')}</option>
                    <option value="S2">{translate('pfumv10App.Semestre.S2')}</option>
                    <option value="S3">{translate('pfumv10App.Semestre.S3')}</option>
                    <option value="S4">{translate('pfumv10App.Semestre.S4')}</option>
                    <option value="S5">{translate('pfumv10App.Semestre.S5')}</option>
                    <option value="S6">{translate('pfumv10App.Semestre.S6')}</option>
                  </AvInput>
                </AvGroup>
                <AvGroup>
                  <Label for="module-filiere">
                    <Translate contentKey="pfumv10App.module.filiere">Filiere</Translate>
                  </Label>
                  <AvInput id="module-filiere" type="select" className="form-control" name="filiere.id">
                    <option value="" key="0" />
                    {filieres
                      ? filieres.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.id}
                          </option>
                        ))
                      : null}
                  </AvInput>
                </AvGroup>
                <Button tag={Link} id="cancel-save" to="/entity/module" replace color="info">
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
  filieres: storeState.filiere.entities,
  moduleEntity: storeState.module.entity,
  loading: storeState.module.loading,
  updating: storeState.module.updating,
  updateSuccess: storeState.module.updateSuccess
});

const mapDispatchToProps = {
  getFilieres,
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
)(ModuleUpdate);
