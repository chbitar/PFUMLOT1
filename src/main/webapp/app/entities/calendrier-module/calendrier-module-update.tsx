import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
// tslint:disable-next-line:no-unused-variable
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IModule } from 'app/shared/model/module.model';
import { getEntities as getModules } from 'app/entities/module/module.reducer';
import { IAnneeInscription } from 'app/shared/model/annee-inscription.model';
import { getEntities as getAnneeInscriptions } from 'app/entities/annee-inscription/annee-inscription.reducer';
import { ITableauDeBoard } from 'app/shared/model/tableau-de-board.model';
import { getEntities as getTableauDeBoards } from 'app/entities/tableau-de-board/tableau-de-board.reducer';
import { getEntity, updateEntity, createEntity, reset } from './calendrier-module.reducer';
import { ICalendrierModule } from 'app/shared/model/calendrier-module.model';
// tslint:disable-next-line:no-unused-variable
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface ICalendrierModuleUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface ICalendrierModuleUpdateState {
  isNew: boolean;
  moduleId: string;
  anneeInscriptionId: string;
  boardId: string;
}

export class CalendrierModuleUpdate extends React.Component<ICalendrierModuleUpdateProps, ICalendrierModuleUpdateState> {
  constructor(props) {
    super(props);
    this.state = {
      moduleId: '0',
      anneeInscriptionId: '0',
      boardId: '0',
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

    this.props.getModules();
    this.props.getAnneeInscriptions();
    this.props.getTableauDeBoards();
  }

  saveEntity = (event, errors, values) => {
    values.dateControlContinu1 = convertDateTimeToServer(values.dateControlContinu1);
    values.dateControlContinu2 = convertDateTimeToServer(values.dateControlContinu2);

    if (errors.length === 0) {
      const { calendrierModuleEntity } = this.props;
      const entity = {
        ...calendrierModuleEntity,
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
    this.props.history.push('/entity/calendrier-module');
  };

  render() {
    const { calendrierModuleEntity, modules, anneeInscriptions, tableauDeBoards, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="pfumv10App.calendrierModule.home.createOrEditLabel">
              <Translate contentKey="pfumv10App.calendrierModule.home.createOrEditLabel">Create or edit a CalendrierModule</Translate>
            </h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : calendrierModuleEntity} onSubmit={this.saveEntity}>
                <AvGroup>
                  <Label id="dateControlContinu1Label" for="calendrier-module-dateControlContinu1">
                    <Translate contentKey="pfumv10App.calendrierModule.dateControlContinu1">Date Control Continu 1</Translate>
                  </Label>
                  <AvInput
                    id="calendrier-module-dateControlContinu1"
                    type="datetime-local"
                    className="form-control"
                    name="dateControlContinu1"
                    placeholder={'YYYY-MM-DD HH:mm'}
                    value={isNew ? null : convertDateTimeFromServer(this.props.calendrierModuleEntity.dateControlContinu1)}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="dateControlContinu2Label" for="calendrier-module-dateControlContinu2">
                    <Translate contentKey="pfumv10App.calendrierModule.dateControlContinu2">Date Control Continu 2</Translate>
                  </Label>
                  <AvInput
                    id="calendrier-module-dateControlContinu2"
                    type="datetime-local"
                    className="form-control"
                    name="dateControlContinu2"
                    placeholder={'YYYY-MM-DD HH:mm'}
                    value={isNew ? null : convertDateTimeFromServer(this.props.calendrierModuleEntity.dateControlContinu2)}
                  />
                </AvGroup>
                <AvGroup>
                  <Label for="calendrier-module-module">
                    <Translate contentKey="pfumv10App.calendrierModule.module">Module</Translate>
                  </Label>
                  <AvInput id="calendrier-module-module" type="select" className="form-control" name="module.id">
                    <option value="" key="0" />
                    {modules
                      ? modules.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.nomModule}
                          </option>
                        ))
                      : null}
                  </AvInput>
                </AvGroup>
                <AvGroup>
                  <Label for="calendrier-module-anneeInscription">
                    <Translate contentKey="pfumv10App.calendrierModule.anneeInscription">Annee Inscription</Translate>
                  </Label>
                  <AvInput id="calendrier-module-anneeInscription" type="select" className="form-control" name="anneeInscription.id">
                    <option value="" key="0" />
                    {anneeInscriptions
                      ? anneeInscriptions.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.annee}
                          </option>
                        ))
                      : null}
                  </AvInput>
                </AvGroup>
                <Button tag={Link} id="cancel-save" to="/entity/calendrier-module" replace color="info">
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
  modules: storeState.module.entities,
  anneeInscriptions: storeState.anneeInscription.entities,
  tableauDeBoards: storeState.tableauDeBoard.entities,
  calendrierModuleEntity: storeState.calendrierModule.entity,
  loading: storeState.calendrierModule.loading,
  updating: storeState.calendrierModule.updating,
  updateSuccess: storeState.calendrierModule.updateSuccess
});

const mapDispatchToProps = {
  getModules,
  getAnneeInscriptions,
  getTableauDeBoards,
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
)(CalendrierModuleUpdate);
