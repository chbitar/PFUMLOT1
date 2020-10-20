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
import { ICalendrierModule } from 'app/shared/model/calendrier-module.model';
import { getEntities as getCalendrierModules } from 'app/entities/calendrier-module/calendrier-module.reducer';
import { getEntity, updateEntity, createEntity, reset } from './tableau-de-board.reducer';
import { ITableauDeBoard } from 'app/shared/model/tableau-de-board.model';
// tslint:disable-next-line:no-unused-variable
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface ITableauDeBoardUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface ITableauDeBoardUpdateState {
  isNew: boolean;
  idsfilier: any[];
  idscalendrier: any[];
}

export class TableauDeBoardUpdate extends React.Component<ITableauDeBoardUpdateProps, ITableauDeBoardUpdateState> {
  constructor(props) {
    super(props);
    this.state = {
      idsfilier: [],
      idscalendrier: [],
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
    this.props.getCalendrierModules();
  }

  saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const { tableauDeBoardEntity } = this.props;
      const entity = {
        ...tableauDeBoardEntity,
        ...values,
        filiers: mapIdList(values.filiers),
        calendriers: mapIdList(values.calendriers)
      };

      if (this.state.isNew) {
        this.props.createEntity(entity);
      } else {
        this.props.updateEntity(entity);
      }
    }
  };

  handleClose = () => {
    this.props.history.push('/entity/tableau-de-board');
  };

  render() {
    const { tableauDeBoardEntity, filieres, calendrierModules, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="pfumv10App.tableauDeBoard.home.createOrEditLabel">
              <Translate contentKey="pfumv10App.tableauDeBoard.home.createOrEditLabel">Create or edit a TableauDeBoard</Translate>
            </h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : tableauDeBoardEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="tableau-de-board-id">
                      <Translate contentKey="global.field.id">ID</Translate>
                    </Label>
                    <AvInput id="tableau-de-board-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="tableauDeBoardLabel" for="tableau-de-board-tableauDeBoard">
                    <Translate contentKey="pfumv10App.tableauDeBoard.tableauDeBoard">Tableau De Board</Translate>
                  </Label>
                  <AvField id="tableau-de-board-tableauDeBoard" type="text" name="tableauDeBoard" />
                </AvGroup>
                <AvGroup>
                  <Label for="tableau-de-board-filier">
                    <Translate contentKey="pfumv10App.tableauDeBoard.filier">Filier</Translate>
                  </Label>
                  <AvInput
                    id="tableau-de-board-filier"
                    type="select"
                    multiple
                    className="form-control"
                    name="filiers"
                    value={tableauDeBoardEntity.filiers && tableauDeBoardEntity.filiers.map(e => e.id)}
                  >
                    <option value="" key="0" />
                    {filieres
                      ? filieres.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.nomfiliere}
                          </option>
                        ))
                      : null}
                  </AvInput>
                </AvGroup>
                <AvGroup>
                  <Label for="tableau-de-board-calendrier">
                    <Translate contentKey="pfumv10App.tableauDeBoard.calendrier">Calendrier</Translate>
                  </Label>
                  <AvInput
                    id="tableau-de-board-calendrier"
                    type="select"
                    multiple
                    className="form-control"
                    name="calendriers"
                    value={tableauDeBoardEntity.calendriers && tableauDeBoardEntity.calendriers.map(e => e.id)}
                  >
                    <option value="" key="0" />
                    {calendrierModules
                      ? calendrierModules.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.libelle}
                          </option>
                        ))
                      : null}
                  </AvInput>
                </AvGroup>
                <Button tag={Link} id="cancel-save" to="/entity/tableau-de-board" replace color="info">
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
  calendrierModules: storeState.calendrierModule.entities,
  tableauDeBoardEntity: storeState.tableauDeBoard.entity,
  loading: storeState.tableauDeBoard.loading,
  updating: storeState.tableauDeBoard.updating,
  updateSuccess: storeState.tableauDeBoard.updateSuccess
});

const mapDispatchToProps = {
  getFilieres,
  getCalendrierModules,
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
)(TableauDeBoardUpdate);
