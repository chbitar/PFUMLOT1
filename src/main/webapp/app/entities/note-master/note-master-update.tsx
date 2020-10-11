import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
// tslint:disable-next-line:no-unused-variable
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IUser } from 'app/shared/model/user.model';
import { getUsers } from 'app/modules/administration/user-management/user-management.reducer';
import { IModule } from 'app/shared/model/module.model';
import { getEntities as getModules } from 'app/entities/module/module.reducer';
import { getEntity, updateEntity, createEntity, reset } from './note-master.reducer';
import { INoteMaster } from 'app/shared/model/note-master.model';
// tslint:disable-next-line:no-unused-variable
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface INoteMasterUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface INoteMasterUpdateState {
  isNew: boolean;
  userId: string;
  moduleId: string;
}

export class NoteMasterUpdate extends React.Component<INoteMasterUpdateProps, INoteMasterUpdateState> {
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

  saveEntity = (event, errors, values) => {
    values.date = convertDateTimeToServer(values.date);

    if (errors.length === 0) {
      const { noteMasterEntity } = this.props;
      const entity = {
        ...noteMasterEntity,
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
    this.props.history.push('/entity/note-master');
  };

  render() {
    const { noteMasterEntity, users, modules, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="pfumv10App.noteMaster.home.createOrEditLabel">
              <Translate contentKey="pfumv10App.noteMaster.home.createOrEditLabel">Create or edit a NoteMaster</Translate>
            </h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : noteMasterEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="note-master-id">
                      <Translate contentKey="global.field.id">ID</Translate>
                    </Label>
                    <AvInput id="note-master-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="semestreLabel" for="note-master-semestre">
                    <Translate contentKey="pfumv10App.noteMaster.semestre">Semestre</Translate>
                  </Label>
                  <AvInput
                    id="note-master-semestre"
                    type="select"
                    className="form-control"
                    name="semestre"
                    value={(!isNew && noteMasterEntity.semestre) || 'S1'}
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
                  <Label id="noteCC1Label" for="note-master-noteCC1">
                    <Translate contentKey="pfumv10App.noteMaster.noteCC1">Note CC 1</Translate>
                  </Label>
                  <AvField id="note-master-noteCC1" type="string" className="form-control" name="noteCC1" />
                </AvGroup>
                <AvGroup>
                  <Label id="noteCC2Label" for="note-master-noteCC2">
                    <Translate contentKey="pfumv10App.noteMaster.noteCC2">Note CC 2</Translate>
                  </Label>
                  <AvField id="note-master-noteCC2" type="string" className="form-control" name="noteCC2" />
                </AvGroup>
                <AvGroup>
                  <Label id="noteFinalLabel" for="note-master-noteFinal">
                    <Translate contentKey="pfumv10App.noteMaster.noteFinal">Note Final</Translate>
                  </Label>
                  <AvField id="note-master-noteFinal" type="string" className="form-control" name="noteFinal" />
                </AvGroup>
                <AvGroup>
                  <Label id="dateLabel" for="note-master-date">
                    <Translate contentKey="pfumv10App.noteMaster.date">Date</Translate>
                  </Label>
                  <AvInput
                    id="note-master-date"
                    type="datetime-local"
                    className="form-control"
                    name="date"
                    placeholder={'YYYY-MM-DD HH:mm'}
                    value={isNew ? null : convertDateTimeFromServer(this.props.noteMasterEntity.date)}
                  />
                </AvGroup>
                <AvGroup>
                  <Label for="note-master-user">
                    <Translate contentKey="pfumv10App.noteMaster.user">User</Translate>
                  </Label>
                  <AvInput id="note-master-user" type="select" className="form-control" name="user.id">
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
                  <Label for="note-master-module">
                    <Translate contentKey="pfumv10App.noteMaster.module">Module</Translate>
                  </Label>
                  <AvInput id="note-master-module" type="select" className="form-control" name="module.id">
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
                <Button tag={Link} id="cancel-save" to="/entity/note-master" replace color="info">
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
  noteMasterEntity: storeState.noteMaster.entity,
  loading: storeState.noteMaster.loading,
  updating: storeState.noteMaster.updating,
  updateSuccess: storeState.noteMaster.updateSuccess
});

const mapDispatchToProps = {
  getUsers,
  getModules,
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
)(NoteMasterUpdate);
