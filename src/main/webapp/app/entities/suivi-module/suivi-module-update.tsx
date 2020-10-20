import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
// tslint:disable-next-line:no-unused-variable
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, setFileData, byteSize, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IUser } from 'app/shared/model/user.model';
import { getUsers } from 'app/modules/administration/user-management/user-management.reducer';
import { IModule } from 'app/shared/model/module.model';
import { getEntities as getModules } from 'app/entities/module/module.reducer';
import { getEntity, updateEntity, createEntity, setBlob, reset } from './suivi-module.reducer';
import { ISuiviModule } from 'app/shared/model/suivi-module.model';
// tslint:disable-next-line:no-unused-variable
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface ISuiviModuleUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface ISuiviModuleUpdateState {
  isNew: boolean;
  userId: string;
  moduleId: string;
}

export class SuiviModuleUpdate extends React.Component<ISuiviModuleUpdateProps, ISuiviModuleUpdateState> {
  constructor(props) {
    super(props);
    this.state = {
      userId: '0',
      moduleId: '0',
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

    this.props.getUsers();
    this.props.getModules();
  }

  onBlobChange = (isAnImage, name) => event => {
    setFileData(event, (contentType, data) => this.props.setBlob(name, data, contentType), isAnImage);
  };

  clearBlob = name => () => {
    this.props.setBlob(name, undefined, undefined);
  };

  saveEntity = (event, errors, values) => {
    values.date = convertDateTimeToServer(values.date);
    values.debutCreneau = convertDateTimeToServer(values.debutCreneau);
    values.finCreneau = convertDateTimeToServer(values.finCreneau);

    if (errors.length === 0) {
      const { suiviModuleEntity } = this.props;
      const entity = {
        ...suiviModuleEntity,
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
    this.props.history.push('/entity/suivi-module');
  };

  render() {
    const { suiviModuleEntity, users, modules, loading, updating } = this.props;
    const { isNew } = this.state;

    const { descriptif, observations } = suiviModuleEntity;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="pfumv10App.suiviModule.home.createOrEditLabel">
              <Translate contentKey="pfumv10App.suiviModule.home.createOrEditLabel">Create or edit a SuiviModule</Translate>
            </h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : suiviModuleEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="suivi-module-id">
                      <Translate contentKey="global.field.id">ID</Translate>
                    </Label>
                    <AvInput id="suivi-module-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="semestreLabel" for="suivi-module-semestre">
                    <Translate contentKey="pfumv10App.suiviModule.semestre">Semestre</Translate>
                  </Label>
                  <AvInput
                    id="suivi-module-semestre"
                    type="select"
                    className="form-control"
                    name="semestre"
                    value={(!isNew && suiviModuleEntity.semestre) || 'S1'}
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
                  <Label id="descriptifLabel" for="suivi-module-descriptif">
                    <Translate contentKey="pfumv10App.suiviModule.descriptif">Descriptif</Translate>
                  </Label>
                  <AvInput
                    id="suivi-module-descriptif"
                    type="textarea"
                    name="descriptif"
                    validate={{
                      required: { value: true, errorMessage: translate('entity.validation.required') }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="observationsLabel" for="suivi-module-observations">
                    <Translate contentKey="pfumv10App.suiviModule.observations">Observations</Translate>
                  </Label>
                  <AvInput
                    id="suivi-module-observations"
                    type="textarea"
                    name="observations"
                    validate={{
                      required: { value: true, errorMessage: translate('entity.validation.required') }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="dateLabel" for="suivi-module-date">
                    <Translate contentKey="pfumv10App.suiviModule.date">Date</Translate>
                  </Label>
                  <AvInput
                    id="suivi-module-date"
                    type="datetime-local"
                    className="form-control"
                    name="date"
                    placeholder={'YYYY-MM-DD HH:mm'}
                    value={isNew ? null : convertDateTimeFromServer(this.props.suiviModuleEntity.date)}
                    validate={{
                      required: { value: true, errorMessage: translate('entity.validation.required') }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="debutCreneauLabel" for="suivi-module-debutCreneau">
                    <Translate contentKey="pfumv10App.suiviModule.debutCreneau">Debut Creneau</Translate>
                  </Label>
                  <AvInput
                    id="suivi-module-debutCreneau"
                    type="datetime-local"
                    className="form-control"
                    name="debutCreneau"
                    placeholder={'YYYY-MM-DD HH:mm'}
                    value={isNew ? null : convertDateTimeFromServer(this.props.suiviModuleEntity.debutCreneau)}
                    validate={{
                      required: { value: true, errorMessage: translate('entity.validation.required') }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="finCreneauLabel" for="suivi-module-finCreneau">
                    <Translate contentKey="pfumv10App.suiviModule.finCreneau">Fin Creneau</Translate>
                  </Label>
                  <AvInput
                    id="suivi-module-finCreneau"
                    type="datetime-local"
                    className="form-control"
                    name="finCreneau"
                    placeholder={'YYYY-MM-DD HH:mm'}
                    value={isNew ? null : convertDateTimeFromServer(this.props.suiviModuleEntity.finCreneau)}
                    validate={{
                      required: { value: true, errorMessage: translate('entity.validation.required') }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="dureeLabel" for="suivi-module-duree">
                    <Translate contentKey="pfumv10App.suiviModule.duree">Duree</Translate>
                  </Label>
                  <AvField
                    id="suivi-module-duree"
                    type="string"
                    className="form-control"
                    name="duree"
                    validate={{
                      required: { value: true, errorMessage: translate('entity.validation.required') },
                      number: { value: true, errorMessage: translate('entity.validation.number') }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label for="suivi-module-user">
                    <Translate contentKey="pfumv10App.suiviModule.user">User</Translate>
                  </Label>
                  <AvInput id="suivi-module-user" type="select" className="form-control" name="user.id">
                    <option value="" key="0" />
                    {users
                      ? users.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.id}
                          </option>
                        ))
                      : null}
                  </AvInput>
                </AvGroup>
                <AvGroup>
                  <Label for="suivi-module-module">
                    <Translate contentKey="pfumv10App.suiviModule.module">Module</Translate>
                  </Label>
                  <AvInput id="suivi-module-module" type="select" className="form-control" name="module.id">
                    <option value="" key="0" />
                    {modules
                      ? modules.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.id}
                          </option>
                        ))
                      : null}
                  </AvInput>
                </AvGroup>
                <Button tag={Link} id="cancel-save" to="/entity/suivi-module" replace color="info">
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
  users: storeState.userManagement.users,
  modules: storeState.module.entities,
  suiviModuleEntity: storeState.suiviModule.entity,
  loading: storeState.suiviModule.loading,
  updating: storeState.suiviModule.updating,
  updateSuccess: storeState.suiviModule.updateSuccess
});

const mapDispatchToProps = {
  getUsers,
  getModules,
  getEntity,
  updateEntity,
  setBlob,
  createEntity,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SuiviModuleUpdate);
