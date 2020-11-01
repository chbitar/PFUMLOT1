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
/* import { getEntities as getModules } from 'app/entities/module/module.reducer'; */
import { getModulesAffectedToProf as getModules } from 'app/entities/module/module.reducer';
import { getEntity, updateEntity, createEntity, reset } from './fiche-absence.reducer';
import { IFicheAbsence } from 'app/shared/model/fiche-absence.model';
// tslint:disable-next-line:no-unused-variable
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IFicheAbsenceUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface IFicheAbsenceUpdateState {
  isNew: boolean;
  moduleId: string;
}

export class FicheAbsenceUpdate extends React.Component<IFicheAbsenceUpdateProps, IFicheAbsenceUpdateState> {
  constructor(props) {
    super(props);
    this.state = {
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

    this.props.getModules();
  }

  saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const { ficheAbsenceEntity } = this.props;
      const entity = {
        ...ficheAbsenceEntity,
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
    this.props.history.push('/entity/fiche-absence');
  };

  render() {
    const { ficheAbsenceEntity, modules, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="pfumApp.ficheAbsence.home.createOrEditLabel">
              <Translate contentKey="pfumApp.ficheAbsence.home.createOrEditLabel">Create or edit a FicheAbsence</Translate>
            </h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : ficheAbsenceEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="fiche-absence-id">
                      <Translate contentKey="global.field.id">ID</Translate>
                    </Label>
                    <AvInput id="fiche-absence-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="dateSeanceLabel" for="fiche-absence-dateSeance">
                    <Translate contentKey="pfumApp.ficheAbsence.dateSeance">Date Seance</Translate>
                  </Label>
                  <AvField
                    id="fiche-absence-dateSeance"
                    type="date"
                    className="form-control"
                    name="dateSeance"
                    validate={{
                      required: { value: true, errorMessage: translate('entity.validation.required') }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label for="fiche-absence-module">
                    <Translate contentKey="pfumApp.ficheAbsence.module">Module</Translate>
                  </Label>
                  <AvInput id="fiche-absence-module" type="select" className="form-control" name="module.id">
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
                <Button tag={Link} id="cancel-save" to="/entity/fiche-absence" replace color="info">
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
  ficheAbsenceEntity: storeState.ficheAbsence.entity,
  loading: storeState.ficheAbsence.loading,
  updating: storeState.ficheAbsence.updating,
  updateSuccess: storeState.ficheAbsence.updateSuccess
});

const mapDispatchToProps = {
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
)(FicheAbsenceUpdate);
