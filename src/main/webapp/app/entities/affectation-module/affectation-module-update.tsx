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
import { IProfesseur } from 'app/shared/model/professeur.model';
import { getEntities as getProfesseurs } from 'app/entities/professeur/professeur.reducer';
import { getEntity, updateEntity, createEntity, reset } from './affectation-module.reducer';
import { IAffectationModule } from 'app/shared/model/affectation-module.model';
// tslint:disable-next-line:no-unused-variable
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IAffectationModuleUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface IAffectationModuleUpdateState {
  isNew: boolean;
  moduleId: string;
  professeurId: string;
}

export class AffectationModuleUpdate extends React.Component<IAffectationModuleUpdateProps, IAffectationModuleUpdateState> {
  constructor(props) {
    super(props);
    this.state = {
      moduleId: '0',
      professeurId: '0',
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
    this.props.getProfesseurs();
  }

  saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const { affectationModuleEntity } = this.props;
      const entity = {
        ...affectationModuleEntity,
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
    this.props.history.push('/entity/affectation-module');
  };

  render() {
    const { affectationModuleEntity, modules, professeurs, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="pfumv10App.affectationModule.home.createOrEditLabel">
              <Translate contentKey="pfumv10App.affectationModule.home.createOrEditLabel">Create or edit a AffectationModule</Translate>
            </h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : affectationModuleEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="affectation-module-id">
                      <Translate contentKey="global.field.id">ID</Translate>
                    </Label>
                    <AvInput id="affectation-module-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="anneeLabel" for="affectation-module-annee">
                    <Translate contentKey="pfumv10App.affectationModule.annee">Annee</Translate>
                  </Label>
                  <AvField id="affectation-module-annee" type="text" name="annee" />
                </AvGroup>
                <AvGroup>
                  <Label id="semestreLabel" for="affectation-module-semestre">
                    <Translate contentKey="pfumv10App.affectationModule.semestre">Semestre</Translate>
                  </Label>
                  <AvInput
                    id="affectation-module-semestre"
                    type="select"
                    className="form-control"
                    name="semestre"
                    value={(!isNew && affectationModuleEntity.semestre) || 'S1'}
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
                  <Label for="affectation-module-module">
                    <Translate contentKey="pfumv10App.affectationModule.module">Module</Translate>
                  </Label>
                  <AvInput id="affectation-module-module" type="select" className="form-control" name="module.id">
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
                <AvGroup>
                  <Label for="affectation-module-professeur">
                    <Translate contentKey="pfumv10App.affectationModule.professeur">Professeur</Translate>
                  </Label>
                  <AvInput id="affectation-module-professeur" type="select" className="form-control" name="professeur.id">
                    <option value="" key="0" />
                    {professeurs
                      ? professeurs.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.id}
                          </option>
                        ))
                      : null}
                  </AvInput>
                </AvGroup>
                <Button tag={Link} id="cancel-save" to="/entity/affectation-module" replace color="info">
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
  professeurs: storeState.professeur.entities,
  affectationModuleEntity: storeState.affectationModule.entity,
  loading: storeState.affectationModule.loading,
  updating: storeState.affectationModule.updating,
  updateSuccess: storeState.affectationModule.updateSuccess
});

const mapDispatchToProps = {
  getModules,
  getProfesseurs,
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
)(AffectationModuleUpdate);
