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
import { getEntity, updateEntity, createEntity, reset } from './note-executif.reducer';
import { INoteExecutif } from 'app/shared/model/note-executif.model';
// tslint:disable-next-line:no-unused-variable
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface INoteExecutifUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface INoteExecutifUpdateState {
  isNew: boolean;
  userId: string;
  moduleId: string;
}

export class NoteExecutifUpdate extends React.Component<INoteExecutifUpdateProps, INoteExecutifUpdateState> {
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
      const { noteExecutifEntity } = this.props;
      const entity = {
        ...noteExecutifEntity,
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
    this.props.history.push('/entity/note-executif');
  };

  render() {
    const { noteExecutifEntity, users, modules, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="pfumv10App.noteExecutif.home.createOrEditLabel">
              <Translate contentKey="pfumv10App.noteExecutif.home.createOrEditLabel">Create or edit a NoteExecutif</Translate>
            </h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : noteExecutifEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="note-executif-id">
                      <Translate contentKey="global.field.id">ID</Translate>
                    </Label>
                    <AvInput id="note-executif-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="semestreLabel" for="note-executif-semestre">
                    <Translate contentKey="pfumv10App.noteExecutif.semestre">Semestre</Translate>
                  </Label>
                  <AvInput
                    id="note-executif-semestre"
                    type="select"
                    className="form-control"
                    name="semestre"
                    value={(!isNew && noteExecutifEntity.semestre) || 'S1'}
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
                  <Label id="noteCC1Label" for="note-executif-noteCC1">
                    <Translate contentKey="pfumv10App.noteExecutif.noteCC1">Note CC 1</Translate>
                  </Label>
                  <AvField id="note-executif-noteCC1" type="string" className="form-control" name="noteCC1" />
                </AvGroup>
                <AvGroup>
                  <Label id="noteCC2Label" for="note-executif-noteCC2">
                    <Translate contentKey="pfumv10App.noteExecutif.noteCC2">Note CC 2</Translate>
                  </Label>
                  <AvField id="note-executif-noteCC2" type="string" className="form-control" name="noteCC2" />
                </AvGroup>
                <AvGroup>
                  <Label id="noteFinalLabel" for="note-executif-noteFinal">
                    <Translate contentKey="pfumv10App.noteExecutif.noteFinal">Note Final</Translate>
                  </Label>
                  <AvField id="note-executif-noteFinal" type="string" className="form-control" name="noteFinal" />
                </AvGroup>
                <AvGroup>
                  <Label id="dateLabel" for="note-executif-date">
                    <Translate contentKey="pfumv10App.noteExecutif.date">Date</Translate>
                  </Label>
                  <AvInput
                    id="note-executif-date"
                    type="datetime-local"
                    className="form-control"
                    name="date"
                    placeholder={'YYYY-MM-DD HH:mm'}
                    value={isNew ? null : convertDateTimeFromServer(this.props.noteExecutifEntity.date)}
                  />
                </AvGroup>
                <AvGroup>
                  <Label for="note-executif-user">
                    <Translate contentKey="pfumv10App.noteExecutif.user">User</Translate>
                  </Label>
                  <AvInput id="note-executif-user" type="select" className="form-control" name="user.id">
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
                  <Label for="note-executif-module">
                    <Translate contentKey="pfumv10App.noteExecutif.module">Module</Translate>
                  </Label>
                  <AvInput id="note-executif-module" type="select" className="form-control" name="module.id">
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
                <Button tag={Link} id="cancel-save" to="/entity/note-executif" replace color="info">
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
  noteExecutifEntity: storeState.noteExecutif.entity,
  loading: storeState.noteExecutif.loading,
  updating: storeState.noteExecutif.updating,
  updateSuccess: storeState.noteExecutif.updateSuccess
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
)(NoteExecutifUpdate);
